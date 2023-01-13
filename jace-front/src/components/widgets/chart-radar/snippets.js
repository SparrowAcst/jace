export default {
    "Radar":
    {
            type:"radar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-line",
            
            options: { 

                widget:{
                  visible:true
                },

                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    data:['Entity 1','Entity 2','Entity 3'],
                    padding: [5, 30]
                },
                radar: [
                    
                    {
                        indicator: [
                            {text: 'C1', max: 100},
                            {text: 'C2', max: 100},
                            {text: 'C3', max: 100},
                            {text: 'C4', max: 100},
                            {text: 'C5', max: 100}
                        ],
                        radius: "80%",
                        center: ['50%','50%'],
                        name: {
                            nameGap:5
                        },
                        shape:"circle"
                    }
                ],

                series: [
                    {
                        type: 'radar',
                         tooltip: {
                            trigger: 'item'
                        },
                        itemStyle: {
                            
                        },
                        
                        data: [
                            {
                                value: [85, 90, 90, 95, 95],
                                areaStyle:{
                                    normal: {
                                        opacity:0.1
                                    }
                                },
                                name: 'Entity 1'
                            },
                            {
                                value: [95, 80, 95, 90, 93],
                                areaStyle:{
                                    normal: {
                                        opacity:0.2
                                    }
                                },
                                name: 'Entity 2'
                            },
                            {
                                value: [25, 30, 45, 50, 22],
                                areaStyle:{
                                    normal: {
                                        opacity:0.1
                                    }
                                },
                                name: 'Entity 3'
                            }
                        ]
                    }
                ]
            },
            
            
            data:{
                source:"embedded",
                embedded: {

                    legend: ['Entity 1','Entity 2','Entity 3'],
                    
                    indicator: [
                        {text: 'C1', max: 100},
                        {text: 'C2', max: 100},
                        {text: 'C3', max: 100},
                        {text: 'C4', max: 100},
                        {text: 'C5', max: 100}
                    ],

                    series: [
                        {
                            type: 'radar',
                             tooltip: {
                                trigger: 'item'
                            },
                            itemStyle: {
                                
                            },
                            
                            data: [
                                {
                                    value: [85, 90, 90, 95, 95],
                                    areaStyle:{
                                        normal: {
                                            opacity:0.1
                                        }
                                    },
                                    name: 'Entity 1'
                                },
                                {
                                    value: [95, 80, 95, 90, 93],
                                    areaStyle:{
                                        normal: {
                                            opacity:0.2
                                        }
                                    },
                                    name: 'Entity 2'
                                },
                                {
                                    value: [25, 30, 45, 50, 22],
                                    areaStyle:{
                                        normal: {
                                            opacity:0.1
                                        }
                                    },
                                    name: 'Entity 3'
                                }
                            ]
                        }
                    ]

                }
            }
    }
}    
    