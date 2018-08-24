@Library('deployment') _
import org.mapcreator.Deploy

node('node') {
  stage('checkout') {
    checkout scm
  }

  stage('build') {
    sh 'npm install'
    sh 'npm run compile-docs-wrapper'
    sh 'sudo bundle install'
    sh 'bundle exec middleman build --clean'
  }

  if (BRANCH_NAME in ['master']) {
    stage('deploy') {
      def deploy = new Deploy(steps)
      deploy.initialize(
        '/var/www/',
        'maps4news-docs',
        'master',
        BUILD_NUMBER,
        'f206c873-8c0b-481e-9c72-1ecb97a5213a',
        'deploy',
        '54.246.191.92',
        false
      )

      deploy.prepare()
      deploy.copy('./build/*')
      deploy.finish()
    }
  }

  stage('cleanup') {
    step([$class: 'WsCleanup'])
  }
}
