export default {

  "One of many selection": {
    type: "question-widget",
    name: "noname",
    icon: "mdi-radiobox-marked",
    options: {
      widget: {
        visible: true
      }
    },
    question: {
      type: {
        title: "One of many selection",
        production: "q-one-many-production",
        design: "q-one-many-design"
      },
      options: {
        type: "One of many selection",
        "required": false,
        "addEnabled": false,
        "showUserInfo": false,
        "showResponsesStat": true,
        "userCollaboration": false,
        "maxCustomResponses": 1,
        "title": "",
        "note": "",
        "nominals": []
      },
      answer: {
        data: []
      }
    }
  },

  "Many of many selection": {
    type: "question-widget",
    name: "noname",
    icon: "mdi-checkbox-marked-outline",
    options: {
      widget: {
        visible: true
      }
    },
    question: {
      type: {
        title: "Many of many selection",
        production: "q-many-many-production",
        design: "q-many-many-design"
      },
      options: {
        type: "Many of many selection",
        "required": false,
        "addEnabled": false,
        "showUserInfo": false,
        "showResponsesStat": true,
        "userCollaboration": false,
        "maxCustomResponses": 1,
        "title": "",
        "note": "",
        "rule": {
          "min": 0,
          "max": 1
        },
        "nominals": []
      },
      answer: {
        data: []
      }
    }
  },

  "Rate": {
    type: "question-widget",
    name: "noname",
    icon: "mdi-star-outline",
    options: {
      widget: {
        visible: true
      }
    },
    question: {
      type: {
        title: "Rate",
        production: "q-rate-production",
        design: "q-rate-design"
      },
      options: {
        type: "Rate",
        "required": false,
        "useColors": false,
        "showValue": false,
        "showTitle": true,
        "icon": "star",
        "palette": [],
        "scale": [
          { value: 1, title: "Low" },
          { value: 2 },
          { value: 3, title: "Medium" },
          { value: 4 },
          { value: 5, title: "Hight" }
        ],
        "title": "",
        "note": ""
      },
      answer: {
        data: []
      }
    }
  },

  "Range": {
    type: "question-widget",
    name: "noname",
    icon: "mdi-arrow-expand-horizontal",
    options: {
      widget: {
        visible: true
      }
    },
    question: {
      type: {
        title: "Range",
        production: "q-range-production",
        design: "q-range-design"
      },
      options: {
        type: "Range",
        "required": false,
        "useColors": false,
        "showValue": false,
        "showTitle": true,
        "icon": "star",
        "range": [0, 1],
        "step": 0.1,
        "title": "",
        "note": ""
      },
      answer: {
        data: []
      }
    }
  },

  "Date": {
    type: "question-widget",
    name: "noname",
    icon: "mdi-calendar-blank-outline",
    options: {
      widget: {
        visible: true
      }
    },
    question: {
      type: {
        title: "Date",
        production: "q-date-production",
        design: "q-date-design"
      },
      options: {
        type: "Date",
        "required": false,
        "useColors": false,
        "title": "",
        "note": ""
      },
      answer: {
        data: []
      }
    }
  },

  "Priority": {
    type: "question-widget",
    name: "noname",
    icon: "mdi-priority-high",
    options: {
      widget: {
        visible: true
      }
    },
    question: {
      type: {
        title: "Priority",
        production: "q-priority-production",
        design: "q-priority-design"
      },
      options: {
        type: "Priority",
        "required": false,
        "title": "",
        "note": "",
        "nominals": []
      },
      answer: {
        data: []
      }
    }
  },

  "Influence": {
    type: "question-widget",
    name: "noname",
    icon: "mdi-grid",
    options: {
      widget: {
        visible: true
      }
    },
    question: {
      type: {
        title: "Influence",
        production: "q-influence-production",
        design: "q-influence-design"
      },
      options: {
        type: "Influence",
        "required": false,
        "useColors": false,
        "showValue": false,
        "showTitle": true,
        "factors": [],
        "effects": [],
        "palette": {
          "id": "YlGn_3",
          "color": [
            "#f7fcb9",
            "#addd8e",
            "#31a354"
          ],
          "isReverse": false
        },
        "scale": [{
            "value": 1,
            "color": "rgb(20, 7, 174)",
            "background": "rgb(247, 252, 185)",
            "style": "color: rgb(20, 7, 174);background: rgb(247, 252, 185);"
          },
          {
            "value": 2,
            "color": "rgb(60, 25, 83)",
            "background": "rgb(173, 221, 142)",
            "style": "color: rgb(60, 25, 83);background: rgb(173, 221, 142);"
          },
          {
            "value": 3,
            "color": "rgb(60, 25, 83)",
            "background": "rgb(173, 221, 142)",
            "style": "color: rgb(60, 25, 83);background: rgb(173, 221, 142);"
          },
          {
            "value": 4,
            "color": "rgb(245, 222, 238)",
            "background": "rgb(49, 163, 84)",
            "style": "color: rgb(245, 222, 238);background: rgb(49, 163, 84);"
          },
          {
            "value": 5,
            "color": "rgb(245, 222, 238)",
            "background": "rgb(49, 163, 84)",
            "style": "color: rgb(245, 222, 238);background: rgb(49, 163, 84);"
          }
        ],
        "undefinedValue": {
          "style": "color: rgb(48, 38, 34);background: rgb(153, 174, 184);"
        },
        "title": "",
        "note": ""
      },
      answer: {
        data: []
      }
    }
  },

  "Association": {
    type: "question-widget",
    name: "noname",
    icon: "mdi-grid-off",
    options: {
      widget: {
        visible: true
      }
    },
    question: {
      type: {
        title: "Association",
        production: "q-association-production",
        design: "q-association-design"
      },
      options: {
        type: "Association",
        "required": false,
        "useColors": false,
        "showValue": false,
        "showTitle": true,
        "entities": [],
        "palette": {
          "id": "YlGn_3",
          "color": [
            "#f7fcb9",
            "#addd8e",
            "#31a354"
          ],
          "isReverse": false
        },
        "scale": [{
            "value": 1,
            "color": "rgb(20, 7, 174)",
            "background": "rgb(247, 252, 185)",
            "style": "color: rgb(20, 7, 174);background: rgb(247, 252, 185);"
          },
          {
            "value": 2,
            "color": "rgb(60, 25, 83)",
            "background": "rgb(173, 221, 142)",
            "style": "color: rgb(60, 25, 83);background: rgb(173, 221, 142);"
          },
          {
            "value": 3,
            "color": "rgb(60, 25, 83)",
            "background": "rgb(173, 221, 142)",
            "style": "color: rgb(60, 25, 83);background: rgb(173, 221, 142);"
          },
          {
            "value": 4,
            "color": "rgb(245, 222, 238)",
            "background": "rgb(49, 163, 84)",
            "style": "color: rgb(245, 222, 238);background: rgb(49, 163, 84);"
          },
          {
            "value": 5,
            "color": "rgb(245, 222, 238)",
            "background": "rgb(49, 163, 84)",
            "style": "color: rgb(245, 222, 238);background: rgb(49, 163, 84);"
          }
        ],

        "undefinedValue": {
          "style": "color: rgb(48, 38, 34);background: rgb(153, 174, 184);"
        },

        "title": "",
        "note": ""
      },
      answer: {
        data: []
      }
    }
  }



}
