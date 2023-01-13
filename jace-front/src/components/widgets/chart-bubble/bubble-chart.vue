<script>
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
import  { min, max, find } from "lodash"

export default {

    extends: echartWidget,

    name:"bubble-chart-widget",

    icon: "mdi-chart-bubble",

    computed:{
       chartOptions(){
         if(!this.options) return 
         if(!this.options.series) return
          
         let res = JSON.parse(JSON.stringify(this.options));
         
         if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
            let s = this.selection.filter( d => d.selected)
            res.series = this.series.filter( d => find(s, e => e.entity.id == d.selector))
            
         }
         res.legend.data = res.series.map( d => d.name)

         res.series = res.series.map( s => {
            s.symbolSize = data => Number.parseInt((data[2]*this.zoom+5).toFixed(0))
           
            s.label = { normal: 
              {
                show: true,
                formatter: param => param.data[3],
                position: 'top'
              }
            }

            return s
         })

        return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        
        if(!tempData.series) return 

        let values = [];
        tempData.series.forEach( s => {
          values = values.concat(s.data.map( d => d[2]))
        })

        let _max = max(values)
        let _min = min(values)


        let height = this.config.options.widget.height || 250

        this.zoom = (height*0.2-5)/(_max-_min)
       
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

    
    props:["config"],

    
    mounted(){      
      this.$emit("init") 
    },
    
     data: () =>({
      options:null,
      selection:[],
      series:[],
      zoom:1

    })

  }

</script> 
