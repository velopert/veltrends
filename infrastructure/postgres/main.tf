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

data "http" "myip" {
  url = "http://ipv4.icanhazip.com"
}

resource "aws_security_group" "postgresql" {
  name        = "postgresql-security-group"
  description = "allow inbound access from current ip"

  ingress {
    from_port = 5432
    to_port = 5432
    protocol = "tcp"
    cidr_blocks = ["${chomp(data.http.myip.body)}/32"]
  }
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


resource "aws_instance" "app_server" {
  ami           = "ami-0e9bfdb247cc8de84"
  instance_type = "t2.micro"
  key_name      = "veltrends"
  user_data     = file("scripts/init_postgresql.sh")
  vpc_security_group_ids = [aws_security_group.postgresql.id, data.aws_security_group.selected.id]

  tags = {
    Name = "Veltrends PostgreSQL"
  }
}

output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.app_server.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "instance_private_ip" {
  description = "Private IP address of the EC2 instance"
  value       = aws_instance.app_server.private_ip
}



