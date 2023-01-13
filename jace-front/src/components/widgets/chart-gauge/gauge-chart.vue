<script>
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
import  { extend } from "lodash"

export default {

    extends: echartWidget,

    
    name:"gauge-chart-widget",

    icon: "mdi-gauge",

    computed:{
       chartOptions(){
         if(!this.options) return 
         let res = JSON.parse(JSON.stringify(this.options));
         
         // if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
         //    let s = this.selection.filter( d => d.selected)
         //    res.series = this.series.filter( d => _.find(s, e => e.entity.id == d.selector))
        
         // }
         
         return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        if(!options) return

        data = data || {
          "series": []
        }  
        
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        // tempOptions.legend.data = tempData.legend;
        
        
       
        tempOptions.series = tempData.series;
        this.series = tempData.series;
        this.options = extend(tempOptions, tempData);

      },

     

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      // onDataSelect (emitter, data) {
      //   this.selection = JSON.parse(JSON.stringify(data.selection))
      // }
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
