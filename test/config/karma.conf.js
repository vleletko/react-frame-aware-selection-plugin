import { argv } from 'yargs'
import config from './config'
import webpackConfig from './webpack.config'

const karmaConfig = {
  basePath: '../../',
  files: [
    {
      pattern: `${config.testDir}/test-bundler.js`,
      watched: false,
      served: true,
      included: true,
    },
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: {
    [`${config.testDir}/test-bundler.js`]: ['webpack'],
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-module-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon.js',
      },
    },
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/,
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false',
        },
      ]),
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: {
      ...webpackConfig.externals,
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
    },
    sassLoader: webpackConfig.sassLoader,
  },
  webpackMiddleware: {
    noInfo: true,
  },
  mochaReporter: {
    showDiff: true,
    inlineDiffs: true,
  },
}

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig)
