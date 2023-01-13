export default {
    "Absolute Node Position":
    {
            type:"graph-chart-widget", 
            name:"noname",
            icon:"mdi-graphql",
            
            options: { 

                    widget:{
                      visible:true
                    },

                    tooltip: {},
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    "series": [
                        {
                            "type": "graph",
                            "layout": "none",
                            "width": "75%",
                            "height": "75%",
                            "symbolSize": 15,
                            "roam": true,
                            "label": {
                                "normal": {
                                    "show": true,
                                    "position": "left",
                                    "textStyle": {
                                        "fontSize": 16,
                                        "show": true
                                    }
                                }
                            },
                            "edgeSymbol": [
                                "circle",
                                "arrow"
                            ],
                            "edgeSymbolSize": [
                                4,
                                7
                            ],
                            "edgeLabel": {
                                "normal": {
                                    "textStyle": {
                                        "fontSize": 12,
                                        "show": true
                                    },
                                    "format": [
                                        "@type"
                                    ]
                                }
                            },
                            "nodes": [
                                {
                                    "y": 150,
                                    "x": 100,
                                    "id": 19,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1958,
                                    "name": "Person: Kevin Bacon",
                                    "uri": "http://localhost:7474/db/data/node/19",
                                    "label": {
                                        "normal": {
                                            "show": true,
                                            "position": "right",
                                            "textStyle": {
                                                "fontSize": 16,
                                                "show": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "x": 150,
                                    "y": 50,
                                    "id": 144,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "Houston, we have a problem.",
                                    "title": "Apollo 13",
                                    "released": 1995,
                                    "uri": "http://localhost:7474/db/data/node/144",
                                    "name": "Movie: 'Apollo 13'"
                                },
                                {
                                    "x": 200,
                                    "y": 100,
                                    "id": 71,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1956,
                                    "name": "Person: Tom Hanks",
                                    "uri": "http://localhost:7474/db/data/node/71"
                                },
                                {
                                    "x": 280,
                                    "y": 50,
                                    "id": 73,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "What if someone you never met, someone you never saw, someone you never knew was the only someone for you?",
                                    "title": "Sleepless in Seattle",
                                    "released": 1993,
                                    "uri": "http://localhost:7474/db/data/node/73",
                                    "name": "Movie: 'Sleepless in Seattle'"
                                },
                                {
                                    "x": 300,
                                    "y": 150,
                                    "id": 34,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1961,
                                    "name": "Person: Meg Ryan",
                                    "uri": "http://localhost:7474/db/data/node/34"
                                }
                            ],
                            "links": [
                                {
                                    "id": 203,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jack Swigert"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/203",
                                    "source": 0,
                                    "target": 1,
                                    "name": "ACTED_IN: Jack Swigert",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 202,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jim Lovell"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/202",
                                    "source": 2,
                                    "target": 1,
                                    "name": "ACTED_IN: Jim Lovell"
                                },
                                {
                                    "id": 91,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Sam Baldwin"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/91",
                                    "source": 2,
                                    "target": 3,
                                    "name": "ACTED_IN: Sam Baldwin"
                                },
                                {
                                    "id": 92,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Annie Reed"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/92",
                                    "source": 4,
                                    "target": 3,
                                    "name": "ACTED_IN: Annie Reed"
                                }
                            ],
                            "lineStyle": {
                                "normal": {
                                    "opacity": 1,
                                    "color": "#777777",
                                    "width": 1,
                                    "curveness": 0.01
                                }
                            }
                        }
                    ]

            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    "series": [
                        {
                            "type": "graph",
                            "layout": "none",
                            "width": "75%",
                            "height": "75%",
                            "symbolSize": 15,
                            "roam": true,
                            "label": {
                                "normal": {
                                    "show": true,
                                    "position": "left",
                                    "textStyle": {
                                        "fontSize": 16,
                                        "show": true
                                    }
                                }
                            },
                            "edgeSymbol": [
                                "circle",
                                "arrow"
                            ],
                            "edgeSymbolSize": [
                                4,
                                7
                            ],
                            "edgeLabel": {
                                "normal": {
                                    "textStyle": {
                                        "fontSize": 12,
                                        "show": true
                                    },
                                    "format": [
                                        "@type"
                                    ]
                                }
                            },
                            "nodes": [
                                {
                                    "y": 150,
                                    "x": 100,
                                    "id": 19,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1958,
                                    "name": "Person: Kevin Bacon",
                                    "uri": "http://localhost:7474/db/data/node/19",
                                    "label": {
                                        "normal": {
                                            "show": true,
                                            "position": "right",
                                            "textStyle": {
                                                "fontSize": 16,
                                                "show": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "x": 150,
                                    "y": 50,
                                    "id": 144,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "Houston, we have a problem.",
                                    "title": "Apollo 13",
                                    "released": 1995,
                                    "uri": "http://localhost:7474/db/data/node/144",
                                    "name": "Movie: 'Apollo 13'"
                                },
                                {
                                    "x": 200,
                                    "y": 100,
                                    "id": 71,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1956,
                                    "name": "Person: Tom Hanks",
                                    "uri": "http://localhost:7474/db/data/node/71"
                                },
                                {
                                    "x": 280,
                                    "y": 50,
                                    "id": 73,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "What if someone you never met, someone you never saw, someone you never knew was the only someone for you?",
                                    "title": "Sleepless in Seattle",
                                    "released": 1993,
                                    "uri": "http://localhost:7474/db/data/node/73",
                                    "name": "Movie: 'Sleepless in Seattle'"
                                },
                                {
                                    "x": 300,
                                    "y": 150,
                                    "id": 34,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1961,
                                    "name": "Person: Meg Ryan",
                                    "uri": "http://localhost:7474/db/data/node/34"
                                }
                            ],
                            "links": [
                                {
                                    "id": 203,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jack Swigert"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/203",
                                    "source": 0,
                                    "target": 1,
                                    "name": "ACTED_IN: Jack Swigert",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 202,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jim Lovell"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/202",
                                    "source": 2,
                                    "target": 1,
                                    "name": "ACTED_IN: Jim Lovell"
                                },
                                {
                                    "id": 91,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Sam Baldwin"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/91",
                                    "source": 2,
                                    "target": 3,
                                    "name": "ACTED_IN: Sam Baldwin"
                                },
                                {
                                    "id": 92,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Annie Reed"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/92",
                                    "source": 4,
                                    "target": 3,
                                    "name": "ACTED_IN: Annie Reed"
                                }
                            ],
                            "lineStyle": {
                                "normal": {
                                    "opacity": 1,
                                    "color": "#777777",
                                    "width": 1,
                                    "curveness": 0.01
                                }
                            }
                        }
                    ]
                }
            }
    },

    "Circular Layout":
    {
            type:"graph-chart-widget", 
            name:"noname",
            icon:"mdi-graphql",
            
            options: { 

                    widget:{
                      visible:true
                    },

                    tooltip: {},
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',

                "series": [
                    {
                        "type": "graph",
                        "layout": "circular",
                        "width": "75%",
                        "height": "75%",
                        "symbolSize": 15,
                        "roam": true,
                        "label": {
                            "normal": {
                                "show": true,
                                "position": "right",
                                "textStyle": {
                                    "fontSize": 16,
                                    "show": true
                                }
                            }
                        },
                        "edgeSymbol": [
                            "circle",
                            "arrow"
                        ],
                        "edgeSymbolSize": [
                            4,
                            7
                        ],
                        "edgeLabel": {
                            "normal": {
                                "textStyle": {
                                    "fontSize": 12,
                                    "show": true
                                },
                                "format": [
                                    "@type"
                                ]
                            }
                        },
                        "nodes": [
                            {
                                "id": 19,
                                "labels": [
                                    "Person"
                                ],
                                "born": 1958,
                                "name": "Person: Kevin Bacon",
                                "uri": "http://localhost:7474/db/data/node/19"
                            },
                            {
                                "id": 144,
                                "labels": [
                                    "Movie"
                                ],
                                "tagline": "Houston, we have a problem.",
                                "title": "Apollo 13",
                                "released": 1995,
                                "uri": "http://localhost:7474/db/data/node/144",
                                "name": "Movie: 'Apollo 13'"
                            },
                            {
                                "id": 71,
                                "labels": [
                                    "Person"
                                ],
                                "born": 1956,
                                "name": "Person: Tom Hanks",
                                "uri": "http://localhost:7474/db/data/node/71"
                            },
                            {
                                "id": 73,
                                "labels": [
                                    "Movie"
                                ],
                                "tagline": "What if someone you never met, someone you never saw, someone you never knew was the only someone for you?",
                                "title": "Sleepless in Seattle",
                                "released": 1993,
                                "uri": "http://localhost:7474/db/data/node/73",
                                "name": "Movie: 'Sleepless in Seattle'"
                            },
                            {
                                "id": 34,
                                "labels": [
                                    "Person"
                                ],
                                "born": 1961,
                                "name": "Person: Meg Ryan",
                                "uri": "http://localhost:7474/db/data/node/34"
                            }
                        ],
                        "links": [
                            {
                                "id": 203,
                                "type": "ACTED_IN",
                                "roles": [
                                    "Jack Swigert"
                                ],
                                "uri": "http://localhost:7474/db/data/relationship/203",
                                "source": 0,
                                "target": 1,
                                "name": "ACTED_IN: Jack Swigert",
                                "label": {
                                    "normal": {
                                        "show": true
                                    }
                                }
                            },
                            {
                                "id": 202,
                                "type": "ACTED_IN",
                                "roles": [
                                    "Jim Lovell"
                                ],
                                "uri": "http://localhost:7474/db/data/relationship/202",
                                "source": 2,
                                "target": 1,
                                "name": "ACTED_IN: Jim Lovell"
                            },
                            {
                                "id": 91,
                                "type": "ACTED_IN",
                                "roles": [
                                    "Sam Baldwin"
                                ],
                                "uri": "http://localhost:7474/db/data/relationship/91",
                                "source": 2,
                                "target": 3,
                                "name": "ACTED_IN: Sam Baldwin"
                            },
                            {
                                "id": 92,
                                "type": "ACTED_IN",
                                "roles": [
                                    "Annie Reed"
                                ],
                                "uri": "http://localhost:7474/db/data/relationship/92",
                                "source": 4,
                                "target": 3,
                                "name": "ACTED_IN: Annie Reed"
                            }
                        ],
                        "lineStyle": {
                            "normal": {
                                "opacity": 1,
                                "color": "#777777",
                                "width": 1,
                                "curveness": 0.01
                            }
                        }
                    }
                ]

            },
            
            
            data:{
                source:"embedded",
                embedded:{
                "series": [
                            {
                                "type": "graph",
                                "layout": "circular",
                                "width": "75%",
                                "height": "75%",
                                "symbolSize": 15,
                                "roam": true,
                                "label": {
                                    "normal": {
                                        "show": true,
                                        "position": "right",
                                        "textStyle": {
                                            "fontSize": 16,
                                            "show": true
                                        }
                                    }
                                },
                                "edgeSymbol": [
                                    "circle",
                                    "arrow"
                                ],
                                "edgeSymbolSize": [
                                    4,
                                    7
                                ],
                                "edgeLabel": {
                                    "normal": {
                                        "textStyle": {
                                            "fontSize": 12,
                                            "show": true
                                        },
                                        "format": [
                                            "@type"
                                        ]
                                    }
                                },
                                "nodes": [
                                    {
                                        "id": 19,
                                        "labels": [
                                            "Person"
                                        ],
                                        "born": 1958,
                                        "name": "Person: Kevin Bacon",
                                        "uri": "http://localhost:7474/db/data/node/19"
                                    },
                                    {
                                        "id": 144,
                                        "labels": [
                                            "Movie"
                                        ],
                                        "tagline": "Houston, we have a problem.",
                                        "title": "Apollo 13",
                                        "released": 1995,
                                        "uri": "http://localhost:7474/db/data/node/144",
                                        "name": "Movie: 'Apollo 13'"
                                    },
                                    {
                                        "id": 71,
                                        "labels": [
                                            "Person"
                                        ],
                                        "born": 1956,
                                        "name": "Person: Tom Hanks",
                                        "uri": "http://localhost:7474/db/data/node/71"
                                    },
                                    {
                                        "id": 73,
                                        "labels": [
                                            "Movie"
                                        ],
                                        "tagline": "What if someone you never met, someone you never saw, someone you never knew was the only someone for you?",
                                        "title": "Sleepless in Seattle",
                                        "released": 1993,
                                        "uri": "http://localhost:7474/db/data/node/73",
                                        "name": "Movie: 'Sleepless in Seattle'"
                                    },
                                    {
                                        "id": 34,
                                        "labels": [
                                            "Person"
                                        ],
                                        "born": 1961,
                                        "name": "Person: Meg Ryan",
                                        "uri": "http://localhost:7474/db/data/node/34"
                                    }
                                ],
                                "links": [
                                    {
                                        "id": 203,
                                        "type": "ACTED_IN",
                                        "roles": [
                                            "Jack Swigert"
                                        ],
                                        "uri": "http://localhost:7474/db/data/relationship/203",
                                        "source": 0,
                                        "target": 1,
                                        "name": "ACTED_IN: Jack Swigert",
                                        "label": {
                                            "normal": {
                                                "show": true
                                            }
                                        }
                                    },
                                    {
                                        "id": 202,
                                        "type": "ACTED_IN",
                                        "roles": [
                                            "Jim Lovell"
                                        ],
                                        "uri": "http://localhost:7474/db/data/relationship/202",
                                        "source": 2,
                                        "target": 1,
                                        "name": "ACTED_IN: Jim Lovell"
                                    },
                                    {
                                        "id": 91,
                                        "type": "ACTED_IN",
                                        "roles": [
                                            "Sam Baldwin"
                                        ],
                                        "uri": "http://localhost:7474/db/data/relationship/91",
                                        "source": 2,
                                        "target": 3,
                                        "name": "ACTED_IN: Sam Baldwin"
                                    },
                                    {
                                        "id": 92,
                                        "type": "ACTED_IN",
                                        "roles": [
                                            "Annie Reed"
                                        ],
                                        "uri": "http://localhost:7474/db/data/relationship/92",
                                        "source": 4,
                                        "target": 3,
                                        "name": "ACTED_IN: Annie Reed"
                                    }
                                ],
                                "lineStyle": {
                                    "normal": {
                                        "opacity": 1,
                                        "color": "#777777",
                                        "width": 1,
                                        "curveness": 0.01
                                    }
                                }
                            }
                        ]
                    }
            }
    },

    "Force Layout":
    {
            type:"graph-chart-widget", 
            name:"noname",
            icon:"mdi-graphql",
            
            options: { 

                    widget:{
                      visible:true
                    },

                    tooltip: {},
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    "series": [
                        {
                            "type": "graph",
                            "layout": "force",
                            "width": "75%",
                            "height": "75%",
                            "force": {
                                "initLayout": "circular",
                                "gravity": 0.01,
                                "repulsion": 60,
                                "edgeLength": 70
                            },
                            "symbolSize": 15,
                            "roam": true,
                            "label": {
                                "normal": {
                                    "show": true,
                                    "position": "right",
                                    "textStyle": {
                                        "fontSize": 16,
                                        "show": true
                                    }
                                }
                            },
                            "edgeSymbol": [
                                "circle",
                                "arrow"
                            ],
                            "edgeSymbolSize": [
                                4,
                                7
                            ],
                            "edgeLabel": {
                                "normal": {
                                    "textStyle": {
                                        "fontSize": 12,
                                        "show": true
                                    },
                                    "format": [
                                        "@type"
                                    ]
                                }
                            },
                            "nodes": [
                                {
                                    "id": 19,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1958,
                                    "name": "Person: Kevin Bacon",
                                    "uri": "http://localhost:7474/db/data/node/19"
                                },
                                {
                                    "id": 144,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "Houston, we have a problem.",
                                    "title": "Apollo 13",
                                    "released": 1995,
                                    "uri": "http://localhost:7474/db/data/node/144",
                                    "name": "Movie: 'Apollo 13'"
                                },
                                {
                                    "id": 71,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1956,
                                    "name": "Person: Tom Hanks",
                                    "uri": "http://localhost:7474/db/data/node/71"
                                },
                                {
                                    "id": 73,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "What if someone you never met, someone you never saw, someone you never knew was the only someone for you?",
                                    "title": "Sleepless in Seattle",
                                    "released": 1993,
                                    "uri": "http://localhost:7474/db/data/node/73",
                                    "name": "Movie: 'Sleepless in Seattle'"
                                },
                                {
                                    "id": 34,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1961,
                                    "name": "Person: Meg Ryan",
                                    "uri": "http://localhost:7474/db/data/node/34"
                                }
                            ],
                            "links": [
                                {
                                    "id": 203,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jack Swigert"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/203",
                                    "source": 0,
                                    "target": 1,
                                    "name": "ACTED_IN: Jack Swigert",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 202,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jim Lovell"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/202",
                                    "source": 2,
                                    "target": 1,
                                    "name": "ACTED_IN: Jim Lovell"
                                },
                                {
                                    "id": 91,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Sam Baldwin"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/91",
                                    "source": 2,
                                    "target": 3,
                                    "name": "ACTED_IN: Sam Baldwin"
                                },
                                {
                                    "id": 92,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Annie Reed"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/92",
                                    "source": 4,
                                    "target": 3,
                                    "name": "ACTED_IN: Annie Reed"
                                }
                            ],
                            "lineStyle": {
                                "normal": {
                                    "opacity": 1,
                                    "color": "#777777",
                                    "width": 1,
                                    "curveness": 0.01
                                }
                            }
                        }
                    ]

            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    "series": [
                        {
                            "type": "graph",
                            "layout": "force",
                            "width": "75%",
                            "height": "75%",
                            "force": {
                                "initLayout": "circular",
                                "gravity": 0.01,
                                "repulsion": 60,
                                "edgeLength": 70
                            },
                            "symbolSize": 15,
                            "roam": true,
                            "label": {
                                "normal": {
                                    "show": true,
                                    "position": "right",
                                    "textStyle": {
                                        "fontSize": 16,
                                        "show": true
                                    }
                                }
                            },
                            "edgeSymbol": [
                                "circle",
                                "arrow"
                            ],
                            "edgeSymbolSize": [
                                4,
                                7
                            ],
                            "edgeLabel": {
                                "normal": {
                                    "textStyle": {
                                        "fontSize": 12,
                                        "show": true
                                    },
                                    "format": [
                                        "@type"
                                    ]
                                }
                            },
                            "nodes": [
                                {
                                    "id": 19,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1958,
                                    "name": "Person: Kevin Bacon",
                                    "uri": "http://localhost:7474/db/data/node/19"
                                },
                                {
                                    "id": 144,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "Houston, we have a problem.",
                                    "title": "Apollo 13",
                                    "released": 1995,
                                    "uri": "http://localhost:7474/db/data/node/144",
                                    "name": "Movie: 'Apollo 13'"
                                },
                                {
                                    "id": 71,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1956,
                                    "name": "Person: Tom Hanks",
                                    "uri": "http://localhost:7474/db/data/node/71"
                                },
                                {
                                    "id": 73,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "What if someone you never met, someone you never saw, someone you never knew was the only someone for you?",
                                    "title": "Sleepless in Seattle",
                                    "released": 1993,
                                    "uri": "http://localhost:7474/db/data/node/73",
                                    "name": "Movie: 'Sleepless in Seattle'"
                                },
                                {
                                    "id": 34,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1961,
                                    "name": "Person: Meg Ryan",
                                    "uri": "http://localhost:7474/db/data/node/34"
                                }
                            ],
                            "links": [
                                {
                                    "id": 203,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jack Swigert"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/203",
                                    "source": 0,
                                    "target": 1,
                                    "name": "ACTED_IN: Jack Swigert",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 202,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jim Lovell"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/202",
                                    "source": 2,
                                    "target": 1,
                                    "name": "ACTED_IN: Jim Lovell"
                                },
                                {
                                    "id": 91,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Sam Baldwin"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/91",
                                    "source": 2,
                                    "target": 3,
                                    "name": "ACTED_IN: Sam Baldwin"
                                },
                                {
                                    "id": 92,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Annie Reed"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/92",
                                    "source": 4,
                                    "target": 3,
                                    "name": "ACTED_IN: Annie Reed"
                                }
                            ],
                            "lineStyle": {
                                "normal": {
                                    "opacity": 1,
                                    "color": "#777777",
                                    "width": 1,
                                    "curveness": 0.01
                                }
                            }
                        }
                    ]
                }
            }
    },

    "With Categories":
    {
            type:"graph-chart-widget", 
            name:"noname",
            icon:"mdi-graphql",
            
            options: { 

                    widget:{
                      visible:true
                    },

                    tooltip: {},
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    "series": [
                        {
                            "type": "graph",
                            "layout": "circular",
                            "symbolSize": 10,
                            "roam": true,
                            "label": {
                                "normal": {
                                    "show": true,
                                    "position": "right"
                                }
                            },
                            "categories": [
                                {
                                    "name": "Person"
                                },
                                {
                                    "name": "Movie"
                                }
                            ],
                            "edgeSymbol": [
                                "circle",
                                "arrow"
                            ],
                            "edgeSymbolSize": [
                                4,
                                10
                            ],
                            "edgeLabel": {
                                "normal": {
                                    "textStyle": {
                                        "fontSize": 12,
                                        "show": true
                                    },
                                    "format": [
                                        "@type",
                                        " as ",
                                        "@roles"
                                    ]
                                }
                            },
                            "lineStyle": {
                                "normal": {
                                    "opacity": 0.9,
                                    "width": 2,
                                    "curveness": 0
                                }
                            },
                            "nodes": [
                                {
                                    "id": 19,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1958,
                                    "name": "Kevin Bacon",
                                    "uri": "http://localhost:7474/db/data/node/19",
                                    "category": "Person"
                                },
                                {
                                    "id": 144,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "Houston, we have a problem.",
                                    "title": "Apollo 13",
                                    "released": 1995,
                                    "uri": "http://localhost:7474/db/data/node/144",
                                    "name": "'Apollo 13'",
                                    "category": "Movie"
                                },
                                {
                                    "id": 71,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1956,
                                    "name": "Tom Hanks",
                                    "uri": "http://localhost:7474/db/data/node/71",
                                    "category": "Person"
                                },
                                {
                                    "id": 73,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "What if someone you never met, someone you never saw, someone you never knew was the only someone for you?",
                                    "title": "Sleepless in Seattle",
                                    "released": 1993,
                                    "uri": "http://localhost:7474/db/data/node/73",
                                    "name": "'Sleepless in Seattle'",
                                    "category": "Movie"
                                },
                                {
                                    "id": 34,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1961,
                                    "name": "Meg Ryan",
                                    "uri": "http://localhost:7474/db/data/node/34",
                                    "category": "Person"
                                }
                            ],
                            "links": [
                                {
                                    "id": 203,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jack Swigert"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/203",
                                    "source": 0,
                                    "target": 1,
                                    "name": "ACTED_IN: Jack Swigert",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 202,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jim Lovell"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/202",
                                    "source": 2,
                                    "target": 1,
                                    "name": "ACTED_IN: Jim Lovell",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 91,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Sam Baldwin"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/91",
                                    "source": 2,
                                    "target": 3,
                                    "name": "ACTED_IN: Sam Baldwin",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 92,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Annie Reed"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/92",
                                    "source": 4,
                                    "target": 3,
                                    "name": "ACTED_IN: Annie Reed",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    "legend": [
                        {
                            "name": "Person"
                        },
                        {
                            "name": "Movie"
                        }
                    ]

            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    "series": [
                        {
                            "type": "graph",
                            "layout": "circular",
                            "symbolSize": 10,
                            "roam": true,
                            "label": {
                                "normal": {
                                    "show": true,
                                    "position": "right"
                                }
                            },
                            "categories": [
                                {
                                    "name": "Person"
                                },
                                {
                                    "name": "Movie"
                                }
                            ],
                            "edgeSymbol": [
                                "circle",
                                "arrow"
                            ],
                            "edgeSymbolSize": [
                                4,
                                10
                            ],
                            "edgeLabel": {
                                "normal": {
                                    "textStyle": {
                                        "fontSize": 12,
                                        "show": true
                                    },
                                    "format": [
                                        "@type",
                                        " as ",
                                        "@roles"
                                    ]
                                }
                            },
                            "lineStyle": {
                                "normal": {
                                    "opacity": 0.9,
                                    "width": 2,
                                    "curveness": 0
                                }
                            },
                            "nodes": [
                                {
                                    "id": 19,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1958,
                                    "name": "Kevin Bacon",
                                    "uri": "http://localhost:7474/db/data/node/19",
                                    "category": "Person"
                                },
                                {
                                    "id": 144,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "Houston, we have a problem.",
                                    "title": "Apollo 13",
                                    "released": 1995,
                                    "uri": "http://localhost:7474/db/data/node/144",
                                    "name": "'Apollo 13'",
                                    "category": "Movie"
                                },
                                {
                                    "id": 71,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1956,
                                    "name": "Tom Hanks",
                                    "uri": "http://localhost:7474/db/data/node/71",
                                    "category": "Person"
                                },
                                {
                                    "id": 73,
                                    "labels": [
                                        "Movie"
                                    ],
                                    "tagline": "What if someone you never met, someone you never saw, someone you never knew was the only someone for you?",
                                    "title": "Sleepless in Seattle",
                                    "released": 1993,
                                    "uri": "http://localhost:7474/db/data/node/73",
                                    "name": "'Sleepless in Seattle'",
                                    "category": "Movie"
                                },
                                {
                                    "id": 34,
                                    "labels": [
                                        "Person"
                                    ],
                                    "born": 1961,
                                    "name": "Meg Ryan",
                                    "uri": "http://localhost:7474/db/data/node/34",
                                    "category": "Person"
                                }
                            ],
                            "links": [
                                {
                                    "id": 203,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jack Swigert"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/203",
                                    "source": 0,
                                    "target": 1,
                                    "name": "ACTED_IN: Jack Swigert",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 202,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Jim Lovell"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/202",
                                    "source": 2,
                                    "target": 1,
                                    "name": "ACTED_IN: Jim Lovell",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 91,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Sam Baldwin"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/91",
                                    "source": 2,
                                    "target": 3,
                                    "name": "ACTED_IN: Sam Baldwin",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                },
                                {
                                    "id": 92,
                                    "type": "ACTED_IN",
                                    "roles": [
                                        "Annie Reed"
                                    ],
                                    "uri": "http://localhost:7474/db/data/relationship/92",
                                    "source": 4,
                                    "target": 3,
                                    "name": "ACTED_IN: Annie Reed",
                                    "label": {
                                        "normal": {
                                            "show": true
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    "legend": [
                        {
                            "name": "Person"
                        },
                        {
                            "name": "Movie"
                        }
                    ]
                }
            }
    },

    "2d-scatter Graph":
    {
            type:"graph-chart-widget", 
            name:"noname",
            icon:"mdi-graphql",
            
            options: { 

                    widget:{
                      visible:true
                    },

                        "grid": {
                            "left": 0,
                            "bottom": 0,
                            "containLabel": true,
                            "top": 80
                        },
                        "xAxis": {
                            "type": "value"
                        },
                        "yAxis": {
                            "type": "value",
                            "scale": true
                        },
                        "series": [
                            {
                                "name": "G1",
                                "type": "graph",
                                "coordinateSystem": "cartesian2d",
                                "label": {
                                    "normal": {
                                        "position": "top",
                                        "show": true
                                    }
                                },
                                "edgeSymbol": [
                                    "none",
                                    "arrow"
                                ],
                                "edgeSymbolSize": [
                                    4,
                                    12
                                ],
                                "lineStyle": {
                                    "normal": {
                                        "opacity": 1,
                                        "color": "#777777",
                                        "width": 1,
                                        "curveness": 0.01
                                    }
                                },
                                "data": [
                                    {
                                        "name": "A",
                                        "value": [
                                            0,
                                            0
                                        ]
                                    },
                                    {
                                        "name": "B",
                                        "value": [
                                            10,
                                            10
                                        ]
                                    },
                                    {
                                        "name": "C",
                                        "value": [
                                            5,
                                            20
                                        ]
                                    }
                                ],
                                "links": [
                                    {
                                        "source": 0,
                                        "target": 1
                                    },
                                    {
                                        "source": 1,
                                        "target": 2
                                    },
                                    {
                                        "source": 0,
                                        "target": 2
                                    }
                                ]
                            }
                        ]
            
            },
            
            
            data:{
                source:"embedded",
                embedded:{
    "grid": {
        "left": 0,
        "bottom": 0,
        "containLabel": true,
        "top": 80
    },

    toolbox: {
        feature: {
            dataZoom: {}
        }
    },
    dataZoom: {
        type: 'inside'
    },

    "xAxis": {
        "type": "value"
    },
    "yAxis": {
        "type": "value",
        "scale": true
    },
    "series": [
        {
            "name": "G1",
            "type": "graph",
            "coordinateSystem": "cartesian2d",
            "label": {
                "normal": {
                    "position": "top",
                    "show": true
                }
            },
            "edgeSymbol": [
                "none",
                "arrow"
            ],
            "edgeSymbolSize": [
                4,
                12
            ],
            "lineStyle": {
                "normal": {
                    "opacity": 1,
                    "color": "#777777",
                    "width": 1,
                    "curveness": 0.01
                }
            },
            "data": [
                {
                    "name": "A",
                    "value": [
                        0,
                        0
                    ]
                },
                {
                    "name": "B",
                    "value": [
                        10,
                        10
                    ]
                },
                {
                    "name": "C",
                    "value": [
                        5,
                        20
                    ]
                }
            ],
            "links": [
                {
                    "source": 0,
                    "target": 1
                },
                {
                    "source": 1,
                    "target": 2
                },
                {
                    "source": 0,
                    "target": 2
                }
            ]
        }
    ]
}
            }
    }


}