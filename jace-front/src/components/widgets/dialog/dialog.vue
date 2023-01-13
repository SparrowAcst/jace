<template>
  <v-card flat class="pa-0 ma-0" v-if="!isProductionMode || (opts && opts.activated)">
    <div  class="d-flex justify-end align-center primary lighten-3 white--text pa-2 headline font-weight-light" :class="(opts && opts.dialog)? opts.dialog.classes : ''">
       
       <v-icon v-if="opts && opts.dialog && opts.dialog.icon" color="white">{{opts.dialog.icon}}</v-icon>
       
      <div 
        v-if="opts && opts.dialog"
        class="pl-2"
      > 
        {{opts.dialog.title || ''}}
      </div>  
      <v-spacer></v-spacer>
      <v-btn
        v-if="submit" 
        icon 
        text
        @click.stop="submit(null)"
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>

      <v-btn
        v-else 
        icon 
        text
        @click.stop="preview"
      >
        <v-icon color="white">mdi-launch</v-icon>
      </v-btn>
        
    </div>

    <!-- <pre v-if="opts" class="caption" style="lineHeight:1">
      {{opts}}
    </pre>  
 -->
    <div v-if="opts" 
      :class="(opts.decoration) ? opts.decoration.classes : ''" 
      :style="(opts.decoration) ? opts.decoration.style : ''"
    >

      <div v-for="(row, rowIndex) in opts.rows" :key="rowIndex" 
        :class="(row.decoration) ? row.decoration.classes : ''" 
        :style="(row.decoration) ? row.decoration.style : ''"
      >
        <component v-if="components[`${col.type}Input`]" v-for="(col, colIndex) in row.cols" :key="colIndex" 
          :class="(col.decoration) ? col.decoration.classes : ''" 
          :style="(col.decoration) ? col.decoration.style : ''"
          :is="`${col.type}Input`" 
          :options="col"
          :getPropertyValue="getPropertyValue"
          @push-button="pushButton"
          @push-ref="pushRef"
          @push-menu="pushMenu"
          @change="inputData"
          @submit = "submitDialog"

        ></component>        
      </div>  
    </div>  
</v-card>

</template>
<script>
import { find, isUndefined, isArray, isNull, isString, includes, zipObject, keys, isEqual, extend, get, set, cloneDeep } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import { v4 } from "uuid/dist"

<<< if( jace.mode == "development") { >>>
  
  import configDialog from "./dialog-config.vue";

<<< } >>> 

import selfComponent from "./dialog.vue"

import components from "@/components/core/ext/inputs"


import moment from "moment"

import { last } from "lodash"

export default {

  name: "dialog-widget",

  icon: "mdi-form-select",

  mixins: [djvueMixin, listenerMixin],

  props:["settings", "submit"],

  components,


  data: () => ({
    components,
    opts: null
    
  }),


  methods: {

    inputData(sender, data){
      if(
        !isUndefined(sender.options) 
        && !isUndefined(sender.options.data) 
        && !isUndefined(sender.options.data.value)
      ) {
        if((/^\{\{.+\}\}$/gi).test(sender.options.data.value)) {
          set( this, sender.options.data.value.replace("{{","").replace("}}","").trim(), data )
        } else {
          sender.options.data.value = data
        }
      }   
    },

    pushButton(sender){
        let event = (sender.options.data) ? sender.options.data.event || "push-ref" : "push-ref"
        this.emit(event, this.opts, sender.options)
      },
    
    pushRef(sender){
        let event = (sender.options.data) ? sender.options.data.event || "push-ref" : "push-ref"
        this.emit(event, this.opts, sender.options)
      },
    
    pushMenu(sender){
        let event = sender.event || "push-menu"
        this.emit(event, this.opts, sender)
      },

    // getPropertyValue(v){
    //   return ( (/^\{\{.+\}\}$/gi).test(v) ) ? get(this, v.replace("{{","").replace("}}","").trim()) : v  
    // },

    getPropertyValue(v){
      
      if((/^\{\{.+\}\}$/gi).test(v))
        return get(this, v
                  .replace("{{","")
                  .replace("}}","")
                  .trim()
        )

      if((/^\$\{.+\}$/gi).test(v)) {
        
        let f = `(${v
                  .replace("${","")
                  .replace(/}$/gim,"")
                })`
        
        
        return eval(f)
      }
      

      return v  
    },

    setPropertyValue(v, data){
      if((/^\{\{.+\}\}$/gi).test(v)) {
        set( this, get(this, v.replace("{{","").replace("}}","").trim()), data )
      } else {
        v = data
      }
    },

    
    onUpdate(sets, mode) {
      if(!sets) return
      if( mode ){
        if (mode.override) {
          set(this, mode.override, sets.data)
        }
        if (mode.extend) {
          set(this, mode.extend, extend(get(this, mode.extend), sets.data))
        }
      } else {
        this.opts = sets.data || this.opts  
      }
      let temp = extend({},cloneDeep(this.opts))
      this.opts = null
      this.$nextTick(() => { this.opts = temp})
    },

    updateForce(){
      clnsole.log("updateForce")
      let temp = extend({},cloneDeep(this.opts))
      this.opts = null
      this.$nextTick(() => { this.opts = temp})
    },

    preview(){
        let dlg = this.$dialogWidgetManager.showAndWait(selfComponent, this.opts.dialog, extend(this.opts,{activated: true}) )
        
        return dlg
    },

    showAndWait(sets, mode){
        
        
        if(sets){
        
          if( mode ){
            if (mode.override) {
              set(this, mode.override, sets.data)
            }
            if (mode.extend) {
              set(this, mode.extend, extend(get(this, mode.extend), sets.data))
            }
          } else {
            this.opts = sets.data || this.opts  
          }
        
        }
        // console.log(this.config, this.opts)
        this.opts._dlgId = v4() 
        let dlg = this.$dialogWidgetManager.showAndWait(selfComponent, this.opts.dialog, extend(cloneDeep(this.opts),{activated: true}) )
                .then( res => {
                  this.opts.activated = false
                  return res
                })

        return dlg        
    },

    close(){
      this.emit("close-dialog",this.opts._dlgId )
    },

    submitDialog(action){
      this.opts.activated = false
      if( action == "reject"){
        this.submit(null)
      } else {
        this.submit(this.opts)
      }
    },

<<< if( jace.mode == "development") { >>>

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(configDialog, { width: "90%" }, { config: widgetConfig })
    },

<<< } >>>    

  },


  created() {
    this.opts = this.settings
    this.on({
      event:"close-dialog",
      callback: (dialogId) => {
        // console.log("close-dialog",dialogId, this)
        if(this.opts._dlgId != dialogId) return
        if(this.submit) this.submit(null)  
      }
    })
    
  },

  mounted() { this.$emit("init") },
}

</script>
