<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-icon large>mdi-file-document-box-multiple-outline</v-icon>
      <v-toolbar-title class="font-weight-light">{{translate("NEW_PAGE")}}</v-toolbar-title>
    </v-toolbar>
    <v-flex xs12 pl-3 pr-3 justify-center>
      <v-text-field label="Page title" v-model="pageTitle">
      </v-text-field>
    </v-flex>
    <v-flex xs12 pl-3 pr-3 justify-center>
      <v-text-field label="Page path" v-model="id" prefix="/" hint="Enter unique page path">
      </v-text-field>
    </v-flex>
    <v-flex xs12 pl-3 pr-3 justify-center>
      <v-combobox v-model.sync="layout" :items="options.layouts" label="Select layout" @change="onChangeSelectedLayout">
        <template slot="item" slot-scope="data">
          <v-avatar tile size=24>
            <dj-img :src="data.item.layoutIcon" icon="mdi-application" width="24"></dj-img>
          </v-avatar>
          <span style="padding-left:1em;" class="caption">{{data.item.name}}</span>
        </template>
        <template slot="selection" slot-scope="data">
          <v-avatar tile size=24>
            <dj-img :src="data.item.layoutIcon" icon="mdi-application" small width="24"></dj-img>
          </v-avatar>
          <span style="padding-left:1em;" class="caption">{{data.item.name}}</span>
        </template>
      </v-combobox>
      <pre>{{layout}}</pre>
    </v-flex>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="reject()">{{translate("CANCEL")}}</v-btn>
      <v-btn flat color="primary" @click="resolve()">{{translate("OK")}}</v-btn>
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
        "NEW_PAGE":"Нова сторінка",
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
        "NEW_PAGE": "New Page",
        "#NO": "no",
        "#SAVE": "save",
        "CANCEL": "Cancel",
        "error": "error",
        "#Cannot_update_path": "Cannot update path",
        "#CLOSE": "Close"
      }
    }

	export default {

    props:["options","submit"],
    mixins:[djvueMixin],
    layout:"designDrawer",

		data () {
	    return {
	      layout: null,
	      id: '',
	      pageTitle: '',
        i18n
	    }
	  },
		
		methods:{
      
      // translate(m){
      //   return m
      // },
      
      onChangeSelectedLayout(layout) {
        this.layout = layout
      },
			
      resolve(){
        let newPage = this.layout.getPageTemplate()
        newPage.id = this.id;
        newPage.title = this.pageTitle;          
      	
        // this.$emit('submit', newPage)
        this.submit(newPage)
	    },

	    reject(){
         	// this.$emit('submit', null)
          this.submit(null)
	    },

      beforeCreate(){
        console.log("before create new page dlg", this)
      },

      created(){
        console.log("create new page dlg", this)
      },

      mounted(){
        console.log("mount new page dlg", this)
      }
		}
	}

</script>