const path = require('path')
const loaderUtils = require('loader-utils')
const compile = require("./jace-compiler")


module.exports = async function(content, sourceMap) {

  this.async()
  this.cacheable()

  const options = {
    ...loaderUtils.getOptions(this),
    resourcePath: this.resourcePath
  }

  const detectJace = /<<</gim
  let compiled = content 
  // console.log("JACE LOADER > ", this.resourcePath)
  if (detectJace.test(content)) {
    // console.log("-----------------------------------------------------------------------------------------")
    console.log("JACE LOADER > ", this.resourcePath)
    // console.log("-----------------------------------------------------------------------------------------")
    // console.log("SOURCE")
    // console.log(content)
    

    compiled = compile(content, options)

    // console.log("-----------------------------------------------------------------------------------------")
    // console.log("RESULT")
    // console.log(compiled)
    // console.log("-----------------------------------------------------------------------------------------")
    if(detectJace.test(compiled)) {
      console.log("DETECT JACE INSTRUCTION IN COMPILED CODE")
    }

  }

  this.callback(null, compiled, sourceMap)
}
