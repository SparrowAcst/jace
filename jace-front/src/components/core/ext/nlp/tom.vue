<template>
      <component 
        :id="node.id" 
        :is="(node.type == 'text') ? 'text-node' : (node.type == 'paragraph') ? 'paragraph-node' : (node.type == 'DIFF') ? 'diff': (node.type == 'BRANCH') ? 'branch' : 'node'" 
        class="tom no-select" 
        :class="`${node.type} ${(selectable) ? 'selectable' : ''} ${(!!node.childs) ? 'node-container': ''} ${(selected) ? 'selected' : ''} ${classes}`"
        :style="nodeStyle"
      >
          <span
            @mouseenter = "mouseEnter"
            @mouseleave = "mouseLeave"
            @contextmenu.prevent="contextMenu"
            @click.stop = "select" 
          >
            <span 
              v-if="labeled"
              class="annotation"
              :style="labelStyle"
            >
              {{label}}
            </span>
          
        
            <tom 
              v-if="node.childs" 
              v-for="c in node.childs" 
              :node="c"
              :parent="node" 
              :options="options"
              @show-tooltip = "propagateShowTooltip"
              @hide-tooltip = "propagateHideTooltip"
              @show-menu = "propagateShowMenu"
              @select = "propagateSelect"
            ></tom>
            {{!(node.childs) ? (node.value == ' ') ? '&nbsp;' : node.value : ''}}
          </span>
      </component>
    
</template>

<script>

import tinycolor from "./tinycolor.js"

export default {

  name: "tom",

  props: ["options", "node", "parent"],

  components: {
    TextNode : () => import("./text-node.vue"),
    ParagraphNode : () => import("./paragraph-node.vue"),
    Node : () => import("./node.vue"),
    Diff: () => import("./diff.vue"),
    Branch: () => import("./branch.vue")
  },

  computed: {
    selectable(){
      if(!this.options) return null
      let options = this.options()
      if (!options.selectable) return null
      // if( this.parent &&  !!options.selectable(this.parent) && options.selectable(this.parent).includes("wrap") ) return null  
      return options.selectable(this.node)
    },

    selected(){
      return this.node.selected
    },

    labeled(){
      if(!this.options) return null
      let options = this.options()
      return options.label && !!options.label(this.node)
    },

    label(){
      if(!this.options) return null
      let options = this.options()
      return (options.label) ? options.label(this.node) : ""
    },

    classes(){
      if(!this.options) return null
      let options = this.options()
      return (options.classes) ? options.classes(this.node) : "" 
    },

    labelStyle() {
      if(!this.options) return null
      let options = this.options()
      let base = (options.color) ? options.color(this.node) : "#ffffff"
      let tc = tinycolor(base).darken(50).toHexString()
      let bdc = tinycolor(base).darken(10).toHexString()
      return `color:${tc}; border-color:${bdc};`
    },

    nodeStyle() {
      if(!this.options) return null
      let options = this.options()
      let base = (options.color) ? options.color(this.node) : "#ffffff"
      return `background: ${(this.node.type =="DIFF") ? base : base}; border-color:${tinycolor(base).darken(50).toHexString()};`
    }
    

  },  
  
   data() {
      return {
          tooltip:true,
      }
  },
  methods: {
    
    propagateShowTooltip(e){
      this.$emit("show-tooltip", e)
    },

    propagateHideTooltip(e){
      this.$emit("hide-tooltip", e)
    },

    propagateShowMenu(e){
      this.$emit("show-menu", e)
    },

    propagateSelect(e){
      let options = this.options()
      
      if( options.selectable 
          && options.selectable(this.node) 
          && options.selectable(this.node).includes("wrap")
      ){
        this.$emit("select", {sender: this})  
      } else {
        this.$emit("select", e)  
      }
      
    },

    emitMessage(msg, el){
      this.$emit(msg, {
        sender: this,
        position: {
          x: el.clientX,
          y: el.clientY
        }
      })
    },

    contextMenu(e) {
      this.emitMessage("show-menu", e)
    },

    mouseEnter(e) {
      this.emitMessage("show-tooltip", e)
    },
    
    mouseLeave(e) {
      this.emitMessage("hide-tooltip", e)
    },

    select(){
      this.emitMessage("select", this)
    }
    

  }
  
}

</script>

<style scoped>

  .selectable.selected {
    /*border:2px solid !important;
    margin: 0 0.25em 0 0;
    padding:0 0.25em;
*/
    border: 2px solid #607D8B !important;
    margin: 0 0.25em 0 0;
    padding: 0 0.25em;
    background: #cfd8dc;
  }

  .selectable {
      cursor:pointer;
      /*background:#ffffff;*/
      /*border: solid 1px;*/
  }

  .annotation {
      border: 2px solid;
      border-radius: 5px;
      font-size: 0.6em;
      font-weight: 900;
      padding: 0em 0.5em;
      margin: 0em 0.5em 0.1em 0.5em;
      background: white;
      vertical-align: middle;
      display: inline-block;
      line-height: 1.2;
  }

  .tom {
    /*margin: 0 0.25em 0 0;*/
    /*padding:0 0.25em;*/
  }

  .node-container {
    /*padding: 0.3em;*/
    /*line-height: 2;*/
  }

  .no-select,
  .no-select:focus {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      outline-style: none; /* Internet Explorer  */
  }

</style>
