import Vue from '@/plugins/vue'
import vuetify from "@/plugins/vuetify"
import VueRouter from "vue-router"
import VueClipboard from "vue-clipboard2"
// import VueSSE from "./plugins/vue-sse"
import Storage from 'vue-ls';
import Fragment from 'vue-fragment'


import { 
  portalPlugin,
  ssePubSubPlugin, 
  httpPlugin, 
  djvuePlugin, 
  cookiePlugin, 
  eventhubPlugin, 
  dpsPlugin,
  keyControllerPlugin, 
  <<< if(jace.availablePublishing) { >>>
  socketPlugin 
  <<< } >>>
} from "@/plugins"


import App from '@/App.vue'
import page from "@/components/core/page.vue"
import store from "@/state/index.js"


import "@/modules/google-fonts/roboto.css"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/dist/vuetify.min.css"
import "@/modules/highlightjs/styles/github-gist.css"
// import "mapbox-gl/dist/mapbox-gl.css"


// import bluebird from "bluebird"

// window.Promise = bluebird

// import "katex/dist/katex.min.css"



// import VueSocketIoExt from "vue-socket.io-extended";
// import io from "socket.io-client";

<<< if(jace.availablePublishing) { >>>
Vue.use(socketPlugin, window.devService.config.pubService);
<<< } >>>


Vue.use(VueClipboard)

 
Vue.use(Storage, {
  namespace: 'jace__', // key prefix
  name: 'localStorage', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
});

Vue.use(Fragment.Plugin)

// window.gotoPage = path => {
//       console.log(window.appRouter)
//       window.appRouter.push(path)
// }

Vue.use(cookiePlugin)
Vue.use(portalPlugin, { baseURL: `${(window.initialConfig.portalUrl) ? window.initialConfig.portalUrl:''}/`})
// Vue.use(VueSSE, { baseURL: `${(window.initialConfig.portalUrl) ? window.initialConfig.portalUrl:''}/`, sse:"sse/" })

Vue.use(dpsPlugin, {
  baseURL: "", //window.dpsURL.trim() || "http://127.0.0.1:8098/",
  client: { user: window.user, app: window.appName }
});

Vue.use(httpPlugin)


Vue.use(djvuePlugin);
Vue.use(eventhubPlugin);
Vue.use(keyControllerPlugin);


Vue.use(VueRouter)
// Vue.use(VueSSE)



// Vue.PubSub.open({channel:'app'})// or { format: 'plain' }
//       .then( channel => {
        
//         // Catch any errors (ie. lost connections, etc.)
//         channel.onError(e => {
           
//            if(channel.source.readyState == EventSource.CONNECTING){
//             // console.log("Reconnect")

//            }else{
//             console.error('lost connection; giving up!', e);
//             channel.close();
//            }  
//         });
 
//         // Listen for messages without a specified event
//         let s = channel.subscribe(['message'], data => {
//           console.warn('Received ', data);
//         });

//         // let s1 = channel.subscribe(['close'], data => {
//         //   console.warn('Received close', data);
//         //   if (data.app.name == "Layouts") {
//         //     channel.unsubscribe(s)
//         //     channel.unsubscribe(s1)
//         //   }
//         // });

//         // console.log("subscription",s)
        
//       }) 
 



var router = new VueRouter({
  // hashbang: false,
  // mode: 'history',
  routes: [
    { path: "/", component: page },
    { path: "/:page", component: page }
  ]
})


router.beforeEach((_to, _from, next) => {
  if (store.state.Djvue.app.needSave && jaceApp.startedMode != "production") {
    Vue.prototype.$djvue.confirm({
        type: "warning",
        text: "App config not saved.",
        rejectText: "Keep page anyway",
        resolveText: "Save app config and keep page"

      })
      .then(() => {
        this.saveAppConfig()
        next()
      })
      .catch(() => {
        next()
      })
  } else {
    next()
  }

})


window.appRouter = router

let appCfg =  window.initialConfig




window.onbeforeunload = (evt) => {
  // console.log(jaceApp)
  if(jaceApp.startedMode == "production") {
    // Vue.PubSub().then( service => service.publish({
    //   channel:"app",
    //   date: new Date(),
    //   app: appCfg.name,
    //   user: appCfg.user,
    //   data:`Closed the application "${appCfg.name}"`
    // }))

    return
  }  
  sessionStorage.clear();
  let message = '111'

  if (store.state.Djvue.app.needSave && jaceApp.startedMode != "production") {
    if (typeof evt === "undefined") {
      evt = window.event;
    }
    if (evt) {
      evt.returnValue = message;
    }
    return message;
  } else {
    // Vue.PubSub().then( service => service.publish({
    //   channel:"app",
    //   date: new Date(),
    //   app: appCfg.name,
    //   user: appCfg.user,
    //   data:`Closed the application "${appCfg.name}"`
    // }))
  }
}



let app = new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

