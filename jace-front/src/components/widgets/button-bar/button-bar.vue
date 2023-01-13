<template>
  <div v-if="options" class="d-flex" :class = "options.decoration.classes">
    <div 
      v-for="(b, index) in options.buttons" 
      :key="index" 
      :class="`${(b.decoration) ? b.decoration.classes || '' : ''} ${(b.spacer)?'spacer':''}`"
    >
      
      <v-avatar v-if="b.avatar">
          <dj-img :src="getPropertyValue(b.avatar.src)" :icon="getPropertyValue(b.avatar.icon)"></dj-img>
      </v-avatar>
      
      <v-icon v-if="b.icon && !b.text">
        {{getPropertyValue(b.icon)}}
      </v-icon>
      
      <div v-if="b.text && !b.icon">
        {{getPropertyValue(b.text)}}
      </div>

      <v-text-field v-if="b.textField && !b.icon && !b.text"
              :label="b.label || 'label'"
              v-model="b.model"
              :value = "b.model"
              outlined
              dense
              :hide-details="true"
      ></v-text-field>
      
      <v-btn v-if="!b.spacer && !b.menu && !b.text && !b.icon && !b.avatar && !b.textField"    
        :disabled="b.disabled" 
        @click.stop="resolve(b)"
        :color="(b.decoration) ? b.decoration.color || '' : ''" 
        :outlined="(b.decoration) ? b.decoration.outlined || false : false"
        :rounded="(b.decoration) ? b.decoration.rounded || false : false"
        :text="(b.decoration) ? b.decoration.text || false : false"
        style="
          text-transform:none !important;
          font-weight: inherit !important;
          letter-spacing: inherit !important;
          font-size: inherit !important;
        "
        class="mr-1"
      >
        <v-icon v-if="b.decoration && b.decoration.icon" left>
          {{getPropertyValue(b.decoration.icon)}}
        </v-icon>
        {{getPropertyValue(b.title)}}
      </v-btn>

      <v-menu v-if="!b.spacer && b.menu && !b.text && !b.icon && !b.avatar && !b.textField" offset-y >
        <template v-slot:activator="{ on, attrs }">
          <v-btn    
            :disabled="b.disabled" 
            v-bind="attrs"
            v-on="on"
            :color="(b.decoration) ? b.decoration.color || '' : ''" 
            :outlined="(b.decoration) ? b.decoration.outlined || false : false"
            :rounded="(b.decoration) ? b.decoration.rounded || false : false"
            :text="(b.decoration) ? b.decoration.text || false : false"
            style="
              text-transform:none !important;
              font-weight: inherit !important;
              letter-spacing: inherit !important;
              font-size: inherit !important;
            "
            class="mr-1"
          >
            <v-icon v-if="b.decoration && b.decoration.icon" left>
              {{getPropertyValue(b.decoration.icon)}}
            </v-icon>
            {{b.title}}
            <v-icon right>
              mdi-menu-down
            </v-icon>
          </v-btn>

        </template>
        <!-- <v-list>
          <v-list-item
            v-for="(c, c_index) in b.menu"
            :key="c_index"
          >
            <v-list-item-title @click="resolve(c)">{{ c.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
 -->
        <v-list dense>
            <!-- <v-list-item-group
              color="primary"
            > -->
              <v-list-item
                v-for="(c, c_index) in b.menu"
                :key="c_index"
                @click="resolve(c)"
                
              >
                <v-list-item-icon v-if="!!c.icon" class="mr-1">
                  <v-icon v-text="c.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="c.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <!-- </v-list-item-group> -->
          </v-list>
      </v-menu>

    </div>
  </div>  

</template>

<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import { get } from "lodash";



<<< if (jace.mode == "development") { >>>
  import ButtonBarConfig from "./button-bar-config.vue"; 
<<<} >>>



export default {

  name: "button-bar-widget",

  icon: "mdi-table-row",


  mixins: [djvueMixin, listenerMixin],

  methods: {

    getPropertyValue(v){
      // console.log(v, (( (/^\{\{.+\}\}$/gi).test(v) ) ? get(this, v.replace("{{","").replace("}}","").trim()) : v), this)
      return ( (/^\{\{.+\}\}$/gi).test(v) ) ? get(this, v.replace("{{","").replace("}}","").trim()) : v  
    },


    getOptions(){
      return this.options
    },
    
    onUpdate({ data }) {
      this.config.data.embedded = []
      this.$nextTick(() => {
        this.config.data.embedded = data;  
      })
    },


    resolve(item) {
      // console.log(item)
      let event = item.event || "push"
      this.emit(event, item)
    },

    <<< if (jace.mode == "development") { >>>
      onReconfigure(widgetConfig) {
          return this.$dialogManager.showAndWait(ButtonBarConfig, { width: "90%" }, { config: widgetConfig })
        }, 
    <<< } >>>

  },


  props: ["config"],

  computed:{
    options(){
      return this.config.data.embedded
    }
  },


  mounted() {
    this.$emit("init")
  }

}

</script>
<style scoped>
.v-menu__content {
    position: absolute;
    display: inline-block;
    max-width: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    contain: content;
    will-change: transform;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
   /* 
   -webkit-box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
   */ 
   border-radius: 4px;
}
</style>