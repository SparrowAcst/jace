<script>
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
import  { find } from "lodash"


export default {

    extends: echartWidget,

    
    name:"radar-chart-widget",

    icon: "mdi-chart-arc",

     
    computed:{
       chartOptions(){
         if(!this.options) return 
         if(!this.options.series) return 
          
         let res = JSON.parse(JSON.stringify(this.options));
         if(res.series.length == 0) return res
         if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
            let s = this.selection.filter( d => d.selected)
            res.series[0].data = this.series[0].data.filter( d => find(s, e => e.entity.id == d.selector))
            
         }

         res.legend.data = res.series[0].data.map( d => d.name)
         return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        

        const tempOptions = JSON.parse(JSON.stringify(options));
        if( !tempOptions ) return

        const tempData = JSON.parse(JSON.stringify(data));
        // tempOptions.legend.data = tempData.legend;

        if(tempOptions.radar && tempOptions.radar[0])
          tempOptions.radar[0].indicator = (tempData.indicator) ? tempData.indicator : tempOptions[0].radar.indicator;
       
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

