module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'yundun-map-report',
      script: 'index.js',
      env_stage: {
        API_ENV: 'test',
        NODE_ENV: 'production'
      },
      env_pre: {
        API_ENV: 'pre',
        NODE_ENV: 'production'
      },
      env_release: {
        API_ENV: 'release',
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {}
}
