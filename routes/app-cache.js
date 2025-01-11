const fs = require("fs")
const path = require("path")

const docdb = require("./utils/docdb")
const db = require("../.config").docdb

const config = require("../config")
const Cachable = require("./utils/cachable")


const destringify = app => {
    if (!app) return
    if (app.appWidgets) {
        for (var i = 0; i < app.appWidgets.length; ++i) {
            app.appWidgets[i] = JSON.parse(app.appWidgets[i]);
        }
    }

    if (app.pages) {
        for (var i = 0; i < app.pages.length; ++i) {
            app.pages[i] = JSON.parse(app.pages[i]);
        }
    }

    return app
}

let loadApp = async key => {

    let app = await docdb.aggregate({
        db,
        collection: "dj-portal.appconfig",
        pipeline: [{
                $match: {
                    name: key
                }
            },
            {
                $lookup: {
                    from: "user",
                    localField: "owner",
                    foreignField: "email",
                    as: "owner",
                },
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]
    })
    app = app[0]

    if (!app) return

    app = destringify(app)

    return app
}

const saveApp = async (key, value) => {

    await docdb.replaceOne({
        db,
        collection: "dj-portal.appconfig",
        filter: {
            name: key
        },
        data: value
    })

    APP_CACHE.del(key)

}


const APP_CACHE = new Cachable({
    beforeRead: loadApp,
    beforeWrite: saveApp
})


module.exports = APP_CACHE