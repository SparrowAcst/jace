export default {
    "Timeline":
    {
            type:"timeline-widget", 
            name:"noname",
            icon:"mdi-timeline-check-outline",
            
            options: { 

                widget:{
                  visible:true,
                  height:300
                },
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    reverse:false,
                    events:{
                        decoration:{
                            color:"secondary lighten-2",
                            small: true
                        },
                        events:[
                            {
                                opposite:"2020.03.20",
                                card:{
                                    title:{
                                        text:"Start observation"
                                    },
                                    note:{
                                        text:"First data fixed at Jhones Hopkins University Database"
                                    }
                                }
                            },
                            {
                                opposite:"2020.04.01",
                                card:{
                                    title:{
                                        text:"Start lockdown"
                                    }
                                }
                            }

                        ]
                    }
                }
            }
    }
}    
    