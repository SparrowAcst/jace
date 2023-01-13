export default {
    "Dialog":
    {
            type:"dialog-widget", 
            name:"noname",
            icon:"mdi-form-select",
            
            options: { 

                widget:{
                  visible:true,
                  height:300
                },
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    title:"Elasticsearh settings",
                    note:"Configure connection to elasticsearch service",
                    field:{
                         url: {
                             label:"Elasticserarch URI", 
                             type:"url", 
                             value: window.esUrl || "http://localhost:9200",
                             required:true
                             
                         },
                         user:{
                          type:"text"
                         },
                         password:{
                          type:"password"
                         }
                    }
                }
            }
    }
}    
    