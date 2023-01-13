<template>
  <div v-if="items">
    <v-treeview 
      class="pa-2" 
      :items="items" 
      item-key="key"  
      open-all 
      open-on-click 
      :open.sync="open" 
      :active.sync="active" 
      transition 
      item-text="" 
      activatable
      dense

    >
      <template slot="prepend" slot-scope="{ item }">
        <div v-if="item.type == 'topic'" class="font-weight-bold"  @click="select(item)">
          {{item.title}}
        </div>
        <v-layout align-center row v-else :class="itemClass(item)" @click="select(item)" :style="item.style || ''">
          <i v-if="item.icon" :class="'pr-1 mdi '+item.icon"></i>
          {{item.title}}
        </v-layout>
      </template>
    </v-treeview>
  </div>
</template>

<script>

  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";


<<< if( jace.mode == "development") { >>>  
  import TocConfig from "./edu-toc-config.vue";
<<< } >>>


  export default  {
    
    name:"edu-toc-widget",

    icon: "mdi-file-outline",

    mixins:[djvueMixin, listenerMixin],

    data: () => ({
      items: null,
      open: [],
      active: [],
      selected: null
    }),

    methods:{


      onUpdate ({data}) {
        if(!data) return
        this.event = data.event
        this.items = this.normalize(data.toc)
        this.open = this.items.map( d => d.key)
   
      },

      normalize(data) {

        let f = d => {
          d = d.map(item => {
            if (item.children) {
              item.children = f(item.children)
            } else {
              item.children = []
            }
            item.key = this.$djvue.randomName()
            return item
          })
          return d
        }

        return f(data)
      },

      select(item) {
        this.selected = item;
        let event = this.config.data.embedded.event || "select-toc"
        this.emit(event, item)
        // if (!this.selected) {
        //   this.selected = item
        // } else {
        //   this.selected = item //(this.selected.id == item.id) ? null : item
        // }
      },

      itemClass(item) {
        return (!this.selected) ?
          'font-weight-normal' :
          (item.key != this.selected.key) ? 'font-weight-normal secondary--text' : 'font-weight-normal primary--text'
      },
      

<<< if( jace.mode == "development") { >>>
      onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(TocConfig, {width:"90%"},{config:widgetConfig})
      }
<<<}>>>            

      
    },

    
    props:["config"],

    
    created(){
      // if (this.config.data.embedded.active) this.addListeners()
    },

    mounted(){ this.$emit("init") }

  }

</script> 
