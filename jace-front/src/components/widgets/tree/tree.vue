<template>
  <v-card flat color="transparent">
    <v-container v-if="!config.metadata.concepts || !config.metadata.collections">
      <h2 class="warning--text font-weight-light display-2">No data available</h2>
    </v-container>  
    <v-container v-else>
      <h1 class="primary--text display-1 pa-2"> 
        {{config.title}}
      </h1>
     
      <v-container fluid grid-list-md pa-0 ma-2 v-if="items && entities && datapoints">
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md12 lg6>

            <v-tabs
              v-model="activeTab"
              color="transparent"
              style="border:1px solid #dedede;"
            >
          
          <v-tab key="indicators" ripple>Indicators</v-tab>
          <v-tab key="datapoints" ripple>Datapoints</v-tab>
          <v-tab key="entities" ripple>Entities</v-tab>
          <v-tab-item key="indicators" ripple>
         
             <v-treeview 
                class="dj-tree pa-2"
                :items="items"
                item-key="key"
                :load-children="loadIndicators"
                open-on-click
                :open="open"
                :active.sync = "active"
                transition
                item-text=""
                style="height:40em; overflow:auto;"
                

              >
                <template slot="prepend" slot-scope="{ item, open, leaf }">
                    
                  <div v-if="item.type == 'topic'" class="subheading font-weight-light primary--text"> 
                    {{item.name}} 
                  </div>

                  <v-layout 
                      align-center 
                      row 
                      v-else 
                      :class="indicatorClass(item)" 
                      @click="select(item)"
                  >
                    <v-icon :class="indicatorClass(item)">
                      mdi-file-table-outline
                    </v-icon> 
                    <div style="line-height: 1.2em; padding: 0.5em 0 0.5em 0.5em;">
                      {{item.name}}
                    </div> 
                  </v-layout>
                
                </template>
              
              </v-treeview>
            </v-tab-item>
            
            <v-tab-item key="datapoints">
              <v-container style="height:40em; overflow:auto;">
                <v-layout 
                  row 
                  v-if="datapoints" 
                  v-for="dp in datapoints" 
                  pt-2
                  @click="selectDatapoint(dp)"
                  style="cursor:pointer;"
                >
                  <v-icon :class="(selectedDp && dp.concept == selectedDp.concept)?'primary--text':'secondary--text font-weight-light'" class="body-1  pr-2">
                    mdi-grid-large
                  </v-icon>  
                   
                  <h3 :class="(selectedDp && dp.concept == selectedDp.concept)?'primary--text':'secondary--text font-weight-light'" class="body-1">
                     {{dp.name}}
                  </h3>
               </v-layout>
              </v-container>
            </v-tab-item>  
                         
            <v-tab-item key="entities">
              <v-container style="height:40em; overflow:auto;">
                <v-layout 
                  row 
                  v-if="entities" 
                  v-for="e in entities" 
                  pt-2
                  @click="selectEntity(e)"
                  style="cursor:pointer;"
                >
                  <v-icon :class="(selectedEntity && e.concept == selectedEntity.concept)?'primary--text':'secondary--text font-weight-light'" class="body-1 pr-2">
                    mdi-ballot-outline
                  </v-icon>  
                  <h3 :class="(selectedEntity && e.concept == selectedEntity.concept)?'primary--text':'secondary--text font-weight-light'" class="body-1">
                    {{e.name}}
                  </h3>
               </v-layout>
              </v-container>
            </v-tab-item>  
             
         </v-tabs>    


          </v-flex>
          <v-flex d-flex xs12 sm12 md12 lg6>
            <v-card flat style="background:transparent !important; border:1px solid #dedede; height:43.7em; overflow:auto;" v-if="activeTab == 0 && selected != null">
             <v-container>
                <v-layout row pb-3>
                  <v-spacer></v-spacer>
                  <div>
                    <span class="caption font-weight-light">{{selected.topic}}</span>
                  </div>
                </v-layout>    
                <h2 class="primary--text subheading font-weihgt-light">
                  {{selected.name}}
                </h2>
                <v-divider></v-divider>
                <p class="body-1 pt-2 pr-3">{{selected.definition}}</p>
                <div v-if="selected.datapoints">
                  <h2 class="primary--text subheading">
                    Datapoints
                  </h2>
                  <v-divider></v-divider>
                  <v-layout column v-for="dp in selected.datapoints" pt-2>
                    <h3 class="primary--text body-2">
                      <a @click="navigate({tab:1,datapoint:dp})">
                        <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                        {{dp.name}}
                      </a>  
                    </h3>
                    <div class="body-1 pl-3" v-for="f in dp.attr">
                      <span> {{f.name}} : {{f.type}} </span>
                      <span v-if="f.ref">( ref to 
                          <a @click="navigate({tab:2,entity:f.ref.collection})">
                            <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                            {{`${f.ref.collection.concept} [ ${f.ref.attr} ]`}}
                          </a> 
                        )
                      </span>
                      <span v-if="f.type=='time'">{{`( format: ${f.format} )`}}</span>
                    </div>  
                  </v-layout>  
                </div>  

             </v-container>  
            </v-card>

            <v-card flat style="background:transparent !important; border:1px solid #dedede;height:43.7em; overflow:auto;" v-if="activeTab == 1 && dpInfo != null">
             <v-container>
                <v-layout row>
                  <v-spacer></v-spacer>
                  <v-btn flat small color="primary" @click="exportCollection(dpInfo)">download xlsx</v-btn>
                </v-layout> 
                <h3 class="primary--text subheading">{{dpInfo.name}} ( {{dpInfo.count}} items )</h3>
                <v-divider></v-divider>
                <div class="body-1 pl-3" v-for="f in dpInfo.attr">
                  <span> {{f.name}} : {{f.type}} </span>
                  <span v-if="f.ref">( ref to 
                      <a @click="navigate({tab:2,entity:f.ref.collection})">
                        <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                        {{`${f.ref.collection.concept} [ ${f.ref.attr} ]`}}
                      </a> 
                    )
                  </span>
                  <span v-if="f.type=='time'">{{`( format: ${f.format} )`}}</span>
                  <span v-if="f.def">( Value of 
                      <a @click="navigate({tab:0,indicator:f.def})">
                        <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                        {{`${f.def.name}.`}}
                      </a> 
                    )
                  </span>
                </div>
               
                <div v-if="sampleTable" class="mt-3">
                  <h3 class="primary--text subheading">Sample</h3>
                  <v-divider class="pb-2"></v-divider>
                  <v-data-table
                    :headers="sampleTable.headers"
                    :items="sampleTable.rows"
                    :hide-actions="sampleTable.rows.length < 15"
                    style="border:1px solid #dedede;"
                  >
                    
                    <template slot="items" slot-scope="props">
                      <td :class="{'text-xs-right':(index > 0) }" v-for="(col, index) in sampleTable.headers">
                          {{props.item[col.value]}}
                      </td>
                      </template>
                  </v-data-table>

                </div>

                <div v-if="dpsExample" class="mt-3">
                  <h3 class="primary--text subheading">Data Processing Script Example</h3>
                  <v-divider class="pb-2"></v-divider>
                  <highlight :content="dpsExample" lang="dps" style="border:1px solid #dedede"></highlight>
                </div>    

             </v-container>  
            </v-card>

            <v-card flat style="background:transparent !important; border:1px solid #dedede;height:43.7em; overflow:auto;" v-if="activeTab == 2 && entityInfo != null">
             <v-container>
                <v-layout row>
                  <v-spacer></v-spacer>
                  <v-btn flat small color="primary" @click="exportCollection(entityInfo)">download xlsx</v-btn>
                </v-layout>  
                <h3 class="primary--text subheading">{{entityInfo.name}} ( {{entityInfo.count}} items )</h3>
                <v-divider></v-divider>
                <div class="body-1 pl-3" v-for="f in entityInfo.attr">
                  <span> {{f.name}} : {{f.type}} </span>
                  <span v-if="f.ref">( ref to 
                      <a @click="navigate({tab:2,entity:f.ref.collection})">
                        <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                        {{`${f.ref.collection.concept} [ ${f.ref.attr} ]`}}
                      </a> 
                    )
                  </span>
                  <span v-if="f.type=='time'">{{`( format: ${f.format} )`}}</span>
                  <span v-if="f.def">( Value of 
                      <a @click="navigate({tab:0,indicator:f.def})">
                        <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                        {{`${f.def.name}.`}}
                      </a> 
                    )
                  </span>
                </div>
               
                <div v-if="entityTable" class="mt-3">
                  <h3 class="primary--text subheading">Sample</h3>
                  <v-divider class="pb-2"></v-divider>
                  <v-data-table
                    :headers="entityTable.headers"
                    :items="entityTable.rows"
                    :hide-actions="entityTable.rows.length < 15"
                    style="border:1px solid #dedede;"
                  >
                    
                    <template slot="items" slot-scope="props">
                      <td :class="{'text-xs-right':(index > 0) }" v-for="(col, index) in entityTable.headers">
                          {{props.item[col.value]}}
                      </td>
                      </template>
                  </v-data-table>

                </div>

                <div v-if="dpsEntityExample" class="mt-3">
                  <h3 class="primary--text subheading">Data Processing Script Example</h3>
                  <v-divider class="pb-2"></v-divider>
                  <highlight :content="dpsEntityExample" lang="dps" style="border:1px solid #dedede"></highlight>
                </div>    

             </v-container>  
            </v-card>



          </v-flex>
        </v-layout>
      </v-container>
     
    </v-container>
  </v-card>






 
    

</template>

<script>

 
  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import ioMixin from "./io.mixin.js";
  // import TreeConfig from "./tree-config.vue"
  import highlight from 'djvue/components/core/ext/ace-highlight.vue';
  // import snippets from "./snippets.js"


  // Vue.prototype.$dialog.component('TreeConfig', TreeConfig)

   var  TreeConfig;
  let _mode = Cookie.get( __application_Mode_Key ) || "production"
  if(_mode == "development"){
    // if(!Vue.prototype.$dialog._components["ChartConfigDialog"]){
      import("djvue/components/widgets/tree/tree-config.vue")
        .then( res => {
          TreeConfig = res.default
          Vue.prototype.$dialog.component('TreeConfig', TreeConfig)
      })
    // } else {
    //   ChartConfigDialog = Vue.prototype.$dialog._components["ChartConfigDialog"]
    // }      
  }



  
 export default  {
    
    name:"tree-widget",

    icon: "mdi-database",

    mixins:[djvueMixin, listenerMixin, ioMixin],

    components: {highlight},

    methods:{

      exportCollection(c){
        this.dpsDownloadCollection(c)
        .then( url => {
          window.location.href = url
        })
      },

      navigate( { tab, indicator, datapoint, entity } ){
        if( tab == 0 ) this.selected = indicator
        if( tab == 1 ) this.selectedDp = datapoint
        if( tab == 2 ) this.selectedEntity = entity
          this.activeTab = tab
      },

      loadEntityInfo(metadata,e){
        this.dpsLoadEntityInfo(metadata,e)
        .then( res => {
          this.entityInfo = res
        })
      },

      loadDatapointInfo(metadata,dp){
        this.dpsLoadDatapointInfo(metadata,dp)
        .then(res => {
          this.dpInfo = res
        })
      },

      loadDatapoints(metadata){
        this.dpsLoadDatapoints(metadata)
        .then( res => {
          this.datapoints = res
        })
      },

    loadEntities(metadata){
        this.dpsLoadEntities(metadata)
        .then( res => {
          this.entities = res
        })
      },
  

    indicatorClass(item){
      return (!this.selected) 
                ? 'body-1 font-weight-light' 
                : (item.id != this.selected.id) 
                    ? 'body-1 font-weight-light' 
                    : 'body-1 font-weight-regular accent--text'
    },

    loadSample(metadata,dp){
      this.dpsLoadSample(metadata,dp)
      .then(res => {
          this.sample = res
          this.dpsExample = `// fetch ${dp.concept} collection
dml.select(from:"${dp.concept}")
// limit rows count
collection.limit(5)` 
        })
      },

    loadEntitySample(metadata,e){
      this.dpsLoadEntitySample(metadata,e)
      .then(res => {
        this.entitySample = res
        this.dpsEntityExample = `// fetch ${e.concept} collection
dml.select(from:"${e.concept}")
// limit rows count
collection.limit(5)` 
        })
      },


      loadIndicators(p){
        return this.dpsLoadIndicators(this.config.metadata, p)
        .then(res => {
          p.children = res
          this.items = JSON.parse(JSON.stringify(this.items))
          return this.items
        })
      },

      normalize(data){
        
        let f = d => {
          d = d.map( item => {
            if(item.children){
              item.children = f(item.children)
            } else {
              item.children = []
            }
            item.key = this.$djvue.randomName()
            return item
          })
         return d
        }
        return f(data)
      },

      select(item){
        if( !this.selected ){
          this.selected = item  
        } else {
          this.selected = (this.selected.id == item.id) ? null : item  
        }
      },

      selectDatapoint(item){
        if( !this.selectedDp ){
          this.selectedDp = item  
        } else {
          this.selectedDp = (this.selectedDp.id == item.id) ? null : item  
        }
      },

      selectEntity(item){
        if( !this.selectedEntity ){
          this.selectedEntity = item  
        } else {
          this.selectedEntity = (this.selectedEntity.id == item.id) ? null : item  
        }
      },

      onUpdate ({data, options}) {
        // console.log("OnUpdate", data, options)
        // data = this.normalize(data)
        // this.items = data;
      },

      loadConcepts(metadata){
        this.dpsLoadConcepts(metadata)
        .then( res => {
          this.items = this.normalize(res) 
        })
      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(TreeConfig, {config:widgetConfig})
      },

    },

    
    props:["config"],

    computed:{
      
      sampleTable(){
        if(!this.sample) return null
        return {
          headers: this.sample.dataset.dimensions.map( item => ({
              text: item,
              align: 'center',
              value: item
          })),
          rows: this.sample.dataset.source
        }  
      },

      entityTable(){
        if(!this.entitySample) return null
        return {
          headers: this.entitySample.dataset.dimensions.map( item => ({
              text: item,
              align: 'center',
              value: item
          })),
          rows: this.entitySample.dataset.source
        }  
      }

      

    },

    watch:{

      selectedDp(newValue){

        if(newValue) {
          this.loadSample(this.config.metadata,newValue)
          this.loadDatapointInfo(this.config.metadata,newValue)
        } else {
          this.sample = null
          this.dpInfo = null
        }  

      },

      selectedEntity(newValue){
        if(newValue) {
          this.loadEntitySample(this.config.metadata,newValue)
          this.loadEntityInfo(this.config.metadata,newValue)
        } else {
          this.entityInfo = null
          this.entitySample = null
        }  
      },

      "config.metadata":{
        handler(newValue){
          if(newValue.concepts && newValue.collections){
            this.loadConcepts(newValue); 
            this.loadDatapoints(newValue);
            this.loadEntities(newValue);  
          }
        },
        deep:true
      }

      

    },

    created(){
      if(this.config.metadata && this.config.metadata.concepts && this.config.metadata.collections){
        this.loadConcepts(this.config.metadata); 
        this.loadDatapoints(this.config.metadata);
        this.loadEntities(this.config.metadata);  
      }
       
    },

    mounted(){ this.$emit("init") },
    
    data: () =>({
      items:null,
      open:[],
      active:[],
      selected: null ,
      activeTab:null,
      datapoints:null,
      selectedDp:null,
      sample:null,
      dpsExample:null,
      dpInfo: null,
      entities:null,
      selectedEntity:null,
      entitySample:null,
      dpsEntityExample:null,
      entityInfo:null,
      title:"World Development Indicators"
    })

  }

</script>	

<style>
  
  .dj-tree .v-treeview-node__root {
      display: flex;
      align-items: center;
      height: auto !important;
  }
  
  .dj-tree .v-treeview-node__content {
    display: flex;
    flex-grow: 1;
    align-items: center;
    flex-shrink: inherit !important;
  }

  table.v-table tbody td, table.v-table tbody th {
      height: 2em;
  }
    
</style>