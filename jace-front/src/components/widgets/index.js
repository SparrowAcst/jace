
export default {
      // 'hello-world' :() => import("./hello-world/HelloWorld.vue"),

      'html-widget' :() => import("./html/html.vue"),
      'login-widget' :() => import("./login/login.vue"),
      'mapbox-widget' :() => import("./mapbox/mapbox.vue"),
      
      'nlp-highlight-widget' :() => import("./nlp-highlight/nlp-highlight.vue"),
      'nlp-annotator-widget' :() => import("./nlp-annotator/nlp-annotator.vue"),
      'nlp-resolver-widget' :() => import("./nlp-resolver/nlp-resolver.vue"),
      
      'md-widget' :() => import("./md/md.vue"),
      
      'edu-editor-widget' :() => import("./edu-editor/edu-editor.vue"),
      'edu-push-button-widget' :() => import("./edu-push-button/edu-push-button.vue"),
      'edu-console-widget' :() => import("./edu-console/edu-console.vue"),
      'edu-toc-widget' :() => import("./edu-toc/edu-toc.vue"),
      
      'sse-listener-widget' :() => import("./sse-listener/sse-listener.vue"),
      

      'uml-chart-widget' :() => import("./uml-chart/uml-chart.vue"),
      
      'inputs-widget' :() => import("./inputs/inputs.vue"),
      'input-group-widget' :() => import("./input-group/input-group.vue"),
      'timeline-widget' :() => import("./timeline/timeline.vue"),
      
      'dialog-widget' :() => import("./dialog/dialog.vue"),
      
      
      'flowchart-widget' :() => import("./flowchart/flowchart.vue"),
      // 'tree-widget' :() => import("./tree/tree.vue"),

      'mediator-widget' : () => import("./mediator/mediator.vue"),
      // 'config-widget' : () => import("./config/config.vue"),
      
      'dps-suite-widget' : () => import("./dps-suite/dps-suite.vue"),
      'dps-highlight-widget' : () => import("./dps-highlight/dps-highlight.vue"),
      
      'ds-explorer-widget' : () => import("./ds-explorer/ds-explorer.vue"),
      'ds-value-explorer-widget' : () => import("./ds-value-explorer/ds-value-explorer.vue"),
      'ds-ontology-widget' : () => import("./ds-ontology/ds-ontology.vue"),
      


      // 'tree-widget' :() => import("./tree/tree.vue"),
      // 'echart-widget' :() => import("./echart/echart.vue"),



      'bar-chart-widget': () => import("./chart-bar/bar-chart.vue"),
      
      'chart-low-level-widget': () => import("./chart-low-level/chart-low-level.vue"),
      
      'wordcloud-chart-widget': () => import("./chart-word-cloud/wordcloud-chart.vue"),

      'pie-chart-widget': () => import("./chart-pie/pie-chart.vue"),
      'graph-chart-widget': () => import("./chart-graph/graph-chart.vue"),
      
      'gauge-chart-widget': () => import("./chart-gauge/gauge-chart.vue"),
      
      'line-chart-widget': () => import("./chart-line/line-chart.vue"),
      'scatter-chart-widget': () => import("./chart-scatter/scatter-chart.vue"),
      'bubble-chart-widget': () => import("./chart-bubble/bubble-chart.vue"),
      'scatter1d-chart-widget': () => import("./chart-scatter1d/scatter1d-chart.vue"),
      'radar-chart-widget': () => import("./chart-radar/radar-chart.vue"),
      // 'tree-chart-widget': () => import("./chart-tree/tree-chart.vue"),
      // 'treemap-chart-widget': () => import("./chart-treemap/treemap-chart.vue"),
      'sunburst-chart-widget': () => import("./chart-sunburst/sunburst-chart.vue"),
      // 'scatter3d-chart-widget': () => import("./chart-scatter3d/scatter3d-chart.vue"),
      'geo-chart-widget': () => import("./chart-geo/geo-chart.vue"),
      
      'geo-bubble-chart-widget': () => import("./chart-geo-bubble/geo-bubble-chart.vue"),
      'geo-markers-chart-widget': () => import( "./chart-geo-markers/geo-markers-chart.vue"),     
      'data-selector-widget': () => import("./data-selector/data-selector.vue"),

      'data-legend-widget': () => import("./data-legend/data-legend.vue"),

      'data-keywords-widget': () => import("./data-keywords/data-keywords.vue"),
      
      'data-table-widget': () => import("./data-table/data-table.vue"),


      'app-topbar-widget': () => import("./app-topbar/app-topbar.vue"),
      'tab-bar-widget': () => import("./tab-bar/tab-bar.vue"),
      'button-bar-widget': () => import("./button-bar/button-bar.vue"),
      'list-widget': () => import("./list/list.vue"),
      
      'app-footer-widget': () => import("./app-footer/app-footer.vue"),
      'app-list-widget': () => import("./app-list/app-list.vue"),

      'form-widget': () => import("./form/form.vue"),
      'question-widget': () => import("./question/question.vue"),
      'form-report-widget': () => import("./form-report/form-report.vue"),
      'form-response-widget': () => import("./form-response/form-response.vue"),
      
      'file-viewer-widget': () => import("./file-viewer/file-viewer.vue")
      
      
      

      // 'editor-widget' :() => import("./ace/ace.vue")
}