<template>
  <div>
    <v-row class="mx-0">
      <v-col cols=3>
        <div class="primary--text title font-weight-light align-center">
          Author
        </div>
      </v-col>
      <v-col>
        <v-row class="mx-0 pa-0">
          <v-col cols="1" class="pa-0">
            <v-avatar>
              <dj-img :src="author.photo" icon="mdi-account"></dj-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0 mx-2 pl-5">
            <div class="subtitle-2">{{author.name}}</div>
            <div class="caption">{{author.email}}</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <dj-list :items="app.config.collaborations" itemKey="email" title="Collaborators" class="pt-5" @select="onSelect">
      <template v-slot:menu>
        <v-btn icon small color="primary--text" :disabled="selection.length == 0" @click="removeCollaboratorGrant()">
          <v-icon class="primary--text">mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <span class="title warning--text font-weight-light">No available collaborations.</span>
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
        <v-combobox label="Select User" v-model="pretendent" :items="pretendents" dense @change="setCollaboratorGrant">
          <template slot="selection">{{ (pretendents.length > 0)? 'Select User' : 'No available users' }}</template>
          <template slot="item" slot-scope="{ index, item }">
            <v-row class="mx-0 pa-0">
              <v-col cols="1" class="pa-0">
                <v-avatar>
                  <dj-img :src="item.icon" :icon="(item.icon) ? item.icon : 'mdi-account'"></dj-img>
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
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import i18nMixin from "@/mixins/core/i18n.mixin.js"
import { find, findIndex } from "lodash"


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

    pretendents() {
      return this.users.filter(u => (!find(this.app.config.collaborations, c => c.email == u.email) && u.email != this.author.email))
    }
  },

  data() {
    return {
      i18n,
      author: window.author,
      users: [],
      pretendent: null,
      selection: [],
    }
  },


  methods: {

    onSelect(data) {
      this.selection = data
    },

    setCollaboratorGrant(pretendent) {
      this.app.config.collaborations.push(pretendent)
    },

    removeCollaboratorGrant() {

      this.selection.forEach(u => {
        let index = findIndex(this.app.config.collaborations, c => c.email = u.email)
        if (index >= 0) this.app.config.collaborations.splice(index, 1)
      })

    }



  },


  created() {

    this.$portal.get("/api/users/list")
      .then(res => {
        this.users = res.data.map(d => {
          d.selected = false
          return d
        })
      })
  }
}

</script>
