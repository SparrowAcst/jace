<template>
  <v-card>
    <v-toolbar dence color="primary white--text">
      <v-icon class="white--text">mdi-file-upload-outline</v-icon>
      <v-toolbar-title class="font-weight-light">{{translate("Resources_Manager")}}</v-toolbar-title>
      <v-spacer></v-spacer>


      <v-tooltip top>
        <v-btn small icon  class="white--text" @click="importResource()" slot="activator">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <span>{{translate("CREATE")}}</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn  small icon  class="white--text" :disabled="selected.length == 0" @click="deleteResources()" slot="activator">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <span>{{translate("DELETE")}}</span>
      </v-tooltip>

    </v-toolbar>
    
    <v-data-table 
      :headers="headers" 
      :items.sync="resources" 
      v-model="selected" 
      item-key="url" 
      select-all 
      style="max-height:600px; overflow:auto;" 
      :loading="loading" 
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" secondary hide-details></v-checkbox>
        </td>
        <td class="text-xs-left">
          <v-tooltip right tag="span">
            <v-avatar tile small slot="activator">
              <v-img :src="extIcon(props.item)"></v-img>
            </v-avatar>
            <span>{{ props.item.mime }}</span>
          </v-tooltip>
        </td>
        <td class="text-xs-left">
          <a :href="props.item.url" target="_blank">{{props.item.url}}</a>
        </td>
        <td>
          <v-tooltip right tag="span">
            <v-btn slot="activator" icon @click="$copyText(props.item.url)">
              <v-icon color="secondary">mdi-clipboard-text-outline</v-icon>
            </v-btn>
            <span>Copy url</span>
          </v-tooltip>
        </td>
        <td class="text-xs-left">
          {{ props.item.owner }}
        </td>
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="commit">{{translate("Close")}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import i18nMixin from "@/mixins/core/i18n.mixin.js"

import extIcon from "@/modules/ext-icons/index.js"
import * as _ from "lodash"


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

  props:["submit"],

  mixins: [djvueMixin],

  // layout:"config",

  data () {
    return {
      editMode: false,
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
        .catch(e => {} )
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
      }).catch(e => {
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
    },

    commit() {
      this.submit(null)
    }

  },

  created() {
    this.getResources()
    this.headers = [
      { text: 'Mime', value: 'mime', class:'text-xs-left'}, 
      { text: 'URL', value: 'url', class:'text-xs-left'}, 
      { text: ''}, 
      { text: this.translate('Upload_by'), value: 'owner', class:'text-xs-left'}
    ]
  }

}

</script>
