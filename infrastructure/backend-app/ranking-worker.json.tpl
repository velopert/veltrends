[
  {
    "name": "${prefix}-app",
    "image": "${aws_ecr_repository}:${tag}",
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "${region}",
        "awslogs-stream-prefix": "date",
        "awslogs-group": "${prefix}-ranking-worker-cluster-log-group"
      }
    },
    "comand": ["/bin/date"],
    "cpu": 1,
    "environment": [
      {
        "name": "NODE_ENV",
        "value": "production"
      }
    ],
    "ulimits": [
      {
        "name": "nofile",
        "softLimit": 65536,
        "hardLimit": 65536
      }
    ],
    "mountPoints": [],
    "memory": 512,
    "secrets": [
      {
        "name": "DATABASE_URL",
        "valueFrom": "${database_url}"
      }
    ],
    "volumesFrom": []
  }
]