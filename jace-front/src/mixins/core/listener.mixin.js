import { isObject, isString, isFunction, remove, find} from "lodash"

export default {
  props:["listener"],

  data: () => ({
    subscriptions: {},
    coreEventHandlers: {}
  }),

  computed:{
    wrapper(){
      return this.listener || this
    }
  },

  methods: {

    _registerEvent(event) {
      if (!this.wrapper.coreEventHandlers[event]) {
        this.wrapper.coreEventHandlers[event] = (emitter, ...args) => {

          // console.log(this)
          // console.log("EVENT CALLBACK", event, emitter,((this.subscriptions[event])?this.subscriptions[event].length:0))
          let cb = this.wrapper._getEventHandler(event, emitter);
          if (cb) cb(emitter, ...args)
        }
        this.wrapper.$eventHub.on(event, this.wrapper.coreEventHandlers[event])
      }
    },

    _unregisterEvent(event) {
      // console.log("unregister",event, this,this.wrapper.coreEventHandlers)
      if (this.wrapper.coreEventHandlers[event]) {
        this.wrapper.$eventHub.off(event, this.wrapper.coreEventHandlers[event])
        // this.coreEventHandlers[event] = undefined;
        delete this.wrapper.coreEventHandlers[event]
      }
    },


    emit(event, ...args) {
      return new Promise( (resolve, reject) => {
        // console.log("emit", event, this, this.wrapper)
        this.$eventHub.emit(event, ...args)
        resolve()  
          
      })
    },

    on({ event, rule, callback }) {

      // console.log("on", 
      //   event, 
      //   "listener", 
      //   this.wrapper      
      // )

      if (!this.wrapper.subscriptions[event]) this.wrapper._registerEvent(event)

      this.wrapper.subscriptions[event] = this.wrapper.subscriptions[event] || [];
      if (!callback) return;

      let _rule = find(this.wrapper.subscriptions[event], item => ((item.rule == rule) && (item.callback == callback)));
      if (!_rule) this.wrapper.subscriptions[event].push({ rule: rule, callback: callback })

    },

    off(...args) {
      
      
      // console.log("off", 
      //   args, 
      //   "listener", 
      //   this.wrapper
      // )

      let event, rule, callback;

      if (args.length > 0) {
        if (isObject(args[0])) {
          event = args[0].event
          rule = args[0].rule
          callback = args[0].callback
        } else {
          event = args[0]
          rule = args[2]
          callback = args[1]
        }
      }


      if (!event && !rule && !callback) {
        //off all listeners
        for (let i in this.wrapper.subscriptions) {
          this.wrapper._unregisterEvent(i);
          this.subscriptions[i] = undefined;
          // delete this.wrapper.subscriptions[i]
        }
        return
      }

      if (!this.wrapper.subscriptions[event]) return

      if (this.wrapper.subscriptions[event] && !rule && !callback) {
        // off all listeners for event
        this.wrapper.subscriptions[event] = 0
        this.wrapper._unregisterEvent(event)
        return
      }

      if (this.wrapper.subscriptions[event] && rule) {
        // off listeners with this event and rule
        remove(this.wrapper.subscriptions[event], item => item.rule == rule)
        if (this.wrapper.subscriptions[event].length == 0) this.wrapper._unregisterEvent(event)
        return
      }

      if (this.wrapper.subscriptions[event] && !rule && callback) {
        // off listeners with this event and callback
        remove(this.wrapper.subscriptions[event], item => item.callback == callback)
        if (this.wrapper.subscriptions[event].length == 0) this.wrapper._unregisterEvent(event)
        return
      }

    },

    _getEventHandler(event, emitter) {


      if (!this.wrapper.subscriptions[event]) return

      if (this.wrapper.subscriptions[event].length == 0) return

      let rule = find(this.wrapper.subscriptions[event], item => {
        if (!this.wrapper.rule) return true;
        if (isString(item.rule)) return item.rule == emitter.config.id
        if (isFunction(item.rule)) return item.rule(emitter)
        return false
      })

      return (rule) ? rule.callback : undefined

    }

  }

}
