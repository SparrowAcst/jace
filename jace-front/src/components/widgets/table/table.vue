<template>
  <div>
    
    <v-data-table
      v-if="table" 
      :headers="table.headers"
      :items="table.rows"
      style="border:1px solid #dedede;"
      :dense = "config.options.dense"
      :items-per-page="(config.options.pagination) ? 10 : Number.POSITIVE_INFINITY"
      :hide-default-footer="!config.options.pagination"
    >
     
      <template v-slot:body="props">
        <tbody>
          <tr v-for="(item, rowIndex) in props.items" :key="rowIndex">
            <td v-for="(col, index) in table.headers"  :key="index" :class="getClass(item,col)" :style="getStyle(item,col)">
              {{item[col.value]}}
            </td>
          </tr>
        </tbody>
      </template>

    </v-data-table>
    
  </div>
</template>


<script>

  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";

<<< if( jace.mode == "development") { >>>  
  import dataTableConfigDialog from "./data-table-config.vue";
<<< } >>>

  import tinycolor from "tinycolor2"
  import { isNumber, isBoolean, isString, find, min, max, values } from "lodash"
 
 export default  {
    
    name:"data-table-widget",

    icon: "mdi-grid",

    mixins:[djvueMixin, listenerMixin],

    props:["config"],

    computed:{
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

    methods:{

      onValidate(data,options){
      if( isString(data) ) {
          try {
            data = JSON.parse(data)
            return data
          } catch (e) {
            return { error: e.toString() }
          }
        }
      return data  
    },


      getClass(item,col){
        let value = item[col.value]
        let _class = "text-left" 
        if (col == 0) _class = "text-left"
        if (isNumber(value)) _class =  "text-right"  
        if( isBoolean(value) ) return "text-center"

        _class = `${_class} ${this.config.options.typography} ${this.config.options.textColor}--text ${this.config.options.textBackground}`

        return _class  
      },
      
      
      getStyle(item, col){

        let value = item[col.value]
        
        if(!this.config.options.useColors) return ""
        if (!this.colors) return ""   
        if (!isNumber(value)) return "" 
        
       
        
        if (this.config.options.colorMode == "row"){
          let _values = values(item).filter(d => isNumber(d))
          let range = [min(_values),max(_values)]
          return "background:" + tinycolor(
            this.colors[Math.trunc(this.colors.length*(value-range[0])/(range[1]-range[0] + 0.00000000001))]
          ).setAlpha(0.5).toRgbString()
        }  

        if (this.config.options.colorMode == "column"){
          if(!this.ranges) return ""
          let range = this.ranges[col.value]
          if(!range) return ""
          return "background:" + tinycolor(
            this.colors[Math.trunc(this.colors.length*(value-range[0])/(range[1]-range[0] + 0.00000000001))]
          ).setAlpha(0.5).toRgbString()
        }  

        if (this.config.options.colorMode == "table"){
          let range = this.ranges
          if(!range) return ""
          return "background:" + tinycolor(
            this.colors[Math.trunc(this.colors.length*(value-range[0])/(range[1]-range[0] + 0.00000000001))]
          ).setAlpha(0.5).toRgbString()
        }  
    
      },

      onUpdate (config) {
        if(!config) return 
        if(!config.data) return
        if(!config.data.dataset) return
        if(!config.data.dataset.source) return
          
        let data = config.data  
        // console.log("table update", data)
        this.data = data.dataset.source;
        let temp = {
          headers: data.dataset.dimensions.map( item => ({
              text: item.text || item,
              align: 'center',
              value: item.value || item,
              class: (this.config.options.headerTextOrientation == "vertical") ? ["vertical-text"] : []
          })),
          rows: this.data

        }
        this.table = temp

        this.pagination.rowsPerPage = 10
        this.pagination.totalItems = this.table.rows.length
        
        if(!this.config.options.useColors) {
          this.ranges = null
          return
        }

        // console.log(this.config)
        this.colors = JSON.parse(JSON.stringify(this.config.options.palette.color))
        if(this.config.options.palette.isReverse) this.colors.reverse()
            
        if (this.config.options.colorMode == "row") return
        
        if (this.config.options.colorMode == "column"){
          this.ranges = {}
          this.table.headers.forEach( h => {
              let _values = this.table.rows.map( r => r[h.value])
              if((_values.length > 0) && isNumber(_values[0]))
              this.ranges[h.value]  = [min(_values),max(_values)]
          })
          return
        }

        if (this.config.options.colorMode == "table"){
          let _values = [];
          this.table.headers.forEach( h => {
              let v = this.table.rows.map( r => r[h.value])
              if((v.length > 0) && isNumber(v[0]))
              _values  =_values.concat(v)
          })
          this.ranges  = [min(_values),max(_values)]
          return
        }

      },

<<< if( jace.mode == "development") { >>>
      onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(dataTableConfigDialog, {width:"90%"},{config:widgetConfig})
      },
<<< } >>>

      onClear(){
        this.onUpdate({
          data: {
            "dataset": {
              "dimensions": [],
              "source": []
            }
          }
        })
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      onDataSelect (emitter, data) {
        
        let temp = {
          headers: this.table.headers,
          rows: this.data.filter( item => {
            let d = find(data.selection, t => t.entity == item[data.mapper])
            if(!d) return false;
            return d.selected
          })

        }
        this.table = temp
      }

    },

       

    created(){ 
      // this.data = this.config.data.embedded.dataset.source;
      // let temp = {
      //   headers: this.config.data.embedded.dataset.dimensions.map( item => ({
      //       text: item,
      //       align: 'center',
      //       value: item
      //   })),
      //   rows: this.data

      // }
      // this.table = temp
    },

     mounted(){ 
      this.$emit("init") 
    },
   
    
    data: () =>({
      table:null,
      data:[],
      ranges:null,
      colors:null,
      pagination:{}
    })
  }

</script> 

<style scoped>
  
  table.v-table tbody td, table.v-table tbody th {
      height: 2em;
  }

  .vertical-text span span{
        writing-mode: vertical-lr;
        transform: rotate(180deg);
  } 
    
</style>

