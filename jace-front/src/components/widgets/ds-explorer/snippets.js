export default {
	
	"Dataset Explorer":{
      
        type:"ds-explorer-widget", 
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