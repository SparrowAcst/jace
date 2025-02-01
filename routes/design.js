const path = require("path")
const fs = require('fs')

const router = require('express').Router()
const unless = require('express-unless')
const { extend, isUndefined, keys  } = require("lodash")

const config = require("../config")

const APP_CACHE = require("./app-cache")

let requestHandler = async (req, res, next) => {

    // console.log("DESIGN:", req.user, req.params)
    // console.log(req.params.appName, config.portal.defaultApp)

    let app = await APP_CACHE.get(req.params.appName || config.portal.defaultApp)

    if (!app) {
        res.status(404).send("Application not found.")
        
        return
        // app = await APP_CACHE.get(config.defaultApp)
    }

    let userInfo = extend({},
        req.user, {
            isAdmin: config.portal.administrators.includes((req.user || {}).email),
            isLoggedIn: !isUndefined(req.user),
            isOwner: app.owner == (req.user || {}).email,
            isCollaborator: true
        }
    )

    let ownerInfo = {
        exists: false
    }

    let script = `
      var user = ${JSON.stringify(userInfo)};
      var author = ${JSON.stringify(ownerInfo)};
      var appName = "${app.name}";
      var initialConfig = JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(app))}"));
      var dpsURL = initialConfig.dpsURL;
      var __application_Config_Key =  "${app.id}-application-config";
      var __application_Mode_Key =  "${app.id}-mode";
      // sessionStorage.setItem(__application_Config_Key, JSON.stringify(initialConfig))
    `

    if (keys(req.query).length == 0) {
        script += `
        window["${app.name}_query"] = JSON.parse(localStorage.getItem("jace__${app.name}_query"))
        `
    } else {
        script += `
        localStorage.setItem("jace__${app.name}_query",JSON.stringify(${JSON.stringify(req.query)}))
        window["${app.name}_query"] = JSON.parse(localStorage.getItem("jace__${app.name}_query"))
        `
    }

    let page = fs.readFileSync(path.resolve(config.portal.indexPath)).toString()


    res.send(
        page
        .replace("//author", ownerInfo.name)
        .replace("//description", app.description)
        .replace("//__appconfig", script)
        .replace("//appTitle", app.title)
    )
}



router.get("/:appName", requestHandler)
router.get("/", requestHandler)
router.unless = unless


module.exports = router;