export default {
  
    type:"file-viewer-widget", 
    name:"noname",
    icon:"mdi-card-bulleted-outline",
    
    options: { 
        widget:{
          visible:true,
          height:300
        },
    },
    
    
    data:{
        source:"embedded",
        embedded:{
            data:"data"
        }
    }

} 