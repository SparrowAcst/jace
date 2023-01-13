<template>
  <config-dialog 
    :options="props"
    :submit="resolve"
  ></config-dialog>
</template>

<script>

import configDialog from "./config-dialog.vue"
// import widgetTypesPanel from "./parts/widget-types-panel.vue"

export default {

  name: "insert-widget-dialog",

  props:["options", "submit"],

  components:{
    "config-dialog": configDialog 
  },


  computed:{
    props(){
      return {
        icon:"mdi-widgets", 
        title:"Insert widget" ,
        config:{},
        editorTree:this.editorTree,
      }
    }
  },

  methods: {
    resolve( res ) {
      if(res == null) {
        this.submit(null)
        return
      }
      if (this.widgetConfig) {
        this.submit(this.widgetConfig)
        return
      }  
      this.submit(null)
    }
  },

  created() {
    this.setWidgetConfig = (widgetConfig, force) => {
      this.widgetConfig = widgetConfig
      if (force) this.submit(this.widgetConfig);
    }

    this.$eventHub.on("widget-config-dlg-select", this.setWidgetConfig)

  },

  destroyed() {
    this.$eventHub.off("widget-config-dlg-select", this.setWidgetConfig)
  },

  // layout:"config",
  
  data() {
    return {
      setWidgetConfig: null,
      widgetConfig: null,
      editorTree: [{
        name: "Widget categories",
        children: [
        
        {
            name: "Application level",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "app-topbar-widget",
              "app-footer-widget",
              "app-list-widget",
              "html-widget:banner",
              "login-widget",
              "md-widget:Markdown"
              
            ]
        },
          {
            name: "General info content",
            editor:() => import("./parts/widget-types-panel.vue"),
            items: [
              "html-widget",
              "html-widget:title", 
              "html-widget:banner", 
              "html-widget:paragraph",
              "md-widget:Markdown", 
              "html-widget:Theme Features"
            ]
          },
          {
            name: "Flowcharts",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              // "flowchart-widget",
              "flowchart-widget:Flowchart TD", 
              "flowchart-widget:Flowchart LR", 
              "flowchart-widget:Flowchart TB", 
              "flowchart-widget:Sequence Diagram",
              "flowchart-widget:Gantt Diagram"
              // ,
              // "flowchart-widget:Git Graph",
              // "flowchart-widget:Class Diagram"
            ]
          },
          {
            name: "Data",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "dps-suite-widget",
              "ds-explorer-widget:Dataset Explorer",
              "ds-ontology-widget:Dataset Ontology",
              "ds-value-explorer-widget:Value Explorer",
              // "sunburst-chart-widget:Ontology Radial",
              "data-selector-widget",
              "data-legend-widget",
              
              "data-keywords-widget:Keywords",
              "data-table-widget:Data Table",
              
              "dps-highlight-widget"

            ]
          },
          {
            name: "Charts",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [

              "bar-chart-widget:Horizontal Bars",
              "bar-chart-widget:Vertical Bars",
              "bar-chart-widget:Polar Bars",
              "bar-chart-widget:Radial Bars",


              "bar-chart-widget:Stacked Horizontal Bars",
              "bar-chart-widget:Stacked Vertical Bars",
              "bar-chart-widget:Stacked Polar Bars",
              "bar-chart-widget:Stacked Radial Bars",


              'pie-chart-widget:Pie',
              'pie-chart-widget:Doughnut',
              'pie-chart-widget:Doughnut Rose',

              'gauge-chart-widget:Gauge',
              


              'line-chart-widget:Line',
              'line-chart-widget:Area',
              'line-chart-widget:Stacked Line',
              'line-chart-widget:Stacked Area',

              'scatter-chart-widget:Classic Scatterplot',
              // 'scatter-chart-widget:Rich Scatterplot',

              'bubble-chart-widget:Bubbles',
              "scatter1d-chart-widget",

              'radar-chart-widget:Radar',

              "wordcloud-chart-widget:Wordcloud",

              "sunburst-chart-widget",

              "graph-chart-widget"



            ]
          },

          {
            name: "Graph",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "graph-chart-widget:Absolute Node Position",
              "graph-chart-widget:Circular Layout",
              "graph-chart-widget:Force Layout",
              "graph-chart-widget:With Categories",
              "graph-chart-widget:2d-scatter Graph"
            ]
          },


          {
            name: "Tree Charts",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "tree-chart-widget:Left Right Tree",
              "tree-chart-widget:Top Bottom Tree",
              "tree-chart-widget:Radial Tree",
              "treemap-chart-widget",
              "sunburst-chart-widget"
            ]
          },

          // {
          //   name: "3D Charts",
          //   editor: "widget-types-panel",
          //   items: [

          //     "scatter3d-chart-widget"

          //   ]
          // },

          {
            name: "Maps",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [

              "geo-chart-widget:World",
              "geo-chart-widget:Ukraine"
              ,
              "geo-bubble-chart-widget:World Bubbles",
              "geo-bubble-chart-widget:Ukraine Bubbles",
              "geo-markers-chart-widget:World Markers",
              "geo-markers-chart-widget:Ukraine Markers",
              "mapbox-widget"
              

            ]
          },

          {
            name: "User Interface",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "mediator-widget", 
              "config-widget",
              "input-group-widget:Input Group",
              "inputs-widget:Inputs",
              "tab-bar-widget",
              // "button-bar-widget",
              "list-widget",
              "dialog-widget",
              "chart-low-level-widget",
              "timeline-widget",
              "file-viewer-widget"
            ]
          },

          {
            name: "Education",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [

              "html-widget:title", 
              "html-widget:banner", 
              "html-widget:paragraph",
              "md-widget:Markdown", 
              "mediator-widget", 
              "inputs-widget:Inputs",
              "edu-push-button-widget:Button",
              "edu-editor-widget:Editor",
              "dps-suite-widget",
              "edu-console-widget:Console",
              "edu-toc-widget:Table of content"
              
              
            ]
          },

          {
            name: "UML",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "uml-chart-widget:Use Case Diagram",
              "uml-chart-widget:Activity Diagram",
              "uml-chart-widget:Sequence Diagram",
              "uml-chart-widget:Component Diagram",
              "uml-chart-widget:State Diagram",
              "uml-chart-widget:Deployment Diagram",
              "uml-chart-widget:Object Diagram",
              "uml-chart-widget:Class Diagram"
              
              // "html-widget:title", 
              // "html-widget:banner", 
              // "html-widget:paragraph", 
              // "mediator-widget", 
              // "inputs-widget:Inputs",
              // "edu-push-button-widget:Button",
              // "edu-editor-widget:Editor",
              // "dps-suite-widget"
              
            ]
          },
          {
            name: "Pub/Sub",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "sse-listener-widget:Channel Listener"
            ]
          },

          {
            name: "NLP",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "nlp-highlight-widget",
              "nlp-annotator-widget",
              "nlp-resolver-widget",              
              "data-selector-widget",
              "data-keywords-widget:Keywords",
              "dps-suite-widget"
            ]
          },


          {
            name: "Forms",
            editor: () => import("./parts/widget-types-panel.vue"),
            items: [
              "form-widget",
              "form-report-widget",
              "form-response-widget",
              "question-widget:One of many selection",
              "question-widget:Many of many selection",
              "question-widget:Priority",
              "question-widget:Rate",
              "question-widget:Range",
              "question-widget:Date",
              "question-widget:Influence",
              "question-widget:Association"
            ]
          }
        ]
      }]
    }
  }
}

</script>
