// import all the things we need  
const GoogleStrategy = require('passport-google-oauth20').Strategy
// const mongoose = require('mongoose')
const config = require("./portal")
// const User = require('../models/User')
const { extend } = require("lodash")


const docdb = require("../routes/utils/docdb")
const db = require("../.config").docdb

const find = async email => {
    let result = await docdb.aggregate({
        db,
        collection: "dj-portal.user",
        pipeline:[{$match:{email}}, {$project: {_id: 0}}]
    })
    result = result[0]
    return result
}

const update = async data => {
    
    await docdb.updateOne({
        db,
        collection: "dj-portal.user",
        filter: {email: data.email},
        data
    })
    let result = await find(data.email)
    return  result   
}

const create = async data => {
    
    await docdb.replaceOne({
        db,
        collection: "dj-portal.user",
        filter: {email: data.email},
        data
    })

    let result = await find(data.email)
    return result   
}


module.exports = {
    passport: passport => {
        console.log(config.portal.auth)
        passport.use(
            new GoogleStrategy({
                    clientID: config.portal.auth.clientId,
                    clientSecret: config.portal.auth.clientSecret,
                    callbackURL: config.portal.auth.callback,
                },
                async (accessToken, refreshToken, profile, done) => {
                    //get the user data from google 
                    
                    const newUser = {
                        name: profile.displayName,
                        photo: profile.photos[0].value,
                        email: profile.emails[0].value
                    }

                    // console.log("!!!! newUser", newUser)

                    try {
                        //find the user in our database 
                        let user = await find(newUser.email)
                        if(!user){
                            user = await create(newUser)
                        }
                        
                        // console.log("!!!", user)
                        // if (user) {
                        //     user = await update(newUser)
                        //     console.log("!!!!!!!!!",user)
                            done(null, user)

                        // } else {
                        //     // if user is not preset in our database save user data to database.
                        //     newUser.isAdmin = config.portal.administrators.includes(newUser.email)
                        //     user = await create(newUser)
                        //     console.log("--------",user)

                        //     done(null, user)
                        // }
                    } catch (err) {
                        console.error(err)
                    }
                }
            )
        )

        // used to serialize the user for the session
        passport.serializeUser((user, done) => {
            // console.log("serializeUser", user)
            done(null, user.email)
        })

        // used to deserialize the user
        passport.deserializeUser( async (id, done) => {
            try {
                let user = await find(id)
                // console.log("deserializeUser", user)
                done(null, user)
            } catch(e){
                console.log(e.toString())
                done(e, null)
            }  
        })
    }
}