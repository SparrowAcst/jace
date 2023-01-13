const path = require("path")
const fs = require("fs-extra")
const _ = require("lodash")


const lq = /(<<<[=,#]{0,1})/
const rq = /(>>>)/
const lqe = p => p == "<<<="
const lql = p => p == "<<<#"

const lqc = p => p == "<<<"
const rqe = p => p == ">>>"

const detectJace = /<<</gim


module.exports = (source, options) => {

  let jace = options || {}

  if (jace.mode == "publication") {
    jace = _.extend(jace, {

      pages() {
          return jace.appConfig.pages
      },

      holders() {
        let res = _.toPairs(jace.appConfig.skin.holders).map(h => ({
          id:h[0],
          instance:h[1]
        }))

        // _.extend({}, jace.appConfig.skin.holders)
       
        jace.pages().forEach( p => {
          res = res.concat(
            _.toPairs(p.holders).map(h => ({
              id:h[0],
              instance:h[1]
            }))
          )
        })

        // .forEach(p => {
        //   res = _.extend(res, p.holders)
        // })
        return res
      },

      widgets() {
        return _.flattenDeep(jace.holders().map(p => p.instance.widgets))
        // return _.flattenDeep(_.toPairs(jace.holders(jace.appConfig)).map(p => p[1].widgets))
      },

      types() {
        return _.uniq(jace.widgets().map(w => w.type))
      }

    })
  }


  let src = []
  source.split(lq).map(p => p.split(rq)).forEach(p => {
    src = src.concat(p)
  })

  let flag = null;
  let res = [];
  buf = []
  let fileName;

  src.forEach((p, index) => {

    if (lql(p)) {
      flag = "log"
      buf.push('code.push( console.log("\\n"+eval(')
      return
    }

    if (lqe(p)) {
      flag = "eval"
      buf.push('code.push( eval(')
      return
    }

    if (lqc(p)) {
      flag = "code"
      return
    }


    if (rqe(p)) {

      if (flag == "eval") {
        buf.push('));\n')
        res.push(buf.join(""))
        buf = []
        flag = null
        return
      }

      if (flag == "log") {
        buf.push(')));\n')
        res.push(buf.join(""))
        buf = []
        flag = null
        return
      }


      flag = null
      return
    }


    if (flag == "code") {
      res.push(p)
      return
    }

    if (flag == "eval" || flag == "log") {
      buf.push(`context[${index}]`)
      return
    }



    if (!flag) {
      res.push(`code.push(context[${index}])`)
    }



  })

  // console.log("++++++++++++++++++++++++++++++++")
  // console.log(res.join("\n"))
  // console.log("++++++++++++++++++++++++++++++++")


  let result
  try {
    result = eval(`
	(context, jace) => { 
		// console.log("context", context) 

		let code = []
		
		jace.include = (filePath) => {
			if (!jace.resourcePath) return
			let f = path.join( path.dirname(jace.resourcePath).toString(), filePath )
			console.log("JACE LOADER INCLUDE FILE > ", f)
			let b = fs.readFileSync(f).toString('utf8')
			code.push(b)	
		}

    jace.resolve = (filePath) => {
      if (!jace.resourcePath) return
      let f = path.join( path.dirname(jace.resourcePath).toString(), filePath )
      console.log("JACE resolve > ", f)
      return f        
    }

    jace.insert = (value) => {
      code.push(value)
    }

		${res.join("\n")} 
		return code.join("")
	}
	`)(src, options)

    // if(/\$include/gim.test(src)){
    // 	console.log("--------------------------------------------------------------------")
    // 	console.log(result)
    // 	console.log("--------------------------------------------------------------------")
    // }
  } catch (e) {
    result = source
    console.log("Error", e.toString())
    console.log("=============================")
    console.log(source)
    console.log("=============================")
    console.log(res.join("\n"))
    console.log("=============================")

  }
  // console.log("\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n")
  // console.log(result)
  // console.log("\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n")

  return result


}
