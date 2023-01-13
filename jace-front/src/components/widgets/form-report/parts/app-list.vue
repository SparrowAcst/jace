<template>
  <v-card flat style="background:transparent !important;">
    <v-container>
      <v-card-title primary-title class="pt-0 pb-0">
        <div>
          <h3 class="headline mb-0">DjVue Apps</h3>
          <div>{{portalURL}}</div>
        </div>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <v-btn slot="activator" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="openNewAppDialog">
              <v-list-tile-title>
                <v-icon>mdi-plus</v-icon> New App...
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="importApp">
              <v-list-tile-title>
                <v-icon>mdi-download</v-icon> Import App...
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-title class="pr-5 pt-0 pb-0">
        <v-autocomplete v-model="keywordsSelection" :items="keywords" color="primary" label="Select keywords" multiple>
          <template slot="selection" slot-scope="data">
            <v-chip outline label color="primary" :selected="data.selected" close class="chip--select-multi" @input="remove(data.item)">
              {{ data.item }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-card-title>
      <v-divider></v-divider>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md12 lg4>
            <v-list style="
            background:transparent !important;    
            height: 350px;
            border:1px solid #bbb;
            overflow: auto;">
              <template v-for="(item, index) in apps">
                <v-subheader v-if="item.header" :key="item.header">
                  {{ item.header }}
                </v-subheader>
                <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                <v-list-tile v-else :key="item.name" avatar ripple :class="{'blue-grey lighten-4':(selected == index)}" @click="toggle(index)">
                  <v-list-tile-avatar tile>
                    <dj-img :src="item.icon" icon="mdi-application">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
          <v-flex d-flex xs12 sm12 md12 lg8>
            <v-card flat style="background:transparent !important; border:1px solid #bbb;" v-if="selected != null">
              <v-toolbar flat card dense color="blue-grey lighten-5">
                <v-spacer></v-spacer>
                <v-btn flat color="primary">
                  <a :href="'./app/'+apps[selected].name" :target = "'blank_'+apps[selected].name">
                    Open
                  </a>
                </v-btn>
                <v-btn flat color="primary">
                  <a target="_blank" :href="`/api/app/export/${apps[selected].id}`">
                    Export
                  </a>
                </v-btn>
                <v-btn 
                  flat 
                  color="error"
                  :disabled="app.config.name == apps[selected].name" 
                  @click="deleteApp(apps[selected])"
                >
                  Delete...
                </v-btn>
              </v-toolbar>
             
              <v-card-title primary-title class="pt-0 pb-0">
                <div>
                  <h5 class="headline ma-1">
                  <v-avatar tile>
                    <dj-img :src="apps[selected].icon" icon="mdi-application">
                  </v-avatar>
                  {{apps[selected].name}}
                </h5>
                  <h6 class="title ma-1">{{apps[selected].title}}</h6>
                </div>
                <v-spacer></v-spacer>
                <div>
                  <v-tooltip tag="div" top>
                    <div slot="activator">
                      <v-icon>mdi-update</v-icon>
                      <span>{{timeAgo(apps[selected].updatedAt)}}</span>
                    </div>
                    <div>Updated at {{formatDate(apps[selected].updatedAt)}}</div>
                  </v-tooltip>
                  <v-tooltip tag="div" bottom>
                    <div slot="activator">
                      <v-icon material-icons>access_time</v-icon>
                      <span>{{timeAgo(apps[selected].createdAt)}}</span>
                    </div>
                    <div>Created at {{formatDate(apps[selected].createdAt)}}</div>
                  </v-tooltip>
                </div>
              </v-card-title>
              <v-card-text class="body-1" style="text-align:justify;">
                {{apps[selected].description}}
                <h5 class="subheading">Team: {{(apps[selected].owner) ? "" : "DjVue"}}</h5>
                <div v-if="apps[selected].owner">
                  <a :href="'mailto:'+apps[selected].owner.email">
                 <v-avatar>
                    <v-img :src="apps[selected].owner.photo">
                 </v-avatar> 
                  {{apps[selected].owner.name}}
                </a>&nbsp; (Author)
                  </v-div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
    </v-container>
  </v-card>
</template>
<script>

import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";

import NewAppDialog from "./new-app-dialog.vue";
Vue.prototype.$dialog.component('NewAppDialog', NewAppDialog)

import ImportAppDialog from "./import-app-dialog.vue";
Vue.prototype.$dialog.component('ImportAppDialog', ImportAppDialog)


export default {

  name: "app-list-widget",

  icon: "mdi-apps",

  mixins: [djvueMixin, listenerMixin],

  methods: {

    importApp(){
       this.$dialog.showAndWait(ImportAppDialog,{appList:this.appList})
       .then((res) => {
          // console.log("IMPORT", res)
          let formData = new FormData();
            formData.append("name", res.name)
            formData.append('file', res.file);
            this.$portal.post('api/app/import',
              formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            .then(() => {
              this.loadAppList()
              .then(()=>{
                this.selected = _.findIndex(this.appList, a => a.name = res.name)
              })

            })
            .catch(e => {
              console.log("ERROR")
            })
       })
    },

    deleteApp(app){
      this.$djvue.confirm({
          type:"warning",
          title:"Delete app",
          text:`You sure want to delete app "${app.title}"`,
          rejectText:"Cancel",
          resolveText:"Delete"

        })
        .then(()=> {
          this.$portal.get(`api/app/destroy/${app.id}`)
          .then( () => {
            this.loadAppList()
            this.selected = null
          })
        })
        

    },

    openNewAppDialog(){
      this.$dialog.showAndWait(NewAppDialog, {appList:this.appList})
        .then(res => {
          if (res) {
            this.$portal.post("api/app/create/",{
              config: res
            })
            .then(() => {
              this.$djvue.warning({
                type:"success",
                title:"App created",
                text:`Access to app with url ${this.portalURL}/app/${res.name}`
              })
              this.loadAppList()
                .then(() => {
                  this.selected = _.findIndex(this.appList, a => a.name = res.name)
                })

            })
            .catch( e => {
                this.$djvue.warning({
                type:"error",
                title:"Cannot create app",
                text:e.toString()
              })
            })
          }
        })  
    },


    timeAgo(d) {
      return moment(new Date(d)).fromNow();
    },

    formatDate(d) {
      return moment(new Date(d)).format("DD MMM YYYY HH:mm")
    },


    remove(item) {
      const index = this.keywordsSelection.indexOf(item)
      if (index >= 0) this.keywordsSelection.splice(index, 1)
    },

    _makeKeywords(data) {
      let keywords = [];
      data.forEach(app => {
        keywords = _.union(keywords, app.keywords)
      })
      _.remove(keywords, k => k == "");

      this.keywords = keywords
    },

    loadAppList() {
      return this.$portal
        .get('api/app/get-list')
        .then(response => {
          // console.log(JSON.stringify(response.data, null, "\t"))
          this._makeKeywords(response.data)
          this.appList = response.data
        })
    },

    toggle(index) {
      this.selected = (this.selected == index) ? null : index;
    }

    // fullReload(){
    //   this.$djvue.fullReload()
    // },

    // login(){
    //   this.$djvue.login()
    // }

    // onUpdate ({data, options}) {
    //   this.template = data;
    // },

    // onReconfigure (widgetConfig) {
    //  return this.$dialog.showAndWait(HtmlConfig, {config:widgetConfig})
    // },

    // onError (error) {
    //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
    // },

    // onDataSelect (emitter, data) {
    //   // console.log(JSON.stringify(data))
    //   this.template = data.filter(item => item.selected).map(item => item.entity).join(", ")
    //   // this.emit("data-select", this, data+" redirected")
    // }

  },


  props: ["config"],

  computed: {
    apps() {
      if (this.keywordsSelection.length == 0) return this.appList;
      return this.appList.filter(app => _.intersection(app.keywords, this.keywordsSelection).length > 0)
    }
    // portalURL(){
    //   console.log(this.$el)
    //   return 'DjVue Portal : '//+document.location.protocol()+'://'+document.location.host()+":"+document.location.port()
    // }
    // html(){

    //    try {
    //     return compile(this.template, this);  
    //   } catch(e) {
    //     this.$djvue.warning({
    //                 type:"error",
    //                 title:"Cannot compile template",
    //                 text:e.toString()
    //               })
    //   }
    // }

  },

  watch: {
    keywordsSelection(value) {
      this.selected = null
    }
  },

  created() {
    // console.log(window.location)
    this.portalURL = 'Hosted on ' + window.location.origin
    this.loadAppList()
  },

  mounted() {
    this.$emit("init")
  },

  data: () => ({
    appList: [],
    selected: null,
    keywords: [],
    keywordsSelection: [],
    portalURL: ""

  })

}

</script>
