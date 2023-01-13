<template>
  <v-card>
    <v-card-title class="white--text title primary py-1">
      <v-icon small class="white--text">{{options.icon}}</v-icon>
      <span class="ml-1 font-weight-light">{{options.title}}</span>
      <v-spacer></v-spacer>
      <v-btn text icon small @click="reject">
        <v-icon small class="white--text">mdi-close</v-icon>
      </v-btn>  
    </v-card-title>


    <v-row
      class="pa-0 mx-3 mt-3"
      justify="space-between"
    >
      <v-col cols="3">
        <v-treeview
            :active.sync="active"
            :items="options.editorTree"
            :open = "open"
            activatable
            active-class="primary--text"
            open-on-click
            transition
            dense
            class="body-1"
          >
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col
        class="d-flex text-center py-0"
      >
        <v-scroll-y-transition mode="out-in">
          <v-col cols="12"
            v-if="selected && getEditor(selected.id)"
            :key="selected.id"
            class="pa-0 mx-0"
          >
            <v-row
              class="text-left py-0"
            >
                <v-col cols="12" class="py-1">

                  <component 
                    :is="getEditor(selected.id)" 
                    :config="options.config" 
                    :selected="selected"
                  >
                  </component>
                  
                </v-col>
              
            </v-row>
          </v-col>

          <div
            v-else
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Select Group
          </div>
          
        </v-scroll-y-transition>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="reject" text>Cancel</v-btn>
      <v-btn color="primary" @click="resolve" text>Ok</v-btn>
    </v-card-actions>
  </v-card>
</template>







<!-- 
<template>
      <v-card>
        
        

        <v-toolbar dark flat height="36px" color="primary">
          <v-icon small>{{options.icon}}</v-icon>
          <v-toolbar-title class="ml-1 font-weight-light">{{options.title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text icon small class="mr-1">
            <v-icon small>mdi-close</v-icon>
          </v-btn>  
        </v-toolbar>

        <v-row>
          <v-col cols="4">
            <v-card-text class="pa-1"  style="height:500px;">
               <v-treeview
                  :active.sync="active"
                  :items="options.editorTree"
                  :open = "open"
                  activatable
                  active-class="primary--text"
                  open-on-click
                  transition
                  dense
                  class="body-1"
                >
              </v-treeview>
              
            </v-card-text>
          </v-col>

          <v-divider vertical></v-divider>
          
          <v-col>
            <v-card-text class="pa-1"  style="height:500px;">
              <div v-for="item in editorMap">

                <component :is="item.editor" :config="options.config" :selected="selected" v-if="selected && selected.id == item.id">
                </component>
                
              </div>
            </v-card-text>
          </v-col>  
        
        </v-row>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="reject" text>Cancel</v-btn>
            <v-btn color="primary" @click="resolve" text>Ok</v-btn>
          </v-card-actions>

      </v-card>
</template> -->

<script>
import { find }  from "lodash"

// import components from "./parts"

 let tree2array = (tree, level) => {
  level = level || 1;
  let res = [];
  tree.forEach((node,index)=>{
    node.id = level+"."+index;
    res.push(node)
    if ( node.children ){
      res = res.concat(tree2array(node.children,level+1))
    }  
  })
  return res;
}

export default {
  
  // components,

  // props:["icon", "title","config", "editorTree","resolve","reject"],
  
  props:["options","submit"],

  computed:{
      selected () {
        let vm = this
        return find(vm.editorMap, item => item.id == vm.active[0])
      }
    },

      watch: {
      selected: function(value){
        this.selectedItem = value
      }  
    },

    data () {
      return {
        editorMap:[],
        open:[],
        active:[]    
      }
    },

    methods:{

      getEditor(id){
        let f = find(this.editorMap, item => item.id == id)
        return (f) ? f.editor : null 
      },
      
      resolve(){
        this.submit(this.options.config)    
      },

      reject(){
        this.submit(null)
      }
    
    },

    created(){
      this.editorMap = tree2array(this.options.editorTree);
      this.open = [this.editorMap[0].id];
      this.active = [this.editorMap[1].id];
    }


}

</script>

<style>
  .v-treeview--dense .v-treeview-node__root {
      min-height: 1.3em !important;
  }
</style>