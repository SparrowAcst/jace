<template>
  <div class="app" v-show="started">
    <v-app>
      <!-- <<< if( jace.mode=="development" ) {>>>
        <div class="caption secondary white--text px-2" style="text-align:right">
          <span class="font-weight-bold"> USE JACE DEV </span>
          <span class="font-weight-light success--text text--lighten-4"> {{$resolveUrl('')}} </span>
          <span class="font-weight-bold"> DPS </span>
          <span class="font-weight-light" :class="(dps_ready) ? 'success--text text--lighten-4':'warning--text text--lighten-4'"> {{$dps.getBaseURL()}} </span>
        </div>
        <<< }>>> -->

         <<< if( jace.mode=="development" ) {>>>
          <v-speed-dial v-if="availableDesignMode" v-model="fab" bottom right direction="top" fixed transition="scale-transition">
            <template v-slot:activator>
              <v-btn v-model="fab" :color="(!isNeedSave)?'primary lighten-1':'warning'" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn fab dark small v-on="on" color="primary" @click="switchMode()">
                  <v-icon :class="(isProductionMode) ? 'mdi-flip-h':''">mdi-exit-to-app</v-icon>
                </v-btn>
              </template>
              <span>Switch to {{ (isProductionMode) ? 'DESIGN' : "PRODUCTION"}} mode</span>
            </v-tooltip>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn fab dark small color="primary" v-on="on" v-if="!isProductionMode" @click="openSettingsDialog()">
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </template>
              <span>App Settings...</span>
            </v-tooltip>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn fab dark small v-if="isNeedSave" color="warning" v-on="on" @click="saveAppConfig()">
                  <v-icon>mdi-content-save-outline</v-icon>
                </v-btn>
              </template>
              <span>Save App is required</span>
            </v-tooltip>
            <v-menu open-on-hover left offset-y top>
              <template v-slot:activator="{ on: menu }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn fab dark small v-if="!isProductionMode" color="primary" v-on="{ ...tooltip, ...menu }">
                      <v-icon>mdi-view-grid</v-icon>
                    </v-btn>
                  </template>
                  <span>Goto Page...</span>
                </v-tooltip>
              </template>
              <v-subheader class="primary white--text ma-0 py-2">PAGES</v-subheader>
              <v-list dence>
                <v-list-item-content>
                  <v-list-item v-for="(item, index) in app.pages" :key="index" @click="gotoPage(item)" style="min-height:0 !important">
                    <v-list-item-title class="subtitle-2 py-1" :class="(isCurrentPage(item))?'primary--text':'font-weight-light'"> {{item.title}}</v-list-item-title>
                  </v-list-item>
                </v-list-item-content>
              </v-list>
            </v-menu>
          </v-speed-dial>
        <<< } >>>  
          <v-main>
            <div>
              <holder name="AppHeader" type="skin"></holder>
              <router-view></router-view>
              <holder name="AppFooter" type="skin"></holder>
            </div>
          </v-main>
          <dialog-manager></dialog-manager>
          <dialog-widget-manager></dialog-widget-manager>
          
    </v-app>
    <app-tooltip></app-tooltip>
  </div>
</template>
<script>


import djvueMixin from "@/mixins/core/djvue.mixin.js"
import listenerMixin from "@/mixins/core/listener.mixin.js"
import holder from "@/components/core/holder.vue"
import dialogManager from "@/components/core/ext/dialog-manager"
import dialogWidgetManager from "@/components/core/ext/dialog-widget-manager"
import appTooptip from "@/components/core/ext/app-tooltip"

 <<< if( jace.mode=="development" ) {>>>
  import settingsDialog from "@/components/dialogs/config/settings-dialog.vue"
 <<< } >>> 
// import * as _ from "lodash"


let components = {
  holder,
  "dialog-manager": dialogManager,
  "dialog-widget-manager": dialogWidgetManager,
  "app-tooltip": appTooptip 
}


export default {

  mixins: [djvueMixin, listenerMixin],

  components,

  data() {
    return {
      user: window.user,
      author: window.author,
      started: false,
      djType: "app",
      progress: null,
      overlay: true,
      loadingMessage: "Please wait...",
      fab: null,
      log: [],
      dps_ready: false
    }
  },
  computed: {
    startMessage() {
      return `${this.app.title}/${ (this.app.currentPage) ? this.app.currentPage.title : "" }`
    },

    availableDesignMode(){
      return (this.user.isAdmin || this.user.isCollaborator || this.user.isOwner) && this.user.isLoggedIn
    }
  },

  methods: {

    checkDps(){
      this.dps_ready = false
      this.$http.get(this.$dps.getBaseURL()).then((res)=>{ 
        this.dps_ready = true
      })
    },

    gotoPage(p) {
      let path = (p.id) ? '/' + p.id : '/'
      this.go(path)
    },

    isCurrentPage(p) {
      return p == this.app.currentPage
    },

    login() {
      this.$djvue.login()
    },

     <<< if( jace.mode=="development" ) {>>>
    openSettingsDialog() {
      this.$dialogManager.showAndWait(settingsDialog, { width: "90%" })
        .then(() => {
          this.setNeedSave(true)
        })
    },
    <<< } >>>

    getPageInfo(page) {
      if (!page) return {}
      if (!this.app.currentPage) return {}

      return {
        title: page.title,
        path: (page.id) ? '/' + page.id : '/',
        current: page.id == this.app.currentPage.id
      }
    },

    loadAppList() {
      this.$portal
        .get('api/app/get-list')
        .then(() => {})
    },


    switchMode() {

      this.started = false
      if (this.app.mode == 'production') {
        this.setMode('development')
        // eslint-disable-next-line
        this.$cookie.set(window.__application_Mode_Key, "development")
        if (this.startedMode && this.startedMode == "production") {
          this.fullReload();
        } else {
          this.emit("switch-mode", "development")
          this.emit("layout-page-start", this)
        }
      } else {
        this.setMode('production')
        this.fullReload();
        // eslint-disable-next-line
        this.$cookie.set(window.__application_Mode_Key, "production")
        this.emit("switch-mode", "production")
        this.emit("layout-page-start", this)

      }

    },



    setupI18n() {
      // let currentLocale = this.$cookie.get("currentLanguage") || "en";

      // this.$i18n.mergeLocaleMessage("en", this.app.config.i18n.en);
      // this.$i18n.mergeLocaleMessage("uk", this.app.config.i18n.uk);

      // this.setLocale(currentLocale)

    }

  },


  created() {

    window.jaceApp = this

    console.log("jaceApp",jaceApp)

    // this.$pubsub().then( service => service.publish({
    //   channel:"app",
    //   date: new Date(),
    //   app: window.initialConfig.name,
    //   user: window.initialConfig.user,
    //   data:`Opened the application "${window.initialConfig.name}" in ${jaceApp.app.mode} mode`
    // }))

	
    <<< console.log(JSON.stringify(jace, null," ")) >>>
    <<< if (jace.availablePublishing) { 
        console.log("insert socket support")
    >>>

      this.$socket.on("info", (socketID) => {
          this.$socket.emit("init", socketID + " " + window.location.href)
        })

    <<< } >>>




    if ( !this.$cookie.get(window.__application_Mode_Key) || !this.availableDesignMode ){
      this.$cookie.set(window.__application_Mode_Key, "production")
    } else {
      this.setMode(this.$cookie.get(window.__application_Mode_Key))
    }

    this.startedMode = (this.isProductionMode) ? "production" : "development"
    window.console.log(`DjVue App starts on ${this.startedMode} mode`)


    if (this.app.config.theme) {
      this.$vuetify.theme.themes.light = {
       ...this.$vuetify.theme.themes.light,
       ...this.app.config.theme 
      }
      
      // _.extend(this.$vuetify.theme.themes.light, this.app.config.theme)
    }


    this.on({
      event: "page-start",
      callback: () => {
        console.log("page start")
        this.started = true;


        if (this.app.mode == "development") {
          this.splash({ text: `${this.startMessage} starts in development mode.` })
        }


      },
      rule: () => true
    })

   
    // this.consoleWrapper.wrap({
    //   log: (output) => { this.emit("console.log", output)},
    //   error: (output) => { this.emit("console.error", output)},
    //   warn: (output) => { this.emit("console.warn", output)},
    //   debug: (output) => { this.emit("console.debug", output)},
    //   info: (output) => { this.emit("console.info", output)},
    //   dir: (output) => { this.emit("console.dir", output)},
    //   trace: (output) => { this.emit("console.trace", output)},
    //   clear: (output) => { this.emit("console.clear", output)}
    // })

  },

  destroyed() {
    this.off()
  },


  mounted() {
    this.setupI18n()
    this.checkDps()
  }


}

</script>
