<template>
  <v-card>
    <v-toolbar color="primary white--text">
      <v-icon class="white--text">mdi-translate</v-icon>
      <v-toolbar-title class="font-weight-light">{{translate("I18n_Manager")}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip top>
        <v-btn icon small @click="addTranslation()" slot="activator" class="white--text">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <span>{{translate("Create")}}</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon small  @click="removeTranslations()" :disabled="selected.length == 0"  slot="activator" class="white--text">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <span>{{translate("Remove")}}</span>
      </v-tooltip>

    </v-toolbar>

    <v-data-table 
      :headers="headers" 
      :items.sync="translations" 
      v-model="selected" 
      item-key="id" 
      select-all 
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" secondary hide-details></v-checkbox>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog :return-value.sync="props.item._key" large lazy @save="onSaveValue(props.item)" @cancel="onSaveValue(props.item)" @open="onEditValue(props.item)" @close="onSaveValue(props.item)">
            {{ props.item.key }}
            <v-textarea slot="input" v-model="props.item._key" label="Edit" large lazy></v-textarea>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog :return-value.sync="props.item.en" large lazy> {{ props.item.en }}
            <v-textarea slot="input" v-model="props.item.en" label="Edit"></v-textarea>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog :return-value.sync="props.item.uk" large lazy> {{ props.item.uk }}
            <v-textarea slot="input" v-model="props.item.uk" label="Edit"></v-textarea>
          </v-edit-dialog>
        </td>
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="cancel">{{translate('Cancel')}}</v-btn>
      <v-btn flat color="primary" @click="commit">{{translate('Save')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"
// import i18nMixin from "@/mixins/core/i18n.mixin.js"
import * as _ from "lodash"

let i18n = {
  en:{
    "I18n_Manager": "I18n Manager",
    "Key": "Key",
    "Locale EN": "English",
    "Locale UA": "Ukrainian",
    "Cancel": "Cancel",
    "Save": "Save",
    "Create":"Create",
    "Remove":"Remove"
  },
  uk:{
    "I18n_Manager": "Переклади",
    "Key": "Ключ",
    "Locale EN": "Англійська",
    "Locale UA": "Українська",
    "Cancel": "Скасувати",
    "Save": "Зберегти",
    "Create":"Додати переклад",
    "Remove":"Видалити переклади"
  }
}

export default {

  name: "i18nManager",

  props:["submit"],

  mixins: [djvueMixin],//,i18nMixin],

  layout:"config",

  data () {
    return {
      editMode: false,
      search: "",
      translations: [],
      selected: [],
      i18n,
      headers:[]
    }
  },

  methods: {

    onEditValue(item) {
      item._key = item.key
    },

    onSaveValue(item) {
      if (item.key != item._key) {
        item.key = item._key
        this.search = item._key
      }
    },

    addTranslation() {

      let newItem = { id: this.$djvue.randomName(), key: "#KEY VALUE", _key: "#KEY VALUE", en: '# EN TRANSLATION', uk: '# UK TRANSLATION' };
      this.translations = [newItem].concat(this.translations)
      this.search = "#KEY VALUE"
      this.selected.push(newItem)
    },

    removeTranslations() {
      this.selected.forEach(item => {
        const index = this.translations.indexOf(item)
        this.translations.splice(index, 1)
      })

      this.selected = []
      this.search = ""
      // console.log(JSON.stringify(this.i18nSelected, null,"\t"))
    },

    i18n2Translations(i18n) {
      let en = _.toPairs(i18n.en).map(l => ({ key: l[0], en: l[1] }))//.filter( t => !t.key.startsWith(this.$i18n_id))
      let uk = _.toPairs(i18n.uk).map(l => ({ key: l[0], uk: l[1] }))//.filter( t => !t.key.startsWith(this.$i18n_id))

      let res = _.union(
        en.map(r => r.key),
        uk.map(r => r.key)
      )

      res = res.map(item => {
        let e = _.find(en, r => r.key == item)
        let u = _.find(uk, r => r.key == item)
        return {
          id: this.$djvue.randomName(),
          key: item,
          _key: item,
          en: (e) ? e.en : "",
          uk: (u) ? u.uk : ""
        }
      })
      return res
    },

    translations2I18n(translations) {
      let res = { en: {}, uk: {} }
      translations.forEach(item => {
        res.en[item.key] = item.en
        res.uk[item.key] = item.uk
      })
      return res
    },

    cancel() {
      // this.$emit('submit', null)
      this.submit(null)
    },

    commit() {
      this.submit(this.translations2I18n(this.translations))
      // this.$emit('submit', this.translations2I18n(this.translations))
    }

  },

  created() {
    // console.log("create", JSON.stringify(this.i18n, null, "\t"))
    this.translations = this.i18n2Translations(this.app.config.i18n)
    this.headers = [
      { text: this.translate('Key'), value: 'key', class:'text-xs-left'}, 
      { text: this.translate('Locale EN'), value: 'en', class:'text-xs-left'}, 
      { text: this.translate('Locale UA'), value: 'ua', class:'text-xs-left'}
    ]
  }

}

</script>
