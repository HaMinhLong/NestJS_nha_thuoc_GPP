pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token') // Đảm bảo bạn đã cấu hình Vercel token trong Jenkins
    }

    tools {
        nodejs 'NodeJS' // Đây là tên bạn đã cấu hình trong Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/HaMinhLong/NestJS_nha_thuoc_GPP.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Vercel') {
            steps {
                script {
                    sh '''
                    # Tạo thư mục cục bộ cho npm
                    mkdir -p ~/.npm-global
                    npm config set prefix '~/.npm-global'
                    export PATH=~/.npm-global/bin:$PATH

                    # Cài đặt vercel cục bộ
                    npm install -g vercel
                    '''
                }
            }
        }

        stage('Check Vercel Installation') {
            steps {
                script {
                    sh 'echo $PATH'  // Kiểm tra lại $PATH
                    sh 'vercel --version'  // Kiểm tra phiên bản vercel
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                script {
                    sh 'vercel --token $VERCEL_TOKEN --prod --yes --name nha-thuoc-gpp-be'
                }
            }
        }
    }

    post {
        always {
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
