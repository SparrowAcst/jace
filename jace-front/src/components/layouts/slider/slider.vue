<template>
  <<< if( jace.mode == "development") { >>>
  <div class="mx-5 px-5 my-0">
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

    <v-carousel 
      v-else 
      v-model="slide"
      show-arrows-on-hover
      :continuous = "false"
      hide-delimiter-background
      light
      :height = "windowHeight"
    >
      
      
      
      <v-carousel-item 
        v-for="(s,index) in app.currentPage.sections" 
        :key="index"
        :style="`height: ${windowHeight}px;`"
        reverse-transition="fade-transition"
        transition="fade-transition" 
      >
        <v-sheet height="100%" :id="`section-${index}`">
          <v-row class="mx-0 px-2 primary--text display-1">
            <div>
              {{s.title}}
            </div>
            <v-spacer></v-spacer>
            <div class="title secondary--text">
              {{index+1}}
            </div>  
          </v-row>
          <v-divider></v-divider>  
          <v-row wrap :class="s.align" fill-height class="px-2 mx-0">
            <v-flex v-for="(h, hIndex) in s.holders" :key="hIndex" :class="`md${h.width} xs12`" pa-1>
              <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
            </v-flex>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    
    <v-carousel-item 
        :style="`height: ${windowHeight}px;`" 
      >
        <v-sheet height="100%">
          <v-row class="mx-0 px-2 primary--text display-1">
            <div>
              Slides
            </div>
          </v-row>
          <v-divider></v-divider>  
          <v-row wrap fill-height class="px-2 mx-0" style="margin: 0 5em 0 5em !important">
              <a v-for="(s,i) in app.currentPage.sections" @click="slide = i"
                  :key="i" style="border:1px solid; margin:0.5em; padding:0.5em;">
                <screenshot :node="nodes[i]"  style="width:250px;"></screenshot></a>
              
          </v-row>
        </v-sheet>
      </v-carousel-item>

    </v-carousel>


<!--     <v-card
      id="slider"
      class="ma-2"
      flat
      tile
      color = "transparent"
      v-else
      :style="`visibility:${(completed)? 'visible' : 'hidden' }`"
    >
    <v-card tile>
    <v-window v-model="slide">
      <v-window-item
        v-for="(s, index) in app.currentPage.sections"
        :key="`card-${index}`"
        show-arrows
        
        class="pa-3"
        :style="`height: ${windowHeight}px; overflow-y: auto;border: 1px solid #dedede;`"
      >
        
        <v-row class="mx-0 px-2 primary--text display-1">
          <div>
            {{s.title}}
          </div>
          <v-spacer></v-spacer>
          <div class="title secondary--text">
            {{index+1}}
          </div>  
        </v-row>
        <v-divider></v-divider>
          
        <v-row wrap :class="s.align" fill-height class="px-2 mx-0">
            <v-flex v-for="(h, hIndex) in s.holders" :key="hIndex" :class="`md${h.width} xs12`" pa-1>
              <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
            </v-flex>
        </v-row>
      
      </v-window-item>
    </v-window>
    </v-card>
    <v-btn
      color="secondary lighten-3"
      dark
      fab
      left
      small
      @click="prev"
      :style="`position: absolute; top:${windowHeight/2-20}px; left:-42px; opacity: 0.5;`"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>    
    
    <v-btn
      color="secondary lighten-3"
      dark
      fab
      right
      small
      @click="next"
      :style="`position: absolute; left:${windowWidth-52}px; top:${windowHeight/2-20}px; opacity:0.5;`"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>


    <v-card-actions class="justify-center">
      <v-item-group
        v-model="slide"
        class="text-xs-center"
      >
        <v-item
          v-for="(n, indexN) in app.currentPage.sections"
          :key="`btn-${indexN}`"
        >
          <v-btn
            slot-scope="{ active, toggle }"
            :input-value="active"
            fab
            small
            @click="toggle"
          >
            {{indexN+1}}
          </v-btn>
        </v-item>
      </v-item-group>
    </v-card-actions>
  </v-card>
 -->



       




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

import { find, sum, max, isArray, flatten, findIndex, isUndefined } from "lodash"
import layoutMixin from "@/mixins/core/layout.mixin.js"


export default {

  components: {
    "dj-holder": () => import("@/components/core/holder.vue"),
    "screenshot": () => import("@/components/core/ext/screenshot.vue")
  },

  mixins: [layoutMixin],

  data: () => ({
    slide: 0,
    windowHeight:window.innerHeight-100,
    windowWidth: null,
    completed: false,
    state:[],
    nodes:[]
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

    this.on({
      event:"page-start",
      callback: () => {
        this.$nextTick( () => {
          // let el = document.getElementById("slider")
          this.windowWidth = this.$el.clientWidth // (el) ? el.clientWidth : 0
          this.nodes = this.app.currentPage.sections.map( (s,index) => document.getElementById(`section-${index}`) )
          console.log(this.nodes)
        })
      },
      rules: () => true
    })

    this.on({
      event:"switch-mode",
      callback: () => {
        this.fullReload()
      },
      rules: () => true
    })

  },

  mounted(){
    this.initiateLayout(0)
    if (window.attachEvent) {
        window.attachEvent('onresize', this.resizeHandler);
      } else {
        window.addEventListener('resize', this.resizeHandler);
      }
    
      
    this.emit("layout-page-start", this) 
   
  },
  
  beforeDestroy() {
    
    this.off()
    if (window.attachEvent) {
      window.detachEvent('onresize', this.resizeHandler);
    } else {
      window.removeEventListener('resize', this.resizeHandler, false);
    }
  },  



  methods: {

  beforeLayoutStart(){
    this.initiateLayout(0)
  }, 
  
  initiateLayout(slide){
    slide = (isUndefined(slide))? 0 : slide
    
    if( slide < this.app.currentPage.sections.length){
      this.$nextTick(()=>{
        this.slide = slide
       
        this.$nextTick(()=>{
          this.initiateLayout(slide+1)
        })
      })
    } else {
      this.$nextTick(()=>{
        this.slide = 0
        this.completed = true
       
      })
    }
  },  

  
  resizeHandler(){
    this.windowHeight = window.innerHeight-100
    this.windowWidth = this.$el.clientWidth //document.getElementById("slider").clientWidth
  },

  next () {
    this.slide = this.slide + 1 === this.app.currentPage.sections.length
      ? 0
      : this.slide + 1
  },

  prev () {
    this.slide = this.slide - 1 < 0
      ? this.app.currentPage.sections.length - 1
      : this.slide - 1
  },  
    
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
    },

    slide(){
      this.emit("slide-start")
    }

  },

  

<<< } >>>  

  getPageTemplate() {

    return {
      layout: "slider",
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
