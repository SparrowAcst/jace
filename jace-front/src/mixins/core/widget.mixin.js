import listenerMixin from "@/mixins/core/listener.mixin.js";
import initiableMixin from "@/mixins/core/initiable.mixin.js"
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import { set, isArray, isString } from "lodash"
import Promise from "bluebird"

export default {

  props: ["config"],

  mixins: [listenerMixin, initiableMixin, djvueMixin],

  data: () => ({
    widgetWrapper: true,
    reconfigurable: false,
    data: {},
    pageStarted: false,
    options: {
      widget: {
        visible: true
      }
    },
    hasError: false,
    errorMessage: ""
  }),

  
  methods: {



    onBeforeInit() { this._waitList = [""] },

    onChildsInitiated() { this.$emit("init", this.config.id) },

    isSameWidget(widget) {return this == widget}, //{ return this.config.id == widget.config.id },


<<< if( jace.mode == "development") { >>>
    
    _reconfigure(widget) {
// console.log(this,widget)
      if(!this.isSameWidget(widget)) return
      // console.log("reconf", this)
            
      if (this.$refs.instance.onReconfigure) {
        // console.log("activate dialog")  
        let c = this.$djvue.extend({}, widget.config)

        this.$refs.instance.onReconfigure(c)
          .then(newConfig => {
            // console.log("new config", newConfig)
            if (newConfig) {
              // console.log("Invoke ", "holder-update-widget-config", this)
              this.emit(
                "holder-update-widget-config",
                this, {
                  widget: this,
                  newConfig: this.$djvue.extend({}, newConfig)
                }
              )
            }  
          })
          .catch((e) => {
            console.error(e.toString())
          })
      }

    },

    getInstance() {
      return this.$refs.instance
    },

     _delete(widget) {
      if(!this.isSameWidget(widget)) return
      let rule = (this.$refs.instance && this.$refs.instance.isDeleteAvailable) ? this.$refs.instance.isDeleteAvailable : (() => true)
      if (rule.apply(this.$refs.instance)) {
        if (this.$refs.instance && this.$refs.instance.onDelete) this.$refs.instance.onDelete()
        this._removeSubscriptions()
        return true
      }
      return false
    },

<<< } >>>


    _updateConfig() {
      
      if (!this.pageStarted && this.isProductionMode) return

      new Promise((resolve, reject) => {

        this.reconfigurable = (this.$refs && this.$refs.instance) ? !!this.$refs.instance.onReconfigure : false

        if (!this.config.data) {
          reject("no data")
        }

        if (this.config.data.source == "url") {
          this.$http
            .get(this.config.data.url)
            .then(res => {
              this.hasError = false;
              resolve(res.data)
            })
            .catch((error) => {
              this.hasError = true;
              this.errorMessage = error.toString();
              this.$djvue.warning({
                type: "error",
                title: "Cannot load data",
                text: error.toString()
              })
              if (this.$refs.instance && this.$refs.instance.onError) this.$refs.instance.onError(error)

            })
          return
        }

        if (this.config.data.source == "dps") {
          this.$dps.run({
              script: this.config.data.script
            })
            .then(response => {
              if(!response.data.message){
                this.hasError = false;
                resolve(response.data)  
              } else {
                this.hasError = true;
                this.errorMessage = response.data.message
                reject()
              }
              
            })
            .catch(error => {
              this.hasError = true;
              this.errorMessage = error.toString();
              this.$djvue.warning({
                type: "error",
                title: "Cannot run dps",
                text: error.toString()
              })
              if (this.$refs.instance && this.$refs.instance.onError) this.$refs.instance.onError(error)
            })
          return
        }

        if (this.config.data.source == "embedded") {
          this.hasError = false;
          // console.log("FOR EMMBEDDED CONTENT", this.config.data.embedded)
          resolve(this.config.data.embedded)
          return
        }
      }).then(data => {
        this.update({ data, options: this.config.options })
      })

    },

    run() {
      if (this.$refs.instance && this.$refs.instance.onRun) return this.$refs.instance.onRun()
      return new Promise( resolve => { resolve() })
    },

    _validate( data ){
      let validator = ( this.$refs.instance && this.$refs.instance.onValidate )
                        ? this.$refs.instance.onValidate
                        : (data) => data
      let res = validator( data )
      if ( res.error ){
        this.errorMessage = res.error
        this.hasError = true
        return
      } 
      if(res.message){
        this.errorMessage = "\nDATA PROCESSING SCRIPT\n" + data.message
        this.hasError = true
        return 
      }

      return res

    },

    update(state, mode) {
        this.errorMessage = ""
        this.hasError = false

      if (!state) state = {
        data: this.data,
        options: this.options
      };

      if (!state.data) state.data = Object.assign({}, this.data);
      if (!state.options) state.options = Object.assign({}, this.options);

      this.data = state.data;
      this.options = state.options;
      
      
      this.data = this._validate( this.data )
      // console.log("Validated ", this.data)
      if( this.data ){
        this.$nextTick(() => {
          // console.log("Invoke", this)
         if (this.$refs.instance && this.$refs.instance.onUpdate) this.$refs.instance.onUpdate(state, mode)
        })
      }

    },

    hide() {
      this.$nextTick(() => {
        this.hidden = true
      })
    },

    show() {
      this.$nextTick(() => {
        this.hidden = false
        this.$nextTick(() => {
          this.update({
            data: this.data,
            options: this.options
          })
        })
      })
    },

    collapse(){
      this.collapsed = true
    },

    expand(){
      this.collapsed = false
    },

    clear() {
      this.$nextTick(() => {
        if (this.$refs.instance && this.$refs.instance.onClear) return this.$refs.instance.onClear()
      })
    },

    setOption(path, value) {
      set(this.options, path, value)
    },

   

    _removeSubscriptions() { this.off() },

    _initSubscriptions() {


<<< if( jace.mode == "development") { >>>

      this.on({
        event: "app-config-save",
        callback: () => {
          if (this.$refs.instance && this.$refs.instance.onSaveAppConfig) this.$refs.instance.onSaveAppConfig()
        },
        rule: () => true
      })

      this.on({
        event: "widget-reconfigure",
        callback: this._reconfigure,
        rule: this.isSameWidget
      })

      this.on({
        event: "widget-delete",
        callback: this._delete,
        rule: this.isSameWidget
      })


<<< } >>>

      // this.on({
      //   event: "data-error",
      //   callback: (emitter,msg) => {
      //     this.hasError = true
      //     this.errorMessage = msg
      //   },
      //   rule: (emitter) => emitter == this.$refs.instance
      // })

      this.on({
        event: "widget-update",
        callback: this._updateConfig,
        rule: () => true
      })

      this.on({
        event: "page-start",
        callback: () => {
          this.pageStarted = true;
          this._updateConfig()
          if (this.$refs.instance && this.$refs.instance.onPageStart) this.$refs.instance.onPageStart()
        },
        rule: () => true
      })

      this.on({
        event: "slide-start",
        callback: () => {
          this.pageStarted = true;
          
          // this._updateConfig()
          if (this.$refs.instance && this.$refs.instance.onSlideStart) this.$refs.instance.onSlideStart(this)
        },
        rule: () => true
      })

      this.on({
        event: "before-layout-start",
        callback: () => {
          this.pageStarted = true;
          
          // this._updateConfig()
          if (this.$refs.instance && this.$refs.instance.onLayoutStart) this.$refs.instance.onLayoutStart(this)
        },
        rule: () => true
      })

      this.on({
        event: "page-stop",
        callback: () => {
          if (this.$refs.instance && this.$refs.instance.onPageStop) this.$refs.instance.onPageStop()
        },
        rule: () => true
      })

      this.dataSelectEmitters = this.config.dataSelectEmitters || [];
      this.dataSelectEmitters = (isArray(this.dataSelectEmitters)) ? this.dataSelectEmitters : [this.dataSelectEmitters];
      this.dataSelectEmitters.forEach(emitter => {
        this.on({
          event: "data-select",
          callback: (emitter, data) => {
            if (this.$refs.instance && this.$refs.instance.onDataSelect) this.$refs.instance.onDataSelect(emitter, data)
          },
          rule: emitter
        })
      })

      this.on({
        event: "collapse-all",
        callback: data => {
          // console.log("collapse-all",data)
          const blackList = (data) ? (data.ignore) ? data.ignore : [] : [] 
          if(!blackList.includes(this.config.id)){
            this.collapse()  
          }
        }
      })

      this.on({
        event: "expand-all",
        callback: data => {
          // console.log("expand-all",data)
          const blackList = (data) ? (data.ignore) ? data.ignore : [] : [] 
          if(!blackList.includes(this.config.id)){
            this.expand()  
          }
        }
      })

    }

  },

  watch: {

    config() { this._updateConfig() },

    "config.dataSelectEmitters"(value) {
      this.dataSelectEmitters = value || []
      this._removeSubscriptions()
      this._initSubscriptions()
      this._updateConfig()
    }

  },

  created() {
    this.config.activated = this.config.activated || false
    this.config.data = this.config.data || {}
    this.config.data.script = this.config.data.script || ""
    this._initSubscriptions()
    this._updateConfig()
    // console.log("$create", this._uid, this.config.id, this.config.type)
  
  },

  beforeDestroy() {
    // this.off()
    this._removeSubscriptions()
    // console.log("$off", this._uid)
  }
}
