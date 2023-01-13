<template>
  <v-row class="ma-0 pa-0">
  
    <v-layout v-if="!isProductionMode" column xs12 mb-3 :style=" (!isProductionMode) ? `border:2px dashed #dedede;` : '' ">
      
      <div style="    
          font-size: 12px;
          font-weight: bold;
          color: #757575;
          padding: 1px 3px;
          width: max-content;
          margin: -11px 0px 0px 20px;
          background: white;"
      >
        {{config.id}} 
        <span v-if = "!showed" class="warning--text"> ( display: none )</span>
      </div>
      
      <v-layout row v-if="!isProductionMode" class="my-0 pa-0">
        <v-spacer></v-spacer>
        <div class="mr-2 my-2">
          <v-btn-toggle rounded v-model="config.align" mandatory class="elevation-0 mr-1" style="background:transparent;">
            <v-btn small icon text color="primary" class="ma-0" value="justify-start">
              <v-icon small>mdi-format-align-left</v-icon>
            </v-btn>
            <v-btn small icon text color="primary" class="ma-0" value="justify-center">
              <v-icon small>mdi-format-align-center</v-icon>
            </v-btn>
            <v-btn small icon text color="primary" class="ma-0" value="justify-end">
              <v-icon small>mdi-format-align-right</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn small icon text v-on="on" color="primary" class="ml-1" style="margin-top:-6px">
                <v-icon small>mdi-table-row-plus-after</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="item in [1,2,3,4,5,6,7]" :key="item" @click="addSection( sectionIndex, item )">
                <v-list-item-title>{{ item }} columns</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn 
            small 
            icon 
            text 
            color="primary" 
            class="mr-1" 
            @click="deleteSection( sectionIndex )" 
            :disabled="page.sections.length == 1" 
            style="margin-top:-6px"
          >
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-layout>
      <v-layout row wrap :class="config.align" fill-height class="px-2">
        <v-flex v-for="(h, hIndex) in config.holders" :key="hIndex" :class="`md${h.width} xs12`" pa-1>
          <v-layout row class="pr-3" style="margin-top:-1em;" v-if="!isProductionMode">
            <v-spacer></v-spacer>
            <v-btn 
              small 
              text 
              icon 
              color="primary" 
              class="ma-0" 
              style="min-width: 1em !important;" 
              @click="changeWidth(config,h,-1)" 
              :disabled="collapseWidthDisabled( config, h )"
            >
              <v-icon small class="mdi-rotate-45">mdi-arrow-collapse</v-icon>
            </v-btn>
            <v-btn 
              small 
              text 
              icon 
              color="primary" 
              class="ma-0" 
              style="min-width: 1em !important;" 
              @click="changeWidth( config, h, 1)" 
              :disabled="expandWidthDisabled( config, h )">
              <v-icon small class="mdi-rotate-45">mdi-arrow-expand</v-icon>
            </v-btn>
          </v-layout>
          <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
        </v-flex>
      </v-layout>
    </v-layout>
    
    <v-layout v-else column xs12 mb-3 py-0 v-show="showed">
      <v-layout row wrap :class="config.align" fill-height class="px-2 py-0">
        <v-flex v-for="(h, hIndex) in config.holders" :key="hIndex" :class="`md${h.width} xs12`" pa-0>
          <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
        </v-flex>
      </v-layout>
    </v-layout>

  </v-row>   
  

</template>

<script>

import djvueMixin from "@/mixins/core/djvue.mixin.js"
import listenerMixin from "@/mixins/core/listener.mixin.js"
import initiableMixin from "@/mixins/core/initiable.mixin.js"

export default {

  mixins: [djvueMixin],

  components: {
    "dj-holder": () => import("@/components/core/holder.vue")
  },

  
  props: [
    "sectionIndex",
    "config",
    "page",
    "deleteSection",
    "addSection",
    "expandWidthDisabled",
    "collapseWidthDisabled",
    "changeWidth",
    "onInitChild"
  ],

  data: () => ({
    showed: true
  }),

  methods:{

    show() {
      this.showed = true
    },

    hide() {
      this.showed = false
    } 
  }


  
}

</script>
