const docdb = require("./utils/docdb")
const db = require("../.config").docdb

let getList = async (req, res) => {
    
    try {
        
        let result = await docdb.aggregate({
            db,
            collection: "dj-portal.user",
            pipeline:[{$project: {_id: 0}}]
        })

        res.send(result)
    
    } catch(e) {
            res.status(503).send(e.toString())
    }
}

let setAdminGrant = async (req, res) => {
    
    try {
        params = req.body;
        await docdb.updateOne({
            db,
            collection: "dj-portal.user",
            filter: { email: params.email },
            data: { isAdmin: params.value }
        })
        let result = await docdb.aggregate({
            db,
            collection: "dj-portal.user",
            pipeline:[{$match:{email: params.email}},{$project: {_id: 0}}]
        })
        result = result[0]
        res.send(result) 

    } catch(e) {

            res.status(503).send(e.toString())

    }  
          
}




const router = require('express').Router()

router.get("/users/list", getList)
router.post("/admin/set", setAdminGrant)

module.exports = router;