export default {
	"Gauge":
	{
            type:"gauge-chart-widget", 
            name:"noname",
            icon:"mdi-gauge",
            
            options: { 

                widget:{
                  visible:true
                },

                
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },

                splitNumber:10,
                axisLine: {            
                    lineStyle: {       
                        width: 8
                    }
                },
                axisTick: {            
                    length:12,        
                    lineStyle: {       
                        color: 'auto'
                    }
                },
                splitLine: {           
                    length:20,         
                    lineStyle: {       
                        color: 'auto'
                    }
                },
                pointer: {
                    width:2
                },
               
                series: [
                    {
                        name: 'Fuel',
                        type: 'gauge',
                        detail: {formatter:'{value}%'},
                        data: [{value: 50, name: 'Now'}]
                    }
                ]
            },    
            
            
            data:{
                source:"embedded",
                embedded:{

                    
                    series: [
                        {
                            name: 'Fuel',
                            type: 'gauge',
                            tooltip : {
                                formatter: "{a} <br/>{b} : {c}%"
                            },

                            splitNumber:10,
                            axisLine: {            
                                lineStyle: {       
                                    width: 8
                                }
                            },
                            axisTick: {            
                                length:12,        
                                lineStyle: {       
                                    color: 'auto'
                                }
                            },
                            splitLine: {           
                                length:20,         
                                lineStyle: {       
                                    color: 'auto'
                                }
                            },
                            pointer: {
                                width:2
                            },
                            detail: {formatter:'{value}%'},
                            data: [{value: 50}]
                        }
                    ]

                }
            }
    }

}