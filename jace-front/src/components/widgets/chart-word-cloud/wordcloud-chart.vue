<script>
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
import { find } from "lodash"

export default {

    extends: echartWidget,

    name:"wordcloud-chart-widget",

    icon: "mdi-format-letter-case",

    
    computed:{
       chartOptions(){
         if(!this.options) return 
         let res = JSON.parse(JSON.stringify(this.options));
         
         if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
            let s = this.selection.filter( d => d.selected)
            res.series = this.series.filter( d => find(s, e => e.entity.id == d.selector))
        
         }
         // res.legend.data = res.series.map( d => d.name)
         return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        
        if(!options) return

        data = data || {
          // "legend": [],
          // "yAxis": [],
          "series": []
        }  
        
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        // tempOptions.legend.data = tempData.legend;
        
        // if(tempOptions.yAxis)
        //   tempOptions.yAxis.data = (tempData.yAxis) ? tempData.yAxis : tempOptions.yAxis.data;
        
        // if(tempOptions.xAxis)
        //   tempOptions.xAxis.data = (tempData.xAxis) ? tempData.xAxis : tempOptions.xAxis.data;
        
        // if(tempOptions.angleAxis)
        //   tempOptions.angleAxis.data = (tempData.angleAxis) ? tempData.angleAxis : tempOptions.angleAxis.data;
        
        // if(tempOptions.radiusAxis)
        //   tempOptions.radiusAxis.data = (tempData.radiusAxis) ? tempData.radiusAxis : tempOptions.radiusAxis.data;
       
        tempOptions.series = tempData.series;
        this.series = tempData.series;
        this.options = tempOptions;

      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      onDataSelect (emitter, data) {
        this.selection = JSON.parse(JSON.stringify(data.selection))
      }
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