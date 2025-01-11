const mime = require('mime');
const path = require('path');
const fs = require("fs");

const config = require("../config")

const docdb = require("./utils/docdb")
const db = require("../.config").docdb


const getList = async (req, res) => {
   res.send([]) 
  // try {
  
  //   let result = await docdb.aggregate({
  //     db,
  //     collection:"dj-portal.resource",
  //     pipeline:[]
  //   })  

  //   result = result.map( item => ({
  //           mime: mime.lookup(path.basename(item.path)),
  //           ext: path.parse(item.path).ext.substring(1),
  //           url: `./api/resource/${item.path}`,
  //           path: item.path,
  //           owner: item.owner
  //         }))
          
  //   res.send(result)
  
  // } catch(e) {
  //   res.status(503).send(e.toString())
  // }  

}


// let  getList = (req,res) => {
//     Resource.find({})
//     	.then( obj => {
//       // console.log("LIST", obj)
//       if(!obj || obj.length == 0){
//         return res.send([]);
//       } else {
//         let result = obj.map( item => ({
//           // size: (item.data) ? item.data.length() : "n/a",
//           mime: mime.lookup(path.basename(item.path)),
//           ext: path.parse(item.path).ext.substring(1),
//           url: "./api/resource/"+item.path,
//           path: item.path,
//           owner: item.owner
//         }))
        
//         return res.send(result)
//       }  
//     })
//   }

let get = (req, res)  => {
    res.send()
    // var resourcePath = req.params.path;
    // Resource.findOne({"path":resourcePath})
    // 	.then( obj => {
	   //    if(!obj){
	   //      return res.sendStatus(404);
	   //    }
    //   res.setHeader('Content-type', mime.lookup(path.basename(obj.path)));
    //   return res.send(obj.data);
    // })
  }

  
let deleteResource = (req, res) => {
    res.send()
    // resourcePath = req.params.path;
    // Resource.deleteOne({"path":resourcePath})
    // 	.then( obj => {
	   //    return res.send(obj);
	   //  })
  }

let rename = (req,res) => {
    res.send()
    // var params = req.body;
    // var oldPath = params.oldPath;
    // var newPath = params.newPath;
    // var app = params.app;

    // Resource.findOne({"path":oldPath})
    // 	.then( obj => {
	   //    if( !obj ){
	   //      return res.send();
	   //    } else {
	   //      Resource.update({_id:obj.id},{"path":newPath})
	   //       .then(() =>{
	   //        return res.send();
	   //      })
	   //    }
    // })
    
  }

let update = (req, res) => {
    res.send()
    // var app = req.body.app

    // let $file = null
    // if (req.files && req.files.file) {

    //     let fileContent = require("fs").readFileSync(req.files.file.tempFilePath)

    //     $file = {
    //         name: req.files.file.name,
    //         binary: fileContent,
    //         text: fileContent.toString()
    //     }

    //     filePath = app + "-" + $file.name

    //     Resource
    //           .findOne({"path":filePath})
    //           .then( obj => {
    //             if(obj){
    //               Resource
    //                 .update({_id:obj.id},{"path":filePath, "data":$file.binary, "owner":"dev"})
    //                 // .update({_id:obj.id},{"path":filePath, "data":$file.binary, "owner":req.user.name})
    //                 .then( result => {
    //                       return res.send(result)
    //                 })
    //             }else{
    //               Resource
    //                 .create({"path":filePath, "data":$file.binary,"owner":"dev"})
    //                 // .create({"path":filePath, "data":$file.binary,"owner":req.user.name})
                    
    //                 .then(obj => {
    //                       return res.send(obj)
    //               })
    //             }    
    //           })

    // }
}        





const router = require('express').Router()

router.get("/", getList)
router.post("/update", update)
router.post("/rename", rename)
router.get("/:path", get)
router.post("/:path", get)
router.get("/delete/:path", deleteResource)
router.post("/delete/:path", deleteResource)


  // 'get /api/resource' : 'ResourceController.getList',

  // 'post /api/resource/update' : 'ResourceController.update',
  // 'post /api/resource/rename' : 'ResourceController.rename',


  // 'get /api/resource/:path' : 'ResourceController.get',
  // 'post /api/resource/:path' : 'ResourceController.get',
  
  // 'get /api/resource/delete/:path' : 'ResourceController.delete',
  // 'post /api/resource/delete/:path' : 'ResourceController.delete',

module.exports = router;