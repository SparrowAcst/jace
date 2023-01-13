<script>
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
import { find, extend } from "lodash"


export default {

    extends: echartWidget,
    
    name:"scatter-chart-widget",

    icon: "mdi-chart-scatter-plot",

    computed:{
       chartOptions(){
         if(!this.options) return 
         if(!this.options.series) return  
       
         let res = JSON.parse(JSON.stringify(this.options));
         
         if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
            let s = this.selection.filter( d => d.selected)
            res.series = this.series.filter( d => find(s, e => e.entity.id == d.selector))
            
         }
         res.legend ={data: res.series.map( d => d.name)}
         return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        let tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        
       
        // tempOptions.series = tempData.series;
        tempOptions = extend(tempOptions, tempData)
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
