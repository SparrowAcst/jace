// Polyfill EventSource if browser does not support it
import 'eventsource-polyfill';
import { extend, isArray, findIndex, find } from "lodash";
import axios from "axios";

const formatters = {
  plain: e => e.data,
  json: e => {
    let res = null
    try {
      res = JSON.parse(e.data)
    } catch(e) {
      return res
    } finally {
      return res
    }  
  }
};

let http = axios.create()
let lastSubscription = 0
let entryPoint = ''    
let resolveUrl = (url) => `${(window.initialConfig.portalUrl) ? window.initialConfig.portalUrl : window.location.origin}/${entryPoint}`+url

let source = null
let eventSourcePromise = null
let subscriptions = []
let sourceId = 0

let servicePromise = null;

let unsubscribe = widget => {
    
    // console.log("unsubscribe", widget.config.id)
      
    let sIdx = findIndex(subscriptions, s => s.id == widget.config.id)
    if(sIdx < 0) return new Promise( resolve => {resolve()})
      
    let removedSubscription = subscriptions.splice(sIdx,1)[0]
    
    // console.log("Remove listener", removedSubscription)
    
    return eventSourcePromise.then( source => {
      resolve()
      source.removeEventListener(removedSubscription.channel, removedSubscription.listener)
    })
}

let subscribe = config => {
  // console.log("subscribe",config.channel, config.widget.config.id)
  
  unsubscribe(config.widget)

  let subscription = {
    id: lastSubscription++,
    channel: config.channel,
    widget: config.widget.config.id
  }

  subscriptions.push(subscription)

  return eventSourcePromise.then( () => {
        
    subscription.listener = e => {
      let data
      try {
        data = formatters[config.format || "json"](e);
      } catch (err) {
        if (typeof source.onerror === 'function') {
          source.onerror(err);
        }
      }
      if(data) config.handler(data)
    }

    source.addEventListener(config.channel, subscription.listener)
    // console.log("Add listener", subscription.channel)
    return subscription
  })  
}



let onError = handler => {
  return eventSourcePromise.then( source => {
    resolve()
    source.onerror = handler
  })  
}

let publish = event => http.post(resolveUrl(event.channel), event)
let send = publish




let service = () => (servicePromise) ? servicePromise : new Promise( resolve => { resolve() })


let createEventSourcePromise = () => {
  // console.log("create source")
  source  = new EventSource(resolveUrl(window.jaceApp.app.config.instance), {
    withCredentials: false,
  });
  source.id = sourceId++

  eventSourcePromise = new Promise( (resolve, reject) => {
    source.onerror = reject;
    source.onopen = () => {
      // console.log("Open", sourceId)
      onerror = e => {
        console.warn(e)
      }
      resolve({
        subscribe,
        unsubscribe,
        publish,
        send,
        onError
      })
    }
  })
  return eventSourcePromise
}



export default {
  install( Vue, options = {sse:"sse/"})
  {
    entryPoint = options.sse
    Vue.PubSub = Vue.prototype.$pubsub = () => (eventSourcePromise) ? eventSourcePromise : createEventSourcePromise()
  }      
}

