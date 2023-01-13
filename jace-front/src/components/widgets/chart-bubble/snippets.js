

export default {
    "Bubbles":
    {
            type:"bubble-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bubble",
            
            options: { 

                widget:{
                  visible:true
                },

                legend: {
                    right: 10
                },
                xAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    scale: true
                }
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    series: [{
                    
                        name: '1990',
                        
                        data: [
                            [28604,77,17096869,'Australia',1990],
                            [31163,77.4,27662440,'Canada',1990],
                            [1516,68,1154605773,'China',1990]
                        ],
                            
                        type: 'scatter',

                                               
                        itemStyle: {
                            normal: {
                                opacity:0.8
                            }
                        }
                        
                    }, {
                        name: '2015',
                        data: [
                            [44056,81.8,23968973,'Australia',2015],
                            [43294,81.7,35939927,'Canada',2015],
                            [13334,76.9,1376048943,'China',2015]
                        ],
                        type: 'scatter',
                        
                        
                        itemStyle: {
                            normal: {
                                opacity:0.8
                            }
                        }    
                        
                    }]
                }
            }
    }
}    
    