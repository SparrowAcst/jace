const path = require("path")
const fs = require('fs').promises
const uuid = require("uuid").v4

const router = require('express').Router()
const { cloneDeep, extend } = require("lodash")

const docdb = require("./utils/docdb")
const db = require("../.config").docdb

const config = require("../config")

const APP_CACHE = require("./app-cache")

let getList = async (req, res) => {

    try {
        let apps = await docdb.aggregate({
            db,
            collection: "dj-portal.appconfig",
            pipeline: [{
                    $lookup: {
                        from: "user",
                        localField: "owner",
                        foreignField: "email",
                        as: "owner",
                    },
                },
                {
                    $addFields: {
                        owner: {
                            $arrayElemAt: ["$owner", 0],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        appWidgets: 0,
                        pages: 0,
                        skin: 0,
                        theme: 0,
                    },
                },
            ]
        })

        apps = apps.map(app => ({
            id: app.id,
            name: app.name,
            description: app.description,
            title: app.title,
            dps: app.dps,
            keywords: app.keywords,
            collaborations: app.collaborations,
            i18n: app.i18n,
            icon: app.icon,
            createdAt: app.createdAt,
            updatedAt: app.updatedAt,
            // owner: app.owner && {
            //     id: app.owner.id,
            //     name: app.owner.name,
            //     email: app.owner.email,
            //     photo: app.owner.photo
            // },
            importedFromURL: app.importedFromURL,
            importedFromAuthor: app.importedFromAuthor
        }))

        res.send(apps)
    } catch (e) {
        res.ststsus(503).send(e.toString())
    }
}

let createWithConfig = async (req, res) => {

    try {
        if (!req.body.config) {
            console.log('App config not specified for new app in AppController.createWithConfig');
            res.status(503).send('App config not specified for new app in AppController.createWithConfig');
            return
        }

        var newApp = extend({}, config.portal.appTemplate)
        newApp.owner = req.user.email
        newApp.isPublished = true
        newApp.id = uuid()

        var newAppConfig = cloneDeep(req.body.config);

        newApp = extend({}, newApp, newAppConfig)

        if (newApp.appWidgets) newApp.appWidgets = newApp.appWidgets.map(w => JSON.stringify(w))
        if (newApp.pages) newApp.pages = newApp.pages.map(p => JSON.stringify(p))

        await docdb.replaceOne({
            db,
            collection: "dj-portal.appconfig",
            filter: {
                id: newApp.id
            },
            data: newApp
        })

        res.send({
            id: newApp.id
        })


    } catch (err) {

        console.log('Error while creating app: ' + err)
        res.status(503).send(err.toString())

    }
}


let getDefaultConfig = (req, res) => {
    res.send(config.portal.appTemplate)
}

let update = async (req, res) => {

    try {
        let updatedApp = req.body

        if (updatedApp.appWidgets) updatedApp.appWidgets = updatedApp.appWidgets.map(w => JSON.stringify(w))
        if (updatedApp.pages) updatedApp.pages = updatedApp.pages.map(p => JSON.stringify(p))
        updatedApp.updatedAt = new Date()

        await APP_CACHE.set(updatedApp.name, updatedApp)

        res.send(200)
    } catch (e) {
        res.status(503).send(e.toString())
    }

}


// let exportApp = (req, res) => {
//     AppConfig.findOne({ _id: req.params.appId })
//         // .populate('owner')
//         .then(app => {
//             res.setHeader('Content-disposition', 'attachment; filename=' + app.name + '.json')
//             AppConfig.destringifyConfigs(app)

//             // app.importedFromURL = sails.getBaseurl() + '/app/' + app.name
//             // app.importedFromAuthor = app.owner && app.owner.name

//             delete app.id // New id will be re-assigned when the app is exported
//             delete app.owner // The owner will change if another person exports this app
//             delete app.collaborations // We can't re-use this field because collaborator IDs aren't same in other DBs
//             delete app.createdAt
//             delete app.updatedAt

//             console.log(app)

//             res.send(app)
//         }).catch(err => {
//             console.log(err)
//             res.status(404).send(err)
//         });
// }

// let importApp = (req, res) => {

//     var appName = req.body.name


//     let $file = null
//     if (req.files && req.files.file) {

//         let fileContent = require("fs").readFileSync(req.files.file.tempFilePath)

//         $file = {
//             name: req.files.file.name,
//             binary: fileContent,
//             text: fileContent.toString()
//         }


//         try {
//             var app = JSON.parse($file.text)
//             app.name = appName
//             app.owner = req.user.id
//             delete app._id

//             if (app.appWidgets) app.appWidgets = app.appWidgets.map(w => JSON.stringify(w))
//             if (app.pages) app.pages = app.pages.map(p => JSON.stringify(p))


//             AppConfig.create(app)
//                 .then(created => {
//                     res.send({
//                         name: app.name,
//                         id: created.id
//                     });
//                 }).catch(err => {
//                     console.log('AppController.import error: ' + err)
//                     res.status(503).send(err);
//                 });
//         } catch (e) {
//             res.send(415, e.message)
//         }
//     } else {
//         res.send(415, e.message)
//     }
// }


// let destroy = (req, res) => {
//     AppConfig.deleteOne({
//             _id: req.params.appId
//         })
//         .then(updatedArr => {
//             if (updatedArr.length === 0) {
//                 res.sendStatus(403);
//             } else {
//                 res.status(200).send(updatedArr)
//             }
//         }).catch(err => {
//             console.log('Error while deleting app: ' + err)
//             res.status(503).send(err);
//         })
// }


router.get("/get-list", getList)
router.get("/get-default-config", getDefaultConfig)
router.post("/create", createWithConfig)
router.put("/config/:appId", update)
// router.get("/export/:appId", exportApp)
// router.post("/import", importApp)
// router.get("/destroy/:appId", destroy)



// 'get /api/app/get-list': 'AppController.getList',
//   'get /api/app/get-default-config': 'AppController.getDefaultConfig',
//   'post /api/app/create/': 'AppController.createWithConfig',
//   'put /api/app/config/:appId': 'AppController.update',
//   'get /api/app/export/:appId': 'AppController.export',
//   'post /api/app/import': 'AppController.import',
//   'get /api/app/rename/:appId/:newAppName': 'AppController.rename',
//   'get /api/app/destroy/:appId': 'AppController.destroy',

module.exports = router;