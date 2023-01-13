<template>
    <div class="mx-3 my-0 pa-0">
        <!-- <div v-if="isProductionMode" class="subtitle-2 primary white--text pa-2"> <strong>Layout: with-navigation-drawer</strong></div> -->
        <v-col class="ma-0 pa-0">
            <dj-holder name="t-bar" @init="onInitChild"></dj-holder>
        </v-col>
        <v-row class="ma-0 pa-0">
            <v-btn icon @click.stop="emit('layout.h-bar')">
              <v-icon>{{(drawer) ? 'mdi-chevron-left' : 'mdi-chevron-right'}}</v-icon>
            </v-btn>
        </v-row>    

        <v-row class="ma-0 pa-0">
            <v-navigation-drawer hide-overlay v-model="drawer" height="inherit" :style="drawerDisplay" width="15%">
                  <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>
                <dj-holder name="h-bar" @init="onInitChild"></dj-holder>
            </v-navigation-drawer>
            <v-col class="my-0 py-0">
                <dj-section 

                  v-for = "( s, index ) in app.currentPage.sections" 
                  :key = "index" 
                  :config = "s" 
                  :sectionIndex = "index"
                  :page = "app.currentPage" 
                  :deleteSection = "deleteSection" 
                  :addSection = "addSection" 
                  :expandWidthDisabled = "expandWidthDisabled" 
                  :collapseWidthDisabled = "collapseWidthDisabled"
                  :changeWidth = "changeWidth"
                  :onInitChild="onInitChild"

                ></dj-section>
            </v-col>
        </v-row>
    </div>
</template>
<script>
<<<
if (jace.mode == "development") { >>>
    import { find, sum, max } from "lodash" 
<<< } >>>

import layoutMixin from "@/mixins/core/layout.mixin.js"

export default {

    components: {
        "dj-holder": () => import("@/components/core/holder.vue"),
        "dj-section": () => import("@/components/core/section.vue")
    },

    mixins: [layoutMixin],

    created() {
        this.on({
            event: "switch-mode",
            callback: () => {
                this.fullReload()
            },
            rules: () => true
        })

        this.on({
            event: "layout.h-bar",
            callback: () => {
                this.hideHbar = !this.hideHbar
            },
            rules: () => true
        })
    },

    data: () => ({
        mini: true,
        drawer: true,
        hideHbar: false,
        drawerDisplay: "display: inherit;",
        mini: true
    }),

    methods: {

        <<<
        if (jace.mode == "development") { >>>

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
                        id: this.$djvue.randomName(),
                        type: "section",
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

        <<<
        } >>>

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
            let h = ["t-bar", "h-bar"]
            this.app.currentPage.sections.forEach(d => {
                d.holders.forEach(d1 => {
                    h.push(d1.name)
                })
            })
            this._waitList = h
            // console.log(this._waitList)
        }


    },

    <<<
    if (jace.mode == "development") { >>>

        watch: {
                "app.currentPage.sections": {
                    handler() { this.setNeedSave(true) },
                    deep: true
                },
                hideHbar(value) {
                    if (!value) {
                        this.drawerDisplay = "display: inherit;"
                        setTimeout(() => { this.drawer = true }, 200)
                    } else {
                        this.drawer = false
                        setTimeout(() => { this.drawerDisplay = "display: none;" }, 200)

                    }
                }
            },

    <<<
    } >>>

    getPageTemplate() {

        return {
            layout: "with-navigation-drawer",
            sections: [{
                id: "default section",
                type: "section",
                align: "justify-start",
                holders: [{
                    name: "default",
                    width: 12
                }]
            }],

            holders: {
                "default": {
                    widgets: []
                },
                "h-bar": {
                    widgets: []
                },
                "t-bar": {
                    widgets: []
                }
            }
        }
    }


}
</script>