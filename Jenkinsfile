pipeline {
    agent any

    environment {
        // Define variables to be used throughout the pipeline
        DOCKER_IMAGE = 'node-express-cicd'
        CONTAINER_NAME = 'node-app-container'
        HOST_PORT = '80'
        CONTAINER_PORT = '3000'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning source code from GitHub...'
                // If using Jenkins Multibranch Pipeline, checkout scm is automatic.
                // For a standard Pipeline job, you can use git url: 'https://github.com/your-repo.git'
                checkout scm
            }
        }

        stage('Install Dependencies & Test') {
            steps {
                echo 'Installing dependencies...'
                // Using npm from the Jenkins environment to verify dependencies install correctly.
                // Can also be done within a docker agent if preferred.
                sh 'npm install'
                
                // If we had actual tests, we would run them here
                // sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image...'
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying application to Docker container...'
                
                // Stop and remove the existing container if it is already running
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                """
                
                // Run the new container, mapping the host port to the container port
                sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Health Validation') {
            steps {
                echo 'Validating application health...'
                
                // Wait for the application to fully start
                sleep time: 10, unit: 'SECONDS'
                
                // Use curl to check the /health endpoint
                sh """
                    STATUS_CODE=\$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${HOST_PORT}/health)
                    if [ "\$STATUS_CODE" != "200" ]; then
                        echo "Health check failed with HTTP status code: \$STATUS_CODE"
                        exit 1
                    else
                        echo "Health check passed! HTTP status code: \$STATUS_CODE"
                    fi
                """
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution has finished.'
        }
        success {
            echo 'SUCCESS: The deployment completed without errors.'
        }
        failure {
            echo 'FAILED: The deployment failed. Please check the Jenkins build logs.'
        }
    }
}
