const RuleSet = require('webpack/lib/RuleSet')
const jaceCompile = require("./jace-compiler")

class JaceLoaderPlugin {

  constructor(options) {
    this.options = options
  }

  apply(compiler) {

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        data => {
          const detectJace = /<<</gim
          if (detectJace.test(data.html)) {
            let source = data.html
            data.html = jaceCompile(source, this.options)
          }
          return data
        }
      )
    })

    // use webpack's RuleSet utility to normalize user rules
    const rawRules = compiler.options.module.rules
    const { rules } = new RuleSet(rawRules)

    rules.forEach(rule => {
      if (rule.use && rule.use.find(u => (u.loader === 'cache-loader' || u.loader === 'babel-loader' || u.loader === 'eslint-loader'))) {
        rule.use.push({
          loader: require.resolve('./parser'),
          options: this.options
        })
      }
    })

    compiler.options.module.rules = rules

  }
}

module.exports = JaceLoaderPlugin
