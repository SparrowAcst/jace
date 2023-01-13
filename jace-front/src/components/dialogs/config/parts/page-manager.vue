<template>
  
  <v-data-table elevation=0 :headers="headers" :items="pages" style="max-height:600px; overflow:auto;" dense show-select v-model="selected">
    <template v-slot:top>
      <v-row class="mx-2 my-0">
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small @click="createPage()" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>{{translate("CREATE")}}</span>
        </v-tooltip>
        
        <v-divider vertical class="mx-2"></v-divider>  
        
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small :disabled="selected.length != 1" @click="exportPage()" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-export</v-icon>
            </v-btn>
          </template>
          <span>{{translate("EXPORT")}}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small slot="activator" @click="importPage" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-import</v-icon>
            </v-btn>
          </template>
          <span>{{translate("IMPORT")}}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small :disabled="selected.length != 1" @click="clonePage" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>
          <span>{{translate("CLONE")}}</span>
        </v-tooltip>

        <v-divider vertical class="mx-2"></v-divider>  
        
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon small :disabled="selected.length == 0" @click="deletePages()" v-on="on" class="primary--text pr-1">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
          <span>{{translate("DELETE")}}</span>
        </v-tooltip>
      </v-row>
      <v-divider></v-divider>
    </template>
    <template v-slot:item.title="props">
      <v-edit-dialog :return-value.sync="props.item.title" @save="onSaveTitle(props.item)" class="primary--text"> {{ props.item.title }}
        <template v-slot:input>
          <v-text-field v-model="props.item.title" label="Edit" single-line></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.path="props">
      <v-edit-dialog :return-value.sync="props.item.path" @save="onSavePath(props.item)" @open="onEditPath(props.item)"> {{ props.item.path }}
        <template v-slot:input>
          <v-text-field v-model="props.item.path" :rules="[unique]" required label="Edit" single-line></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.layout="props">
      <v-avatar tile size=18>
        <v-img :src="props.item.layoutIcon"></v-img>
      </v-avatar>
      {{ props.item.layout }}
    </template>
  </v-data-table>

</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import layouts from "@/components/layouts/index.js"
import { find, findIndex, toPairs } from "lodash"


import newPageDialog from "./dialogs/new-page-dialog.vue"
import importPageDialog from "./dialogs/import-page-dialog.vue"

let i18n = {
  uk: {

    "CLOSE": "Закрити",
    "PAGE_MANAGER": "Управління сторінками",
    "TITLE": "Назва",
    "PATH": "Шлях",
    "LAYOUT": "Шаблон",
    "CREATE": "Створити сторінку",
    "EXPORT": "Експортувати сторінку",
    "IMPORT": "Імпортувати сторінку",
    "CLONE": "Клонувати сторінку",
    "DELETE": "Видалити сторінки",
    "Cannot_update_path": "Cannot Update Page Path"

  },
  en: {
    "CLOSE": "Close",
    "PAGE_MANAGER": "Page Manager",
    "TITLE": "Title",
    "PATH": "Path",
    "LAYOUT": "Layout",
    "CREATE": "Create page",
    "EXPORT": "Export page",
    "IMPORT": "Import page",
    "CLONE": "Clone page",
    "DELETE": "Delete pages",
    "Cannot_update_path": "Cannot Update Page Path"
  }
}


export default {



  name: "PageManager",

  mixins: [djvueMixin],

  data() {
    return {
      headers: [],
      pages: [],
      layouts: [],
      newPageLayout: null,
      newPageId: '',
      newPageTitle: '',
      i18n,
      selected: [],
      editedItem: null,
      edition: false,
      unique: v => {
        let value = ((v.startsWith("/")) ? v : "/" + v).trim()
        let key = value.substring(1)
        if (key != "") {
          return (find(this.pages.filter(p => p.id != this.editedItem.id), p => p.path == value)) ? 'Doublicate path!' : true
        } else {
          return (find(this.pages.filter(p => !p.id), p => p.path == value)) ? 'Doublicate path!' : true
        }
      }
    }
  },



  methods: {

    onSaveTitle(item) {
      let page = find(this.app.pages, p => p.id == item.id)
      if (page) {
        page.title = item.title;
        this.getPages()
      }
    },

    
    onEditPath(item) {
      this.edition = true
      this.editedItem = item
    },

    onSavePath(item) {
      this.edition = false
      setTimeout(() => {
        if (this.unique(this.editedItem.path) != true) {
          this.editedItem.path = this.editedItem._path
        } else {
          let value = this.editedItem.path
          value = ((value.startsWith("/")) ? value : "/" + value).trim()

          let f = find(this.app.pages, p => p.id == this.editedItem.id)
          if (f) {
            f.id = value.substring(1)
            f.id = (f.id == "") ? undefined : f.id
            item.id = f.id
            item.path = (f.id) ? '/' + f.id : '/',
              item._path = item.path
          }
        }
      }, 0)
    },

    createPage() {
      this.$dialogManager.showAndWait(newPageDialog, { width: "40%" }, { layouts: this.layouts })
        .then(newPage => {
          if (newPage) {
            this.app.pages.push(newPage)
            this.getPages()
          }
        })
    },

    getPages() {
      this.pages = this.app.pages.map(p => ({
        id: p.id,
        path: (p.id) ? '/' + p.id : '/',
        _path: (p.id) ? '/' + p.id : '/',
        title: p.title,
        _title: p.title,
        layout: p.layout,
        selected: true,
        layoutIcon: `./modules/layouts/icons/${p.layout}.png`
      }))
      this.selection = this.pages.filter(p => p.selected).map(p => p.path)
    },

    getLayouts() {
      this.layouts = toPairs(layouts).map(l => ({
        id: l[0],
        name: l[0],
        layoutIcon: `./modules/layouts/icons/${l[0]}.png`,
        data: l[1].data,
        getPageTemplate: l[1].getPageTemplate
      })).filter(l => l.id != "empty")
    },

    clonePage() {
      let cloned = find(this.app.pages, p => p.id == this.selected[0].id);
      let clone = JSON.parse(JSON.stringify(cloned))
      clone.id = ((clone.id) ? clone.id : '') + "clone";
      clone.title = clone.title + " (Clone)"
      // console.log(JSON.stringify(clone, null, "\t"))
      this.app.pages.push(clone)
      this.getPages()

    },

    exportPage() {
      let cloned = find(this.app.pages, p => p.id == this.selected[0].id);
      let clone = JSON.parse(JSON.stringify(cloned))
      clone.title = clone.title + " (ExportPage)"
      this.$djvue.saveLocalFile(clone.title + ".json", JSON.stringify(clone, null," "))
    },

    
    importPage() {
      this.$dialogManager.showAndWait(importPageDialog, { width: "40%" })
        .then(importedPage => {
          
          if ( !importedPage ) return
          
          if ( !importedPage.file ) {
            this.warning({
              type: "error",
              title: "Cannot import page",
              text: "Page configuration file not selected"
            })
            return
          }
         
          if ( this.app.pages.filter(p => (importedPage.id == "") ? !p.id : p.id == importedPage.id).length > 0 ) {
            this.warning({
              type: "error",
              title: "Doublicate path",
              text: "Page path should be unique."
            })
            return
          }

          this.loadLocalFile(importedPage.file)
            .then(text => {
              let p = JSON.parse(text);
              p.title = importedPage.title;
              p.id = (importedPage.id == "") ? undefined : importedPage.id;
              this.app.pages.push(p)
              this.getPages();
              this.setNeedSave(true);
            })

        })
    },

    deletePages() {
      this.selected.forEach(page => {

        if (page.id == this.app.currentPage.id) {
          this.$djvue.warning({
            type: "warning",
            title: `Cannot delete page "${page.title}"`,
            text: `Switch to another page and delete "${page.title}" page`
          })
          return
        }

        let pageIndex = findIndex(this.app.pages, p => p.id == page.id)
        if (pageIndex >= 0) {
          this.app.pages.splice(pageIndex, 1)
        }
      })

      this.selected = []

      this.getPages()

    }

  },

  created() {
    this.getPages()
    this.getLayouts()

    this.headers = [
      { text: this.translate('TITLE'), value: 'title', class: 'text-xs-left', sortable: false },
      { text: this.translate('PATH'), value: 'path', class: 'text-xs-left', sortable: false },
      { text: this.translate('LAYOUT'), value: 'layout', class: 'text-xs-left', sortable: false }
    ]
  }

}

</script>
