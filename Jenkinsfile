pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        NODE_VERSION = '20'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Configuration Git pour éviter les erreurs "dubious ownership"
                    sh '''
                        git config --global --add safe.directory $(pwd)
                        git config --global --add safe.directory /var/jenkins_home/jobs/groupe_cube3/branches/main/workspace
                        git config --global --add safe.directory /var/jenkins_home/jobs/groupe_cube3/workspace
                        git config --global init.defaultBranch main
                        git config --global user.name "Jenkins CI/CD"
                        git config --global user.email "jenkins@localhost"
                        echo "Git configuration applied"
                    '''
                }

                checkout scm

                script {
                    echo "Building branch: ${env.BRANCH_NAME}"
                    echo "Commit: ${env.GIT_COMMIT}"
                    sh 'git log --oneline -3'
                }
            }
        }

        stage('Setup environment') {
            steps {
                sh 'ls -la'
                sh 'pwd'

                // Installer Node.js si nécessaire
                sh '''
                    if ! command -v node &> /dev/null; then
                        echo "Node.js not found, installing..."
                        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
                        apt-get install -y nodejs
                    fi
                '''

                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint code') {
            steps {
                sh 'npm run lint || echo "Linting failed but continuing..."'
            }
        }

        stage('Type check') {
            steps {
                sh 'npm run typecheck'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Security scan') {
            steps {
                script {
                    sh 'npm audit --audit-level moderate || echo "Security scan completed with warnings"'
                }
            }
        }
    }

    post {
        always {
            script {
                def status = currentBuild.currentResult ?: 'SUCCESS'
                echo "Build ${status}: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            }
        }

        success {
            script {
                echo 'Pipeline réussi !'
            }
        }

        failure {
            script {
                echo 'Pipeline échoué !'
            }
        }

        unstable {
            script {
                echo 'Build instable'
            }
        }
    }
}
