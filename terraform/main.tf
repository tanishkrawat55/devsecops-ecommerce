resource "aws_security_group" "devsecops_sg" {

  name = "devsecops-security-group"

  ingress {

    from_port = 3000

    to_port = 3000

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {

    from_port = 5000

    to_port = 5000

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {

    from_port = 22

    to_port = 22

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {

    from_port = 0

    to_port = 0

    protocol = "-1"

    cidr_blocks = ["0.0.0.0/0"]
  }
}



resource "aws_instance" "devsecops_server" {

  ami = "ami-0f58b397bc5c1f2e8"

  instance_type =
    var.instance_type

  security_groups = [
    aws_security_group
      .devsecops_sg.name
  ]

  tags = {

    Name =
      "DevSecOps-Server"
  }
}