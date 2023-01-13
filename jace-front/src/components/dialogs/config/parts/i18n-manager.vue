<template>
 
  <v-data-table :headers="headers" :items="translations" style="max-height:600px; overflow:auto;" dense show-select v-model="selected">
    <template v-slot:top>
      <v-row class="mx-2 my-0">
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small :disabled="noChanges" @click="apply()" v-on="on" class="primary--text pr-3">
              <v-icon>mdi-sync</v-icon>
            </v-btn>
          </template>
          <span>{{translate("Apply")}}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small @click="addTranslation()" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>{{translate("Create")}}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small :disabled="selected.length == 0" @click="removeTranslations()" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
          <span>{{translate("Remove")}}</span>
        </v-tooltip>
      </v-row>
      <v-divider></v-divider>
    </template>

    <template v-slot:item.key="props">
      <v-edit-dialog :return-value.sync="props.item.key" @save="save"> {{ props.item.key }}
        <template v-slot:input>
          <v-text-field v-model="props.item.key" label="Edit" single-line></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    
    <template v-slot:item.en="props">
      <v-edit-dialog :return-value.sync="props.item.en" @save="save"> {{ props.item.en }}
        <template v-slot:input>
          <v-text-field v-model="props.item.en" label="Edit" single-line></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    
    <template v-slot:item.uk="props">
      <v-edit-dialog :return-value.sync="props.item.uk" @save="save"> {{ props.item.uk }}
        <template v-slot:input>
          <v-text-field v-model="props.item.uk" label="Edit" single-line></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
  
  </v-data-table>

</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"

import { toPairs, union, find } from "lodash"


let i18n = {
  en: {
    "I18n_Manager": "I18n Manager",
    "Key": "Key",
    "Locale EN": "English",
    "Locale UA": "Ukrainian",
    "Cancel": "Cancel",
    "Save": "Save",
    "Create": "Create",
    "Remove": "Remove",
    "Apply": "Apply"
  },
  uk: {
    "I18n_Manager": "Переклади",
    "Key": "Ключ",
    "Locale EN": "Англійська",
    "Locale UA": "Українська",
    "Cancel": "Скасувати",
    "Save": "Зберегти",
    "Create": "Додати переклад",
    "Remove": "Видалити переклади",
    "Apply": "Застосувати"
  }
}

export default {

  name: "i18nManager",

  mixins: [djvueMixin],

  data() {
    return {
      noChanges: true,
      search: "",
      translations: [],
      selected: [],
      i18n,
      headers: [],
      editedItem:null,
      unique: v => this.translations.filter(t => t.key == v).length == 1 || "Doublicate key"
    }
  },

  methods: {

    saveKey(){
        setTimeout(() => {
        if (this.unique(this.editedItem.key) != true) {
          this.editedItem.key = this.editedItem._key
        } else {
          this.editedItem._key = this.editedItem.key
        }
      }, 0)
    },

    openKey(item){
      this.editedItem = item
    },

    save() {
      this.noChanges = false
    },

    apply() {
      this.noChanges = true
      let res = this.translations2I18n(this.translations)
      this.$i18n.mergeLocaleMessage("en", res.en)
      this.$i18n.mergeLocaleMessage("uk", res.uk)
      this.app.config.i18n = res;
      this.setNeedSave(true)
    },

    addTranslation() {
      this.noChanges = false
      let newItem = { key: this.$djvue.randomName(), en: '# EN TRANSLATION', uk: '# UK TRANSLATION' };
      newItem._key = newItem.key
      this.translations.push(newItem)
      this.translations = this.i18n2Translations(this.translations2I18n(this.translations))
    },

    removeTranslations() {
      this.noChanges = false
      this.selected.forEach(item => {
        const index = this.translations.indexOf(item)
        this.translations.splice(index, 1)
      })
    },

    i18n2Translations(i18n) {
      let en = toPairs(i18n.en).map(l => ({ key: l[0], en: l[1] })) //.filter( t => !t.key.startsWith(this.$i18n_id))
      let uk = toPairs(i18n.uk).map(l => ({ key: l[0], uk: l[1] })) //.filter( t => !t.key.startsWith(this.$i18n_id))

      let res = union(
        en.map(r => r.key),
        uk.map(r => r.key)
      )

      res = res.map(item => {
        let e = find(en, r => r.key == item)
        let u = find(uk, r => r.key == item)
        return {
          id: this.$djvue.randomName(),
          key: item,
          _key:item,
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

    // cancel() {
    //   // this.$emit('submit', null)
    //   this.submit(null)
    // },

    // commit() {
    //   this.submit(this.translations2I18n(this.translations))
    //   // this.$emit('submit', this.translations2I18n(this.translations))
    // }

  },

  created() {
    this.translations = this.i18n2Translations(this.app.config.i18n)
    this.headers = [
      { text: this.translate('Key'), value: 'key', class: 'text-xs-left' },
      { text: this.translate('Locale EN'), value: 'en', class: 'text-xs-left' },
      { text: this.translate('Locale UA'), value: 'uk', class: 'text-xs-left' }
    ]
  }

}

</script>