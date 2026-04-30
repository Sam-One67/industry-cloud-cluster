data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["137112412989"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023*-x86_64"]
  }
}

resource "aws_key_pair" "deployer" {
  key_name   = "k8s-key-mumbai"
  public_key = file("my-key.pub") 
}

resource "aws_instance" "k8s_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.small"

  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.k8s_sg.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.deployer.key_name

  user_data = <<-EOF
              #!/bin/bash
              sudo dnf update -y
              curl -sfL https://get.k3s.io | sh -
              
              mkdir -p /home/ec2-user/.kube
              sudo cp /etc/rancher/k3s/k3s.yaml /home/ec2-user/.kube/config
              sudo chown ec2-user:ec2-user /home/ec2-user/.kube/config
              sudo chmod 644 /etc/rancher/k3s/k3s.yaml
              EOF

  tags = {
    Name = "mumbai-k8s-master"
  }
}

output "server_public_ip" {
  value = aws_instance.k8s_server.public_ip
}