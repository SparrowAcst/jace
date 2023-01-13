export default {
	"Wordcloud":
	{
            type:"wordcloud-chart-widget", 
            name:"noname",
            icon:"mdi-format-letter-case",
            
            options: { 

                widget:{
                  visible:true
                },

                
                tooltip: {
                    show:true
                },
                
                "series": [
        {
            "name": "Google Trends",
            "type": "wordCloud",
            "left": "center",
            "top": "center",
            "width": "100%",
            "height": "100%",
            "right": null,
            "bottom": null,
            "rotationRange": [
                0,
                0
            ],
            "rotationStep": 0,
            drawOutOfBound: true,
            "textPadding": 10,
            "data": [
                {
                    "name": "ECHARTS WORDCLOUD",
                    "value": 10000,
                    "itemStyle": {
                        "normal": {
                            "color": "black"
                        }
                    }
                },
                {
                    "name": "Macys",
                    "value": 6181
                },
                {
                    "name": "Amy Schumer",
                    "value": 4386
                },
                {
                    "name": "Jurassic World",
                    "value": 4055
                },
                {
                    "name": "Charter Communications",
                    "value": 2467
                },
                {
                    "name": "Chick Fil A",
                    "value": 2244
                },
                {
                    "name": "Planet Fitness",
                    "value": 1898
                },
                {
                    "name": "Pitch Perfect",
                    "value": 1484
                },
                {
                    "name": "Express",
                    "value": 1112
                },
                {
                    "name": "Home",
                    "value": 965
                },
                {
                    "name": "Johnny Depp",
                    "value": 847
                },
                {
                    "name": "Lena Dunham",
                    "value": 582
                },
                {
                    "name": "Lewis Hamilton",
                    "value": 555
                },
                {
                    "name": "KXAN",
                    "value": 550
                },
                {
                    "name": "Mary Ellen Mark",
                    "value": 462
                },
                {
                    "name": "Farrah Abraham",
                    "value": 366
                },
                {
                    "name": "Rita Ora",
                    "value": 360
                },
                {
                    "name": "Serena Williams",
                    "value": 282
                },
                {
                    "name": "NCAA baseball tournament",
                    "value": 273
                },
                {
                    "name": "Point Break",
                    "value": 265
                }
            ]
        }
    ]
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    // legend: ['Serie1', 'Serie2'],

                    // yAxis: ['o1','o2','o3','o4','o5','o6'],
                    
                    // series: [
                    //     {
                    //         name: 'Serie1',
                    //         type: 'bar',
                    //         data: [18203, 23489, 29034, 104970, 131744, 630230]
                    //     },
                    //     {
                    //         name: 'Serie2',
                    //         type: 'bar',
                    //         data: [19325, 23438, 31000, 121594, 134141, 681807]
                    //     }
                    // ]

                    "series": [
        {
            "name": "Google Trends",
            "type": "wordCloud",
            
            "left": "center",
            "top": "center",
            "width": "100%",
            "height": "100%",
            "right": null,
            "bottom": null,

            sizeRange: [10, 48],
            
            gridSize: 10,

            "rotationRange": [
                0,
                0
            ],
            
            "rotationStep": 0,
            
            "textPadding": 10,
            
            "drawOutOfBound": true,
            
            "data": [
                {
                    "name": "ECHARTS WORDCLOUD",
                    "value": 10000,
                    "itemStyle": {
                        "normal": {
                            "color": "black"
                        }
                    }
                },
                {
                    "name": "Macys",
                    "value": 6181
                },
                {
                    "name": "Amy Schumer",
                    "value": 4386
                },
                {
                    "name": "Jurassic World",
                    "value": 4055
                },
                {
                    "name": "Charter Communications",
                    "value": 2467
                },
                {
                    "name": "Chick Fil A",
                    "value": 2244
                },
                {
                    "name": "Planet Fitness",
                    "value": 1898
                },
                {
                    "name": "Pitch Perfect",
                    "value": 1484
                },
                {
                    "name": "Express",
                    "value": 1112
                },
                {
                    "name": "Home",
                    "value": 965
                },
                {
                    "name": "Johnny Depp",
                    "value": 847
                },
                {
                    "name": "Lena Dunham",
                    "value": 582
                },
                {
                    "name": "Lewis Hamilton",
                    "value": 555
                },
                {
                    "name": "KXAN",
                    "value": 550
                },
                {
                    "name": "Mary Ellen Mark",
                    "value": 462
                },
                {
                    "name": "Farrah Abraham",
                    "value": 366
                },
                {
                    "name": "Rita Ora",
                    "value": 360
                },
                {
                    "name": "Serena Williams",
                    "value": 282
                },
                {
                    "name": "NCAA baseball tournament",
                    "value": 273
                },
                {
                    "name": "Point Break",
                    "value": 265
                }
            ]
        }
    ]

                }
            }
    }

}



// function createRandomItemStyle() {
//     return {
//         normal: {
//             color: 'rgb(' + [
//                 Math.round(Math.random() * 160),
//                 Math.round(Math.random() * 160),
//                 Math.round(Math.random() * 160)
//             ].join(',') + ')'
//         }
//     };
// }

// option = {
//     title: {
//         text: 'Google Trends',
//         link: 'http://www.google.com/trends/hottrends'
//     },
//     tooltip: {
//         show: true
//     },
//     series: [{
//         name: 'Google Trends',
//         type: 'wordCloud',
//         size: ['80%', '80%'],
//         textRotation : [0, 45, 90, -45],
//         textPadding: 0,
//         autoSize: {
//             enable: true,
//             minSize: 14
//         },
//         data: [
//             {
//                 name: "Sam S Club",
//                 value: 10000,
//                 itemStyle: {
//                     normal: {
//                         color: 'black'
//                     }
//                 }
//             },
//             {
//                 name: "Macys",
//                 value: 6181,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Amy Schumer",
//                 value: 4386,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Jurassic World",
//                 value: 4055,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Charter Communications",
//                 value: 2467,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Chick Fil A",
//                 value: 2244,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Planet Fitness",
//                 value: 1898,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Pitch Perfect",
//                 value: 1484,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Express",
//                 value: 1112,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Home",
//                 value: 965,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Johnny Depp",
//                 value: 847,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Lena Dunham",
//                 value: 582,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Lewis Hamilton",
//                 value: 555,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "KXAN",
//                 value: 550,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Mary Ellen Mark",
//                 value: 462,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Farrah Abraham",
//                 value: 366,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Rita Ora",
//                 value: 360,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Serena Williams",
//                 value: 282,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "NCAA baseball tournament",
//                 value: 273,
//                 itemStyle: createRandomItemStyle()
//             },
//             {
//                 name: "Point Break",
//                 value: 265,
//                 itemStyle: createRandomItemStyle()
//             }
//         ]
//     }]
// };
//                     