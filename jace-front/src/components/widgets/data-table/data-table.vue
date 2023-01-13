<template>
    <div v-if="options">
    <v-data-table
      v-if = "headers"
      v-model = "selected"
      :items-per-page = "-1"
      :show-select = "(options.decoration) ? (getPropertyValue(options.decoration.selectBy)) ? true : false : false"
      :item-key="(options.decoration) ? getPropertyValue(options.decoration.selectBy) : null"
      :loading = "(options.decoration) ? getPropertyValue(options.decoration.loading) : false"
      :loading-text="(options.decoration) ? getPropertyValue(options.decoration.loadingText) : ''"
      :headers="headers"
      :items="items"
      :style="(options.decoration) ? getPropertyValue(options.decoration.style) : ''"
      :class="(options.decoration) ? getPropertyValue(options.decoration.classes) : ''" 
      :dense = "(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
      hide-default-footer
    >
     

      <template v-for="(col, index) in headers" v-slot:[`item.${col.value}`]="{ item }" >
     
        <div v-if = "item[col.value].html" v-html="getPropertyValue(item[col.value].html)"></div>
        
        <!-- <div v-if = "item[col.value].component"> -->
          <component v-if=" item[col.value].component && components[`${item[col.value].component.type}Input`]" 
            :class="(item[col.value].component.decoration) ? getPropertyValue(item[col.value].component.decoration.classes) : ''" 
            :style="(item[col.value].component.decoration) ? getPropertyValue(item[col.value].component.decoration.style) : ''"
            :is="`${item[col.value].component.type}Input`" 
            :options="item[col.value].component"
            :getPropertyValue="getPropertyValue"
            @push-button="pushButton"
            @push-ref="pushRef"
            @push-menu="pushMenu"
            @change="inputData"

          ></component>
        <!-- </div> -->

        <div v-if = "!item[col.value].html && !item[col.value].component" class="caption"> {{ getPropertyValue(item[col.value]) }} </div>
     
      </template>
      
    </v-data-table>

  </div>

</template>

<script>
import { find, isUndefined, isArray, isNull, isString, includes, zipObject, keys, isEqual, extend, get, set } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";


  
import configDialog from "./data-table-config.vue";
import moment from "moment"
import components from "@/components/core/ext/inputs"


export default {

  name: "data-table-widget",
  icon: "mdi-grid",
  mixins: [djvueMixin, listenerMixin],

  components,

  data: () => ({
    options: null,
    headers:[],
    items:[],
    selected:[],
    components
  }),


  methods: {


      inputData(sender, data){
      // console.log("IG Input data",sender,data)
      if(
        !isUndefined(sender.options) 
        && !isUndefined(sender.options.data) 
        && !isUndefined(sender.options.data.value)
      ) {
        if((/^\{\{.+\}\}$/gi).test(sender.options.data.value)) {
          console.log(sender.options.data.value.replace("{{","").replace("}}","").trim())
          set( this, sender.options.data.value.replace("{{","").replace("}}","").trim(), data )
        } else {
          if((/^\$\{.+\}$/gi).test(sender.options.data.value)) {
        
            let f = sender.options.data.value
                      .replace("${","")
                      .replace(/}$/gim,"")
                      .replace(/this\./gim,"")
                    

            console.log(JSON.stringify(f))
            set( this, f , data )

          } else {
            sender.options.data.value = data
          }
        }  
        
        // console.log(sender.options.data.event)
        let event = sender.options.data.event || "input-data"
        this.emit(event, sender, data)

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
        // console.log(this._uid, event, this.options, sender)
        this.emit(event, this.options, sender)
      },


    setData(data){
      this.data = data
      this.onUpdate({data:null})
    },

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
    
    onUpdate({ data }, mode) {
      if( mode ){
        if (mode.override) {
          set(this, mode.override, data)
        }
        if (mode.extend) {
          set(this, mode.extend, extend(get(this, mode.extend), data))
        }
      } else {
        this.options = data  
      }
      
      let temp = extend({},this.options)
      if(!temp.header) return

      
      this.headers = extend({}, this.getPropertyValue(temp.header))  
      this.headers.items = this.getPropertyValue(temp.header.items) || []
      
      
      this.headers = this.headers.items.map( h => ({
        text: (h.text) ? this.getPropertyValue(h.text) : this.getPropertyValue(h),
        value: (h.value) ? this.getPropertyValue(h.value) : this.getPropertyValue(h),
        class: (temp.header.decoration) ? this.getPropertyValue(temp.header.decoration.class) : "",
        sortable: h.sortable,
        filterable: h.filtrable,
        filter: h.filter,
        groupable: h.groupable,
      }))


      // this.headers = this.headers.items.map( h => ({
      //   text: this.getPropertyValue(h),
      //   value:this.getPropertyValue(h),
      //   class: (temp.header.decoration) ? this.getPropertyValue(temp.header.decoration.class) : "",
      //   sortable: h.sortable,
      //   filterable: h.filtrable,
      //   filter: h.filter,
      //   groupable: h.groupable,


      //   // sortable: false,
      //   // filterable: false,
      //   // groupable: false
      // }))

      this.items = this.getPropertyValue(temp.rows) || []
      this.items = this.items.map( r => this.getPropertyValue(r))  
      // this.options = null
      this.$nextTick(() => { this.options = temp})
    },

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(configDialog, { width: "90%" }, { config: widgetConfig })
    },

  },

  mounted() { this.$emit("init") },
}

</script>


</script> 

<style scoped>
  /*
  table.v-table tbody td, table.v-table tbody th {
      height: 2em;
  }

  .vertical-text span span{
        writing-mode: vertical-lr;
        transform: rotate(180deg);
  } */
    
</style>

