<template>
  <div  v-if="options">
    
    <div 
      v-if="options.title"
      :class="(options.title.decoration) ? options.title.decoration.classes : ''"
      :style="(options.title.decoration) ? options.title.decoration.style : ''"
    >
      {{options.title.text}}
    </div>  

    <v-timeline
      :reverse = "options.reverse"
      :dense = "(options.decoration) ? options.decoration.dense : ''"
      :clipped = "(options.decoration) ? options.decoration.clipped : ''"
       
    >

      <v-timeline-item
        v-for="(event, i) in options.events"
        :key="i"
        :color="(event.decoration) ? event.decoration.color : ''"
        :small="(event.decoration) ? event.decoration.small : ''"
        :large="(event.decoration) ? event.decoration.large : ''"
        :dense="(event.decoration) ? event.decoration.dense : ''"
        :left="(event.decoration) ? event.decoration.left : ''"
        :right="(event.decoration) ? event.decoration.right : ''"
        :fill-dot="(event.decoration) ? event.decoration['fill-dot'] : ''"
        :hide-dot="(event.decoration) ? event.decoration['hide-dot'] : ''"
      >
        <template v-slot:opposite>
          <span
            v-if="event.opposite"
            :class = "(event.opposite.decoration) ? event.opposite.decoration.classes : ''"
            :style = "(event.opposite.decoration) ? event.opposite.decoration.style: ''"
            v-text="event.opposite.text"
          ></span>
        </template>

        <v-card
          v-if="event.card"  
          :class="(event.card.decoration) ? event.card.decoration.classes : ''" 
          :style="(event.card.decoration) ? event.card.decoration.style : ''"
        >
          <v-card-title 
            v-if="event.card.title"
            :class="(event.card.title.decoration) ? event.card.title.decoration.classes : ''"
            :style="(event.card.title.decoration) ? event.card.title.decoration.style : ''"
          >
            <span>{{event.card.title.text}}</span>
            <v-spacer></v-spacer>

            <v-menu
              v-if="event.menu"
              bottom
              left
              dense
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, j) in event.menu"
                  :key="j"
                  @click = "_emit(i,j)"
                >
                
                  <v-list-item-icon v-if="item.icon">
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                
                </v-list-item>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text
            v-if="event.card.note"
            :class="(event.card.note.decoration) ? event.card.note.decoration.classes : ''"
            :style="(event.card.note.decoration) ? event.card.note.decoration.style : ''"
          >
            {{event.card.note.text}}
          </v-card-text>
        </v-card>

      </v-timeline-item>
    </v-timeline>

  </div>
</template>

</template>
<script>
import { find, isUndefined, isArray, isNull, isString, includes, zipObject, keys, isEqual, extend, get, set } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import { v4 } from "uuid"

<<< if( jace.mode == "development") { >>>
  
  import configDialog from "./timeline-config.vue";

<<< } >>> 



import moment from "moment"


export default {

  name: "timeline-widget",

  icon: "mdi-timeline-check-outline",

  mixins: [djvueMixin, listenerMixin],

  data: () => ({
    options: null
  }),


  methods: {

    _emit(itemIndex, menuIndex){
        let sender = this.options.events[itemIndex]
        let event = (sender.menu[menuIndex]) ? sender.menu[menuIndex].event || "command" : "command"
        let command = sender.menu[menuIndex].text
        this.emit(event, command, sender)
      },
    
    
    
    onUpdate({ data }, mode) {
      // console.log(data)
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
      let temp = this.options
      if( temp.events ){
        temp.events.forEach( event => {
          event.id = (event.id) ? event.id : v4()
        })
      }
      
      this.options = null
      this.$nextTick(() => { this.options = temp})
    },


<<< if( jace.mode == "development") { >>>

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(configDialog, { width: "90%" }, { config: widgetConfig })
    },

<<< } >>>    

  },

  created() {
  },

  mounted() { this.$emit("init") },
}

</script>
