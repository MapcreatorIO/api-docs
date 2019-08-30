@Library('deployment') _
import org.mapcreator.Deploy

node('node') {
  stage('checkout') {
    checkout scm
  }

  stage('build') {
    sh 'npm install'
    sh 'npm run compile-docs-wrapper'
    sh 'npm run generate-model-tables'
    sh 'sudo bundle install' // 🤢🤮
    sh 'bundle exec middleman build --clean'
  }

  if (BRANCH_NAME in ['master']) {
    stage('deploy') {
      sh 'aws s3 sync build/ "s3://docs.beta.maps4news.com"'
      sh 'invalidate-file --path="/*" --id="E33W2FGWYKH1FJ" --reference="jenkins"'
    }
  }

  stage('cleanup') {
    step([$class: 'WsCleanup'])
  }
}

// vim: ft=groovy
