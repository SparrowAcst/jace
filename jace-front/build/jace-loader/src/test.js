const _ = require("lodash")

const jace = {
  "mode": "publication",
  "appConfig": {
    "id": "5d7e2f89d161bf5194134022",
    "name": "!!!a",
    "devService": {
      "config": {
        "defaultApp": "DJVUE",
        "pubService": "http://localhost:8081"
      }
    },
    "user": {
      "passports": [],
      "isAdmin": true,
      "email": "boldak.andrey@gmail.com",
      "name": "Andrey Boldak",
      "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
      "createdAt": "2017-12-18T13:53:14.442Z",
      "updatedAt": "2019-10-17T16:16:44.705Z",
      "id": "5a37c84a4dd564c00875a351",
      "isLoggedIn": true,
      "isOwner": true,
      "isCollaborator": false
    },
    "author": {
      "id": "5a37c84a4dd564c00875a351",
      "name": "Andrey Boldak",
      "email": "boldak.andrey@gmail.com",
      "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
      "exists": true
    },
    "collaborations": [{
        "email": "wdc.kpi.team@gmail.com",
        "name": "wdc team",
        "photo": "https://lh4.googleusercontent.com/-DFGYLpvASZ0/AAAAAAAAAAI/AAAAAAAAAA8/Gec5AWGQ5Co/photo.jpg?sz=500",
        "createdAt": "2018-02-08T15:09:19.331Z",
        "updatedAt": "2019-10-10T20:53:26.682Z",
        "isAdmin": false,
        "id": "5a7c681f96f58098283ae69e",
        "selected": false
      },
      {
        "email": "datajockey.forms@gmail.com",
        "name": "dj forms",
        "photo": "https://lh3.googleusercontent.com/-Gd4fo7tow2c/AAAAAAAAAAI/AAAAAAAAABQ/pf8xKMi4S3c/photo.jpg?sz=500",
        "createdAt": "2018-04-04T19:46:19.086Z",
        "updatedAt": "2019-10-10T20:53:26.682Z",
        "isAdmin": false,
        "id": "5ac52b8b3792961814660867",
        "selected": false
      }
    ],
    "skin": {
      "holders": {
        "AppHeader": {
          "widgets": [{
            "type": "html-widget",
            "name": "noname",
            "icon": "mdi-language-html5",
            "options": {
              "widget": {
                "visible": true
              }
            },
            "data": {
              "source": "embedded",
              "embedded": "<div style=\"padding:3em 0;\" class=\"primary white--text subheading\">\n    <center>\n        This app skin contains two static holders. This is \"AppHeader.\"    \n    </center>\n</div>\n",
              "script": ""
            },
            "id": "w5vd074og0p"
          }]
        },
        "AppFooter": {
          "widgets": [{
            "type": "html-widget",
            "name": "noname",
            "icon": "mdi-language-html5",
            "options": {
              "widget": {
                "visible": true
              }
            },
            "data": {
              "source": "embedded",
              "embedded": "<div style=\"padding:3em 0;\" class=\"primary white--text subheading\">\n    <center>\n        This app skin contains two static holders. This is \"AppFooter.\"    \n    </center>\n</div>",
              "script": ""
            },
            "id": "361f70vcsjf"
          }]
        }
      }
    },
    "pages": [{
        "title": "Home",
        "layout": "layout-1-2",
        "holders": {
          "Top": {
            "widgets": [{
              "type": "html-widget",
              "name": "noname",
              "icon": "mdi-language-html5",
              "options": {
                "widget": {
                  "visible": true
                }
              },
              "data": {
                "source": "embedded",
                "embedded": "<div class=\"subheading primary--text\" style=\"padding-bottom:3em;\">\n    <center>\n        <h1>\n            <span>\n                <img src=\"{{app.config.icon}}\" style=\"width:1em;padding:0.5em 0 0 0\">\n            </span>\n            {{app.title}}\n        </h1>\n        Dynamic reload content\n    </center>    \n</div>",
                "script": ""
              },
              "id": "brc5hkwvwqn"
            }]
          },
          "Column 1": {
            "widgets": [{
              "type": "html-widget",
              "name": "noname",
              "icon": "mdi-language-html5",
              "options": {
                "widget": {
                  "visible": true
                }
              },
              "data": {
                "source": "embedded",
                "embedded": "<center>\n    <i>DJ{{app.config.description}}</i>    \n</center>\n",
                "script": ""
              },
              "id": "eqrqp6siyuf"
            }]
          },
          "Column 2": {
            "widgets": [{
              "type": "html-widget",
              "name": "noname",
              "icon": "mdi-language-html5",
              "options": {
                "widget": {
                  "visible": true
                }
              },
              "data": {
                "source": "embedded",
                "embedded": "<center>\n    <i>This page use 1-2 column layout.</i>    \n</center>\n",
                "script": ""
              },
              "id": "oax4m3z4ep"
            }]
          }
        },
        "url": "http://localhost:8080/design/!!!a#/"
      },
      {
        "layout": "flex",
        "sections": [{
            "align": "justify-start",
            "holders": [{
              "name": "default",
              "width": 12
            }]
          },
          {
            "align": "justify-center",
            "holders": [{
                "name": "2lxl0wu3le8",
                "width": 5
              },
              {
                "name": "r6x6uxajhl",
                "width": 2
              }
            ]
          },
          {
            "align": "justify-start",
            "holders": [{
                "name": "3x871vbdieq",
                "width": 4
              },
              {
                "name": "nozjos9n3q",
                "width": 4
              },
              {
                "name": "v79ut2hkp2s",
                "width": 4
              }
            ]
          },
          {
            "align": "justify-start",
            "holders": [{
              "name": "mtk8cby8b98",
              "width": 12
            }]
          }
        ],
        "holders": {
          "default": {
            "widgets": []
          },
          "2lxl0wu3le8": {
            "widgets": [{
              "type": "html-widget",
              "name": "noname",
              "icon": "mdi-language-html5",
              "options": {
                "widget": {
                  "visible": true
                }
              },
              "data": {
                "source": "embedded",
                "embedded": "<h1>DJApp {{app.name}}.Page title</h1>",
                "script": ""
              },
              "id": "1bsmqxtil35"
            }]
          },
          "r6x6uxajhl": {
            "widgets": [{
              "type": "html-widget",
              "name": "noname",
              "icon": "mdi-language-html5",
              "options": {
                "widget": {
                  "visible": true
                }
              },
              "data": {
                "source": "embedded",
                "embedded": "<p>\n          Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, \n          dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, \n          sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. \n          Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. \n          Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. \n          Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.\n          </p>",
                "script": ""
              },
              "id": "z6ta1occ6d"
            }]
          },
          "3x871vbdieq": {
            "widgets": []
          },
          "nozjos9n3q": {
            "widgets": []
          },
          "v79ut2hkp2s": {
            "widgets": []
          },
          "mtk8cby8b98": {
            "widgets": []
          }
        },
        "id": "flex",
        "title": "flex",
        "url": "http://localhost:8080/design/!!!a#/flex"
      }
    ],
    "theme": {
      "primary": "#1565C0",
      "secondary": "#757575",
      "accent": "#448AFF",
      "error": "#f44336",
      "info": "#1E88E5",
      "success": "#2E7D32",
      "warning": "#FF8F00"
    },
    "icon": "./img/djvue.png",
    "i18n": {
      "en": {},
      "uk": {}
    },
    "title": "!!!a",
    "description": "Djvue app template. If you is author or collaborator use design tools for modify it",
    "keywords": [],
    "dpsURL": "",
    "isPublished": true,
    "portalUrl": "http://localhost:8080",
    "pubAgent": "0E8DEWY3wcDJCsBFAAAA"
  },
  "resourcePath": "D:\\jace-projects\\jace-pub\\.5d7e2f89d161bf5194134022\\src\\main.js"
}


let holders = config => {
  let res = _.extend({}, config.skin.holders)
  config.pages.forEach(p => {
    res = _.extend(res, p.holders)
  })
  return res
}

let widgets = config => _.flattenDeep( _.toPairs(holders(config)).map( p => p[1].widgets) )

let types = config => _.uniq( widgets(config).map( w => w.type) )

console.log("HOLDERS", holders(jace.appConfig))
console.log("WIDGETS", widgets(jace.appConfig))
console.log("TYPES", types(jace.appConfig))

