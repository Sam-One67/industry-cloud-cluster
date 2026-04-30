resource "aws_ecr_repository" "frontend" {
  name                 = "my-frontend-app"
  image_tag_mutability = "MUTABLE"
  force_delete         = true 
}

resource "aws_ecr_repository" "backend" {
  name                 = "my-backend-api"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}