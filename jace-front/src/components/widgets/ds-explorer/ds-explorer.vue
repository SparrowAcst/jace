<template>
  <v-card flat color="transparent" style="min-height: 500px;">
    <v-divider></v-divider>
    <v-row class="mx-3" v-if="!config.metadata.concepts || !config.metadata.collections || error1 || error2 || error3">
      <h2 class="warning--text font-weight-light headline">{{message}}</h2>
    </v-row>
    <v-row v-else-if="items && entities && datapoints">
      <v-col cols="6" class="ml-3 pa-0">
        <v-tabs v-model="activeTab">
          <v-tab key="indicators" ripple>Indicators</v-tab>
          <v-tab key="datapoints" ripple>Datapoints</v-tab>
          <v-tab key="entities" ripple>Entities</v-tab>
          <v-tab-item key="indicators" ripple>
            <v-treeview class="pa-2" :items="items" item-key="key" :load-children="loadIndicators" open-on-click :open.sync="open" :active.sync="active" transition item-text="" color="transparent" dense>
              <template slot="prepend" slot-scope="{ item }">
                <div v-if="item.type == 'topic'" class="subheading font-weight-light primary--text">
                  {{item.name}}
                </div>
                <v-layout align-center row v-else :class="indicatorClass(item)" @click="select(item)">
                  <v-icon :class="indicatorClass(item)">
                    mdi-file-table-outline
                  </v-icon>
                  <!-- <div style="line-height: 1.2em; padding: 0.5em 0 0.5em 0.5em;"> -->
                  {{item.name}}
                  <!-- </div> -->
                </v-layout>
              </template>
            </v-treeview>
          </v-tab-item>
          <v-tab-item key="datapoints">
            <v-container v-if="datapoints">
              <v-row  v-for="(dp, indexDp) in datapoints" :key="indexDp" class="pt-2 mx-2" @click="selectDatapoint(dp)" style="cursor:pointer;">
                <v-icon :class="(selectedDp && dp.concept == selectedDp.concept)?'primary--text':'secondary--text font-weight-light'" class="subtitle-2  pr-2">
                  mdi-grid-large
                </v-icon>
                <h3 :class="(selectedDp && dp.concept == selectedDp.concept)?'primary--text':'secondary--text font-weight-light'" class="subtitle-2">
                  {{dp.name}}
                </h3>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item key="entities">
            <v-container v-if="entities">
              <v-row v-for="(e, indexE) in entities" :key="indexE" pt-2 @click="selectEntity(e)" class="pt-2 mx-2" style="cursor:pointer;">
                <v-icon :class="(selectedEntity && e.concept == selectedEntity.concept)?'primary--text':'secondary--text font-weight-light'" class="subtitle-2 pr-2">
                  mdi-ballot-outline
                </v-icon>
                <h3 :class="(selectedEntity && e.concept == selectedEntity.concept)?'primary--text':'secondary--text font-weight-light'" class="subtitle-2">
                  {{e.name}}
                </h3>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="mx-2 px-0">
        <v-card flat class="transparent" v-if="activeTab == 0 && selected != null">
          <v-container>
            <v-row class="py-1 mx-0">
              <v-spacer></v-spacer>
              <div>
                <span class="caption font-weight-light">{{selected.topic}}</span>
              </div>
            </v-row>
            <h2 class="primary--text subheading font-weight-light">
              <v-icon color="primary" class="subheading">{{(selected.type=="measure")? 'mdi-numeric': 'mdi-calculator'}}</v-icon>
              {{selected.name}} ({{selected.concept}})
            </h2>
            <v-divider></v-divider>
            <p class="subtitle-2 pr-3 pt-3 mb-0 font-weight-light dj-meta">
              <span class="font-weight-medium">
                Type:
              </span>
              {{selected.type}}
            </p>
            <p class="subtitle-2 pr-3 mb-0 font-weight-light dj-meta">
              <span class="font-weight-medium">
                Definition:
              </span>
              {{selected.definition}}
            </p>
            <p class="subtitle-2 pr-3 mb-0 font-weight-light dj-meta">
              <span class="font-weight-medium">
                Units:
              </span>
              {{selected.units}}
            </p>
            <p class="subtitle-2 pr-3 mb-0 font-weight-light dj-meta">
              <span class="font-weight-medium">
                Source:
              </span>
              {{selected.source}} <a :href="selected.href">{{selected.href}}</a>
            </p>
            <div class="subtitle-2 pr-3 mb-0 font-weight-light dj-meta" v-if="selected.args && selected.args.length>0">
              <span class="font-weight-medium pb-0">
                Arguments:
              </span>
              <p v-for="(a, indexA) in selected.args" :key="indexA" class="mb-0 pl-2">
                <a @click="navigate({tab:0,indicator:a})">
                  <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                  {{a.name}}
                </a>
              </p>
            </div>
            <div v-if="selected.datapoints">
              <h2 class="primary--text subheading font-weight-light">
                Datapoints
              </h2>
              <v-divider></v-divider>
              <v-layout column v-for="(dp, indexDp) in selected.datapoints" :key="indexDp" pt-2>
                <h3 class="primary--text body-2">
                  <a @click="navigate({tab:1,datapoint:dp})">
                    <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                    {{dp.name}}
                  </a>
                </h3>
                <div class="subtitle-2 pl-3" v-for="(f, indexF) in dp.attr" :key="indexF">
                  <span>
                    <span class="font-weight-medium">
                      <v-icon class="subheading pr-1">{{fieldTypeIcon(f.type)}}</v-icon>
                      {{f.name}} :
                    </span>
                    <span class="font-weight-light font-italic">{{f.type}}</span>
                  </span>
                  <span v-if="f.reference">( ref to
                    <a @click="navigate({tab:2,entity:f.reference.collection})">
                      <v-icon style="border:1px solid" class="body-2 primary--text ml-2 mr-1">mdi-call-made</v-icon>
                      {{`${f.reference.collection.concept} [ ${f.reference.attr} ]`}}
                    </a>
                    )
                  </span>
                  <span v-if="f.type=='time'">{{`( format: ${f.format} )`}}</span>
                </div>
              </v-layout>
            </div>
          </v-container>
        </v-card>
        <v-card flat style="background:transparent !important;" v-if="activeTab == 1 && dpInfo != null">
          <v-container>
            <v-row class="py-1">
              <v-spacer></v-spacer>
              <v-btn text small color="primary" @click="exportCollection(dpInfo)">download xlsx</v-btn>
            </v-row>
            <h3 class="primary--text subheading font-weight-light">{{dpInfo.name}} ( {{dpInfo.count}} items )</h3>
            <v-divider></v-divider>
            <div class="subtitle-2" v-for="(f, indexF) in dpInfo.attr" :key="indexF">
              <span>
                <span class="font-weight-medium">
                  <v-icon class="subheading pr-1">{{fieldTypeIcon(f.type)}}</v-icon>
                  {{f.name}} :
                </span>
                <span class="font-weight-light font-italic">{{f.type}}</span>
              </span>
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
            <v-row v-if="sampleTable" class="mt-3 mx-0 px-0">
              <v-col>
                <h3 class="primary--text subheading font-weight-light">Sample</h3>
                <v-divider class="pb-2"></v-divider>
                <v-data-table :headers="sampleTable.headers" :items="sampleTable.rows" dense calculate-widths :items-per-page="Number.POSITIVE_INFINITY" hide-default-footer style="display: inline-grid;">
                  <template v-slot:body="props">
                    <tbody>
                      <tr v-for="(item, rowIndex) in props.items" :key="rowIndex">
                        <td v-for="(col, index) in sampleTable.headers" :key="index" class="caption">
                          {{item[col.value]}}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row v-if="dpsExample" class="mt-3 mx-0 px-0">
              <v-col>
                <h3 class="primary--text subheading font-weight-light">Data Processing Script Example</h3>
                <v-divider class="pb-2"></v-divider>
                <highlight :content="dpsExample" lang="dps" wrap></highlight>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card flat style="background:transparent !important;" v-if="activeTab == 2 && entityInfo != null">
          <v-container>
            <v-row class="py-1">
              <v-spacer></v-spacer>
              <v-btn text small color="primary" @click="exportCollection(entityInfo)">download xlsx</v-btn>
            </v-row>
            <h3 class="primary--text subheading font-weight-light">{{entityInfo.name}} ( {{entityInfo.count}} items )</h3>
            <v-divider></v-divider>
            <div class="subtitle-2" v-for="(f, indexF) in entityInfo.attr" :key="indexF">
              <span>
                <span class="font-weight-medium">
                  <v-icon class="subheading pr-1">{{fieldTypeIcon(f.type)}}</v-icon>
                  {{f.name}} :
                </span>
                <span class="font-weight-light font-italic">{{f.type}}</span>
              </span>
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
            <v-row v-if="entityTable" class="mt-3 mx-0 px-0">
              <v-col>
                <h3 class="primary--text subheading font-weight-light">Sample</h3>
                <v-divider class="pb-2"></v-divider>
                <v-data-table :headers="entityTable.headers" :items="entityTable.rows" dense calculate-widths :items-per-page="Number.POSITIVE_INFINITY" hide-default-footer style="display: inline-grid;">
                  <template v-slot:body="props">
                    <tbody>
                      <tr v-for="(item, rowIndex) in props.items" :key="rowIndex">
                        <td v-for="(col, index) in entityTable.headers" :key="index" class="caption">
                          {{item[col.value]}}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row v-if="dpsEntityExample" class="mt-3 mx-0 px-0">
              <v-col>
                <h3 class="primary--text subheading font-weight-light">Data Processing Script Example</h3>
                <v-divider class="pb-2"></v-divider>
                <highlight :content="dpsEntityExample" lang="dps" wrap></highlight>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import ioMixin from "./io.mixin.js";

<<< if( jace.mode == "development") { >>>
  import dsExplorerConfig from "./ds-explorer-config.vue"
<<< } >>>

import highlight from '@/components/core/ext/ace-highlight.vue';
import { find } from "lodash"



let getTopicNode = (items, path) => {
  let r = find(items, n => n.name == path[0])
  if (path.length == 1) {
    return r
  } else {
    path.splice(0, 1)
    return getTopicNode(r.children, path)
  }
}

let getOpenPath = (items, path) => {
  let r = find(items, n => n.name == path[0])
  if (path.length == 1) {
    return [r.key]
  } else {
    path.splice(0, 1)
    return [r.key].concat(getOpenPath(r.children, path))
  }
}



export default {

  name: "ds-explorer-widget",

  icon: "mdi-database",

  mixins: [djvueMixin, listenerMixin, ioMixin],

  components: { highlight },

  methods: {

    fieldTypeIcon(type) {
      let map = {
        "string": "mdi-format-color-text",
        "text": "mdi-format-color-text",
        "time": "mdi-clock-outline",
        "float": "mdi-numeric",
        "int": "mdi-numeric",
        "integer": "mdi-numeric",
        "number": "mdi-numeric",
        "geojson": "mdi-map-marker-outline",
        "geo": "mdi-map-marker-outline",
        "geometry": "mdi-map-marker-outline"
      }
      let res = map[type]
      return (res) ? res : "mdi-alpha-f"
    },

    exportCollection(c) {
      this.dpsDownloadCollection(c)
        .then(url => {
          window.location.href = url
        })
    },

    navigate({ tab, indicator, datapoint, entity }) {

      if (tab == 0) {
        if (indicator.topic) {
          let node = getTopicNode(this.items, indicator.topic.split(":"))
          if (node.children.length == 0) {
            this.loadIndicators(node)
              .then(() => {
                this.selected = getTopicNode(this.items, (indicator.topic + ":" + indicator.name).split(":"))
                this.open = getOpenPath(this.items, indicator.topic.split(":"))
              })
          } else {
            this.selected = getTopicNode(this.items, (indicator.topic + ":" + indicator.name).split(":"))
            this.open = getOpenPath(this.items, indicator.topic.split(":"))
          }
        }
      }
      if (tab == 1) this.selectedDp = datapoint
      if (tab == 2) this.selectedEntity = entity

      this.activeTab = tab
    },

    loadEntityInfo(metadata, e) {
      this.dpsLoadEntityInfo(metadata, e)
        .then(res => {
          this.entityInfo = res
          this.message = null
        })
        .catch(() => {
          this.message = "Cannot load entity Info"
        })
    },

    loadDatapointInfo(metadata, dp) {
      this.dpsLoadDatapointInfo(metadata, dp)
        .then(res => {
          this.dpInfo = res
          this.message = null
          // console.log(res)
        })
        .catch(() => {
          this.message = "Cannot load datapoint Info"
        })
    },

    loadDatapoints(metadata) {
      this.dpsLoadDatapoints(metadata)
        .then(res => {
          this.datapoints = res
          // this.message = null
          this.error2 = false
        })
        .catch(() => {
          this.error2 = true
          this.message = "Cannot load datapoints"
        })
    },

    loadEntities(metadata) {
      this.dpsLoadEntities(metadata)
        .then(res => {
          this.error3 = false
          this.entities = res
          // this.message = null
        })
        .catch(() => {
          this.error3 = true
          this.message = "Cannot load entities"
        })
    },


    indicatorClass(item) {
      return (!this.selected) ?
        'subtitle-2 font-weight-light' :
        (item.id != this.selected.id) ? 'subtitle-2 font-weight-light secondary--text' : 'subtitle-2 primary--text'
    },

    loadSample(metadata, dp) {
      this.dpsLoadSample(metadata, dp)
        .then(res => {
          this.sample = res
          this.dpsExample = `// fetch ${dp.concept} collection
dml.select(from:"${dp.concept}")
// limit rows count
collection.limit(5)`
        })
    },

    loadEntitySample(metadata, e) {
      this.dpsLoadEntitySample(metadata, e)
        .then(res => {
          this.entitySample = res
          this.dpsEntityExample = `// fetch ${e.concept} collection
dml.select(from:"${e.concept}")
// limit rows count
collection.limit(5)`
        })
    },


    loadIndicators(p) {
      return this.dpsLoadIndicators(this.config.metadata, p)
        .then(res => {
          // this.error2 = false;
          // this.message = null
          p.children = res
          this.items = JSON.parse(JSON.stringify(this.items))
          
          console.log("indicators",this.items)

          return this.items
        })
        .catch(() => {
          // this.error2 = true;
          this.message = "Cannot load indicators"
        })
    },

    normalize(data) {

      let f = d => {
        d = d.map(item => {
          if (item.children) {
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

    select(item) {
      if (!this.selected) {
        this.selected = item
      } else {
        this.selected = item //(this.selected.id == item.id) ? null : item
      }
    },

    selectDatapoint(item) {
      if (!this.selectedDp) {
        this.selectedDp = item
      } else {
        this.selectedDp = item //(this.selectedDp.id == item.id) ? null : item
      }
    },

    selectEntity(item) {
      if (!this.selectedEntity) {
        this.selectedEntity = item
      } else {
        this.selectedEntity = item //(this.selectedEntity.id == item.id) ? null : item
      }
    },

    // onUpdate({ data, options }) {
    //   // console.log("OnUpdate", data, options)
    //   // data = this.normalize(data)
    //   // this.items = data;
    // },

    loadConcepts(metadata) {
      this.dpsLoadConcepts(metadata)
        .then(res => {
          // this.message = null
          this.error1 = false
          this.items = this.normalize(res)
          console.log("indicators",this.items)


        })
        .catch(() => {
          this.error1 = true;
          this.message = "Cannot load concepts"
        })
    },

<<< if( jace.mode == "development") { >>>
    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(dsExplorerConfig, { width: "80%" }, { config: widgetConfig })
    }
<<< } >>>    

  },


  props: ["config"],

  computed: {

    sampleTable() {
      if (!this.sample) return null
      return {
        headers: this.sample.dataset.dimensions.map(item => ({
          text: item,
          align: 'center',
          value: item
        })),
        rows: this.sample.dataset.source
      }
    },

    entityTable() {
      if (!this.entitySample) return null
      return {
        headers: this.entitySample.dataset.dimensions.map(item => ({
          text: item,
          align: 'center',
          value: item
        })),
        rows: this.entitySample.dataset.source
      }
    }

  },

  watch: {

    selectedDp(newValue) {
      // console.log(newValue, oldValue)
      // if (newValue == oldValue) return
      if (newValue) {
        this.loadSample(this.config.metadata, newValue)
        this.loadDatapointInfo(this.config.metadata, newValue)
        // console.log("selectedDp",newValue)
      }
      // else {
      //   this.sample = null
      //   this.dpInfo = null
      // }
    },

    selectedEntity(newValue) {
      // console.log(newValue)
      // if (newValue == oldValue) return
      if (newValue) {
        this.loadEntitySample(this.config.metadata, newValue)
        this.loadEntityInfo(this.config.metadata, newValue)
      }
      // else {
      //   this.entityInfo = null
      //   this.entitySample = null
      // }
    },

    "config.metadata": {
      handler(newValue) {
        if (newValue.concepts && newValue.collections) {
          this.error1 = true
          this.message = "Loading..."
          this.loadConcepts(newValue);
          this.loadDatapoints(newValue);
          this.loadEntities(newValue);
        } else {
          this.error1 = true
          this.message = "No data available"
        }
      },
      deep: true
    }



  },

  created() {
    if (this.config.metadata && this.config.metadata.concepts && this.config.metadata.collections) {
      this.error1 = true
      this.message = "Loading..."
      this.loadConcepts(this.config.metadata);
      this.loadDatapoints(this.config.metadata);
      this.loadEntities(this.config.metadata);
    } else {
      this.message = "No data available"
      this.error1 = true
    }
  },

  mounted() { this.$emit("init") },

  data: () => ({
    items: null,
    open: [],
    active: [],
    selected: null,
    activeTab: null,
    datapoints: null,
    selectedDp: null,
    sample: null,
    dpsExample: null,
    dpInfo: null,
    entities: null,
    selectedEntity: null,
    entitySample: null,
    dpsEntityExample: null,
    entityInfo: null,
    title: "World Development Indicators",
    message: "Loading...",
    error1: false,
    error2: false,
    error3: false
  })
}

</script>
<style>
.theme--light.v-tabs>.v-tabs-bar {
  background-color: transparent !important;
}

.theme--light.v-tabs-items {
  background-color: transparent !important;
}

.v-treeview--dense .v-treeview-node__root {
  min-height: 1.3em !important;
}

</style>
