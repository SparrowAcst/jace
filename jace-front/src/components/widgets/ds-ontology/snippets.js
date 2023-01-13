export default {


        "Dataset Ontology":{
      
        type:"ds-ontology-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-triforce",
        
        metadata:{
          concepts:null
        },

        options: { 
          
          widget:{
            visible: true,
            height: 450
          },

          tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
          },
          // legend: {
          //     top: '2%',
          //     left: '3%',
          //     orient: 'vertical',
          //     data: [{
          //         name: 'tree1',
          //         icon: 'rectangle'
          //     } ,
          //     {
          //         name: 'tree2',
          //         icon: 'rectangle'
          //     }],
          //     borderColor: '#c23531'
          // },
          series:[

              {
                  type: 'tree',
                  orient: 'horizontal',
                  
                  data: 
                  [
{
    "concept": "isd",
    "name": "Index of sustainable development",
    "datapoint": {
        "collection": "sdi-sdi",
        "field": "isd"
    },
    "children": [
        {
            "concept": "cql",
            "name": "Quality of Life Component",
            "datapoint": {
                "collection": "sdi-sdi",
                "field": "cql"
            },
            "children": [
                {
                    "concept": "ie",
                    "name": "Index of environmental dimension",
                    "datapoint": {
                        "collection": "sdi-sdi",
                        "field": "ie"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.443382183"
                        }
                    ]
                },
                {
                    "concept": "iec",
                    "name": "Index of economic dimension",
                    "datapoint": {
                        "collection": "sdi-sdi",
                        "field": "iec"
                    },
                    "label": {
                        "color": "#900"
                    },
                    "itemStyle": {
                        "color": "#900"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.171557662"
                        }
                    ]
                },
                {
                    "concept": "is",
                    "name": "Index of social and institutional dimension",
                    "datapoint": {
                        "collection": "sdi-sdi",
                        "field": "is"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.48505549"
                        }
                    ]
                }
            ],
            "label": {
                "color": "#e90"
            },
            "itemStyle": {
                "color": "#e90"
            },
            "values": [
                {
                    "3_alpha_code": "UKR",
                    "year": "2015",
                    "value": "0.679189679"
                }
            ]
        },
        {
            "concept": "csl",
            "name": "Security of Life Component",
            "datapoint": {
                "collection": "sdi-sdi",
                "field": "csl"
            },
            "children": [
                {
                    "concept": "ni",
                    "name": "Prolifiration Index",
                    "datapoint": {
                        "collection": "sdi-ni",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.448900102"
                        }
                    ]
                },
                {
                    "concept": "cp",
                    "name": "Corruption Perception",
                    "datapoint": {
                        "collection": "sdi-cp",
                        "field": "value"
                    },
                    "label": {
                        "color": "#900"
                    },
                    "itemStyle": {
                        "color": "#900"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.210206882"
                        }
                    ]
                },
                {
                    "concept": "pwa",
                    "name": "Water Access",
                    "datapoint": {
                        "collection": "sdi-pwa",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.369253981"
                        }
                    ]
                },
                {
                    "concept": "esb",
                    "name": "Energy Security",
                    "datapoint": {
                        "collection": "sdi-esb",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.430843907"
                        }
                    ]
                },
                {
                    "concept": "wbgini",
                    "name": "Inequality of Population Income (Gini coefficient)",
                    "datapoint": {
                        "collection": "sdi-wbgini",
                        "field": "value"
                    },
                    "children": [
                        {
                            "concept": "WBG",
                            "name": "GDP per capita"
                        }
                    ],
                    "label": {
                        "color": "#900"
                    },
                    "itemStyle": {
                        "color": "#900"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.19229037"
                        }
                    ]
                },
                {
                    "concept": "gdi",
                    "name": "Global  Diseases",
                    "datapoint": {
                        "collection": "sdi-gdi",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.341568477"
                        }
                    ]
                },
                {
                    "concept": "bbp",
                    "name": "Biological Balance",
                    "datapoint": {
                        "collection": "sdi-bbp",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.563840637"
                        }
                    ]
                },
                {
                    "concept": "ndi",
                    "name": "Natural Disasters",
                    "datapoint": {
                        "collection": "sdi-ndi",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.348204828"
                        }
                    ]
                },
                {
                    "concept": "cm5",
                    "name": "Child Mortality",
                    "datapoint": {
                        "collection": "sdi-cm5",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.340457349"
                        }
                    ]
                },
                {
                    "concept": "wbsf",
                    "name": "State Fragility",
                    "datapoint": {
                        "collection": "sdi-wbsf",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.59051454"
                        }
                    ]
                },
                {
                    "concept": "gwk",
                    "name": "Global Warming",
                    "datapoint": {
                        "collection": "sdi-gwk",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.522828224"
                        }
                    ]
                },
                {
                    "concept": "ci",
                    "name": "Conflict Intensity",
                    "datapoint": {
                        "collection": "sdi-ci",
                        "field": "value"
                    },
                    "label": {
                        "color": "#090"
                    },
                    "itemStyle": {
                        "color": "#090"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.894300567"
                        }
                    ]
                }
            ],
            "label": {
                "color": "#900"
            },
            "itemStyle": {
                "color": "#900"
            },
            "values": [
                {
                    "3_alpha_code": "UKR",
                    "year": "2015",
                    "value": "0"
                }
            ]
        }
    ],
    "label": {
        "color": "#e90"
    },
    "itemStyle": {
        "color": "#e90"
    },
    "values": [
        {
            "3_alpha_code": "UKR",
            "year": "2015",
            "value": "0.392130344"
        }
    ]
}

                  ],

                top: '1%',
                left: '40%',
                bottom: '1%',
                right: '40%',

                symbolSize: 8,
                symbol:"roundRect",
                roam: true,
            

                label: {
                    normal: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        rich:{
                            title:{
                                fontWeight:"bold",
                                color:"#777",
                                align:"right"
                            },
                            low:{
                              fontWeight:"bold",
                              color:"#bb3000",
                              align:"right"
                            },
                            middle:{
                              fontWeight:"normal",
                              color:"#ee9900",
                              align:"right"
                            },
                            high:{
                              fontWeight:"normal",
                              color:"#090",
                              align:"right"
                            },
                            norange:{
                              fontWeight:"normal",
                              color:"#777",
                              align:"right"
                            }
                        }
                    }
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
              }
          ],

           "color": [
                    "#e41a1c",
                    "#377eb8",
                    "#4daf4a",
                    "#984ea3",
                    "#ff7f00",
                    "#ffff33",
                    "#a65628",
                    "#f781bf",
                    "#999999"
                ]


        },


        data:{
          source:"embedded",
          embedded:{
            serie: [
              {
    "concept": "isd",
    "name": "Index of sustainable development",
    "datapoint": {
        "collection": "sdi-sdi",
        "field": "isd"
    },
    "children": [
        {
            "concept": "cql",
            "name": "Quality of Life Component",
            "datapoint": {
                "collection": "sdi-sdi",
                "field": "cql"
            },
            "children": [
                {
                    "concept": "ie",
                    "name": "Index of environmental dimension",
                    "datapoint": {
                        "collection": "sdi-sdi",
                        "field": "ie"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.443382183"
                        }
                    ]
                },
                {
                    "concept": "iec",
                    "name": "Index of economic dimension",
                    "datapoint": {
                        "collection": "sdi-sdi",
                        "field": "iec"
                    },
                    "label": {
                        "color": "#900"
                    },
                    "itemStyle": {
                        "color": "#900"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.171557662"
                        }
                    ]
                },
                {
                    "concept": "is",
                    "name": "Index of social and institutional dimension",
                    "datapoint": {
                        "collection": "sdi-sdi",
                        "field": "is"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.48505549"
                        }
                    ]
                }
            ],
            "label": {
                "color": "#e90"
            },
            "itemStyle": {
                "color": "#e90"
            },
            "values": [
                {
                    "3_alpha_code": "UKR",
                    "year": "2015",
                    "value": "0.679189679"
                }
            ]
        },
        {
            "concept": "csl",
            "name": "Security of Life Component",
            "datapoint": {
                "collection": "sdi-sdi",
                "field": "csl"
            },
            "children": [
                {
                    "concept": "ni",
                    "name": "Prolifiration Index",
                    "datapoint": {
                        "collection": "sdi-ni",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.448900102"
                        }
                    ]
                },
                {
                    "concept": "cp",
                    "name": "Corruption Perception",
                    "datapoint": {
                        "collection": "sdi-cp",
                        "field": "value"
                    },
                    "label": {
                        "color": "#900"
                    },
                    "itemStyle": {
                        "color": "#900"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.210206882"
                        }
                    ]
                },
                {
                    "concept": "pwa",
                    "name": "Water Access",
                    "datapoint": {
                        "collection": "sdi-pwa",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.369253981"
                        }
                    ]
                },
                {
                    "concept": "esb",
                    "name": "Energy Security",
                    "datapoint": {
                        "collection": "sdi-esb",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.430843907"
                        }
                    ]
                },
                {
                    "concept": "wbgini",
                    "name": "Inequality of Population Income (Gini coefficient)",
                    "datapoint": {
                        "collection": "sdi-wbgini",
                        "field": "value"
                    },
                    "children": [
                        {
                            "concept": "WBG",
                            "name": "GDP per capita"
                        }
                    ],
                    "label": {
                        "color": "#900"
                    },
                    "itemStyle": {
                        "color": "#900"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.19229037"
                        }
                    ]
                },
                {
                    "concept": "gdi",
                    "name": "Global  Diseases",
                    "datapoint": {
                        "collection": "sdi-gdi",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.341568477"
                        }
                    ]
                },
                {
                    "concept": "bbp",
                    "name": "Biological Balance",
                    "datapoint": {
                        "collection": "sdi-bbp",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.563840637"
                        }
                    ]
                },
                {
                    "concept": "ndi",
                    "name": "Natural Disasters",
                    "datapoint": {
                        "collection": "sdi-ndi",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.348204828"
                        }
                    ]
                },
                {
                    "concept": "cm5",
                    "name": "Child Mortality",
                    "datapoint": {
                        "collection": "sdi-cm5",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.340457349"
                        }
                    ]
                },
                {
                    "concept": "wbsf",
                    "name": "State Fragility",
                    "datapoint": {
                        "collection": "sdi-wbsf",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.59051454"
                        }
                    ]
                },
                {
                    "concept": "gwk",
                    "name": "Global Warming",
                    "datapoint": {
                        "collection": "sdi-gwk",
                        "field": "value"
                    },
                    "label": {
                        "color": "#e90"
                    },
                    "itemStyle": {
                        "color": "#e90"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.522828224"
                        }
                    ]
                },
                {
                    "concept": "ci",
                    "name": "Conflict Intensity",
                    "datapoint": {
                        "collection": "sdi-ci",
                        "field": "value"
                    },
                    "label": {
                        "color": "#090"
                    },
                    "itemStyle": {
                        "color": "#090"
                    },
                    "values": [
                        {
                            "3_alpha_code": "UKR",
                            "year": "2015",
                            "value": "0.894300567"
                        }
                    ]
                }
            ],
            "label": {
                "color": "#900"
            },
            "itemStyle": {
                "color": "#900"
            },
            "values": [
                {
                    "3_alpha_code": "UKR",
                    "year": "2015",
                    "value": "0"
                }
            ]
        }
    ],
    "label": {
        "color": "#e90"
    },
    "itemStyle": {
        "color": "#e90"
    },
    "values": [
        {
            "3_alpha_code": "UKR",
            "year": "2015",
            "value": "0.392130344"
        }
    ]
}
            ]
          }
        }
       
    }
    
}    
    