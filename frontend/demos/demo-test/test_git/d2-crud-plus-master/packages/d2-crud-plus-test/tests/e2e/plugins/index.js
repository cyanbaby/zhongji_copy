/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  // on('file:preprocessor', webpack({
  //  webpackOptions: require('@vue/cli-service/webpack.config'),
  //  watchOptions: {}
  // }))
  config.env.VUE_APP_PM_ENABLED = process.env.VUE_APP_PM_ENABLED
  console.log('pm enabled:', config.env.VUE_APP_PM_ENABLED)
  on('before:browser:launch', (browser = {}, launchOptions) => {
    // if (browser.family === 'chrome') {
    //   console.log('Adding --disable-dev-shm-usage...')
    //   launchOptions.args.push('--disable-dev-shm-usage')
    // }
    return launchOptions
  })
  console.log('config', config)
  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/results/screenshots',
    videosFolder: 'tests/e2e/results/videos',
    supportFile: 'tests/e2e/support/index.js'
  })
}
