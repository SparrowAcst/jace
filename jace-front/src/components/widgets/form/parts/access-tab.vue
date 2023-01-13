<template>
  <v-card flat>
    <v-flex xs4>
      <v-combobox v-model="selection" :items="accessModes" label="Access for" class="xs4" @input="onUpdateAccess()">
        <template v-slot:selection="data">
          <v-icon>{{data.item.icon}}</v-icon>
          <span class="pl-1">{{data.item.text}}</span>
        </template>
        <template v-slot:item="data">
          <v-icon>{{data.item.icon}}</v-icon>
          <span class="pl-1">{{data.item.text}}</span>
        </template>
      </v-combobox>
    </v-flex>
    <v-switch :label="`${(form.config.access.enabled)?'was opened':'was closed'} ${(form.config.access.lastNotificatedAt)?timeAgo(form.config.access.lastNotificatedAt):''}`" v-model="form.config.access.enabled" @change="onUpdateAccess()" :disabled="!form.config.questions"></v-switch>
    <v-layout column wrap class="warning darken-1" v-if="!form.config.questions">
      <v-card-text class="pa-1 white--text subheading">
        <v-icon color="white">mdi-alert-outline</v-icon>
        No questions detected
      </v-card-text>
      <v-card-text class="pa-1 pt-0 pb-0 white--text caption">No questions detected on this page. Add one or more question widgets.</v-card-text>
    </v-layout>
    <v-layout column wrap v-if="form.config.access.type=='invited' && (!form.config.access.users || form.config.access.users.length == 0)">
      <v-divider></v-divider>
      <h3 class="headline info--text font-weight-light pl-3 pt-3">Manage your invited respondents on Respondents tab.</h3>
    </v-layout>
    <!-- <v-layout column wrap class="info" v-if="form.config.access.type=='invited'">
      <v-card-text class="pa-1 white--text subheading">
        <v-icon color="white">mdi-information-outline</v-icon>
        Invited Respondents
      </v-card-text>
      <v-card-text class="pa-1 pt-0 pb-0 white--text caption">Manage your invited respondents on Respondents tab.</v-card-text>
    </v-layout> -->
  </v-card>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import moment from "moment"
import { find } from "lodash"

export default {

  mixins: [djvueMixin, listenerMixin],
  props: ["form"],

  methods: {

    timeAgo(d) {
      return moment(new Date(d)).fromNow();
    },

    onUpdateAccess() {
      this.form.config.access.type = this.selection.key;
      this.$emit("update", this.form.config.access)
    }

  },

  created() {
    this.selection = find(this.accessModes, m => m.key == this.form.config.access.type)
  },

  watch: {
    form(value) {
      this.selection = find(this.accessModes, m => m.key == value.config.access.type)
    }
  },

  data: () => ({

    accessModes: [
      { key: "any", icon: "mdi-account", text: "Any respondents" },
      { key: "users", icon: "mdi-account-key", text: "Logged user" },
      { key: "invited", icon: "mdi-account-star", text: "Invited respondents" },
    ],

    selection: null

    // newMetadataKey: null,
    // newMetadataValue: null,
    // showNewMetadataDialog: false,
    // items:[],
    // selection:[]
  })


}

</script>
