import djImg from "@/components/core/ext/dj-img.vue"
import warningDialog from "@/components/dialogs/core/warning.vue"
import confirmDialog from "@/components/dialogs/core/confirm.vue"
import progressDialog from "@/components/dialogs/core/progress.vue"
import selectFileDialog from "@/components/dialogs/core/select-file.vue"
import customDialog from "@/components/dialogs/core/custom-dialog.vue"
import splashDialog from "@/components/dialogs/core/splash.vue"
import VueSSE from "./vue-sse"
import Vue from "vue"

import KeyController, { getCombi, getKey } from "keycon";




<<< if(jace.availablePublishing) { >>>

import io from "socket.io-client";

<<< } >>>

import * as Cookie from "tiny-cookie"
import { isInteger, isObject, isString, extend, keys } from "lodash"

// import store from "@/state/index.js"

import dialogManager from "@/components/core/ext/dialog-manager"
import dialogWidgetManager from "@/components/core/ext/dialog-widget-manager"


import axios from "axios"

// import consoleWrapper from "./console-wrapper"

var _dialog_manager = (app) => {
  _dialog_manager = (new Vue(dialogManager)).$mount()
  app.$el.appendChild(_dialog_manager.$el)
}


var _dialog_widget_manager = (app) => {
  _dialog_widget_manager = (new Vue(dialogWidgetManager)).$mount()
  app.$el.appendChild(_dialog_widget_manager.$el)
}


// var _dialogManagerPlugin = (Vue, app) => {
//     _dialog_manager =  (new Vue(dialogManager)).$mount()
//     app.$el.appendChild(_dialog_manager.$el)
// } 



let url2fileName = url => {
  const hashIndex = url.indexOf('#')
  url = hashIndex !== -1 ? url.substring(0, hashIndex) : url
  return (url.split('/').pop() || '').replace(/[?].*$/g, '')
} 

export var dialogManagerPlugin = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$dialogManager', {
      get: function() {
        return _dialog_manager;
      }
    });

    Object.defineProperty(Vue, '$dialogManager', {
      get: function() {
        return _dialog_manager;
      }
    });

   Object.defineProperty(Vue.prototype, '$dialogWidgetManager', {
      get: function() {
        return _dialog_widget_manager;
      }
    });

    Object.defineProperty(Vue, '$dialogWidgetManager', {
      get: function() {
        return _dialog_widget_manager;
      }
    });
    console.log("VUE PROTO", Vue.prototype)
  }
}


export var cookiePlugin = {

  install: function(Vue) {
    Vue.prototype.$cookie = this;
    Vue.cookie = this;
  },
  set: function(name, value, daysOrOptions) {
    var opts = daysOrOptions;
    if (isInteger(daysOrOptions)) {
      opts = { expires: daysOrOptions };
    }
    return Cookie.set(name, value, opts);
  },

  put: function(name, value, daysOrOptions) {
    return this.set(name, value, daysOrOptions)
  },

  get: function(name) {
    return Cookie.get(name);
  },

  getAll: function() {
    return Cookie.getAll()
  },

  isEnabled: function() {
    return Cookie.isEnabled()
  },

  delete: function(name, options) {
    var opts = { expires: -1 };
    if (options !== undefined) {
      opts = Object.assign(options, opts);
    }
    this.set(name, '', opts);
  }
}

///////////////////////////////////////////////////////////////////

let keycon = new KeyController()


export var keyControllerPlugin = {
  install: function(Vue) {
    Vue.prototype.$keyController = keycon;
    Vue.keyController = keycon;
  }

}

///////////////////////////////////////////////////////////////////

export var portalPlugin = {
  install(Vue, options = { baseURL: "/", sse:"sse/" }) {
    
    Vue.portal = Vue.prototype.$portal = axios.create(options)
    Vue.resolveUrl = Vue.prototype.$resolveUrl = (url) => {
       return `${(window.initialConfig.portalUrl) ? window.initialConfig.portalUrl : window.location.origin}/`+url 
    }
 
  }
}





// export var ssePubSubPlugin = {
//   install( Vue, options = {sse:"sse/"}){
//     let resolveUrl = (url) => `${(window.initialConfig.portalUrl) ? window.initialConfig.portalUrl : window.location.origin}/`+url
//     Vue.PubSub = Vue.prototype.$pubsub = {
//       open: (config) => {
//         if(config.channel) config.url = resolveUrl(`${options.sse}${config.channel}`)
//         config.format = config.format || "json"  
//         return VueSSE.openChannel(config)  
//       }
//     }

//   }
// }

<<< if(jace.availablePublishing) { >>>
  
export var socketPlugin = {
  install(Vue, service) {
    Vue.prototype.$socket = io(service)
  }
}

<<< } >>>


export var httpPlugin = {
  install(Vue, options) {
    Vue.http = Vue.prototype.$http = axios.create(options)
  }
}

export var dpsPlugin = {
  install(Vue, options) {
    let transport = axios.create(options);
    let url = "api/script"
    let client = options.client;
    client.href = location.href
    let baseURL = "." //options.baseURL;

    // client = {user: user, app: appName} from main page or from options
    // url from main page or from options

    Vue.prototype.$dps = {
      run: ({ script, state, file }) => {

        script =  encodeURIComponent(script)//encodeURIComponent(JSON.stringify(script))

        if (!file) {
          return transport.post(
            url, {
              client,
              script,
              state: encodeURIComponent(JSON.stringify({ storage: state }))
            }
          ).then(response => {
            return {
              type: response.data.type,
              data: response.data.data
            }
          })
        } else {
          let formData = new FormData();
          formData.append("client", JSON.stringify(client))
          formData.append("script", script)
          formData.append("state", encodeURIComponent(JSON.stringify({ storage: state })))
          formData.append('file', file);
          return transport.post(
            url,
            formData, { headers: { 'Content-Type': 'multipart/form-data' } }
          )
        }
      },
      call: this.run,
      getBaseURL: () => baseURL,
      setBaseURL: (value) => {
        transport.defaults.baseURL = value
      }
    }

    Vue.component("dj-img", djImg)
  }
}



var findChild = (component, filter, res) => {
  res = res || []
  if (component.$children) {
    res = res.concat(component.$children.filter(filter))
    component.$children.forEach(child => {
      res = res.concat(findChild(child, filter))
    })
  }
  // console.log("res", res)
  return res
}

var toTree = (object) =>

  keys(object).map(key => {
    return {
      name: (isObject(object[key])) ? key : `${key}: ${object[key]}`,
      children: (!isObject(object[key])) ? undefined : toTree(object[key])
    }
  })



var eventHub = {}

export var eventhubPlugin = {
  install(Vue) {
    eventHub = new Vue();

    Object.defineProperties(eventHub, {
      on: {
        get: function() {
          return eventHub.$on
        }
      },
      emit: {
        get: function() {
          return eventHub.$emit
        }
      },
      off: {
        get: function() {
          return eventHub.$off
        }
      }
    });

    Object.defineProperty(Vue.prototype, '$eventHub', {
      get: function() {
        return eventHub;
      }
    });

    Object.defineProperty(Vue, 'eventHub', {
      get: function() {
        return eventHub;
      }
    });
  }
}




export var djvuePlugin = {
  install(Vue) {

    Vue.prototype.$djvue = {

      fullReload: (url) => {
        if (url) {
          window.location = url
        } else {

          window.location.reload()
        }
      },

      login: () => {
        Vue.cookie.set('redirectToUrl', window.location);
        window.location = `/auth/google`;
      },

      randomName: () => Math.random().toString(36).substring(2),

      findChild,

      toTree,

      extend: (object, extention) => {
        return extend(object, JSON.parse(JSON.stringify(extention)))
      },


      warning(options) {
        options = options || {}
        options.text = options.text || "";
        options.type = options.type || "info";
        options.title = options.title || options.type;

        return Vue.prototype.$dialogManager.showAndWait(warningDialog, options)
      },


      customDialog(options) {
        options = options || {}
        return Vue.prototype.$dialogManager.showAndWait(customDialog, options)
      },

      progress(options) {

        let result = Vue.prototype.$dialogManager.showAndWait(Vue.extend(progressDialog), { persistent: false }, options)
        result.cancel = () => {
          // console.log("FIRE CANCEL",result.dialogID)
          Vue.prototype.$eventHub.emit("progress-dialog-cancel", { dialogID: result.dialogID })
        }
        result.set = (options) => {
          Vue.prototype.$eventHub.emit("progress-dialog-set", extend(options, { dialogID: result.dialogID }))
        }
        return result
      },

      confirm(options) {
        options = options || {}
        options.text = options.text || "";
        options.type = options.type || "info";
        options.title = options.title || options.type;

        return new Promise((resolve, reject) => {
          Vue.prototype.$dialogManager.showAndWait(confirmDialog, options)
            .then(res => {
              if (res) {
                resolve()
              } else {
                reject()
              }
            })
        })

      },

      splash(options) {
        return new Promise((resolve) => {
          Vue.prototype.$dialogManager.showAndWait(splashDialog, { width: "30%", hideOverlay: true }, options)
            .then(() => { resolve() })
        })

      },

      openUrl(url, target) {
        if (!url) return
        window.open(url, target);
      },

      selectFile(options) {
        options = options || {}
        options = (isString(options)) ? { title: options } : {}
        options.title = options.title || "Upload File";

        return new Promise((resolve, reject) => {
          Vue.prototype.$dialogManager.showAndWait(selectFileDialog, options)
            .then(res => {
              if (res) {
                resolve(res)
              } else {
                reject(null)
              }
            })
        })

      },

      selectWidgets(root, filter) {
        return findChild(root, filter).filter(item => item.widgetWrapper)
      },

      selectSections(root, filter) {
        // console.log("root", root)
        return findChild(root, filter).filter(item => item.config.type == "section")
      },


      loadLocalFile(file, encoding) {

        return new Promise((resolve) => {
          let fr = new FileReader();
          fr.onload = (e) => {
            resolve(e.target.result)
          }
          fr.readAsText(file, encoding);
          // reader.readAsText(file, 'CP866');
        })

      },

      saveLocalFile(fileName, object) {
       
        if (!object) return;

           const url = window.URL.createObjectURL(new Blob([object]));
           // console.log(url)
           const link = document.createElement('a');
           link.href = url;
           link.setAttribute('download', fileName); //or any other extension
           document.body.appendChild(link);
           link.click();

      },

      downloadFile(url){
       
        axios({
          url,
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          responseType: 'blob', // important
        }).then((response) => {
           const url = window.URL.createObjectURL(new Blob([response.data]));
           const link = document.createElement('a');
           link.href = url;
           link.setAttribute('download', url2fileName(url));
           document.body.appendChild(link);
           link.click();
        });
      },

      // consoleWrapper

    }

    Vue.prototype = extend(Vue.prototype, Vue.prototype.$djvue)

  }
}
