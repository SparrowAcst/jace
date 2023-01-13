
<template>
  <div>
  <v-item-group>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex
          v-for="(item, index) in items"
          :key="index"
          xs2
          md2
        >
          <v-item>
            <v-card 
              flat 
              slot-scope="{active, toggle}"
              @click.native="() => { toggle(); getInitialConfig($event,item) }"
            >       
              <v-flex text-xs-center 
                  >
                  <v-icon large :color="active ? 'primary' : ''">
                    {{widgetTypes[item.type].icon}}
                  </v-icon>
                  <div :class="active ? 'primary--text' : ''">{{item.template || item.type}}</div>
              </v-flex>

            </v-card>
           </v-item>
        </v-flex>
      
      </v-layout>
    </v-container>
  </v-item-group>
 
  </div>
</template>  

<script>

import widgetTypes from "@/components/widgets/widgetTypes.js"
import dblClickMixin from "@/mixins/core/dblclick.mixin.js"
import djvueMixin from "@/mixins/core/djvue.mixin.js"

export default {
	name:"widget-types-panel",
	props:["selected"],
  mixins:[djvueMixin, dblClickMixin],
  
  methods:{
    getInitialConfig (event, item) {
      this.onClickHandler(
        event,
        () => {
          
          let rule = (this.widgetTypes[item.type].isCreateAvailable)?this.widgetTypes[item.type].isCreateAvailable:(()=>true)
          let config = (rule.apply(this))
              ? this.widgetTypes[item.type].getInitialConfig(item.template)
              : null
          
          this.$eventHub.emit("widget-config-dlg-select", config)
        },
        () => {
          let rule = (this.widgetTypes[item.type].isCreateAvailable)?this.widgetTypes[item.type].isCreateAvailable:(()=>true)
          let config = (rule.apply(this))
              ? this.widgetTypes[item.type].getInitialConfig(item.template)
              : null
          
          this.$eventHub.emit("widget-config-dlg-select", config, true)
        }
      )
    }
  },

  data:()=>(
    {
      widgetTypes,
      items:[]
    }
  ),
  
  created(){
    this.items = this.selected.items.map((item => {
         let a = item.split(":")
         return {
            type:a[0],
            template:a[1]
         }
      }))
    console.log("Type panel created", this.selected)
  },

  mounted(){
    console.log("Type panel mounted", this.items)
  }
  
}	
</script>