const express = require('express');
const bodyParser = require('body-parser');
const CORS = require("cors")
const { sseMiddleware } = require('express-sse-middleware')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session')
const multipart = require('connect-multiparty')
const MongoStore = require('connect-mongo')(session)
const swStats = require('swagger-stats')
const moment = require("moment")

const Events = require("./events")

const { extend, keys, isObject } = require("lodash")
const YAML = require("js-yaml")
const path = require("path")


const busboy = require('connect-busboy')


const config = require("./index")
const STATIC_FILE_PATTERN = /\.[^.\/]*$/g


const AppConfig = require("../models/AppConfig")
const PortalConfig = require("../models/PortalConfig")
const User = require("../models/User")


let addDefaultAppConfigs = ()  => {

  let apps = config.portal.applications.map( app => require(app))
  return Promise.all( apps.map( app => {
    if ( app.appWidgets ) app.appWidgets = app.appWidgets.map( w => JSON.stringify(w))
    if ( app.pages ) app.pages = app.pages.map( p => JSON.stringify(p))
    return AppConfig.findOrCreate({name: app.name}, app)
            .then( () => {
              console.log(`** Install app "${app.name}"`)
              return true
            })
            .catch( err => {
              console.log(`Cannot install app "${app.name}": ${err.toString()}`)
            })  
  }))

}

let addDefaultPortalConfigs = ()  => PortalConfig.findOne({})
  .then( config => {
    console.log("CONFIG",config)
    let data = extend(
      {},
      (config) ? config.value : {}, 
      {
        defaultApp:config.value.defaultApp || "JACE", 
        pubService:"http://localhost:8081"
      }
    )
    console.log("LOAD\n"+YAML.dump(data))
    return data
  })
  .then( config => PortalConfig.findOrCreate({}, {value:config})
      .then( () => {
        console.log(`** Update portal config: ${JSON.stringify(config,null," ")}`)
        return true
      })
  )
  .catch( err => {
    console.log(`Cannot update portal config: ${err.toString()}`)
  })

let checkDefaultAdmins = () => Promise.all( config.portal.administrators.map( admin => new Promise((resolve, reject) => {
    
    User.findOne({email: admin})
    .then( user => {
      if(!user) {
        resolve(true)
        return
      }

      if( user.isAdmin) {
        console.log(`** Check adminstrator privilegues for ${admin}`)
        resolve(true)
      } else {
        User.update({email: admin}, {isAdmin: true})
        .then( () => {
            console.log("** Update administrator privilegues for " + admin)
            resolve(true)
        });    
      }
    })
    .catch( err => {
      console.log(`Cannot check administrator privilegues: ${err.toString()}`)
      reject(err)
    })
})))  

const getEnv = () => {
  const keys = ["APP_HOST", "APP_PROTOCOL","ATLAS_URL","MONGO_URI","GOOGLE_CLIENT_ID","GOOGLE_CLIENT_SECRET","GOOGLE_CALLBACK",]
  let res = {}
  keys.forEach( key => {
    res[key] = process.env[key]
  })
  return res
}


let configureServer = () => {
  console.log("** Starts portal configuration")
  console.log("** Environment Variables **")
  console.table(getEnv())
  console.log("** Configutarion **")
  console.log(YAML.dump(JSON.parse(JSON.stringify(config))))
  
  return checkDefaultAdmins()
    .then( () => addDefaultAppConfigs())
    .then( () => addDefaultPortalConfigs())
}



const loadPlugins = async app => {

  const plugins = keys(config.portal.plugins)
  
  for(const plugin of plugins){
    let routes = config.portal.plugins[plugin]
    if( isObject(routes) && routes.init){
      routes = await routes.init()
      console.log(`** Load plugin: ${plugin}`, routes.stack.map( d => d.regexp))
       app.use(plugin,  routes )
    }
  }

}



module.exports = async () => {
    var app = express();


    await mongoose.connect(config.portal.db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // Passport config
    config.passport(passport)



    // Middleware
    app.use(express.urlencoded({ extended: true }))

    app.use(cookieParser())

    // app.set('view engine', 'ejs');

const FileStore = require('session-file-store')(session);
 

    app.use(
        session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            // store: new FileStore({
            //   path:"./.sessions"
            // })
        })
    ) 

    // app.use(
    //     session({
    //         secret: 'keyboard cat',
    //         resave: false,
    //         saveUninitialized: false,
    //         store: new MongoStore({ mongooseConnection: mongoose.connection }),
    //     })
    // )

    // Passport middleware
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(CORS())
    app.use(sseMiddleware)


    morgan.token('user', req => (req.user) ? req.user.name +"("+req.user.email+")" : "anonymous" )

    if(config.portal.useLog){
      app.use(
        morgan(
          ':date[iso] :method :url :status :res[content-length] - :response-time ms :user',
          {
            skip: req => /\/js\/|\/api\/resource\/|\/manifest|\/img\/|\/modules|\/chunk-|\/fonts|\/css|\/undefined|\/favicon/.test(req.url)          }
       )   
      )
    }
    



    // app.use(fileUpload({
    //     useTempFiles: true,
    //     tempFileDir: config.portal.uploadPath,
    //     limits: {
    //         fileSize: 1024 * 1024 * 1024
    //     }
    // }));

    app.use(bodyParser.text());
    app.use(bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: '100mb',
        extended: true
    }));

    app.use(bodyParser.json({
        limit: '100mb'
    }));

    app.use(busboy())
    
    // app.use(multipart())


    // the sequence of middlware is important


    // app.use( (req, res, next) => {
    //   console.log(`${moment(new Date()).format("DD MMM YYYY, HH:mm:ss")} ----- ${(req.user) ? req.user.name +"("+req.user.email+")" : "anonymous"} > ${req.path} -----`)
      
    //   // console.log("-----  ", (req.user) ? `${req.user.name} (${req.user.email})` : "anonymous",  " > ", req.path,"  -----")
    //   next()
    // })

    app.use(swStats.getMiddleware({/*swaggerSpec:swaggerDocument,*/ uriPath:"/metrics", name:"ADE PORTAL"}))


    app.use(require('../routes/design').unless({
        path: [
            { method: "GET", url: STATIC_FILE_PATTERN },
            { method: "GET", url: "/auth/*" },
            { method: ["GET", "POST", "PUT"], url: "/api/*" },
            { method: ["GET", "POST", "PUT"], url: "/undefined" },

        ]
    }))

    app.use('/auth', require('../routes/auth'))
    app.use('/design', require('../routes/design'))
    
    app.use('/api/default', require('../routes/default'))
    app.use("/api/resource", require("../routes/resource"))
    app.use("/api/app/config", require("../routes/portal-config"))
    app.use("/api/app", require("../routes/app-config"))
    
    app.use(Events)    

    await loadPlugins(app)

    // app.use("/api/md",  require("../routes/api-md"))
    // app.use("/api/script",  require("../jace-dps"))
    
    // const ttt = require("../sync-data")
    // app.use("/api/data",  ttt.router)
    


    app.use("/api", require("../routes/user"))
    
    console.log("** Use static:", path.resolve(config.portal.staticPath))
    app.use(express.static(path.resolve(config.portal.staticPath)))
    
    app.use((error, req, res, next) => {
      console.log(`ERROR occurred: ${error.toString()} ${error.stack}`);
      res.status(500).send(`${error.toString()} ${error.stack}`);
    })

    return configureServer()
      .then(() => app)
}