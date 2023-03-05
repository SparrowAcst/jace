// import all the things we need  
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const config = require("./portal")
const User = require('../models/User')
const { extend } = require("lodash")

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

                    // console.log("newUser", newUser)

                    try {
                        //find the user in our database 
                        let user = await User.findOne({ email: newUser.email })

                        if (user) {
                            
                            //If user present in our database.
                            
                            await User.updateOne (
                                { email: newUser.email }, 
                                {
                                    $set: {
                                        name: newUser.name || user.name,
                                        photo: newUser.photo || user.photo
                                    }
                                }
                            )

                            user = await User.findOne({ email: newUser.email })
                            // console.log("user",user)
                            
                            done(null, user)

                        } else {
                            // if user is not preset in our database save user data to database.
                            newUser.isAdmin = config.portal.administrators.includes(newUser.email)
                            user = await User.create(newUser)
                            done(null, user)
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }
            )
        )

        // used to serialize the user for the session
        passport.serializeUser((user, done) => {
            done(null, user.id)
        })

        // used to deserialize the user
        passport.deserializeUser((id, done) => {
            try {
                User.findById(id, (err, user) => done(err, user))
            } catch(e){
                console.log(e.toString())
                done(e, null)
            }  
        })
    }
}