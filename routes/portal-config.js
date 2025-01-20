const config = require("../config")

const docdb = require("./utils/docdb")
const db = require("../.config").docdb



let getConfig = async (req, res) => {
    
    try {
        
        let result = await docdb.aggregate({
            db,
            collection: "dj-portal.portalconfig",
            pipeline:[{$project:{_id: 0}}]
        })
        result = result[0]
        res.send(result.value)
    
    } catch(e) {
        
        res.status(503).send(e.toString())
    
    }    
 
}

let setConfig = async (req, res) => {
    
    try {
    
        await docdb.updateOne({
            db,
            collection: "dj-portal.portalconfig",
            filter:{},
            data: { value: config } 
        })    
        
        res.send()
    
    } catch(e){
 
        res.status(503).send(e.toString())
 
    }

}


const router = require('express').Router()

router.get("/get", getConfig)
router.post("/get", getConfig)
router.post("/set", setConfig)


// 'get /api/app/config/get': 'PortalConfigController.getConfig',
//    'get /api/app/skins': 'PortalConfigController.getSkins',
//    'post /api/app/config/get': 'PortalConfigController.getConfig',
//    'post /api/app/config/set': 'PortalConfigController.setConfig',

module.exports = router;