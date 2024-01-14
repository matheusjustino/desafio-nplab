pipeline {
    agent any
    tools {
        nodejs '21.1.0'
    }
    environment {
		DOCKERHUB_USERNAME = 'seu-usuario-do-dockerhub'
		APP_NAME = 'desafio-npl'
        GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
		DOCKER_IMAGE_NAME = "$DOCKERHUB_USERNAME/$APP_NAME"
    }
    stages {
		stage('Prepare') {
            steps {
                sh 'npm i -g yarn'
            }
        }
        stage('Install') {
            steps {
                sh 'yarn install --frozen-lockfile'
            }
        }
        stage('Format') {
            steps {
                sh 'yarn format'
            }
        }
        stage('Lint') {
            steps {
                sh 'yarn lint'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
        stage('Docker Build') {
            steps {
                sh "docker build -t $DOCKER_IMAGE_NAME:latest ."
                sh "docker build -t $DOCKER_IMAGE_NAME:$GIT_COMMIT ."
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login --username $USERNAME --password-stdin'
                    sh "docker push $DOCKER_IMAGE_NAME:latest"
                    sh "docker push $DOCKER_IMAGE_NAME:$GIT_COMMIT"
                }
            }
        }
		// Step para deletar imagens docker antigas
		// stage('Delete Docker Images') {
		// 	steps {
		// 		script {
		// 			sh "docker rmi -f $DOCKER_IMAGE_NAME:$GIT_COMMIT"
		// 			sh "docker rmi -f $DOCKER_IMAGE_NAME:latest"
		// 		}
		// 	}
		// }
    }
}
