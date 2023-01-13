<template>
  <div>
      <tom 
        v-if="data"
        :node="data"
        :options = "options"
        @show-tooltip = "showTooltip"
        @hide-tooltip = "hideTooltip"
        @show-menu = "displayMenu"
        @select="onSelect"
      ></tom>
      
      <v-tooltip
        top 
        :position-x="tt_x"
        :position-y="tt_y"
        :value="showTooltipModel"
        color="rgba(0,0,0,0)"
        open-delay=500
        transition="fade-transition"
      >
        <div 
          class="caption pa-2 secondary--text" 
          style="
            border-radius:5px; 
            background:#fff9c4; 
            background-opacity=0.75;
            box-shadow: 0 3px 3px -1px rgba(0,0,0,.2),0 6px 5px 0 rgba(0,0,0,.14),0 1px 9px 0 rgba(0,0,0,.12)!important;
          "
            v-html="tooltipText"
          >
        </div>
      </v-tooltip>

      <v-menu
        v-model="showMenu"
        :position-x="menu_x"
        :position-y="menu_y"
        absolute
        offset-y
        dense
      >
       
      <v-list dense>
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in menu"
                :key="i"
                @click="item.action(selection)"
                
              >
                <v-list-item-icon v-if="!!item.icon" class="mr-1">
                  <v-icon :style="`color:${tinycolor(item.color || '#aaaaaa').darken(30).toHexString()}`" v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
            
          
  </div>    
</template>

<script>
import { find, findIndex, extend, first, last, slice, sortBy, isFunction, isArray } from "lodash"
import tom from "./tom.vue"
import { v4 } from "uuid/dist"
import { forEachNode, findNode, getSiblings, getParent } from "./utils.js"
import tinycolor from "./tinycolor.js"



export default {

  name: "annotator",

  props: ["data","options", "id"],

  components: {
    tom
  },


  data() {
      return {
          
          selection: [],
          selectionMode:"singly",
          _selectionOrigin:null,
          
          showMenu: false,
          menu: [],
          menu_x: 0,
          menu_y: 0,

          showTooltipModel: false,
          tooltipText:"",
          tt_x:0,
          tt_y:0,
          tt_stack:[],
          tinycolor
          
      }
  },

  watch:{

    data(value){
      if(value) 
        forEachNode(value, node => {
          node.id = `${this.id}-${v4()}`
        })
    },
    

    selection(value){
      
      if(!value) return
      
      forEachNode(this.data, node => {
       let e = document.getElementById(node.id) 
       if(e) e.classList.remove("selected")
       node.selected = false
      })


      value.forEach( node => {
        let e = document.getElementById(node.id) 
        if(e) e.classList.add("selected")
        node.selected = true
      })

      this.$emit("select", value)
    }

  },
  
  methods: {
    
    select(selection){
      this.selection = isArray(selection) ? selection : [selection]
    },
    
    onSelect(e) {
      
      let options = this.options()
      if(!options.availableSelectionMode) return
      if( !options.availableSelectionMode().includes(this.selectionMode) ) return

      if (this.selectionMode == "bundly"){
         if (!this._selectionOrigin) {
            this._selectionOrigin = e.sender.node
            this.selection = [e.sender.node]
            return
         }
         
        let siblings = getSiblings(e.sender.node, this.data)
        this.selection = this.selection.filter( node => find(siblings, item => item.id == node.id))
        this.selection.push(e.sender.node)
        
        if(this.selection.length == 1){
          this._selectionOrigin = e.sender.node
          return
        }

        let originIndex = findIndex(siblings, item => item.id == this._selectionOrigin.id)
        let selectionIndex = findIndex(siblings, item => item.id == e.sender.node.id)
        
        this.selection = []
        
        
        if( originIndex <= selectionIndex) {
          for(let i=originIndex; i <= selectionIndex; i++) {
            if( options.selectable(siblings[i]) && options.selectable(siblings[i]).includes("singly") ){
              this.selection = []
            } else {
              this.selection.push(siblings[i])
            }
          }  
        } else {
          for(let i=originIndex; i >= selectionIndex; i--) {
            if( options.selectable(siblings[i]) && options.selectable(siblings[i]).includes("singly") ){
              this.selection = []
            } else {
              this.selection.unshift(siblings[i])
            }
          }
        }
        return
      }

      this._selectionOrigin = e.sender.node

      let selectionPos = findIndex(this.selection, node => node.id == e.sender.node.id) 
      if( selectionPos >= 0){
        this.selection.splice(selectionPos, 1)
        this._selectionFrom = last(this.selection)

      } else {
        switch (this.selectionMode) {
          
          case "singly":
            this.selection = [e.sender.node]
            break

          case "selectively":
            this.selection.push(e.sender.node)
            break            
        }  
      }

    },


    displayMenu(e) {
      
      let options = this.options()
    
      if(!options.menu || !e.sender.node.selected) return
      let menu = options.menu(e.sender.node)  
      
      if(!!menu) {
        this.menu_x= e.position.x
        this.menu_y = e.sender.$el.getBoundingClientRect().bottom+5
        this.menu = menu
        this.$nextTick(() => {this.showMenu = true})
        return  
      }
      
    },

    

    showTooltip(e){
      let options = this.options()
     
      if(options.tooltip && !!options.tooltip(e.sender.node)){
        this.tt_stack.push(e.sender)
        this.tt_x= e.position.x
        this.tt_y = e.position.y 
        this.tooltipText = options.tooltip(e.sender.node)
        this.showTooltipModel = true  
      }
      
    },

    hideTooltip(e){
      let options = this.options()
      
      if(options.tooltip && !!options.tooltip(e.sender.node)){
        if(this.tt_stack.length == 1 ) {
          this.tt_stack = []
          this.showTooltipModel = false  
        } else {
          this.tt_stack.pop()
          let component = this.tt_stack[this.tt_stack.length-1]
          this.tt_x = e.position.x
          this.tt_y = e.position.y 
          this.tooltipText = options.tooltip(component.node)
          this.showTooltipModel = true  
        }
      }  
      
    }
    
  },
  
  
  created(){
    if(this.data)
    forEachNode(this.data, node => {
      node.id = node.id || `${this.id}-${v4()}`
    })
    
    this.$keyController.keydown(["shift"], e  => {
      this.selectionMode = "bundly"
    })

    this.$keyController.keyup(["shift"], e  => {
      this.selectionMode = "singly"
    })

    this.$keyController.keydown(["ctrl"], e  => {
        this.selectionMode = "selectively"
    })

    this.$keyController.keyup(["ctrl"], e  => {
      this.selectionMode = "singly"
    })
  }
  
}

</script>

