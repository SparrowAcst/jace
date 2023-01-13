<template>
  <v-card>
    <v-card-title class="white--text title primary py-1">
      <v-icon small class="white--text">mdi-import</v-icon>
      <span class="ml-1 font-weight-light">{{translate("IMPORT_PAGE")}}</span>
      <v-spacer></v-spacer>
      <v-btn text icon small @click="reject">
        <v-icon small class="white--text">mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-layout column>
      <v-flex xs12 pl-3 pr-3 justify-center>
        <v-text-field label="Page title" v-model="title">
        </v-text-field>
      </v-flex>
      <v-flex xs12 px-3 justify-center>
        <v-text-field label="Page path" v-model="id" hint="Enter unique page path">
        </v-text-field>
      </v-flex>
      <v-flex xs1 px-3 justify-center>
      </v-flex>
      <v-flex xs11 px-3 pt-3 justify-center>
        <v-file-input type="file" label="file" @change="fileChanged" />
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="reject()">{{translate("CANCEL")}}</v-btn>
      <v-btn text color="primary" @click="resolve()">{{translate("OK")}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"


let i18n = {
  uk: {

    "#RELOAD": "всеодно перезавантажити",
    "#SAVE_RELOAD": "зберегти та перезавантажити",
    "#DO_YOU_WANT_TO_DELETE": "ви дійсно бажаєте видалити цю сторінку",
    "#CH_MAY_BE_NOT_SAVED": "внесені зміни, можливо, не буде збережено",
    "#CONFIG_CHANGED": "конфігурація змінена",
    "OK": "Tак",
    "IMPORT_PAGE": "Імпорт сторінки",
    "#NO": "ні",
    "#SAVE": "зберегти",
    "CANCEL": "Cкасувати",
    "error": "помилка",
    "#Cannot_update_path": "Неможливо оновити шлях",
    "#CLOSE": "Закрити"
  },
  en: {
    "#RELOAD": "anyway reload",
    "#SAVE_RELOAD": "save and reloag",
    "#DO_YOU_WANT_TO_DELETE": "Do you really want to delete this page",
    "#CH_MAY_BE_NOT_SAVED": "The changes you made may not be saved",
    "#CONFIG_CHANGED": "configuration changed",
    "OK": "Ok",
    "IMPORT_PAGE": "Import Page",
    "#NO": "no",
    "#SAVE": "save",
    "CANCEL": "Cancel",
    "error": "error",
    "#Cannot_update_path": "Cannot update path",
    "#CLOSE": "Close"
  }
}

export default {

  props: ["options", "submit"],
  mixins: [djvueMixin],

  data() {
    return {
      file: null,
      id: '',
      title: '',
      i18n
    }
  },

  methods: {

    fileChanged(file) {
      this.file = file
    },

    resolve() {
      let id = ((this.id.startsWith("/")) ? this.id : "/" + this.id).trim().substring(1)
      this.submit({
        id,
        title: this.title,
        file: this.file
      })
    },

    reject() {
      this.submit(null)
    }

  }

}

</script>
