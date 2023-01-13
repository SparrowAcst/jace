<template>
  <v-simple-table v-if="options">
    <template v-slot:default>
      <tbody>
        <tr
          v-for="(row, rowIndex) in options.rows" :key="rowIndex" 
          :class="(row.decoration) ? row.decoration.classes +' '+ ((row.selected) ? ((options.decoration) ? options.decoration.activeClass : 'selected'):'') : ((row.selected) ? ((options.decoration) ? options.decoration.activeClass : 'selected'):'')" 
          :style="(row.decoration) ? row.decoration.style : ''"
        >

          <td 
            v-for="(col, colIndex) in row.cols" 
            :key="colIndex" 
            :class="(col.decoration) ? col.decoration.classes +' '+ ((col.selected) ? ((options.decoration) ? options.decoration.activeClass : 'selected'):'') : ((col.selected) ? ((options.decoration) ? options.decoration.activeClass : 'selected'):'')" 
            :style="(col.decoration) ? col.decoration.style : ''" 
          >
            
                <component v-if="components[`${col.type}Input`]" 
                  :class="(col.decoration) ? col.decoration.classes : ''" 
                  :style="(col.decoration) ? col.decoration.style : ''"
                  :is="`${col.type}Input`" 
                  :options="col"
                  :getPropertyValue="getPropertyValue"
                  @push-button="pushButton"
                  @push-ref="pushRef"
                  @push-menu="pushMenu"
                  @change="inputData"
                  @select="selectItem({row:rowIndex,col:colIndex})"

                ></component>

                <span v-else>&nbsp;</span>        
           
           </td>     
        </tr>
      </tbody> 
    </template> 
  </v-simple-table>      
</template>          

<script>

import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import { find, isUndefined, isArray, isObject, isNull, isString, includes, zipObject, keys, isEqual, extend, cloneDeep, get, set } from "lodash"

<<< if( jace.mode == "development") { >>>

import ListConfig from "./list-config.vue"

import components from "@/components/core/ext/inputs"

<<< } >>>


export default {

  name: "list-widget",

  icon: "mdi-format-list-text",

  mixins: [djvueMixin, listenerMixin],

  components,

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

      let event = sender.options.data.event || "input-data"
        this.emit(event, sender, data)
   
    },

  setData(data){
    this.data = data
    this.onUpdate({data:null})
  },

  selectItem(indexes){
    if(this.options){
        // console.log(indexes)
    
        this.options.rows.forEach(row => {
          row.selected = false
          row.cols.forEach( col => {
            col.selected = false
          }) 
        })

        this.selection = indexes
        this.options.rows[this.selection.row].selected = true
        this.options.rows[this.selection.row].cols[this.selection.col].selected = true
        // this.options.data[this.selection.row].name = "SELECTED" 
        // this.onUpdate({data:null})

    }

  },

   pushButton(sender){
        let event = (sender.options.data) ? sender.options.data.event || "push-ref" : "push-ref"
        this.emit(event, this.options, sender.options)
      },
    
    pushRef(sender){
        let event = (sender.options.data) ? sender.options.data.event || "push-ref" : "push-ref"
        this.emit(event, this.options, sender.options)
      },
    
    pushMenu(sender){
        let event = sender.event || "push-menu"
        this.emit(event, this.options, sender)
      },

    getPropertyValue(v){
      
      if((/^\{\{.+\}\}$/gi).test(v))
        return get(this, v
                  .replace("{{","")
                  .replace("}}","")
                  .replace("$rowIndex", this.$rowIndex)
                  .replace("$colIndex", this.$colIndex)
                  .trim()
        )

      if((/^\$\{.+\}$/gi).test(v)) {
        
        let f = `(${v
                  .replace("${","")
                  .replace(/}$/gim,"")
                  .replace(/\$rowIndex/gm, this.$rowIndex)
                  .replace(/\$colIndex/gm, this.$colIndex)
                })`
        
        
        return eval(f)
      }
      

      return v  
    },

    setPropertyValue(v, data){
      if((/^\{\{.+\}\}$/gi).test(v)) {
        

        set( this, get(this, v
            .replace("{{","")
            .replace("}}","")
            .replace("$rowIndex", this.$rowIndex)
            .replace("$colIndex", this.$colIndex)
            .trim()), 
          data 
        )
      } else {
        v = data
      }

    },
  
    applyContext(data){
      if(isObject(data)){
        keys(data).forEach( key => {
          data[key] = this.applyContext(data[key])
        })
      } else if(isArray(data)){
        data.forEach( d => {
          d = this.applyContext(d)
        })
      } else data = this.getPropertyValue(data)
      return data
    },


    resolve(event, item){
      // console.log("click", this)
      event = event || "select-item"
      this.emit(event, {sender:this, data:item}) 
    },


    onUpdate({ data }, mode) {

      
        this.options = cloneDeep(this.config.data.embedded)
        this.options.data = this.data

        if( this.options.template && this.options.appliedTo ){
          let d = this.getPropertyValue(this.options.appliedTo)
          if(d && isArray(d)){
            this.options.rows = []
            d.forEach((dd, rindex) => {
              this.$rowIndex = rindex
              let row = cloneDeep(this.options.template)
              row.cols.forEach( (c, cindex) => {
                this.$colIndex = cindex
                c = this.applyContext(c)
              })
              this.options.rows.push(row)
            })
          }
        }

        return
      
    },


<<< if( jace.mode == "development") { >>>

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(ListConfig, { width: "90%" }, { config: widgetConfig })
    }

<<< } >>>

  },


  props: ["config"],

  data:() => ({
    components,
    options:null,
    data:[],
    selection:{
      row:-1,
      col:-1
    }
  }),

  // computed: {
  //   options() {
  //     return this.config.data.embedded
  //   }
  // },


  mounted() { this.$emit("init") }

}



</script>

<style scoped>
  a:hover{
    text-decoration: underline !important;
    font-weight: inherit !important;
  }
</style>
