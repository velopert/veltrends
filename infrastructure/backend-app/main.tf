terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "ap-northeast-2"
}


variable "prefix" {
  description = "prefix prepended to names of all resources created"
  default     = "veltrends-backend-app"
}

variable "port" {
  description = "port the container exposes, that the load balancer should forward port 80 to"
  default     = "8080"
}

variable "region" {
  description = "selects the aws region to apply these services to"
  default     = "ap-northeast-2"
}

variable "source_path" {
  description = "source path for project"
  default     = "../../packages/veltrends-server"
}

variable "tag" {
  description = "tag to use for our new docker image"
  default     = "latest"
}




variable "envvars" {
  type        = map(string)
  description = "variables to set in the environment of the container"
  default = {
  }
}

variable "database_url" {
  description = "DATABASE_URL env var for prisma"
  default     = ""
}

variable "jwt_secret" {
  description = "Secret Key for JWT"
  default     = ""
}

variable "algolia_admin_key" {
  description = "Admin key of algolia"
  default     = ""
}

variable "algolia_app_id" {
  description = "algolia id"
  default     = ""
}

variable "cf_account_id" {
  description = "Cloudflare account id"
  default     = ""
}

variable "cf_key_id" {
  description = "Cloudflare key id"
  default     = ""
}

variable "cf_key_secret" {
  description = "Cloudflare key secret"
  default     = ""
}



resource "aws_secretsmanager_secret" "database_url" {
  name = "/${var.prefix}/database_url"
}

resource "aws_secretsmanager_secret_version" "database_url_version" {
  secret_id     = aws_secretsmanager_secret.database_url.id
  secret_string = var.database_url
}

resource "aws_secretsmanager_secret" "jwt_secret" {
  name = "/${var.prefix}/jwt_secret"
}

resource "aws_secretsmanager_secret_version" "jwt_secret_version" {
  secret_id     = aws_secretsmanager_secret.jwt_secret.id
  secret_string = var.jwt_secret
}


resource "aws_secretsmanager_secret" "algolia_admin_key" {
  name = "/${var.prefix}/algolia_admin_key"
}

resource "aws_secretsmanager_secret_version" "algolia_admin_key_version" {
  secret_id     = aws_secretsmanager_secret.algolia_admin_key.id
  secret_string = var.algolia_admin_key
}


resource "aws_secretsmanager_secret" "cf_key_secret" {
  name = "/${var.prefix}/cf_key_secret"
}

resource "aws_secretsmanager_secret_version" "cf_key_secret_version" {
  secret_id     = aws_secretsmanager_secret.cf_key_secret.id
  secret_string = var.cf_key_secret
}




resource "aws_iam_role_policy" "password_policy_secretsmanager" {
  name = "password-policy-secretsmanager"
  role = aws_iam_role.ecs_task_execution_role.id

  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "secretsmanager:GetSecretValue"
        ],
        "Effect": "Allow",
        "Resource": [
          "${aws_secretsmanager_secret.database_url.arn}",
          "${aws_secretsmanager_secret.jwt_secret.arn}",
          "${aws_secretsmanager_secret.algolia_admin_key.arn}",
          "${aws_secretsmanager_secret.cf_key_secret.arn}"
        ]
      }
    ]
  }
  EOF
}



resource "aws_ecs_cluster" "production" {
  name = "${var.prefix}-cluster"
}


data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}

data "aws_caller_identity" "current" {}

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "instance_dns_name" {
  value = aws_lb.production.dns_name
}

data "aws_vpc" "default" {
  default = true
}

data "aws_security_group" "selected" {
  vpc_id = data.aws_vpc.default.id

  filter {
    name   = "group-name"
    values = ["default"]
  }
}


resource "aws_security_group" "lb" {
  name        = "${var.prefix}-lb-sg"
  description = "controls access to the Application Load Balancer (ALB)"

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }


  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs_tasks" {
  name        = "${var.prefix}-tasks-sg"
  description = "allow inbound access from the ALB only"

  ingress {
    protocol        = "tcp"
    from_port       = var.port
    to_port         = var.port
    cidr_blocks     = ["0.0.0.0/0"]
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "production" {
  name               = "${var.prefix}-alb"
  subnets            = data.aws_subnet_ids.default.ids
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]

  tags = {
    Environment = "production"
    Application = "${var.prefix}-app"
  }
}

resource "aws_lb_listener" "http_forward" {
  load_balancer_arn = aws_lb.production.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}


resource "aws_lb_listener" "https_forward" {
  load_balancer_arn = aws_lb.production.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn = "arn:aws:acm:ap-northeast-2:812681381769:certificate/e171bf80-0973-46ac-895c-a4541bcf06fd"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.production.arn
  }
}



resource "aws_lb_target_group" "production" {
  name        = "${var.prefix}-alb-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "90"
    protocol            = "HTTP"
    matcher             = "200-299"
    timeout             = "20"
    path                = "/"
    unhealthy_threshold = "2"
  }
}

resource "aws_ecr_repository" "repo" {
  name = "${var.prefix}/runner"
}

resource "aws_ecr_repository" "repo-ranking-worker" {
  name = "${var.prefix}/repo-ranking-worker"
}


resource "aws_ecr_lifecycle_policy" "repo-policy" {
  repository = aws_ecr_repository.repo.name

  policy = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Keep image deployed with tag latest",
      "selection": {
        "tagStatus": "tagged",
        "tagPrefixList": ["latest"],
        "countType": "imageCountMoreThan",
        "countNumber": 1
      },
      "action": {
        "type": "expire"
      }
    },
    {
      "rulePriority": 2,
      "description": "Keep last 2 any images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 2
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}

resource "aws_ecr_lifecycle_policy" "repo-ranking-worker-policy" {
  repository = aws_ecr_repository.repo-ranking-worker.name

  policy = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Keep image deployed with tag latest",
      "selection": {
        "tagStatus": "tagged",
        "tagPrefixList": ["latest"],
        "countType": "imageCountMoreThan",
        "countNumber": 1
      },
      "action": {
        "type": "expire"
      }
    },
    {
      "rulePriority": 2,
      "description": "Keep last 2 any images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 2
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}

data "aws_iam_policy_document" "ecs_task_execution_role" {
  version = "2012-10-17"
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}



resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "${var.prefix}-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_execution_role.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}



resource "aws_ecs_task_definition" "service" {
  family                   = "${var.prefix}-task-family"
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                      = 256
  memory                   = 512
  requires_compatibilities = ["FARGATE"]
  container_definitions = templatefile("./app.json.tpl", {
    aws_ecr_repository = aws_ecr_repository.repo.repository_url
    database_url       = aws_secretsmanager_secret.database_url.arn
    jwt_secret         = aws_secretsmanager_secret.jwt_secret.arn
    algolia_admin_key  = aws_secretsmanager_secret.algolia_admin_key.arn
    cf_key_secret      = aws_secretsmanager_secret.cf_key_secret.arn
    algolia_app_id     = "${var.algolia_app_id}"
    cf_account_id      = "${var.cf_account_id}"
    cf_key_id          = "${var.cf_key_id}"


    tag      = "latest"
    app_port = 80
    region   = "${var.region}"
    prefix   = "${var.prefix}"
    envvars  = var.envvars
    port     = var.port
  })
  tags = {
    Environment = "production"
    Application = "${var.prefix}-app"
  }
}

resource "aws_ecs_service" "production" {
  name            = "${var.prefix}-service"
  cluster         = aws_ecs_cluster.production.id
  task_definition = aws_ecs_task_definition.service.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id, data.aws_security_group.selected.id]
    subnets          = data.aws_subnet_ids.default.ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.production.arn
    container_name   = "${var.prefix}-app"
    container_port   = var.port
  }

  depends_on = [aws_lb_listener.https_forward, aws_iam_role_policy_attachment.ecs_task_execution_role]

  tags = {
    Environment = "production"
    Application = "${var.prefix}-app"
  }
}

resource "aws_cloudwatch_log_group" "log-group" {
  name = "${var.prefix}-log-group"

  tags = {
    Environment = "production"
    Application = "${var.prefix}-app"
  }
}


resource "aws_iam_role" "ecs-autoscale-role" {
  name = "ecs-scale-application"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "application-autoscaling.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity       = 10
  min_capacity       = 2
  resource_id        = "service/${var.prefix}-cluster/${var.prefix}-service"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
  role_arn           = aws_iam_role.ecs-autoscale-role.arn
  depends_on         = [aws_ecs_service.production]
}


resource "aws_iam_role_policy_attachment" "ecs-autoscale" {
  role       = aws_iam_role.ecs-autoscale-role.id
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceAutoscaleRole"
}

resource "aws_appautoscaling_policy" "ecs_target_cpu" {
  name               = "application-scaling-policy-cpu"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 80
  }
  depends_on = [aws_appautoscaling_target.ecs_target]
}
resource "aws_appautoscaling_policy" "ecs_target_memory" {
  name               = "application-scaling-policy-memory"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value = 80
  }
  depends_on = [aws_appautoscaling_target.ecs_target]
}




# For Scheduled ECS
resource "aws_ecs_cluster" "ranking-worker-cluster" {
  name = "${var.prefix}-ranking-worker-cluster"
}

resource "aws_cloudwatch_log_group" "ranking-worker-cluster" {
  name              = "${var.prefix}-ranking-worker-cluster-log-group"
  retention_in_days = 1
}


module "ecs_scheduled_task" {
  source              = "git::https://github.com/tmknom/terraform-aws-ecs-scheduled-task.git?ref=tags/2.0.0"
  name                = "${var.prefix}-ranking-worker"
  schedule_expression = "rate(5 minutes)"
  cluster_arn         = aws_ecs_cluster.ranking-worker-cluster.arn
  subnets             = data.aws_subnet_ids.default.ids

  container_definitions = templatefile("./ranking-worker.json.tpl", {
    aws_ecr_repository = aws_ecr_repository.repo-ranking-worker.repository_url
    database_url       = aws_secretsmanager_secret.database_url.arn
    tag                = "latest"
    region             = "${var.region}"
    prefix             = "${var.prefix}"
  })

  security_groups                = [data.aws_security_group.selected.id]
  cpu                            = 256
  memory                         = 512
  requires_compatibilities       = ["FARGATE"]
  create_ecs_task_execution_role = false
  ecs_task_execution_role_arn    = aws_iam_role.ecs_task_execution_role.arn
  assign_public_ip               = true
}



resource "null_resource" "push" {
  provisioner "local-exec" {
    command     = "${path.module}/push.sh ${var.source_path} ${aws_ecr_repository.repo.repository_url} ${var.tag} ${data.aws_caller_identity.current.account_id} Dockerfile"
    interpreter = ["bash", "-c"]
  }
}


resource "null_resource" "push-ranking-worker" {
  provisioner "local-exec" {
    command     = "${path.module}/push.sh ${var.source_path} ${aws_ecr_repository.repo-ranking-worker.repository_url} ${var.tag} ${data.aws_caller_identity.current.account_id} Dockerfile.ranking"
    interpreter = ["bash", "-c"]
  }
}
