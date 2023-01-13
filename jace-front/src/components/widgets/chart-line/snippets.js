export default {
    "Line":
    {
            type:"line-chart-widget", 
            name:"noname",
            icon:"mdi-chart-line",
            
            options: { 

                widget:{
                  visible:true,
                  height:300
                },

                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },

                legend:{
                    data:["1","2"]
                },

                xAxis: {
                    type:"category",
                    data:["2015","2016", "2017", "2018"]
                    
                },
                
                yAxis: {
                    type:"value"
                },
                
                series: [
                        {   name: "1",
                            type:"line",
                            // areaStyle: {},
                            data:[43.3, 85.8, 93.7,79.4],
                            smooth: true
                        },    
                        {   name: "2",
                            type:"line",
                            // areaStyle: {},
                            data:[37.3, 28.8, 77.7, 100],
                            smooth: true
                        }  
                    ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    "legend": [
                        "embedded1",
                        "embedded2"
                    ],
                    "xAxis": [
                        "2015",
                        "2016",
                        "2017",
                        "2018"
                    ],
                    "series": [
                        {
                            "name": "embedded1",
                            "type": "line",
                            "data": [
                                43.3,
                                85.8,
                                93.7,
                                79.4
                            ],
                            "smooth": true
                        },
                        {
                            "name": "embedded2",
                            "type": "line",
                            "data": [
                                37.3,
                                28.8,
                                77.7,
                                100
                            ],
                            "smooth": true
                        }
                    ]
                }
            }
    },

    "Area":
    {
            type:"line-chart-widget", 
            name:"noname",
            icon:"mdi-chart-line",
            
            options: { 

                widget:{
                  visible:true,
                  height:300
                },

                legend:{
                    data:["1","2"]
                },
                xAxis: {
                    type:"category",
                    data:["2015","2016", "2017", "2018"]
                    
                },
                yAxis: {
                    type:"value"
                },
                series: [
                        {   name: "1",
                            type:"line",
                            // areaStyle: {},
                            data:[43.3, 85.8, 93.7,79.4],
                            smooth: true,
                            areaStyle:{
                                opacity:0.2
                            }
                        },    
                        {   name: "2",
                            type:"line",
                            // areaStyle: {},
                            data:[37.3, 28.8, 77.7, 100],
                            smooth: true,
                            areaStyle:{
                                opacity:0.2
                            }
                        }  
                    ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    "legend": [
                        "embedded1",
                        "embedded2"
                    ],
                    "xAxis": [
                        "2015",
                        "2016",
                        "2017",
                        "2018"
                    ],
                    "series": [
                        {
                            "name": "embedded1",
                            "type": "line",
                            "data": [
                                43.3,
                                85.8,
                                93.7,
                                79.4
                            ],
                            "smooth": true,
                            areaStyle:{
                                opacity:0.2
                            }
                        },
                        {
                            "name": "embedded2",
                            "type": "line",
                            "data": [
                                37.3,
                                28.8,
                                77.7,
                                100
                            ],
                            "smooth": true,
                            areaStyle:{
                                opacity:0.2
                            }
                        }
                    ]
                }
            }
    },
    "Stacked Line":
    {
            type:"line-chart-widget", 
            name:"noname",
            icon:"mdi-chart-line",
            
            options: { 

                widget:{
                  visible:true,
                  height:300
                },

                legend:{
                    data:["1","2"]
                },
                xAxis: {
                    type:"category",
                    data:["2015","2016", "2017", "2018"]
                    
                },
                yAxis: {
                    type:"value"
                },
                series: [
                        {   name: "1",
                            type:"line",
                            // areaStyle: {},
                            data:[43.3, 85.8, 93.7,79.4],
                            smooth: true,
                            stack:"a"
                        },    
                        {   name: "2",
                            type:"line",
                            // areaStyle: {},
                            data:[37.3, 28.8, 77.7, 100],
                            smooth: true,
                            stack:"a"
                        }  
                    ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    "legend": [
                        "embedded1",
                        "embedded2"
                    ],
                    "xAxis": [
                        "2015",
                        "2016",
                        "2017",
                        "2018"
                    ],
                    "series": [
                        {
                            "name": "embedded1",
                            "type": "line",
                            "data": [
                                43.3,
                                85.8,
                                93.7,
                                79.4
                            ],
                            "smooth": true,
                            "stack": "a"

                        },
                        {
                            "name": "embedded2",
                            "type": "line",
                            "data": [
                                37.3,
                                28.8,
                                77.7,
                                100
                            ],
                            "smooth": true,
                            "stack": "a"
                        }
                    ]
                }
            }
    },

    "Stacked Area":
    {
            type:"line-chart-widget", 
            name:"noname",
            icon:"mdi-chart-line",
            
            options: { 

                widget:{
                  visible:true,
                  height:300
                },

                legend:{
                    data:["1","2"]
                },
                xAxis: {
                    type:"category",
                    data:["2015","2016", "2017", "2018"]
                    
                },
                yAxis: {
                    type:"value"
                },
                series: [
                        {   name: "1",
                            type:"line",
                            // areaStyle: {},
                            data:[43.3, 85.8, 93.7,79.4],
                            smooth: true,
                            "stack": "a",
                            "areaStyle" :{
                                opacity:0.2
                            }
                        },    
                        {   name: "2",
                            type:"line",
                            // areaStyle: {},
                            data:[37.3, 28.8, 77.7, 100],
                            smooth: true,
                            "stack": "a",
                            "areaStyle": {
                                opacity:0.2
                            }
                        }  
                    ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    "legend": [
                        "embedded1",
                        "embedded2"
                    ],
                    "xAxis": [
                        "2015",
                        "2016",
                        "2017",
                        "2018"
                    ],
                    "series": [
                        {
                            "name": "embedded1",
                            "type": "line",
                            "data": [
                                43.3,
                                85.8,
                                93.7,
                                79.4
                            ],
                            "smooth": true,
                            "stack": "a",
                            "areaStyle": {
                                opacity:0.2
                            }
                        },
                        {
                            "name": "embedded2",
                            "type": "line",
                            "data": [
                                37.3,
                                28.8,
                                77.7,
                                100
                            ],
                            "smooth": true,
                            "stack": "a",
                            areaStyle:{
                                opacity:0.2
                            }
                        }
                    ]
                }
            }
    }
}    
    