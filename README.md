# CI/CD Automation: Jenkins, Docker, and AWS EC2

This repository demonstrates a complete Continuous Integration and Continuous Deployment (CI/CD) pipeline for a Node.js and Express.js web application. It automates pulling source code from GitHub, building a Docker image, running the container, and validating it using health checks. The deployment targets an AWS EC2 Ubuntu instance managed by a Jenkins pipeline.

## Project Structure

- `app.js` - A simple Express.js server providing an API endpoint (`/api`) and a health check endpoint (`/health`).
- `Dockerfile` - Contains the instructions to containerize the Node.js application.
- `Jenkinsfile` - Declarative Jenkins Pipeline defining the CI/CD stages (Clone, Install Dependencies, Build Image, Deploy Container, Health Validation).
- `package.json` - Node.js project metadata and dependencies.

## Prerequisites

To run this pipeline, you need:
1. **AWS EC2 Ubuntu Instance** (e.g., t2.micro or larger) configured with a Security Group allowing:
   - Port 22 (SSH)
   - Port 80 (HTTP) - For the Node.js application
   - Port 8080 (HTTP) - For Jenkins (if hosted on the same instance)
2. **Jenkins** installed on the EC2 instance (or accessible to it).
3. **Docker** installed on the EC2 instance.
4. **Node.js & npm** installed on the Jenkins agent.
5. The `jenkins` user added to the `docker` group so it can run Docker commands without `sudo`.

## EC2 Configuration Steps

### 1. Install Docker
```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
```

### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install Jenkins
```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install -y jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

### 4. Give Jenkins Docker Permissions
To allow Jenkins to run Docker commands, add the `jenkins` user to the `docker` group:
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
sudo systemctl restart docker
```

## Jenkins Setup

1. Open Jenkins at `http://<YOUR_EC2_PUBLIC_IP>:8080`.
2. Retrieve the initial admin password: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`.
3. Install the recommended plugins.
4. Create a new **Pipeline** job.
5. In the **Pipeline** configuration section:
   - Select **Pipeline script from SCM**.
   - Choose **Git** and provide your GitHub repository URL.
   - Make sure the "Script Path" is set to `Jenkinsfile`.
6. (Optional) Set up a **GitHub Webhook** in your repository settings pointing to `http://<YOUR_EC2_PUBLIC_IP>:8080/github-webhook/` and enable "GitHub hook trigger for GITScm polling" in Jenkins to automatically build upon push.

## Pipeline Stages Explained

1. **Clone Repository**: Automatically checks out the code from the Git repository.
2. **Install Dependencies & Test**: Runs `npm install` to ensure that Node.js dependencies resolve correctly.
3. **Build Docker Image**: Uses the `Dockerfile` to build the Docker image for the Express app.
4. **Deploy Container**: Stops and removes the old container if it exists, ensuring zero-downtime replacements. Then, starts a new container binding port 80 on the EC2 host to port 3000 on the Docker container.
5. **Health Validation**: Pings the `/health` endpoint to verify that the application has successfully started and is responding with an HTTP 200 OK status.

## Accessing the App

Once the Jenkins pipeline completes successfully, access the application by navigating to:
- `http://<YOUR_EC2_PUBLIC_IP>/` (Root UI)
- `http://<YOUR_EC2_PUBLIC_IP>/api` (API endpoint)
- `http://<YOUR_EC2_PUBLIC_IP>/health` (Health check endpoint)
