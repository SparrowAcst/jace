<template>
    <div>
    <v-layout column justify-center>
      <h3 class="primary--text body-2 pt-2 pb-0" style="text-align: center;"> 
        {{config.title}}
      </h3>
      <p v-if="options" class="caption font-italic font-weight-light ma-0 pa-0" style="text-align: center;">
        {{config.note}}
      </p>
      <echart v-if="options" :options="chartOptions" :height="options.widget.height"></echart>
      <div v-if="options">
        Chart
          <pre class="caption">{{chartOptions}}</pre>
      </div>
      <div>
        Options
          <pre class="caption">{{JSON.stringify(options, null, "\t")}}</pre>
      </div>
  </div>  
</template>



<script>
  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import ChartConfigDialog from "../widget-share/chart/chart-config.vue";
  import echart from "djvue/components/core/ext/echart.vue"

  Vue.prototype.$dialog.component('ChartConfigDialog', ChartConfigDialog)
   
 export default  {
    
    name:"hord-chart-widget",

    icon: "mdi-chart-donut",

    mixins:[djvueMixin, listenerMixin],

    components:{ echart},
    
    computed:{
       chartOptions(){
         // if(!this.options) return 
         // let res = JSON.parse(JSON.stringify(this.options));
         
         // if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
         //    let s = this.selection.filter( d => d.selected)
         //    res.series = this.series.filter( d => _.find(s, e => e.entity.id == d.selector))
        
         // }
         // res.legend.data = res.series.map( d => d.name)
         // return res
         let o = {
    color : [
        '#FBB367','#80B1D2','#FB8070','#CC99FF','#B0D961',
        '#99CCCC','#BEBBD8','#FFCC99','#8DD3C8','#FF9999',
        '#CCEAC4','#BB81BC','#FBCCEC','#CCFF66','#99CC66',
        '#66CC66','#FF6666','#FFED6F','#ff7f50','#87cefa',
    ],
    title : {
        text : '中东地区的敌友关系',
        subtext: '数据来自财新网',
        sublink: 'http://international.caixin.com/2013-09-06/100579154.html',
        x:'right',
        y:'bottom'
    },
       tooltip : {
        trigger: 'item',
        formatter : function (params) {
            if (params.name && params.name.indexOf('-') != -1) {
                return params.name.replace('-', ' ' + params.seriesName + ' ')
            }
            else {
                return params.name ? params.name : params.data.id
            }
        }
    },
    legend : {
        data : [
            '美国',
            '叙利亚反对派',
            '阿萨德',
            '伊朗',
            '塞西',
            '哈马斯',
            '以色列',
            '穆斯林兄弟会',
            '基地组织',
            '俄罗斯',
            '黎巴嫩什叶派',
            '土耳其',
            '卡塔尔',
            '沙特',
            '黎巴嫩逊尼派'
        ],
        orient : 'vertical',
        x : 'left'
    },
    series : [
        {
            "name": "支持",
            "type": "chord",
            "showScaleText": true,
            "clockWise": false,
            "data": [
                {"name": "美国"},
                {"name": "叙利亚反对派"},
                {"name": "阿萨德"}
                
            ],
            "matrix": [
                [0,10,0],
                [10,0,5],
                [0,5,0]
                
            ]
        }
    ]
}

         return o
         
      }
    },

    methods:{

       onUpdate ({data, options}) {
        
        if(!options) return

        data = data || {
          "legend": [],
          "yAxis": [],
          "series": []
        }  
        
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        console.log(tempData)
        // tempOptions.legend.data = tempData.legend;
        
        // if(tempOptions.yAxis)
        //   tempOptions.yAxis.data = (tempData.yAxis) ? tempData.yAxis : tempOptions.yAxis.data;
        
        // if(tempOptions.xAxis)
        //   tempOptions.xAxis.data = (tempData.xAxis) ? tempData.xAxis : tempOptions.xAxis.data;
        
        // if(tempOptions.angleAxis)
        //   tempOptions.angleAxis.data = (tempData.angleAxis) ? tempData.angleAxis : tempOptions.angleAxis.data;
        
        // if(tempOptions.radiusAxis)
        //   tempOptions.radiusAxis.data = (tempData.radiusAxis) ? tempData.radiusAxis : tempOptions.radiusAxis.data;
        tempOptions.legend.data = tempData.legend.data
        tempOptions.series = tempData.series.map( s => {
          s.data = tempData.legend.data.map(item => ({name:item}))
          return s
        });
        this.series = tempData.series;
        this.options = tempOptions;

      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(ChartConfigDialog, {config:widgetConfig})
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      onDataSelect (emitter, data) {
        this.selection = JSON.parse(JSON.stringify(data.selection))
      }
    },

    
    props:["config"],

    
    mounted(){      
      this.$emit("init") 
    },
    
     data: () =>({
      options:null,
      selection:[],
      series:[]

    })

  }

</script> 

<style scoped>
  .chart {
    width: 100%;
  }
</style>