pipeline {
    agent any

    environment {
        // Đảm bảo rằng NodeJS và npm được cấu hình đúng trên Jenkins
        NODE_HOME = '/usr/local/bin'
        PATH = "${NODE_HOME}:${env.PATH}"
        VERCEL_TOKEN = credentials('vercel-token') // Đảm bảo bạn đã cấu hình Vercel token trong Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout mã nguồn từ GitHub
                git branch: 'main', url: 'https://github.com/HaMinhLong/NestJS_nha_thuoc_GPP.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Cài đặt các phụ thuộc dự án NestJS
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

        stage('Deploy to Vercel') {
            steps {
                script {
                    // Cài đặt Vercel CLI (nếu chưa cài sẵn)
                    sh 'npm install -g vercel'

                    // Triển khai lên Vercel với token và dự án hiện tại
                    sh 'vercel --prod --token $VERCEL_TOKEN'
                }
            }
        }
    }

    post {
        always {
            // Cleanup sau khi hoàn thành (nếu cần)
            echo 'Pipeline finished'
        }

        success {
            echo 'Build and deployment successful!'
        }

        failure {
            echo 'Build or deployment failed!'
        }
    }
}
