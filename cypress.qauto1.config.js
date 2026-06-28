const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      email: 'angelina.qauto1@gmail.com',
      password: 's9Z6thttrC2!!',
      guestLogin: 'guest',
      guestPassword: 'welcome2qauto'
    },
    setupNodeEvents(on, config) {},
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
})