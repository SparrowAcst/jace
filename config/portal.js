
require('dotenv').config()

module.exports = {
    portal: {
        
        version: "1.0.1",

        port: process.env.PORT || 8080,
        
        auth: {
            clientId: process.env.GOOGLE_CLIENT_ID || "499881078147-5vbkg1if73m1uj3gl5sbjjl73uk6u326.apps.googleusercontent.com",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "jpzQ6bLngaz5mhvHfVf2Jcep",
            callback: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
        },

        useLog: true,
        
        db: {
            uri: process.env.MONGO_URI || "mongodb://localhost:27017/dj-portal" 
        },

        plugins: {
            
            "/api/md": require("../routes/api-md"),
            // "/api/controller": require("../harvest-controller"),
            // "/api/ade-report": require("../report-builder"),
            // "/api/ade-lms": require("../ade-lms"),
            // "/api/patient-story": require("../ade-patient-story"),
            "/api/clinic": require("../ade-clinic"),
        },


        indexPath: "./.tmp/public/index.html",
        staticPath: "./.tmp/public",
        uploadPath: "./.tmp/uploads",
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