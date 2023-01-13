<template>
  <<< if( jace.mode == "development") { >>>
  <div class="mx-1 my-0">
    <v-layout column>
      <v-layout v-for="(s,index) in app.currentPage.sections" :key="index" column xs12 mb-3 :style="(!isProductionMode)?'border:2px dashed #dedede;':''">
        <v-layout row v-if="!isProductionMode">
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

<<< if( jace.mode == "development") { >>>
  import { find, sum, max } from "lodash"
<<< } >>>

import layoutMixin from "@/mixins/core/layout.mixin.js"

export default {

  components: {
    "dj-holder": () => import("@/components/core/holder.vue")
  },

  mixins: [layoutMixin],

  created(){
    this.on({
      event:"switch-mode",
      callback: () => {
        this.fullReload()
      },
      rules: () => true
    })
  },

  methods: {

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
      handler() { this.setNeedSave(true) },
      deep: true
    }
  },

<<< } >>>  

  getPageTemplate() {

    return {
      layout: "flex",
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
