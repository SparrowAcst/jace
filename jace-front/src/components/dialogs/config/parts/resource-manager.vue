<template>

 
  <v-data-table :headers="headers" :items="resources" style="max-height:600px; overflow:auto;" dense show-select v-model="selected">
    <template v-slot:top>
      <v-row class="mx-2 my-0">
        <v-spacer></v-spacer>
        
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small @click="importResource()" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>{{translate("Create")}}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small :disabled="selected.length == 0" @click="deleteResources()" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
          <span>{{translate("Remove")}}</span>
        </v-tooltip>
      </v-row>
      <v-divider></v-divider>
    </template>

    <template v-slot:item.mime="props">
      <v-tooltip left>
          <template v-slot:activator="{ on }">
              <v-avatar tile small v-on="on" size="18">
                <v-img :src="extIcon(props.item)"></v-img>
              </v-avatar>
          </template>  
          <div class="justify-center">
            <div class="caption text-center">
              <v-avatar tile small size="64">
                  <v-img :src="extIcon(props.item)"></v-img>
              </v-avatar>
            </div>
            <div class="caption text-center">
              {{ props.item.mime }}
            </div>  
          </div>
      </v-tooltip>
    </template>
    
    <template v-slot:item.url="props">
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn slot="activator" icon @click="$copyText(props.item.url)" v-on="on">
            <v-icon color="secondary" small >mdi-clipboard-text-outline</v-icon>
          </v-btn>
        </template>
        <span>Copy url</span>
      </v-tooltip>    

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <a :href="props.item.url" target="_blank" v-on="on">{{props.item.url}}</a>
        </template>
        <span>Open url</span>
      </v-tooltip>    
    </template>
    
  
  </v-data-table>

</template>
<script>

import djvueMixin from "@/mixins/core/djvue.mixin.js"
// import i18nMixin from "@/mixins/core/i18n.mixin.js"

import extIcon from "@/modules/ext-icons/index.js"



let i18n = {
  en:{
    "Resources_Manager": "Resources Manager",
    "Upload_by": "Upload by",
    "Close": "Close",
    "CREATE":"Add resource",
    "DELETE":"Remove resource"
  },

  uk:{
    "Resources_Manager": "Ресурси",
    "Upload_by": "Користувач",
    "Close": "Закрити",
    "CREATE":"Додати ресурс",
    "DELETE":"Видалити ресурс"
  }

}



export default {

  name: "ResourcesManager",

  mixins: [djvueMixin],
 data () {
    return {
      resources: [],
      selected: [],
      loading: false,
      i18n,
      headers: null
    }
  },

  methods: {

    extIcon,

    
    importResource(){
      this.selectFile()
        .then( file => {
          if(!file) return
          this.onAddResource(file)
        })
        .catch(() => {} )
    },
    
    onAddResource(file) {
      // console.log(file)
      if (!file) return
      this.loading = true;
      let formData = new FormData();
      formData.append("app", this.app.name)
      formData.append('file', file);
      this.$portal.post('/api/resource/update',
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(() => {
        this.getResources()
      }).catch((e) => {
        this.$djvue.warning({
            type: "error",
            title: e.response.data.name,
            text: e.response.data.message
          })
          .then(() => { this.loading = false })
      })


    },

    getResources() {
      this.$portal.get("/api/resource")
        .then(res => {
          this.resources = res.data;
          this.loading = false
        })
    },


    deleteResources() {

      this.loading = true
      Promise.all(this.selected.map(resource => this.$portal.get("/api/resource/delete/" + resource.path)))
        .then(() => {
          this.selected = []
          this.getResources()
        })
    }

  },

  created() {
    this.getResources()
    this.headers = [
      { text: 'Mime', value: 'mime', class:'text-xs-left'}, 
      { text: 'URL', value: 'url', class:'text-xs-left'}, 
      { text: this.translate('Upload_by'), value: 'owner', class:'text-xs-left'}
    ]
  }

}

</script>

