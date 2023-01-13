export default {
    "Pie":
    {
            type:"pie-chart-widget", 
            name:"noname",
            icon:"mdi-chart-pie",
            
            options: { 

                widget:{
                  visible:true
                },

                legend:{},

                series : [
                    {
                       
                        type:'pie',
                        radius : ["0%", "75%"],
                        center : ['50%', '50%'],
                        
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                            {value:335, name:'v1'},
                            {value:310, name:'v2'},
                            {value:234, name:'v3'},
                            {value:135, name:'v4'},
                            {value:1548, name:'v5'}
                        ]
                    }
                ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                     series : [
                        {
                           
                            type:'pie',
                            radius : ["0%", "75%"],
                            center : ['50%', '50%'],
                            
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                {value:335, name:'v1'},
                                {value:310, name:'v2'},
                                {value:234, name:'v3'},
                                {value:135, name:'v4'},
                                {value:1548, name:'v5'}
                            ]
                        }
                    ]
                }
            }
    },

    "Doughnut":
    {
            type:"pie-chart-widget", 
            name:"noname",
            icon:"mdi-chart-donut",
            
            options: { 

                widget:{
                  visible:true
                },
                legend:{},
                series : [
                    {
                       
                        type:'pie',
                        radius : ["30%", "75%"],
                        center : ['50%', '50%'],
                        
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                            {value:335, name:'v1'},
                            {value:310, name:'v2'},
                            {value:234, name:'v3'},
                            {value:135, name:'v4'},
                            {value:1548, name:'v5'}
                        ]
                    }
                ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    series : [
                        {
                           
                            type:'pie',
                            radius : ["30%", "75%"],
                            center : ['50%', '50%'],
                            
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                {value:335, name:'v1'},
                                {value:310, name:'v2'},
                                {value:234, name:'v3'},
                                {value:135, name:'v4'},
                                {value:1548, name:'v5'}
                            ]
                        }
                    ]
                }
            }
    },

	"Doughnut Rose":
	{
            type:"pie-chart-widget", 
            name:"noname",
            icon:"mdi-chart-donut",
            
            options: { 

                widget:{
                  visible:true
                },
                legend:{},
                series : [
                    {
                       
                        type:'pie',
                        radius : ["30%", "75%"],
                        center : ['50%', '50%'],
                        roseType : 'radius',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                            {value:335, name:'v1'},
                            {value:310, name:'v2'},
                            {value:234, name:'v3'},
                            {value:135, name:'v4'},
                            {value:1548, name:'v5'}
                        ]
                    }
                ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    series : [
                        {
                           
                            type:'pie',
                            radius : ["30%", "75%"],
                            center : ['50%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                {value:335, name:'v1'},
                                {value:310, name:'v2'},
                                {value:234, name:'v3'},
                                {value:135, name:'v4'},
                                {value:1548, name:'v5'}
                            ]
                        }
                    ]
                }
            }
    }
}