export default {
            type:"mapbox-widget", 
            name:"noname",
            icon:"mdi-map",
            
            options: { 

                    widget:{
                      visible:true
                    }
            },
            

            
            data:{
                source:"embedded",
                embedded:{
                    
                    height: 300,
                    
                    mapStyle:{
                        "style": "mapbox://styles/mapbox/streets-v11",
                        "attributionControl": false,
                        "logoPosition": "bottom-right"
                    }
                }    
            }
    }
