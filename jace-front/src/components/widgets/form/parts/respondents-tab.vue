<template>
  <v-card flat>
    <v-row class="mx-0">
      <v-col cols="5">
        <dj-list v-if="form" :items="respondents" itemKey="email" title="Invited respondents" draggable @select="onSelect" @update="onUpdate">
          <template v-slot:menu>
            <v-btn icon small color="primary--text" @click="notifyUsers" :disabled="selection.length==0">
              <v-icon class="primary--text">mdi-email-outline</v-icon>
            </v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn icon small color="primary--text" @click="selectEmail(searchEmail)" :disabled="!isValidEmail(searchEmail)">
              <v-icon class="primary--text">mdi-plus</v-icon>
            </v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn icon small color="primary--text" @click="deleteUsers(selection)" :disabled="selection.length == 0">
              <v-icon class="primary--text">mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-data>
            <span class="title warning--text font-weight-light">No invited respondents.</span>
          </template>
          <template v-slot:item="{ item }">
            <v-row class="mx-0 pa-0">
              <v-col cols="1" class="pa-0">
                <v-avatar v-if="item.photo">
                  <dj-img :src="item.photo" :icon="(item.icon) ? item.icon : 'mdi-account'"></dj-img>
                </v-avatar>
                <v-avatar v-else>
                  <v-icon> mdi-account-question-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col class="py-0 mx-2 pl-5">
                <div class="subtitle-2">{{item.name}}</div>
                <div class="caption">{{item.email}}</div>
                <div class="caption primary--text" v-if="item.apikey">apikey: {{item.apikey}}</div>
                <div class="caption" v-if="item.lastNotifiedAt">notified {{timeAgo(item.lastNotifiedAt)}}</div>
              </v-col>
            </v-row>
          </template>
          <template v-slot:input>
            <v-autocomplete v-model="newEmail" :items="user_email_list" :label="label" :error="error" :success="success" :search-input.sync="searchEmail" @keyup.enter="selectEmail(searchEmail)" @input="addNewEmail(newEmail)">
              <template slot="item" slot-scope="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-title>{{data.item}}</v-list-item-title>
                </template>
                <template v-else>
                  <v-list-item-title v-html="data.item"></v-list-item-title>
                </template>
              </template>
              <template slot="no-data">
                <v-list-item @click="selectEmail">
                  Add foreign respondent: "{{searchEmail}}"
                </v-list-item>
              </template>
            </v-autocomplete>
          </template>
        </dj-list>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <div class="primary--text font-weight-light title">Invitation template</div>
        <editor :content="form.config.access.notificationTemplate" lang="html" :sync="true" @change="onUpdateSource" style="border:1px solid #e0e0e0">
        </editor>
        <div class="primary--text font-weight-light title">Preview</div>
        <v-flex xs-12 v-html="preview" class="pa-2" style="border:1px solid #e0e0e0"></v-flex>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import formIoMixin from "../mixins/form-io.mixin.js";
import editor from '@/components/core/ext/ace-editor.vue';
import moment from "moment"
import djList from "@/components/core/ext/dj-list.vue"
import { find, findIndex, template, templateSettings, differenceWith, intersectionWith } from "lodash"

let compile = (_template, context) => {
  templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  let result = template(_template)(context)

  templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

  return result

}

export default {

  mixins: [djvueMixin, listenerMixin, formIoMixin],

  props: ["form"],

  components: {
    editor,
    "dj-list": djList
  },

  computed: {

    respondents() {
      if (!this.form) return []
      return this.form.config.access.users.map(d => d)
    },

    user_email_list() {
      return differenceWith(this.userlist, this.form.config.access.users, (a, b) => a.email == b.email).map(u => u.email)
    },

    // selection(){
    //   return this.form.config.access.users.filter( u => u.selected)
    // },

    preview() {
      let context = {}
      context.metadata = this.form.metadata;
      context.respondent = (this.selection.length > 0) ? this.selection[0] : {
        name: "Dummy",
        email: 'dummy@example.com',
        apikey: 'dummy_apikey'
      }
      context.app = this.app
      try {
        return compile(this.form.config.access.notificationTemplate, context);
      } catch (e) {
        return `<h2 class="error--text subheading">Cannot display preview</h2><p class="error--text caption">${e.toString()}</p>`
      }
    }

  },

  methods: {



    notifyUsers() {

      let users = this.selection.map(u => {
        let item = JSON.parse(JSON.stringify(u))
        item.context = { metadata: this.form.metadata, respondent: u }
        item.lastNotifiedAt = new Date()
        return item
      })

      this.sendMails(users, this.form.config.access.notificationTemplate)
        .then( () => {
          this.form.config.access.users
            .filter(u => u.selected)
            .forEach(u => {
              u.lastNotifiedAt = new Date()
            })
          this.$emit("update", this.form.config.access)
        })
    },

    timeAgo(d) {
      return moment(new Date(d)).fromNow();
    },


    isValidEmail(value) {
      let emailRegex = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
      let t = emailRegex.test(value);
      if (t) return true
      return false //"Invalid email address format"  
    },

    isUniqueEmail(value) {
      let index = findIndex(this.form.config.access.users, u => u.email == value)
      if (index == -1) return true
      return false //"Email doublicate detected"  
    },

    selectEmail() {

      let validation = this.isValidEmail(this.searchEmail)
      this.errorMessages = (validation == true) ? [] : validation

      validation = this.isUniqueEmail(this.searchEmail)
      if (validation != true) {
        this.errorMessages.push(validation)
      }


      if (this.errorMessages.length == 0) {
        this.addNewEmail(this.searchEmail)
      } else {
        this.cancelAddNewEmail()
      }
    },

    addNewEmail(email) {
      let newUser = find(this.userlist, u => u.email == email)
      let needSearchProfile = false;
      if (!newUser) {
        newUser = {
          name: email,
          email: email,
          apikey: this.apikey()
        }
        needSearchProfile = true;
      }
      // newUser.selected = true;

      this.form.config.access.users.push(newUser)
      this.$emit("update", this.form.config.access)
      if (needSearchProfile) {
        this.findUserProfile(newUser.email).then(res => {
          // console.log("FIND PROFILE", res)
          if (res.type == "none") {
            let index = findIndex(this.form.config.access.users, u => u.email == newUser.email)
            if (index >= 0) {
              let u = this.form.config.access.users.splice(index, 1)[0]
              // console.log(u)
              u.photo = "./"
              u.icon = "mdi-account-question-outline"
              this.form.config.access.users.push(u)
            }
          } else {
            let index = findIndex(this.form.config.access.users, u => u.email == newUser.email)
            if (index >= 0) {
              let u = this.form.config.access.users.splice(index, 1)[0]
              // console.log(u)
              u.photo = res.profile.photo
              u.name = res.profile.name
              u.icon = "mdi-account-question-outline"
              this.form.config.access.users.push(u)
            }
          }
        })
      }


      this.newEmail = null;
      this.searchEmail = null;
      this.$emit("update", this.form.config.access)

    },

    apikey() {
      return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    },

    deleteUsers(selection) {
      this.form.config.access.users =
        differenceWith(this.form.config.access.users, selection, (a, b) => a.email == b.email)
      // this.selection = []  
      this.$emit("update", this.form.config.access)
    },

    selectUser(user) {
      let index = findIndex(this.form.config.access.users, u => u.email == user.email)
      this.form.config.access.users.splice(index, 1, user)
    },

    // inverseSelection(){
    //   this.form.config.access.users.forEach( u => {
    //     u.selected = !u.selected
    //     this.selectUser(u)
    //   })

    // },

    onSelect(selection) {
      this.selection = intersectionWith(this.form.config.access.users, selection, (a, b) => a.email == b.email)
    },

    onUpdate(items) {
      this.form.config.access.users = items.map(d => d)
      this.$emit("update", this.form.config.access)
    },

    onUpdateSource(value) {
      this.form.config.access.notificationTemplate = value
      this.setNeedSave(true)

    }

  },

  created() {
    this.$portal.get("/api/users/list")
      .then(res => {
        this.userlist = res.data.map(d => {
          d.selected = false
          return d
        })
      })

  },

  watch: {



    searchEmail(value) {

      if (!value) {
        this.label = "Type or select respondent email"
        this.error = false
        this.success = false
        return
      }

      if (!this.isValidEmail(value)) {
        this.label = "Invalid email format"
        this.error = true
        this.success = false
        return
      }

      if (!this.isUniqueEmail(value)) {
        this.label = "Email doublicate detected"
        this.error = true
        this.success = false
        return
      }

      this.label = "Add foreign respondent"
      this.error = false
      this.success = true


    }

  },

  data: () => ({

    userlist: [],
    searchEmail: null,
    newEmail: null,
    errorMessages: [],
    label: "Type or select respondent email",
    error: false,
    success: false,
    selection: []

  })


}

</script>
