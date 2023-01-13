<template>
  <v-card>
    <v-toolbar dence color="primary white--text">
      <v-icon class="white--text">mdi-file-document-box-multiple-outline</v-icon>
      <v-toolbar-title class="font-weight-light">{{translate("PAGE_MANAGER")}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{selection}}</span>
      <v-tooltip top>
        <v-btn icon small @click="createPage()" class="white--text" slot="activator">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <span>{{translate("CREATE")}}</span>
      </v-tooltip>
      {{selection.length}}
      <!-- <v-tooltip top> -->
        <v-btn icon small  :disabled="selection.length != 1" @click="exportPage()" class="white--text"><!--  slot="activator"> -->
          <v-icon>mdi-export</v-icon>
        </v-btn>
     <!--    <span>{{translate("EXPORT")}}</span>
      </v-tooltip> -->
      <v-tooltip top>
        <v-btn icon small class="white--text" slot="activator" @click="importPage">
          <v-icon>mdi-import</v-icon>
        </v-btn>
        <span>{{translate("IMPORT")}}</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn icon small :disabled="selection.length != 1" @click="clonePage" class="white--text" slot="activator">
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        <span>{{translate("CLONE")}}</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn icon small :disabled="selection.length == 0" @click="deletePages()" class="white--text" slot="activator">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <span>{{translate("DELETE")}}</span>
      </v-tooltip>
    </v-toolbar>
    <span>{{selection}}</span>
    <v-data-table 
      :headers="headers" 
      :items.sync="pages" 
      item-key="path" 
      style="max-height:600px; overflow:auto;" 
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" @change="onChange(props.item)" secondary hide-details></v-checkbox>{{props.item.selected}}
        </td>
        <td class="text-xs-left">
          <v-edit-dialog :return-value.sync="props.item._title" lazy large @save="onSaveTitle(props.item)" @open="onEditTitle(props.item)"> {{props.item.title}}
            <v-text-field slot="input" v-model="props.item._title" label="Edit title"></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <!-- {{props.item.path}} -->
          <v-edit-dialog :return-value.sync="props.item._path" lazy large @save="onSavePath(props.item)" @open="onEditPath(props.item)"> {{props.item.path}}
            <v-text-field slot="input" v-model="props.item._path" label="Edit path" prefix="/"></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-avatar tile size=32>
            <v-img :src="props.item.layoutIcon"></v-img>
          </v-avatar>
          {{ props.item.layout }}
        </td>
      </template>
    </v-data-table>
   
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="commit">{{translate("CLOSE")}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import layouts from "@/components/layouts/index.js"
import * as _ from "lodash"


import newPageDialog from "./dialogs/new-page-dialog.vue"

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
    "DELETE": "Видалити сторінки"

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
    "DELETE": "Delete pages"
  }
}


export default {



  name: "PageManager",

  mixins: [djvueMixin],

  layout: "config",

  computed:{
    // selection(){
    //   console.log("selection",this.pages, this.pages.filter( p => p.selected).map(p => p.path))
    //   return this.pages.filter( p => p.selected).map(p => p.path)
    // }
  },

  data() {
    return {
      headers: [],
      pages: [],
      layouts: [],
      newPageLayout: null,
      newPageId: '',
      newPageTitle: '',
      i18n,
      selected:[]
    }
  },

  methods: {

     onChange(item){
      this.selection = this.pages.filter(p => p.selected).map(p => p.path)
    },

    onEditTitle(item) {
      item._title = item.title
    },

    onSaveTitle(item) {
      if (item.title != item._title) {
        item.title = item._title


        let page = _.find(this.app.pages, p => p.id == item.id)
        if (page) {
          page.title = item.title;
          this.getPages()
        }
      }
    },

    onEditPath(item) {
      item._path = item.path.substring(1)

    },

    onSavePath(item) {



      let newPath = (item._path) ? '/' + item._path : '/'
      if (item.path != newPath) {
        if (_.findIndex(this.app.pages, p => ((p.id) ? (p.id == item._path) : (!item._path))) >= 0) {

          this.$djvue.warning({
            type: "error",
            title: this.translate("#Cannot_update_path"),
            text: `Doublicate page pathes "${newPath}" detected`
          })
          return
        }


        item.path = newPath


        let page = _.find(this.app.pages, p => p.id == item.id)
        if (page) {
          page.id = item._path;

          this.getPages()
        }
      }
    },



    createPage() {
      this.$dialog.showAndWait(newPageDialog, {
        layouts: this.layouts
      }).then(newPage => {
        if (newPage) {
          this.app.pages.push(newPage)
          // this.saveAppConfig()
          //   .then(() => {
          //     this.fullReload()
          //   })
        }
      })
    },



    getPages() {
      this.pages = this.app.pages.map(p => ({
        id: p.id,
        path: (p.id) ? '/' + p.id : '/',
        _path: p.id,
        title: p.title,
        _title: p.title,
        layout: p.layout,
        selected:true,
        layoutIcon: `./modules/layouts/icons/${p.layout}.png`
      }))
       this.selection = this.pages.filter(p => p.selected).map(p => p.path)
    },

    getLayouts() {
      this.layouts = _.toPairs(layouts).map(l => ({
        id: l[0],
        name: l[0],
        layoutIcon: `./modules/layouts/icons/${l[0]}.png`,
        data: l[1].data,
        getPageTemplate: l[1].getPageTemplate
      })).filter(l => l.id != "empty")
    },

    clonePage() {
      let cloned = _.find(this.app.pages, p => p.id == this.selected[0].id);
      let clone = JSON.parse(JSON.stringify(cloned))
      clone.id = ((clone.id) ? clone.id : '') + "clone";
      clone.title = clone.title + " (Clone)"
      // console.log(JSON.stringify(clone, null, "\t"))
      this.app.pages.push(clone)
      this.getPages()

    },

    exportPage() {
      let cloned = _.find(this.app.pages, p => p.id == this.selected[0].id);
      let clone = JSON.parse(JSON.stringify(cloned))
      clone.title = clone.title + " (ExportPage)"
      this.$djvue.saveLocalFile(clone.title + ".json", clone)
    },

    cancelImportDialog() {
      this.newPageTitle = "";
      this.newPageId = "";
      
    },

    importPage() {
      console.log("IMPORT",this.selectFile)
      this.selectFile()
      .then( file => {
        if (!file) {
          this.warning({
            type: "error",
            title: "Cannot import form",
            text: "Form configuration file not selected"
          })
          this.newPageTitle = "";
          this.newPageId = "";
          return
        }

        this.loadLocalFile(file)
          .then(text => {
            let p = JSON.parse(text);
            p.title = this.newPageTitle;
            p.id = this.newPageId;
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
            type: "error",
            title: "Cannot delete page" + page.title,
            text: "Switch to another page and delete " + page.title + " page"
          })
          return
        }

        let pageIndex = _.findIndex(this.app.pages, p => p.id == page.id)
        if (pageIndex >= 0) {
          this.app.pages.splice(pageIndex, 1)
        }
      })

      this.selected = []

      this.getPages()

    },

    commit() {
      this.$emit('submit', null)
    }

  },
  
  created() {
    this.getPages()
    this.getLayouts()

    this.headers = [
      { text: '', value:'selected', sortable:false},
      { text: this.translate('TITLE'), value: 'title', class: 'text-xs-left', sortable:false },
      { text: this.translate('PATH'), value: 'path', class: 'text-xs-left', sortable:false },
      { text: this.translate('LAYOUT'), value: 'layout', class: 'text-xs-left', sortable:false }
    ]

    if (!this.$dialog._components.newPageDialog) {
      this.$dialog.component('newPageDialog', newPageDialog)
    }

  }

}

</script>
