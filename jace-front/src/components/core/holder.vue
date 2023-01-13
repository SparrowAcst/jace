<template>
  <<< if (jace.mode == "development") { >>>
  
  <div pa-0 mt-0 class="holder" :class="{producttion:isProductionMode, accepted:isAcceptWidget}">
    <!-- <div class="holder-title">
      <h4 v-if="!isProductionMode"> Widget Holder: {{name}}</h4>
    </div> -->
    <v-layout column wrap>
      <draggable 
        class="list-group" 
        element="div" 
        v-model="widgets" 
        v-bind="dragOptions" 
        :move="onMove" 
        @start="onStartDrag" 
        @end="onEndDrag"
        :style="(isProductionMode) ? 'min-height:0;' : ''"
      >
        <transition-group type="transition" name="holders" tag="div" v-bind:class="{'empty-holder': isEmpty && !isProductionMode}">
          <dj-widget :config="widget" :holder="name" v-for="widget in widgets" :key="widget.id" class="list-group-item" @init="onInitChild"></dj-widget>
        </transition-group>
      </draggable>
    </v-layout>
    <v-layout align-center justify-end row fill-height class="pr-3">
      <v-btn icon small text color="primary" class="ma-0" @click.stop="insert()" v-if="!isProductionMode">
        <v-icon small class="primary--text">mdi-shape-square-plus</v-icon>
      </v-btn>
    </v-layout>
   
  </div>
  
  <<< } else { >>>
  
    <div pa-2 mt-2 class="holder producttion">
    
      <v-layout column wrap pa-0>
        <dj-widget :config="widget" :holder="name" v-for="widget in widgets" :key="widget.id" @init="onInitChild"></dj-widget>
      </v-layout>
    
    </div>
  
  <<< } >>>

</template>
<script>
// import Vue from "vue"
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import listenerMixin from "@/mixins/core/listener.mixin.js"
import initiableMixin from "@/mixins/core/initiable.mixin.js"

// import * as Cookie from "tiny-cookie"

<<< if( jace.mode == "development" ) { >>>
  import { find, findIndex, cloneDeep, isArray } from "lodash"
  import draggable from "vuedraggable";
  import insertWidgetDialog from "@/components/dialogs/config/insertWidgetDialog.vue"
<<< } >>>

import Widget from "@/components/core/widget.vue"

// console.log("HOLDER WIDGET", Widget)

// let accepted = null;

// let toTree = (object) =>

//   _.keys(object).map(key => {
//     return {
//       name: (_.isObject(object[key])) ? key : `${key}: ${object[key]}`,
//       children: (!_.isObject(object[key])) ? undefined : toTree(object[key])
//     }
//   })


export default {

  mixins: [djvueMixin, listenerMixin, initiableMixin],

  components: {
    "dj-widget": Widget
<<< if( jace.mode == "development" ) { >>>
    ,draggable
<<< } >>>  
  },

  data() {
    return {
      isAcceptWidget: false
    }
  },

  props: ["name", "type"],

  computed: {

<<< if( jace.mode == "development" ) { >>>

    isEmpty() { return this.widgets.length == 0 },

    dragOptions() {
      return {
        animation: 150,
        group: {
          name: "holders"
        },
        ghostClass: "ghost",
        dragClass: "drag",
        handle: ".handle"
      };
    },
<<< } >>>    

    widgets: {
      get() {
        if (this.type == "skin") return this.app.skin.holders[this.name].widgets
        return (this.app.currentPage.holders[this.name]) ? this.app.currentPage.holders[this.name].widgets : []
      },
      set(newValue) {
        this.setHolderContent({
          page: (this.type == "skin") ? null : this.app.currentPage,
          holder: this,
          widgets: newValue
        })
      }
    }



  },


  methods: {

    onBeforeInit() {
      if (this.type == "skin") {
        this._waitList = this.app.skin.holders[this.name].widgets.map(item => item.id)
      } else {
        if(this.app.currentPage.holders[this.name]){
          this._waitList = this.app.currentPage.holders[this.name].widgets.map(item => item.id)
        } else {
          this._waitList = []
        }
      }
      if (this._waitList.length == 0) {
        this.$emit("init", this)
      }

    },

    onChildsInitiated() {
      this.$emit("init", this.name)
    },

<<< if( jace.mode == "development" ) { >>>

    insert() {

      this.$dialogManager.showAndWait(insertWidgetDialog,{width:"80%"})
        .then(initialWidgetConfig => {
          if (initialWidgetConfig) {
            
            initialWidgetConfig.id = this.randomName()
            this.widgets.push(this.$djvue.extend({}, initialWidgetConfig))
            // this.setHolderContent({
            //   page: (this.type == "skin") ? null : this.app.currentPage,
            //   holder: this,
            //   widgets: this.widgets
            // })
            this.setNeedSave(true)
          }
        })

    },


    isHoldWidget(widget) {
      return !!find(this.widgets, w =>  widget.config && w.id == widget.config.id)
    },

    onStartDrag() {
      this.emit("holder-accept", this)
      this.isDragging = true
    },

    onEndDrag() {
      this.emit("holder-accept", null)
      this.isDragging = false
      this.setNeedSave(true)
    },

    onMove({ relatedContext }) {
      this.emit("holder-accept", relatedContext.component.$parent)
      return true
    }

<<< } >>>    

  },

  beforeDestroy() { this.off() },


  created() {

    // if(!this.$dialog._components.insertWidgetDialog){
    //   this.$dialog.component('insertWidgetDialog', insertWidgetDialog)
    // }
    
<<< if( jace.mode == "development" ) { >>>

    this.on({
      event: "holder-accept",
      callback: (holder) => { this.isAcceptWidget = holder && (holder.name == this.name) }
    })

    this.on({
      event: "widget-clone",
      callback: (cloned) => {
        if(!this.isHoldWidget(cloned)) return
        // console.log("on clone", this)
        let widgetIndex = findIndex(this.widgets, w => w.id == cloned.config.id);
        // console.log("ORIGINAL", cloned, cloned.config)
        // console.log("ORIGINAL INDEX", widgetIndex, this.widgets[widgetIndex])
        // console.log(this.widgets)
        
        let newWidget = cloneDeep(this.widgets[widgetIndex])
        // console.log("CLONE", newWidget)
       
        newWidget.id = this.$djvue.randomName();
        newWidget.name += "_clone_" + newWidget.id;
        this.widgets.splice(widgetIndex + 1, 0, newWidget)

      },
      rule: this.isHoldWidget
    })

    this.on({
      event: "widget-delete",
      callback: (deleted) => {
        if(!this.isHoldWidget(deleted)) return
        // if( deleted._delete() ){
          let widgetIndex = findIndex(this.widgets, w => w.id == deleted.config.id);
          // console.log(widgetIndex)
          if (widgetIndex > -1) this.widgets.splice(widgetIndex, 1)
          this.setNeedSave(true)  
        // }
      },
      rule: this.isHoldWidget
    })
    
    this.on({
      event: "holder-import-widgets",
      callback: (emitter, widgets) => {
       if( find(this.widgets, w => w.id == emitter.config.id)) {

          console.log("holder-import-widgets", this.widgets, emitter, widgets)

          widgets = ( isArray(widgets) ) ? widgets : [widgets]
          this.widgets = this.widgets.concat(widgets)
          this.setNeedSave(true) 
       }
         
     
      },
      rule: this.isHoldWidget
    })




    this.on({
      event: "holder-update-widget-config",
      callback: (emitter, context) => {

        // console.log("accept holder-update-widget-config", context.newConfig)

        let widgetIndex = findIndex(this.widgets, w => w.id == context.widget.config.id);
        let newWidgets = JSON.parse(JSON.stringify(this.widgets));
        newWidgets[widgetIndex] = context.newConfig;
        // console.log("Holder update ", newWidgets[widgetIndex])
        this.widgets = newWidgets;
        this.setNeedSave(true) 

      },
      rule: this.isHoldWidget
    })
    
<<< } >>>    

  },

<<< if( jace.mode == "development" ) { >>>

  watch: {

    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }

  }

<<< } >>>  

}

</script>
<style scoped>
.drag {
  opacity: 0;
}

.empty-holder {
  border: 2px dashed #bbb !important;
  min-height: 100px !important;
  background-color: #eee !important;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0 !important;

}

.list-group {
  min-height: 20px;
  width:100%;
}

.list-group-item {}

.list-group-item i {}

.container.holder.pa-2 {
  border: 2px solid #bbb !important;
}

.container.holder.pa-2.producttion {
  /* display: none; */
  margin-top: 1em !important;
  border: none !important;
}

.holder-title {
  background: #fafafa;
  margin-top: -1.3em;
  color: #bbb;
  width: fit-content;
  padding: 0em 1em;
}

.container.holder.pa-2.accepted {
  border-color: #00796B !important;
}

.accepted .empty-holder {
  border-color: #00796B !important;
}

.accepted h4 {
  color: #00796B;
}

</style>
