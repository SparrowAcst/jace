<script>
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
import  { find, isString } from "lodash"

export default {

    extends: echartWidget,

    name:"chart-low-level-widget",

    icon: "mdi-graphql",

      
    computed:{
       chartOptions(){
         if(!this.options) return 
           return this.options
      }
    },

    methods:{

       onUpdate ({data, options}) {
                
        if(!data) return
        // console.log(data)
      
        this.options = _.extend({ widget:options.widget }, data)

        // _.extend(
        //   _.extend(this.options, options), data);
        // if(this.options.series.length == 0) return

        // if (this.options.series[0].edgeLabel) {
        //   this.options.series[0].edgeLabel.normal = this.options.series[0].edgeLabel.normal || {} 
        //   this.options.series[0].edgeLabel.normal.format = this.options.series[0].edgeLabel.normal.format || ["@name"]
        //   this.options.series[0].edgeLabel.normal.format = _.isArray(this.options.series[0].edgeLabel.normal.format)
        //                                                          ? this.options.series[0].edgeLabel.normal.format
        //                                                          : [this.options.series[0].edgeLabel.normal.format]       
          
        //   this.edgeFormatter = this.options.series[0].edgeLabel.normal.format  
          

        //   this.options.series[0].edgeLabel.normal.formatter = (d) => {
        //     return this.edgeFormatter.map( item => 
        //         ( item.startsWith("@") ) ? (d.data[item.substring(1)] || "") : item ).join("")
        //   }
        // }

      },

      // onDataSelect (emitter, data) {
      //   this.selection = JSON.parse(JSON.stringify(data.selection))
      // }
    },

     data: () =>({
      options:null,
      // selection:[],
      // series:[],
      // edgeFormatter:[]
    })

  }

</script> 

