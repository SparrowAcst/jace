<template>
  <div>
    
    <v-row class="mx-0">
        <v-combobox label="Default App" v-model="defaultApp" :items="apps" dense>
          <template slot="selection" slot-scope="{  index, item }">
            <v-row class="mx-0 pa-0">
              <v-col cols="1" class="pa-0">
                <v-avatar size="24">
                  <dj-img :src="item.icon" icon="mdi-application"></dj-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0 mx-2 pl-5">
                <div class="subtitle-2">{{item.name}}</div>
              </v-col>
            </v-row>
          </template>
          <template slot="item" slot-scope="{ index, item }">
            <v-row class="mx-0 pa-0">
              <v-col cols="1" class="pa-0">
                <v-avatar size="24">
                  <dj-img :src="item.icon" icon="mdi-application"></dj-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0 mx-2 pl-5">
                <div class="subtitle-2">{{item.name}}</div>
              </v-col>
            </v-row>
          </template>
        </v-combobox>
     
    </v-row>

    <v-row class="mx-0">
        <v-text-field label="JACE Pub Service" v-model="devServiceConfig.pubService"></v-text-field>
    </v-row>

    <dj-list :items="admins" itemKey="email" title="JACE Dev Service Administrators" class="pt-5" @select="onSelectAmins">
      <template v-slot:menu>
        <v-btn icon small color="primary--text" :disabled="admins_selection.length == 0" @click="removeAdminGrants()">
          <v-icon class="primary--text">mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <span class="title warning--text font-weight-light">Predefined Administrators only.</span>
      </template>
      <template v-slot:item="{ item }">
        <v-row class="mx-0 pa-0">
          <v-col cols="1" class="pa-0">

            <v-avatar>
              <dj-img :src="item.photo" :icon="(item.icon) ? item.icon : 'mdi-account'"></dj-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0 mx-2 pl-5">
            <div class="subtitle-2">{{item.name}}</div>
            <div class="caption">{{item.email}}</div>
          </v-col>
        </v-row>
      </template>
      <template v-slot:input>
        <v-combobox label="Select User" v-model="pretendent" :items="pretendents" dense @change="setAdminGrant">
          <template slot="selection">{{ (pretendents.length > 0)? 'Select User' : 'No available users' }}</template>
          <template slot="item" slot-scope="{ index, item }">
            <v-row class="mx-0 pa-0">
              <v-col cols="1" class="pa-0">
                <v-avatar>
                  <dj-img :src="item.photo" :icon="(item.icon) ? item.icon : 'mdi-account'"></dj-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0 mx-2 pl-5">
                <div class="subtitle-2">{{item.name}}</div>
                <div class="caption">{{item.email}}</div>
              </v-col>
            </v-row>
          </template>
        </v-combobox>
      </template>
    </dj-list>
    <v-row class="mx-0">
      <v-spacer></v-spacer>
      <v-btn text class="primary--text" :disabled="loading" @click="saveDevServiceConfig()">Save Dev Service Settings</v-btn>
    </v-row>  
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import i18nMixin from "@/mixins/core/i18n.mixin.js"
import { find } from "lodash"

import djList from "@/components/core/ext/dj-list.vue"

let i18n = {
  en: {
    "Application_settings": "Application settings"
  },
  uk: {
    "Application_settings": "Налаштування застосунку"
  }
}



export default {
  name: "portal-config",
  props: ["config"],
  mixins: [djvueMixin, i18nMixin],
  components: { "dj-list": djList },
  computed: {
    admins() {
      return this.users.filter(u => u.isAdmin)
    },
    pretendents() {
      return this.users.filter(u => !u.isAdmin)
    }
  },

  data() {
    return {
      i18n,
      users: [],
      apps: [],
      defaultApp: null,
      loading: false,

      admins_selection: [],
      pretendent: null,


      headers: [
        { text: "Key", value: 'key', class: 'text-xs-left' },
        { text: "Value", value: 'value', class: 'text-xs-left' },
      ],
      devServiceConfig: {}
    }
  },

  watch: {

    defaultApp(value){
      window.devService.config.defaultApp = value.name
    },
    "devServiceConfig.pubService"(value){
      window.devService.config.pubService = value
    }

  },

  methods: {

    onSelectAmins(data) {
      this.admins_selection = data
    },

    setAdminGrant(pretendent) {
      pretendent.isAdmin = true
      pretendent.selected = true
      this.pretendent = null
    },

    removeAdminGrants() {
      this.admins_selection.forEach(u => {
        u.selected = false
        u.isAdmin = false
      })
    },

    saveDevServiceConfig(){
      this.loading = true
      let newUsers = this.admins.concat(this.pretendents).map(u => ({
        email: u.email,
        value: u.isAdmin
      }))

      Promise
        .all(newUsers.map(u => this.$portal.post("/api/admin/set", u)))
        .then(() => {
          return this.$portal.post("api/app/config/set", window.devService)
        })
        .then(() => {
          this.loading = false
        })
    }

  },


  created() {
    this.devServiceConfig = window.devService.config
    this.$portal.get("/api/users/list")
      .then(res => {
        this.users = res.data.map(d => {
          d.selected = false
          return d
        })
      })
    this.$portal.get('api/app/get-list')
      .then(res => {
        this.apps = res.data
        this.defaultApp = find(this.apps, a => a.name == window.devService.config.defaultApp)
      })
  }
}

</script>
