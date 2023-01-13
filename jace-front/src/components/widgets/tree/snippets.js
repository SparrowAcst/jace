export default {
	
	"default":{
      
        type:"tree-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-database",
        options: { widget:{
            visible: true
          }
        },
        
        metadata:{
           concepts:null,
           collections:null 
        },

        data:{
          source:"embedded",
          embedded:[{name:"tree",children:[]}]
        }
       
    }
}