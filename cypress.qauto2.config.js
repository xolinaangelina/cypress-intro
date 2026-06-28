const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto2.forstudy.space',
    env: {
      email: 'angelina.qauto2@gmail.com',
      password: '3z!bbgbQFQpZwU4',
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