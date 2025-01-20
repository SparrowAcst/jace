const fs = require("fs")
const path = require("path")

const docdb = require("./utils/docdb")
const db = require("../.config").docdb

const config = require("../config")
const Cachable = require("./utils/cachable")


let loadUser = async key => {

    let res = await docdb.aggregate({
        db,
        collection: "dj-portal.user",
        pipeline: [{
                $match: {
                    email: key
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]
    })
    res = res[0]

    return res
}

const saveUser = async (key, value) => {

    await docdb.replaceOne({
        db,
        collection: "dj-portal.user",
        filter: {
            email: key
        },
        data: value
    })

    APP_CACHE.del(key)

}


const USER_CACHE = new Cachable({
    beforeRead: loadUser,
    beforeWrite: saveUser
})


module.exports = USER_CACHE