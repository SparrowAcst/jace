export default {
	
	"default":{
      
        type:"nlp-resolver-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-source-merge",
        options: { widget:{
            visible: true
          }
        },
        data: {
          source:"embedded",
          embedded: {
            
            "events": {
              "select": "select-entity",
              "create": "create-entity",
              "remove": "remove-entity"
            },
            
            "availableAnnotation": {
                "ORGANIZATION": {
                  "nestedIn": [
                    "subSentence"
                  ]
                },
                "LOCATION": {
                  "nestedIn": [
                    "subSentence"
                  ]
                },
                "PERSON": {
                  "nestedIn": [
                    "subSentence"
                  ]
                },
                "DATE": {
                  "nestedIn": [
                    "subSentence"
                  ]
                }
              },

            "selection": {
              "ORGANIZATION": "singly, wrap",
              "LOCATION": "singly, wrap",
              "DATE": "singly, wrap",
              "word": "bundly",
              "number": "bundly"
            },

            "decoration": {
              "label": {
                "ORGANIZATION": "ORG",
                "LOCATION": "LOC",
                "DATE": "DATE"
              },
              "color": {
                "ORGANIZATION": "#ffecb3",
                "LOCATION": "#dcedc8",
                "DATE": "#4dd0e1"
              },
              "tooltip": {
                "ORGANIZATION": "{{node.type}}",
                "LOCATION": "{{node.type}}"
              }
            },

              
                    document:{                                                                                                                                        
               "id": "f9dc41dc-b2ad-48f5-aaf9-a1eecc284b24",                                                                                           
               "type": "text",                                                                                                                         
               "childs": [                                                                                                                             
                {                                                                                                                                      
                 "id": "a63264d8-88de-4272-a0f1-de5caca16d36",                                                                                         
                 "type": "paragraph",                                                                                                                  
                 "childs": [                                                                                                                           
                  {                                                                                                                                    
                   "id": "10480acb-8deb-4053-ae8a-313d8012bbc5",                                                                                       
                   "type": "sentence",                                                                                                                 
                   "childs": [                                                                                                                         
                    {                                                                                                                                  
                     "id": "d58e06c4-be96-459c-9f93-f200ba0c45cf",                                                                                     
                     "type": "subSentence",                                                                                                            
                     "childs": [                                                                                                                       
                      {                                                                                                                                
                       "id": "176af328-fc1b-453c-bf2e-58b58e2f88d9",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "Результати"                                                                                                           
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "2ca17a03-246b-489a-bdb3-42d1ff245077",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "a2c41876-9bb6-4e53-a77d-1370f45763f9",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "дослідження"                                                                                                          
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "cb41fd86-fa52-421f-b3f3-13394a953393",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },

                      {
                        type:"ORGANIZATION",
                        id:"11111-111111-11111-1111",
                        childs:[
                        {                                                                                                                                
                       "id": "a3195915-79a0-4476-9fdf-a8a598206d1b",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "Центру"                                                                                                               
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "5c623e9c-adc4-4897-a2f6-063c92f36f79",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "36a45b7f-f948-44e2-a1b6-2aae83c2d249",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "обчислювальних"                                                                                                       
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "685766b4-713d-4534-8c24-635cd41a0139",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "5bf30fda-a471-453a-a1e7-b5995292e74a",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "наук"                                                                                                                 
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "074c6247-9ef4-4c5d-aa38-4858ead20fe7",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "4c1f5313-33b3-45d8-864c-bf77ec10c57d",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "Рікена"                                                                                                               
                      }

                        ]

                      },                                                                                                                               
                      
                      {                                                                                                                                
                       "id": "a980744c-89d0-4ad5-9036-b51c2f42eb82",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      }                                                                                                                                
                     ],                                                                                                                                
                     "value": "Результати дослідження Центру обчислювальних наук Рікена "                                                              
                    },                                                                                                                                 
                    {                                                                                                                                  
                     "id": "56c32f74-297a-4d02-bebf-bb72c5bb63dc",                                                                                     
                     "type": "punctuation",                                                                                                            
                     "value": "("                                                                                                                      
                    },                                                                                                                                 
                    {                                                                                                                                  
                     "id": "5caefd50-7a71-41be-b131-c1f944566c2c",                                                                                     
                     "type": "subSentence",

                     "childs": [
                      {
                          type:"LOCATION",
                          id:"22222-222222-22222-2222",
                          childs:[
                            {                                                                                                                                
                             "id": "c2d74cf6-c7af-4090-90aa-776e704abd91",                                                                                   
                             "type": "word",                                                                                                                 
                             "value": "Японія"                                                                                                               
                            }
                          ]
                          
                      }                                                                                                                                
                     ],                                                                                                                                
                     "value": "Японія"                                                                                                                 
                    },                                                                                                                                 
                    {                                                                                                                                  
                     "id": "e4f6bc19-978a-4384-a889-51c582b9bd68",                                                                                     
                     "type": "punctuation",                                                                                                            
                     "value": ")"                                                                                                                      
                    },                                                                                                                                 
                    {                                                                                                                                  
                     "id": "d7d2b8e5-88c3-499a-9085-80c2132b7221",                                                                                     
                     "type": "subSentence",                                                                                                            
                     "childs": [                                                                                                                       
                      {                                                                                                                                
                       "id": "b4547830-9910-4f37-92c2-5120d0503935",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "ae6716b1-ba1e-40e6-814f-dda0eaed3d91",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "та"                                                                                                                   
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "802d7d87-564b-4beb-8f39-80fbe6f88f74",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "be3ef7b7-153b-44b7-8d0e-cda7ad04e769",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "інших"                                                                                                                
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "7ec4f9c1-84d8-4544-bb58-0bf040c37b3a",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "e3014d42-0083-43fe-af96-53985d81d93f",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "установ"                                                                                                              
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "6bfbee97-38fa-4a98-986a-4d802ad844ec",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "f6f37509-e036-4130-adf1-838a92a530a8",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "опублікували"                                                                                                         
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "fc8f79ec-b734-4302-a152-9aaee0aacec5",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "115b606e-06a6-4289-991f-4a44f1eeaf41",                                                                                   
                       "type": "number",                                                                                                               
                       "value": "13"                                                                                                                   
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "39651ab6-1a12-4a81-b7ba-e2b547fa9661",                                                                                   
                       "type": "whitespace",                                                                                                           
                       "value": " "                                                                                                                    
                      },                                                                                                                               
                      {                                                                                                                                
                       "id": "9dea1ed3-720e-4e89-b0d9-a36614817a2f",                                                                                   
                       "type": "word",                                                                                                                 
                       "value": "жовтня"                                                                                                               
                      }                                                                                                                                
                     ],                                                                                                                                
                     "value": " та інших установ опублікували 13 жовтня"                                                                               
                    },                                                                                                                                 
                    {                                                                                                                                  
                     "id": "f83bafae-b0ba-4ff0-bf21-8da7cbb8732c",                                                                                     
                     "type": "punctuation",                                                                                                            
                     "value": "."                                                                                                                      
                    }                                                                                                                                  
                   ],                                                                                                                                  
                   "value": "Результати дослідження Центру обчислювальних наук Рікена (Японія) та інших установ опублікували 13 жовтня"                
                  }                                                                                                                                    
                 ],                                                                                                                                    
                 "value": "Результати дослідження Центру обчислювальних наук Рікена (Японія) та інших установ опублікували 13 жовтня"                  
                }                                                                                                                                      
               ],                                                                                                                                      
               "value": "Результати дослідження Центру обчислювальних наук Рікена (Японія) та інших установ опублікували 13 жовтня"                    
              } 
                      }
            },

       
    }
}