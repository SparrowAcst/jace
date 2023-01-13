export default {
	"Horizontal Bars":
	{
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bar",
            
            options: { 

                widget:{
                  visible:true
                },

                
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                
                legend: {
                    data: ['Serie1', 'Serie2']
                },
                
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },

                yAxis: {
                    type: 'category',
                    data: ['o1','o2','o3','o4','o5','o6']
                },
                
                series: [
                    {
                        name: 'Serie1',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: 'Serie2',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    legend: ['Serie1', 'Serie2'],

                    yAxis: ['o1','o2','o3','o4','o5','o6'],
                    
                    series: [
                        {
                            name: 'Serie1',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230]
                        },
                        {
                            name: 'Serie2',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807]
                        }
                    ]

                }
            }
    },

    "Vertical Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bar",
            
            options: { 

                widget:{
                  visible:true
                },

                
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                
                legend: {
                    data: ['Serie1', 'Serie2']
                },
                
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },

                xAxis: {
                    type: 'category',
                    data: ['o1','o2','o3','o4','o5','o6']
                },
                
                series: [
                    {
                        name: 'Serie1',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: 'Serie2',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    legend: ['Serie1', 'Serie2'],

                    xAxis: ['o1','o2','o3','o4','o5','o6'],
                    
                    series: [
                        {
                            name: 'Serie1',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230]
                        },
                        {
                            name: 'Serie2',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807]
                        }
                    ]

                }
            }
    },
    
    "Radial Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-arc",
            
            options: { 

                widget:{
                  visible:true
                },

                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow"
                    }
                },

                angleAxis: {
                    type: 'category',
                    data: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
                    z: 10
                },
                
                radiusAxis: {
                },

                polar: {
                },
                
                series: [{
                    type: 'bar',
                    data: [1, 2, 3, 4, 3, 5, 1],
                    coordinateSystem: 'polar',
                    name: 'A'
                }, {
                    type: 'bar',
                    data: [2, 4, 6, 1, 3, 2, 1],
                    coordinateSystem: 'polar',
                    name: 'B',
                }, {
                    type: 'bar',
                    data: [1, 2, 3, 4, 1, 2, 5],
                    coordinateSystem: 'polar',
                    name: 'C'
                }],
                legend: {
                    show: true,
                    data: ['A', 'B', 'C']
                }
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    legend: ['A', 'B', 'C'],

                    angleAxis: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
                    
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4, 3, 5, 1],
                        coordinateSystem: 'polar',
                        name: 'A'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 1, 3, 2, 1],
                        coordinateSystem: 'polar',
                        name: 'B',
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4, 1, 2, 5],
                        coordinateSystem: 'polar',
                        name: 'C'
                    }]  
                }
            }
    },
        "Polar Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-arc",
            
            options: { 

                widget:{
                  visible:true
                },

                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow"
                    }
                },

                angleAxis: {},
                radiusAxis: {
                    type: 'category',
                    data: ['a1', 'a2', 'a3', 'a4'],
                    z: 10
                },
                polar: {
                },
                series: [{
                    type: 'bar',
                    data: [1, 2, 3, 4],
                    coordinateSystem: 'polar',
                    name: 'A'
                }, {
                    type: 'bar',
                    data: [2, 4, 6, 8],
                    coordinateSystem: 'polar',
                    name: 'B'
                }, {
                    type: 'bar',
                    data: [1, 2, 3, 4],
                    coordinateSystem: 'polar',
                    name: 'C'
                }],
                legend: {
                    show: true,
                    data: ['A', 'B', 'C']
                }
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    legend: ['A', 'B', 'C'],
                    radiusAxis: ['a1', 'a2', 'a3', 'a4'],
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'A'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 8],
                        coordinateSystem: 'polar',
                        name: 'B'
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'C'
                    }]
                }
            }
    },

    "Stacked Horizontal Bars":
{
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bar",
            
            options: { 

                widget:{
                  visible:true
                },

                
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                
                legend: {
                    data: ['Serie1', 'Serie2']
                },
                
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },

                yAxis: {
                    type: 'category',
                    data: ['o1','o2','o3','o4','o5','o6']
                },
                
                series: [
                    {
                        name: 'Serie1',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: 'Serie2',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    legend: ['Serie1', 'Serie2'],

                    yAxis: ['o1','o2','o3','o4','o5','o6'],
                    
                    series: [
                        {
                            name: 'Serie1',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230],
                            stack:"a"
                        },
                        {
                            name: 'Serie2',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807],
                            stack:"a"  
                        }
                    ]

                }
            }
    },

    "Stacked Vertical Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bar",
            
            options: { 

                widget:{
                  visible:true
                },

                
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                
                legend: {
                    data: ['Serie1', 'Serie2']
                },
                
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },

                xAxis: {
                    type: 'category',
                    data: ['o1','o2','o3','o4','o5','o6']
                },
                
                series: [
                    {
                        name: 'Serie1',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: 'Serie2',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    legend: ['Serie1', 'Serie2'],

                    xAxis: ['o1','o2','o3','o4','o5','o6'],
                    
                    series: [
                        {
                            name: 'Serie1',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230],
                            stack:"a"
                        },
                        {
                            name: 'Serie2',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807],
                            stack:"a"
                        }
                    ]

                }
            }
    },
    "Stacked Radial Bars":
{
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-arc",
            
            options: { 

                widget:{
                  visible:true
                },

                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow"
                    }
                },

                angleAxis: {
                    type: 'category',
                    data: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
                    z: 10
                },
                
                radiusAxis: {
                },

                polar: {
                },
                
                series: [{
                    type: 'bar',
                    data: [1, 2, 3, 4, 3, 5, 1],
                    coordinateSystem: 'polar',
                    name: 'A'
                }, {
                    type: 'bar',
                    data: [2, 4, 6, 1, 3, 2, 1],
                    coordinateSystem: 'polar',
                    name: 'B',
                }, {
                    type: 'bar',
                    data: [1, 2, 3, 4, 1, 2, 5],
                    coordinateSystem: 'polar',
                    name: 'C'
                }],
                legend: {
                    show: true,
                    data: ['A', 'B', 'C']
                }
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    legend: ['A', 'B', 'C'],

                    angleAxis: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
                    
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4, 3, 5, 1],
                        coordinateSystem: 'polar',
                        name: 'A',
                        stack:"a"
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 1, 3, 2, 1],
                        coordinateSystem: 'polar',
                        name: 'B',
                        stack:"a"
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4, 1, 2, 5],
                        coordinateSystem: 'polar',
                        name: 'C',
                        stack:"a"
                    }]  
                }
            }
    },
        "Stacked Polar Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-arc",
            
            options: { 

                widget:{
                  visible:true
                },

                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow"
                    }
                },

                angleAxis: {},
                radiusAxis: {
                    type: 'category',
                    data: ['a1', 'a2', 'a3', 'a4'],
                    z: 10
                },
                polar: {
                },
                series: [{
                    type: 'bar',
                    data: [1, 2, 3, 4],
                    coordinateSystem: 'polar',
                    name: 'A'
                }, {
                    type: 'bar',
                    data: [2, 4, 6, 8],
                    coordinateSystem: 'polar',
                    name: 'B'
                }, {
                    type: 'bar',
                    data: [1, 2, 3, 4],
                    coordinateSystem: 'polar',
                    name: 'C'
                }],
                legend: {
                    show: true,
                    data: ['A', 'B', 'C']
                }
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    legend: ['A', 'B', 'C'],
                    radiusAxis: ['a1', 'a2', 'a3', 'a4'],
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'A',
                        stack:"a"
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 8],
                        coordinateSystem: 'polar',
                        name: 'B',
                        stack:"a"
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'C',
                        stack:"a"
                    }]
                }
            }
    }

}