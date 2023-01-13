<template>
  <<< if( jace.mode == "development") { >>>
  <div class="mx-1 my-0">
    <v-layout column v-if="!isProductionMode">
      <v-layout v-for="(s,index) in app.currentPage.sections" :key="index" column xs12 mb-3 :style="(!isProductionMode)?'border:2px dashed #dedede;':''">
        <v-layout row v-if="!isProductionMode" class="mx-0">
          <span class="my-5 px-3 primary--text">{{index+1}}.</span>
          <v-text-field v-model="s.title" label="Step title" class="body-1"></v-text-field>
          <v-spacer></v-spacer>
          <div class="mr-2 my-2">
            <v-btn-toggle rounded v-model="s.align" mandatory class="elevation-0 mr-1" style="background:transparent;">
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
                <v-list-item v-for="item in [1,2,3,4]" :key="item" @click="addSection(index,item)">
                  <v-list-item-title>{{ item }} columns</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn small icon text color="primary" class="mr-1" @click="deleteSection(index)" :disabled="app.currentPage.sections.length == 1" style="margin-top:-6px">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-layout>
        <v-layout row wrap :class="s.align" fill-height class="px-2">
          <v-flex v-for="(h, hIndex) in s.holders" :key="hIndex" :class="`md${h.width} xs12`" pa-1>
            <v-layout row class="pr-3" style="margin-top:-1em;" v-if="!isProductionMode">
              <v-spacer></v-spacer>
              <v-btn small text icon color="primary" class="ma-0" style="min-width: 1em !important;" @click="changeWidth(s,h,-1)" :disabled="collapseWidthDisabled(s,h)">
                <v-icon small class="mdi-rotate-45">mdi-arrow-collapse</v-icon>
              </v-btn>
              <v-btn small text icon color="primary" class="ma-0" style="min-width: 1em !important;" @click="changeWidth(s,h,1)" :disabled="expandWidthDisabled(s,h)">
                <v-icon small class="mdi-rotate-45">mdi-arrow-expand</v-icon>
              </v-btn>
            </v-layout>
            <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-layout>

<!--     <v-carousel v-else v-model="slide">
      <v-carousel-item v-for="(s,index) in app.currentPage.sections" :key="index" >
         <v-sheet height="100%">
          
           <v-row wrap :class="s.align" fill-height class="px-2 mx-0">
                <v-flex v-for="(h, hIndex) in s.holders" :key="hIndex" :class="`md${h.width} xs12`" pa-1>
                  <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
                </v-flex>
            </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
 -->

    <v-stepper
      v-else
      v-model="slide"
      vertical

    >
      <template v-for="(s, index) in app.currentPage.sections">
          <v-stepper-step
            :key="`${index+1}-step`"
            :step="index+1"
            editable
            :rules="[isComplete(index)]"
          >
            {{(s.title) ? s.title : ''}} 
            <span class="caption">{{warnings(index)}}</span>
          </v-stepper-step>

          <v-stepper-content
            :key="`${index+1}-content`"
            :step="index+1"
            
          >
            <!-- <v-divider></v-divider> -->
            <v-row wrap :class="s.align" fill-height class="px-2 mx-0">
                <v-flex v-for="(h, hIndex) in s.holders" :key="hIndex" :class="`md${h.width} xs12`" pa-1>
                  <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
                </v-flex>
            </v-row>
            <!-- <v-divider></v-divider> -->
          <!--   <v-row v-if="(index+1)<app.currentPage.sections.length" class="mx-0 px-2 py-3 justify-start">
              <v-btn text class="primary caption pa-0" @click="nextStep(index+1)" style="height:2em;">
                <v-icon class="body-1">mdi mdi-arrow-down</v-icon> Next
              </v-btn>
            </v-row>  
           -->
          </v-stepper-content>
          <v-row  :key="index" v-if="(index+1) < app.currentPage.sections.length && (index+1) == slide" class="row mx-0 my-3 px-2 py-3 justify-start">
              <v-btn text class="primary caption pa-0" @click="nextStep(index+1)" style="height:2em;border:1px solid;">
                <v-icon class="body-1">mdi mdi-arrow-down</v-icon> Next
              </v-btn>
            </v-row>  
          
      </template>
    </v-stepper>      




  </div>
  <<< } else { >>>
     
     <div class="mx-1 my-0">
        <v-layout v-for="(s,index) in app.currentPage.sections" :key="index" column xs12 mb-3>
          <v-layout row wrap :class="s.align" fill-height class="px-2">
            <v-flex v-for="(h, hIndex) in s.holders" :key="hIndex" :class="`md${h.width} xs12`" pa-1>
              <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
            </v-flex>
          </v-layout>
        </v-layout> 
     </div> 

  <<< } >>>
</template>
<script>

import { find, sum, max, isArray, flatten, findIndex } from "lodash"

import layoutMixin from "@/mixins/core/layout.mixin.js"

export default {

  components: {
    "dj-holder": () => import("@/components/core/holder.vue")
  },

  mixins: [layoutMixin],

  data: () => ({
    slide: 1,
    state:[]
  }),

  created(){
    this.state = this.app.currentPage.sections.map( () => true )
    this.on({
      event: "layout-change-state",
      callback: ( widgetID, state ) => {
        let sectionIndex = findIndex( this.app.currentPage.sections.map( 
            s =>  flatten( s.holders.map( h =>  this.app.currentPage.holders[h.name].widgets ))), 
            w => find(w, d => d.id == widgetID)
        )
        if( sectionIndex >= 0 ){
          if(!isArray(this.state[sectionIndex])) this.state[sectionIndex] = []
          let w = find(this.state[sectionIndex], d => d.widget == widgetID)
          if( w ){
            w.state = state
          } else {
            this.state[sectionIndex].push({widget:widgetID, state})  
          } 
          this.$forceUpdate()
        }
      },
      rule: () => true
    })
  },



  methods: {

  warnings(index){
    let completed = this.isComplete(index)()
    return (completed == true) ? "" : completed
  },
  
  isComplete(index){
    return () => {
      if(!isArray(this.state[index])) return this.state[index]
      let res = this.state[index].filter( d => d.state != true)
      return (res.length == 0) ? true : res.map(d => d.state ).join(", ")
    }   
  },
  
  nextStep (n) {
        if (this.slide === this.app.currentPage.sections.length) {
          this.slide = 1
        } else {
          this.slide = n + 1
        }
  },        

<<< if( jace.mode == "development") { >>>
    
    deleteSection(index) {
      let section = this.app.currentPage.sections[index];
      section.holders.forEach(h => {
        this.app.currentPage.holders[h.name] = undefined;
      })
      this.app.currentPage.sections.splice(index, 1)

      this.saveAppConfig()
        .then(() => {
          this.fullReload()
        })
    },

    addSection(sectionIndex, columns) {

      let newSection = {
        align: "justify-start",
        holders: []
      }

      for (let i = 0; i < columns; i++) {
        let h = {
          name: this.$djvue.randomName(),
          width: Number.parseInt(12 / columns)
        }
        newSection.holders.push(h)
        this.app.currentPage.holders[h.name] = { widgets: [] }
      }

      this.app.currentPage.sections.splice(sectionIndex + 1, 0, newSection)

      this.saveAppConfig()
        .then(() => {
          this.fullReload()
        })

    },

    expandWidthDisabled(s, h) {
      let _sum = sum(s.holders.map(d => d.width))
      let _max = max(s.holders.filter(d => d.name != h.name).map(d => d.width))
      return (h.width == 12) || ((_sum == 12) && (_max == 1))
    },

    collapseWidthDisabled(s, h) {
      return h.width == 1
    },

    changeWidth(s, h, value) {
      h.width += value
      if (value > 0) {
        let _sum = sum(s.holders.map(d => d.width))
        let _max = max(s.holders.filter(d => d.name != h.name).map(d => d.width))
        let h1 = find(s.holders.filter(d => d.name != h.name), d => d.width == _max)
        if (_sum > 12) h1.width -= value
      }
      this.emitResizeEvent()
      this.setNeedSave(true)
    },

<<< } >>>    

    emitResizeEvent() {
      let resizeEvent = document.createEvent('UIEvents')
      resizeEvent.initUIEvent('resize', true, false, window, 0)
      window.dispatchEvent(resizeEvent)
      this.$nextTick(() => {
        resizeEvent = document.createEvent('UIEvents')
        resizeEvent.initUIEvent('resize', true, false, window, 0)
        window.dispatchEvent(resizeEvent)
      })
    },

    onBeforeInit() {
      let h = []
      this.app.currentPage.sections.forEach(d => {
        d.holders.forEach(d1 => {
          h.push(d1.name)
        })
      })
      this._waitList = h
    }


  },

 <<< if( jace.mode == "development") { >>>

  watch: {
    "app.currentPage.sections": {
      handler() { 
        this.setNeedSave(true) 
      },
      deep: true
    }
  },

  

<<< } >>>  

  getPageTemplate() {

    return {
      layout: "carousel",
      sections: [{

        align: "justify-start",
        holders: [{
          name: "default",
          width: 12
        }]
      }],
      holders: {
        "default": {
          widgets: []
        }
      }
    }
  }


}

</script>
