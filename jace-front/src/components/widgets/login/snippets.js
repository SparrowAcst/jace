export default {
	
	"default":{
      
        type:"login-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-language-html5",
        options: { widget:{
            visible: true
          }
        },
        data:{
            source:"embedded",
            embedded:{
                decoration:{
                    loggedIn:{
                        title:"You logged in as ",
                        photo:true,
                        name:true,
                        classes:""
                    },
                    loggedOf:{
                        title:"login with google"
                    }    
                }
            }
        }
    }
}           