<template>
  <div>
    <div v-if="!config.options.widget.chips">
      <v-autocomplete 
        v-model="selection" 
        :items="items" 
        :filter="filter" 
        color="primary" 
        outlined 
        dense 
        :label="config.options.widget.label" 
        :multiple="config.options.widget.multiple" 
        :clearable="config.options.widget.multiple" 
        v-if="source" 
        item-text="title" 
        :item-value="item => item" 
        class="body-1" 
        :search-input.sync="search"
      >
        
      </v-autocomplete>
    </div>

    <div v-if="config.options.widget.chips">
      <v-autocomplete
        v-model="selection" 
        :items="items" 
        :filter="filter" 
        color="primary" 
        outlined 
        dense 
        :label="config.options.widget.label" 
        :multiple="config.options.widget.multiple" 
        :clearable="config.options.widget.multiple" 
        v-if="source" 
        item-text="title" 
        :item-value="item => item" 
        class="body-1" 
        :search-input.sync="search"
        chips
      >
        
        <template v-slot:selection="data">
          <v-chip
            style="margin:0.2em"
            v-bind="data.attrs"
            :input-value="data.item.title"
            close
            outlined 
            label
            color="primary--text"
            @click:close="remove(data.item)"
          >
            {{ data.item.title }}
          </v-chip>
        </template>
      </v-autocomplete>  

    </div>
  </div>   

</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import DataSelectorConfigDialog from "./data-selector-config.vue";
import { isArray, sortBy, includes, findIndex, isString } from "lodash"

export default {

  props: ["config"],

  mixins: [djvueMixin, listenerMixin],

  computed: {
    items() {
      if (!this.source) return
      return this.source
    }
  },


  methods: {

    onValidate(data,options){
      if( isString(data) ) {
          try {
            data = JSON.parse(data)
            return data
          } catch (e) {
            return { error: e.toString() }
          }
        }

      if(data.message){
        return { error: "\nDATA PROCESSING SCRIPT \n" + data.message }
      }
  
      return data  
    },


    onUpdate({ data }) {

      this.source = data
      // this.mapper = options.mapper;
      if( this.config.options.widget.anywaySelectFirst){
        this.$nextTick(() => {
          this.selection = (this.config.options.widget.multiple) ? [this.items[0]] : this.items[0]
        })  
      } else {
        this.$nextTick(() => {
          this.selection = (this.config.options.widget.multiple) ? [] : null
        })
      }
      

    },

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(DataSelectorConfigDialog, { width: "90%" }, { config: widgetConfig })
    },

    onClear() {
      this.onUpdate({
        data: []
      })
    },

    filter(item, queryText) {
      return includes(item.title.toLowerCase(), queryText.toLowerCase())
    },

    text(item) {
      // console.log("item:", item)
      return item.title
    },

    remove(item) {
      if (this.selection.length == 1) return
      const index = this.selection.indexOf(item)
      if (index >= 0) this.selection.splice(index, 1)
    }
  },

  watch: {
    selection(value) {
      if( !this.items ) return
      // console.log(this.items)  
      this.search = null
      // console.log("selection", value)
      if (!value) return
      // if (value.length == 0) return
      let res = {
        selection: sortBy(
          this.items.map(item => {
            item.index = findIndex((isArray(value) ? value : [value]), t => t == item)
            return {
              entity: item,
              selected: (findIndex((isArray(value) ? value : [value]), t => t == item) >= 0)
            }
          }),
          d => d.entity.index
        )

      }
      let event = this.config.options.widget.event || "data-select"
      this.emit(event, this, res)
    }
  },

  data: () => ({
    selection: [],
    source: null,
    search: null
  }),


  mounted() { this.$emit("init") }

}

</script>
