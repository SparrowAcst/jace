
<script>
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
// import * as _ from "lodash"

export default {

    extends: echartWidget,
    name:"sunburst-chart-widget",

    icon: "mdi-chart-arc",

    computed:{
       chartOptions(){
         if(!this.options) return 
         let res = JSON.parse(JSON.stringify(this.options));
         res.series[0].data = this.series
         
         // if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
         //    let s = this.selection.filter( d => d.selected)
         //    res.series = this.series.filter( d => _.find(s, e => e.entity.id == d.selector))
        
         // }
         // res.legend.data = res.series.map( d => d.name)
        res.tooltip = {
          formatter: d => {
            if(!this.tooltip || this.tooltip.length == 0) return ""
            return this.tooltip.map( t => d.data[t]).join(" ")
          }  
        }
        if(this.label){
          res.series[0].label.normal.show = this.label.show
          res.series[0].label.normal.fontSize = this.label.fontSize || 12
          res.series[0].label.normal.formatter = d => {
            return this.label.content.map( t => d.data[t]).join(" ")
          }
          res.series[0].label.normal.color = (this.label.color) ? this.label.color : null  
          
        }
        if(this.levels){
          res.series[0].levels = this.levels
        }  
        return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
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
       
        // tempOptions.series[0].data = tempData.series;
        this.series = tempData.series;
        this.tooltip = tempData.tooltip;
        this.label = tempData.label;
        this.levels = tempData.levels;
        
        this.options = tempOptions;

      },

     

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      onDataSelect (emitter, data) {
        this.selection = JSON.parse(JSON.stringify(data.selection))
      }
    },

    
   
    
    mounted(){      
      this.$emit("init") 
    },
    
     data: () =>({
      options:null,
      selection:[],
      series:[],
      tooltip:[],
      label:null,
      levels:null

    })

  }

</script> 
