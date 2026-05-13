pipeline {
    agent any

    environment {
        IMAGE_NAME = 'blog-app-frontend'
        CONTAINER_NAME = 'blog-app-container'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling latest source code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image from Dockerfile...'
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Container') {
            steps {
                echo 'Stopping existing container (if any)...'
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                
                echo 'Running new container...'
                sh "docker run -d --name ${CONTAINER_NAME} -p 80:80 ${IMAGE_NAME}"
            }
        }

        stage('Health Check') {
            steps {
                echo 'Validating container health...'
                sleep 5
                script {
                    def status = sh(
                        script: "curl -s -o /dev/null -w '%{http_code}' http://172.17.0.1:80",
                        returnStdout: true
                    ).trim()
                    echo "HTTP Status: ${status}"
                    if (status != '200') {
                        error("Health check failed! HTTP Status: ${status}")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Application successfully deployed and verified on Port 80!'
                echo "Access the Blog App via your EC2 Public IP."
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up dangling Docker images...'
                sh "docker image prune -f"
            }
        }
    }
}
