
<template>
<<< if (jace.mode == "development") { >>>
  <v-card flat color="transparent" style="min-height: 500px;">
    <v-card-title class="py-0" v-if="user.isLoggedIn">
     <v-spacer></v-spacer>
      
      <v-btn icon small @click="createApp" class="primary--text">
        <v-icon>mdi-plus</v-icon>
      </v-btn>  
      
      <v-divider vertical class="mx-2"></v-divider>
      
      <v-btn icon small @click="importApp" class="primary--text">
        <v-icon>mdi-import</v-icon>
      </v-btn>

      <v-btn icon small @click="openUrl('/api/app/export/'+selected.id,  '_blank')" :disabled="!selected" class="primary--text">
        <v-icon>mdi-export</v-icon>
      </v-btn>

      <v-divider vertical class="mx-2"></v-divider>
      
      <v-btn icon small 
        :disabled="!selected" 
        class="primary--text" 
        v-if="selected" 
        @click="openUrl('./design/'+selected.name,'_blank'+selected.name)"
      >
          <v-icon>mdi-play</v-icon>
      </v-btn>
      
      <v-divider vertical class="mx-2"></v-divider>
      
      <v-btn v-if="selected" icon small @click="deleteApp" :disabled="!selected || (app.config.name == selected.name) || !user.isOwner" class="primary--text">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
       
    </v-card-title>
    
    <v-divider></v-divider>
    <v-row>
      
      <v-col cols="6" class="ml-3 pa-0" style="background:white;">
        <v-row class="mx-0">
          <v-spacer></v-spacer>
          <div class="primary--text caption pr-2">{{portalURL}}</div>
        </v-row>

        <v-row class="mx-0">
          <v-spacer></v-spacer>
          <v-text-field
            class="col-6 px-2"
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-row>

        <div>
    
          <v-data-table
            :items="appList"
            dense
            :items-per-page="Number.POSITIVE_INFINITY"
            hide-default-footer
            :headers="headers"
            :search="search"
            style="overflow:auto; height:30em; border-top:1px solid #eaeaea;"
          >
           
            <template v-slot:body="props">
              <tbody>
                <tr 
                  v-for="(item, rowIndex) in props.items" 
                  :key="rowIndex" 
                  @click="toggle(item)"
                  :class="(selected && selected.name == item.name) ? 'primary--text':'secondary--text'"
                >
                  <td>
                    <dj-img :src="item.icon" icon="mdi-application" style="width:24px;" class="my-1"></dj-img>
                  </td>  
                  <td>
                    {{item.name}}
                  </td>
                  <!-- <td>
                    <v-rating 
                      v-model="item.rate" 
                      :length="5" 
                      :empty-icon="`mdi-star-outline`" 
                      :full-icon="`mdi-star`" 
                      color="warning lighten-2" 
                      background-color="secondary lighten-3"
                      size="10"
                      dense
                      readonly
                    >
                    </v-rating>
                  </td> -->  
                  <td>
                    <span class="caption font-weight-light">{{timeFormat(item.updatedAt)}}</span>
                  </td>  
                </tr>
              </tbody>
            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>


          </v-data-table>
          
        </div>  

<!--         <v-list style="
            background:transparent !important;    
            max-height: 650px;
            overflow: auto;">
            <v-list-item v-for="(item, index) in appList" :key="index" @click="toggle(item)">
              <v-list-item-avatar tile size="24" class="ma-0">
                <dj-img :src="item.icon" icon="mdi-application"></dj-img>
              </v-list-item-avatar>
              <v-list-item-title class="body-2 pl-2" :class="(selected && selected.name == item.name) ? 'primary--text':''">{{item.name}}
              </v-list-item-title>
              <v-spacer></v-spacer>
              <v-list-item-title>
                <v-icon small class="pr-2">mdi-update</v-icon>
                <span class="caption">{{timeAgo(item.updatedAt)}}</span>
              </v-list-item-title>  
              
            </v-list-item>
        </v-list>
 -->
        <v-overlay
          absolute="absolute"
          opacity="0.4"
          :value="overlay"
          z-index="5"
        >
          <v-progress-circular indeterminate size="48"></v-progress-circular>

        </v-overlay>    
      
      </v-col>

      <v-divider vertical></v-divider>
      
      <v-col class="mx-2">
        <v-card flat v-if="selected" color="transparent">
          <!-- <v-row>
            <v-rating 
                      v-model="selected.rate" 
                      :length="5" 
                      :empty-icon="`mdi-star-outline`" 
                      :full-icon="`mdi-star`" 
                      color="warning lighten-2" 
                      background-color="secondary lighten-3"
                      size="18"
                      dense
                      readonly
                    >
            </v-rating>
          </v-row> -->  
          <v-row>
            <v-col class="py-0">
              <!-- <v-avatar tile size="36"> -->
              <!-- </v-avatar> -->
              <a :href="$resolveUrl('design/'+selected.name)" :target="'blank_'+selected.name"> 
                <div class="d-flex align-vertical">
                  <dj-img :src="selected.icon" icon="mdi-application" class="pr-2" style="max-height:48px; max-width:48px"></dj-img>
                  <div class="headline font-weight-light">{{selected.name}}</div>
                </div>  
              </a>  
            </v-col>
            <div class="mx-2">

              <!-- <v-row class="mx-0 px-0"> -->
                <p class="text-right my-0">
                  <v-icon small class="pr-2">mdi-update</v-icon>
                  <span class="caption">{{timeAgo(selected.updatedAt)}}</span>
                </p>
                <p class="text-right my-0">
                  <v-icon  small material-icons class="pr-2">access_time</v-icon>
                  <span class="caption">{{timeAgo(selected.createdAt)}}</span>
                </p>  
              <!-- </v-row> -->
       
            </div>  
          
          </v-row>
          
          <v-divider></v-divider>
          
          <v-row class="mx-2 pa-3 body-2 font-weight-light" style="text-align:justify;">
            {{selected.description}}
          </v-row>  
          
          <v-divider></v-divider>
          
          <v-row class="mx-2 pa-3 body-2 font-weight-light" style="text-align:justify;">
            <div v-if="selected.owner">
              
                <v-avatar>
                  <dj-img :src="selected.owner.photo" icon="mdi-account"></dj-img>
                </v-avatar>
              <a :href="'mailto:'+selected.owner.email">  
                {{selected.owner.name}}
              </a>&nbsp; (Author)
            </div>
          </v-row>  
    

        </v-card>  
      </v-col>  
    </v-row>
    <v-divider></v-divider>
  </v-card>    
<<< } else { >>>
	<div class="warning--text title pa-5" style="text-align: center; border:1px solid">
		JACE WARNING: App List Widget is not available in your publication!
		<div class="caption">
			You can use this widget on JACE DEV SERVICE at <a :href="$resolveUrl('')" target="blank"> {{$resolveUrl('')}} </a> only.
		</div>
	</div>
<<< } >>>		

</template>
<script>




import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";

<<< if (jace.mode == "development") { >>>
  
  import { find, union, remove } from "lodash"
  import moment from "moment"
	import NewAppDialog from "./new-app-dialog.vue";
	import ImportAppDialog from "./import-app-dialog.vue";

<<< } >>>

export default {

  name: "app-list-widget",

  icon: "mdi-apps",

  mixins: [djvueMixin, listenerMixin],


<<< if (jace.mode == "development") { >>>
  
  methods: {



    importApp() {
      this.$dialogManager.showAndWait(ImportAppDialog, { width: "30%" }, { appList: this.appList })
        .then( res => {
          if(!res) return

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
                .then(() => {
                  setTimeout(() => {
                    this.selected = find(this.appList, a => a.name == res.name)  
                  }, 100)
                  
                })

            })
            .catch( () => {
              // console.log("ERROR")
            })
        })
    },

    deleteApp() {
      let app = this.selected
      this.$djvue.confirm({
          type: "warning",
          title: "Delete app",
          text: `You sure want to delete app ${app.name} "${app.title}"`,
          rejectText: "Cancel",
          resolveText: "Delete"

        })
        .then(() => {
          this.$portal.get(`api/app/destroy/${app.id}`)
            .then(() => {
              this.loadAppList()
              // this.selected = null
            })
        })


    },

    createApp() {
      this.$dialogManager.showAndWait(NewAppDialog, { width: "50%" }, { appList: this.appList })
        .then(res => {
          if(!res) return
            this.$portal.post("api/app/create/", {
              config: res
            })
            .then(() => {
              this.$djvue.warning({
                type: "success",
                title: "App created",
                text: `Access to app with url ${this.portalURL}/app/${res.name}`
              })
              this.loadAppList()
                .then(() => {
                  setTimeout(() => {
                    // console.log(res.name)
                    this.selected = find(this.appList, a => a.name == res.name)
                    // console.log(this.selected)  
                  }, 200)
                  
                })

            })
            .catch(e => {
              this.$djvue.warning({
                type: "error",
                title: "Cannot create app",
                text: e.toString()
              })
            })
          
        })
    },


    timeAgo(d) {
      return moment(new Date(d)).fromNow();
    },

    timeFormat(d){
      return moment(new Date(d)).format("YYYY.MM.DD HH:mm")
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
        keywords = union(keywords, app.keywords)
      })
      remove(keywords, k => k == "");

      this.keywords = keywords
    },

    loadAppList() {
      
      this.appList = []
      this.selected = null
      this.overlay = true
      return this.$portal
        .get('api/app/get-list')
        .then(response => {
          // console.log(response.data)
          this._makeKeywords(response.data)
          this.appList = response.data.filter( d => d )
          // .map( d => {
          //   d.rate = Math.random()*5
          //   return d
          // })

          // if(!this.selected && this.appList.length>0) this.selected = this.appList[0] 
          
          this.$nextTick(() => { 
            this.overlay = false 
          })  
        })
    },

    toggle(item) {
      this.selected = item;
    }

  },

  props: ["config"],

  // computed: {
  //   apps() {
  //     if (this.keywordsSelection.length == 0) return this.appList;
  //     return this.appList.filter(app => _.intersection(app.keywords, this.keywordsSelection).length > 0)
  //   }
  // },

  // watch: {
  //   keywordsSelection(value) {
  //     this.selected = null
  //   }
  // },

  created() {
    this.portalURL = 'Hosted on ' + window.location.origin
    this.loadAppList()
  },

<<< } >>>

  mounted() {
    this.$emit("init")
  },

  data: () => ({
    appList: [],
    selected: null,
    keywords: [],
    keywordsSelection: [],
    portalURL: "",
    user: window.user,
    overlay:false,
    search:"",
    headers:[
      {
        text:"",
        sortable:false
      },
      {
        text:"Application",
        value:"name",
        sortable:true
      },
      // {
      //   text:"Rate",
      //   value:"rate",
      //   sortable:true
      // },
      {
        text:"Updated at",
        value:"updatedAt",
        sortable:true
      }
    ]
  })

}

</script>


