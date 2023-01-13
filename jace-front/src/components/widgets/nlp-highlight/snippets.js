export default {
	
	"default":{
      
        type:"nlp-highlight-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-format-color-highlight",
        options: { widget:{
            visible: true
          }
        },
        data: {
          source:"embedded",
          embedded: {
              decoration:{
                
                label:{
                  "ORGANIZATION": "ORG",
                  "LOCATION": "LOC"
                },

                color:{
                  "ORGANIZATION": "#ffecb3",
                  "LOCATION": "#dcedc8"
                },

                tooltip:{
                  "ORGANIZATION": "{{node.type}}",
                  "LOCATION": "{{node.type}}"
                }

              },

              data:{
                text:"Результати дослідження Центру обчислювальних наук Рікена (Японія) та інших установ опублікували 13 жовтня"
              },
              
                    document:{
    "id": "p629bcslr3h-0907f1b4-cb20-4db7-87f7-787d3f77ed6e",
    "type": "text",
    "childs": [
        {
            "id": "p629bcslr3h-53bf1634-6d1c-42d4-a395-b1e0214681ea",
            "type": "paragraph",
            "childs": [
                {
                    "id": "p629bcslr3h-e82dfbd9-c6c4-4b09-bc76-a22b01540a97",
                    "type": "sentence",
                    "childs": [
                        {
                            "id": "p629bcslr3h-b402c63e-4bc3-4732-80c0-26522f499bd7",
                            "type": "subSentence",
                            "childs": [
                                {
                                    "id": "p629bcslr3h-f536c4a5-068a-438e-be32-d8c33f473023",
                                    "type": "word",
                                    "value": "Результати",
                                    "pos": [
                                        0,
                                        9
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-fa85861b-8909-4473-b0b7-4b8929db15b2",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        10,
                                        10
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-e7e5b6c5-eb65-4cfe-92b6-42b913620c67",
                                    "type": "word",
                                    "value": "дослідження",
                                    "pos": [
                                        11,
                                        21
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-df37d905-6284-4e45-98e2-d0bd303ac815",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        22,
                                        22
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-aee413b6-109a-4028-85f8-deb7ac0e2cf3",
                                    "type": "word",
                                    "value": "Центру",
                                    "pos": [
                                        23,
                                        28
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-dfd5df1c-d6ae-4cb7-b02f-7c499607d640",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        29,
                                        29
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-b2f90589-8041-4cba-98de-bbe887080e1d",
                                    "type": "word",
                                    "value": "обчислювальних",
                                    "pos": [
                                        30,
                                        43
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-c8d11c9d-669b-45e4-baf0-71a213f2ca29",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        44,
                                        44
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-4852c814-bc3a-4d8b-ab4b-0398b4f1732e",
                                    "type": "word",
                                    "value": "наук",
                                    "pos": [
                                        45,
                                        48
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-08b84e25-9d85-4fb8-92ee-b3351a10a8a1",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        49,
                                        49
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-83d32d29-0b7b-4cf5-8000-c0134721980e",
                                    "type": "word",
                                    "value": "Рікена",
                                    "pos": [
                                        50,
                                        55
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-1a156fa7-08f0-4b5b-b296-54ecc454359b",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        56,
                                        56
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                }
                            ],
                            "pos": [
                                0,
                                56
                            ],
                            "value": "Результати дослідження Центру обчислювальних наук Рікена ",
                            "concept": "SYNTAX",
                            "selected": false
                        },
                        {
                            "id": "p629bcslr3h-3d18e5d6-6b7f-410f-91d1-c9b2c94b0fb3",
                            "type": "punctuation",
                            "value": "(",
                            "pos": [
                                57,
                                57
                            ],
                            "concept": "SYNTAX",
                            "selected": false
                        },
                        {
                            "id": "p629bcslr3h-90eb8cdf-3680-459c-95e3-190e79fb8b89",
                            "type": "subSentence",
                            "childs": [
                                {
                                    "type": "LOCATION",
                                    "childs": [
                                        {
                                            "id": "p629bcslr3h-a45a5881-38e1-4e77-bf0f-262ae69ba4dd",
                                            "type": "word",
                                            "value": "Японія",
                                            "pos": [
                                                58,
                                                63
                                            ],
                                            "concept": "SYNTAX",
                                            "selected": false
                                        }
                                    ],
                                    "concept": "SEMANTIC",
                                    "id": "p629bcslr3h-aa548abd-1400-426f-b9c0-6ba16717e7a9",
                                    "pos": [
                                        58,
                                        63
                                    ],
                                    "value": "Японія",
                                    "selected": true
                                }
                            ],
                            "pos": [
                                58,
                                63
                            ],
                            "value": "Японія",
                            "concept": "SYNTAX",
                            "selected": false
                        },
                        {
                            "id": "p629bcslr3h-1fcd2ab5-359e-48a8-8101-10c4b56ada59",
                            "type": "punctuation",
                            "value": ")",
                            "pos": [
                                64,
                                64
                            ],
                            "concept": "SYNTAX",
                            "selected": false
                        },
                        {
                            "id": "p629bcslr3h-16d20c80-396c-446e-aa7f-12f686adbbe8",
                            "type": "subSentence",
                            "childs": [
                                {
                                    "id": "p629bcslr3h-1edef1d5-bf8e-43c6-84d1-2507cd392cb1",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        65,
                                        65
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-9c562923-d8cb-4eea-a312-332bd0507108",
                                    "type": "word",
                                    "value": "та",
                                    "pos": [
                                        66,
                                        67
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-e85f2498-b1c3-4907-9dcd-7961f89bff6f",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        68,
                                        68
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-9dd29e8a-cf77-47fd-bbeb-2ea2c080ff40",
                                    "type": "word",
                                    "value": "інших",
                                    "pos": [
                                        69,
                                        73
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-ad2dd29e-385f-4706-8676-a5ccd47f7fba",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        74,
                                        74
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-d77ee42a-2c59-48b2-8875-71d6fad2fec8",
                                    "type": "word",
                                    "value": "установ",
                                    "pos": [
                                        75,
                                        81
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-5af2e98b-a959-4f23-9bd5-7173a1f4f53f",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        82,
                                        82
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-b10ec627-558c-4240-84eb-4a8f40d3e33b",
                                    "type": "word",
                                    "value": "опублікували",
                                    "pos": [
                                        83,
                                        94
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-18721303-bbfd-4048-ba75-2d49bdb230f3",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        95,
                                        95
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-0f510fd3-f8e6-4d6c-b792-cd8655969f00",
                                    "type": "number",
                                    "value": "13",
                                    "pos": [
                                        96,
                                        97
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-c85579a0-0d54-4cd2-9ead-62ff7944d528",
                                    "type": "whitespace",
                                    "value": " ",
                                    "pos": [
                                        98,
                                        98
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                },
                                {
                                    "id": "p629bcslr3h-afbe6c84-5c92-4bb9-af8f-660d2c637771",
                                    "type": "word",
                                    "value": "жовтня",
                                    "pos": [
                                        99,
                                        104
                                    ],
                                    "concept": "SYNTAX",
                                    "selected": false
                                }
                            ],
                            "pos": [
                                65,
                                104
                            ],
                            "value": " та інших установ опублікували 13 жовтня",
                            "concept": "SYNTAX",
                            "selected": false
                        }
                    ],
                    "pos": [
                        0,
                        104
                    ],
                    "value": "Результати дослідження Центру обчислювальних наук Рікена (Японія) та інших установ опублікували 13 жовтня",
                    "concept": "SYNTAX",
                    "selected": false
                }
            ],
            "pos": [
                0,
                104
            ],
            "value": "Результати дослідження Центру обчислювальних наук Рікена (Японія) та інших установ опублікували 13 жовтня",
            "concept": "SYNTAX",
            "selected": false
        }
    ],
    "pos": [
        0,
        104
    ],
    "value": "Результати дослідження Центру обчислювальних наук Рікена (Японія) та інших установ опублікували 13 жовтня",
    "concept": "SYNTAX",
    "selected": false
} 
                      }
            },

       
    }
}