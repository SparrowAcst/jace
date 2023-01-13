<template>
  <<< if( jace.mode == "development") { >>>
  <v-card 
    :class="{widget:!isProductionMode}" 
    ma-1 
    flat 
    :style="`background:transparent; ${(isActive) ? 'border:1px solid #aeaeae;':''} visibility: ${visibility}`"
  >

    <v-toolbar dark flat height="32px" :color="(!hasError)?'primary darken-1':'error darken-1'" v-if="!isProductionMode">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
        <v-avatar class="handle" size="32" tile slot="activator" v-on="on">
          <v-icon>{{config.icon}}</v-icon>
        </v-avatar>
      </template>
        <span>{{config.type}}</span>
      </v-tooltip>
      <v-toolbar-title class="body-2 white--text font-weight-light">{{config.id}} "{{config.name}}" {{(!collapsed) ? "EXPANDED" : "COLLAPSED"}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon small text @click.stop="configure()" :disabled="!reconfigurable" class="white--text body-2">
        <v-icon class="body-2">mdi-square-edit-outline</v-icon>
      </v-btn>  
      
      <v-btn icon small text @click.stop="cloneWidget()" class="white--text  body-2">
        <v-icon  class="body-2">mdi-content-copy</v-icon>
      </v-btn>  
      
      <v-btn icon small text @click.stop="deleteWidget()" class="white--text  body-2">
        <v-icon  class="body-2">mdi-close</v-icon>
      </v-btn>  

    </v-toolbar>
      <!-- <pre v-if="!isProductionMode && data && data.message" class="error lighten-2 white--text caption pa-2">
        Exception
        {{data.message}}
      </pre> -->
      <pre v-if="!isProductionMode && hasError" class="error--text caption pa-1" style="box-shadow: 0 0 9px 2px;">
        {{errorMessage}}
      </pre>

     <!--  <div class="accent white--text caption">{{uid}}</div> -->
     <!--  <div class="row">
      <v-spacer></v-spacer>  
      <v-btn v-show="isActive" @click="focusWidget" icon class="mx-3" style="color: #aeaeae !important;">
        <v-icon>mdi-resize</v-icon>
      </v-btn>
      <v-btn v-show="!isActive" icon class="mx-3" style="color: #aeaeae !important;">
      </v-btn>
      </div> -->  
      <div class="d-flex justify-center">
      <component  
        v-if="config.type" 
        v-show="!hasError && !hidden"
        :style="widgetStyle" 
        :is="config.type" 
        ref="instance" 
        :config="config" 
        :listener="widget"
        @init="onInit">
      </component>
      </div>
  </v-card>
  <<< } else { >>>
  <v-card  ma-1 flat style="background:transparent;">
      <component  
        v-if="config.type" 
        :style="widgetStyle" 
        :is="config.type" 
        ref="instance" 
        :config="config"
        :listener="widget" 
        @init="onInit">
      </component>        
  </v-card>
  <<< } >>>

</template>
<script>

// import requiredWidgets from "@/components/core/widget-loader.js"
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import widgetMixin from "@/mixins/core/widget.mixin.js";
import FocusDialog from "@/components/dialogs/config/parts/dialogs/focus-widget-dialog.vue";

<<< if(jace.mode == "development") { >>>
  import components from "@/components/widgets"
<<< } >>>

import { find } from "lodash"


<<< 
  if(jace.mode == "publication"){
      let components = require(jace.resolve("../widgets/widgets.js"))
      jace.insert(
        "let components = { \n" + jace.types().map( w => `"${w}" : () => import("${components[w]}")`).join(",\n")+"\n}\n"
      )  
  }
>>>
// let components = requiredWidgets();

// console.log("LOAD WIDGET COMPONENT")
// console.log(components)

export default {

  mixins: [djvueMixin, widgetMixin],

  name: "dj-widget",

  props: ["type", "holder"],

  components,

  data: () => {
    return {
      collapsed: false,
      hidden: false,
      hasError: false,
      isActive: false,
      _widgetWrapper:true,
      widget:null,
      rendered: false,
      reactiveContext:{}
    }
  },

  created(){
    this.widget = this
  },

  computed: {
    uid(){ return this._uid },

    visibility(){
      return (this.isProductionMode)
              ? (this.rendered && !this.collapsed) ? "inherit" : "hidden"
              : "inherit"
    },
    
    globalConfig() {
     return find(this.app.currentPage.holders[this.holder].widgets, (item) => item.id == this.config.id)
    },
    widgetStyle() {
      if(!this.config.options.style) return 'width:100%;'
      try {
        let extractor = /(widget-style {)[\n\r]*([\W\w]*)[\n\r]*(})/m
        return (extractor.test(this.config.options.style)) 
                  ? 'width:100%;'+ this.config.options.style.match(extractor)[2] 
                  : 'width:100%;' //this.config.options.style
      }  catch(e) {
        return 'width:100%;'
      }
    }
  },

  methods: {

    <<< if (jace.mode == "development") {>>>
    configure() {
      // console.log("emit reconf", this)
      this.emit("widget-reconfigure", this)
    },

    cloneWidget() {
      this.emit("widget-clone", this)
    },

    deleteWidget() {
      this.emit("widget-delete", this)
    },
    <<< } >>>

    onInit(){
      this._updateConfig();
      this.onInitChild();
    },

    mouseOver(){
      let vm = this
      // this.timeout = setTimeout(() => {
        vm.isActive = (this.config.activated) ? true : false  
      // }, 500)
      
    },
    
    mouseLeave(){
      // clearTimeout(this.timeout)
      this.isActive = false
    },

    focusWidget(){
      this.$dialogManager.showAndWait(FocusDialog, { width: "75%", height: "75%"}, { widget: this.config })
    }

  },

  updated() {
    this.rendered = true
  },
  
  mounted() {
    if( ! this.isProductionMode ){
      this.rendered = true  
    }
  }

}



</script>
<style>
.widget {
  border: 1px solid #bbb !important;
}

.handle {
  cursor: pointer;
}

</style>
