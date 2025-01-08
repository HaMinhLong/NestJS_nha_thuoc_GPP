pipeline {
    agent any
    
    environment {
        // Cấu hình NodeJS nếu cần
        NODE_HOME = '/usr/local/bin'
        PATH = "${NODE_HOME}:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout mã nguồn từ GitHub
                git 'https://github.com/HaMinhLong/NestJS_nha_thuoc_GPP.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Cài đặt các phụ thuộc dự án
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build dự án NestJS
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Chạy các bài kiểm tra (nếu có)
                    sh 'npm run test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Cấu hình triển khai (ví dụ sử dụng SCP, Docker, hoặc cài đặt môi trường)
                    // Ví dụ sử dụng Docker:
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            // Thực hiện cleanup nếu cần
            echo 'Cleaning up...'
        }

        success {
            echo 'Build and deployment successful!'
        }

        failure {
            echo 'Build or deployment failed!'
        }
    }
}
