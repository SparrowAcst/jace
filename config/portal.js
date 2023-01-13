
require('dotenv').config()

module.exports = {
    portal: {
        
        port: process.env.PORT || 8080,
        
        auth: {
            clientId: process.env.GOOGLE_CLIENT_ID || "499881078147-5vbkg1if73m1uj3gl5sbjjl73uk6u326.apps.googleusercontent.com",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "jpzQ6bLngaz5mhvHfVf2Jcep",
            callback: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
        },
        
        db: {
            uri: process.env.MONGO_URI || "mongodb://localhost:27017/dj-portal" 
            //"mongodb+srv://jace:jace@ade-spa.3irxljv.mongodb.net/dj-portal?retryWrites=true&w=majority"
            // "mongodb+srv://jace:jace@cluster0.3hhdg.mongodb.net/dj-portal?retryWrites=true&w=majority"
        },

        indexPath: ".tmp/public/index.html",
        staticPath: ".tmp/public",
        uploadPath: ".tmp/uploads",
        appTemplate: require("./app-template"),
        
        administrators: [
            'boldak.andrey@gmail.com'
        ],
        
        applications:[
          "./apps/JACE.json",
          "./apps/JACE-Bootstrap.json"
        ]

    }

}