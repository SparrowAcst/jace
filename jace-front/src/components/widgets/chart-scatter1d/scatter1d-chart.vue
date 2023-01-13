
<script>
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
import { isNumber } from "lodash"

export default {

    extends: echartWidget,
    
    name:"scatter1d-chart-widget",

    icon: "mdi-chart-timeline",
    
    computed:{
       chartOptions(){
         
         if(!this.options) return 
         if(!this.options.series) return 
          
         let res = JSON.parse(JSON.stringify(this.options));
         
         // if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
         //    let s = this.selection.filter( d => d.selected)
         //    res.series = this.series.filter( d => _.find(s, e => e.entity.id == d.selector))
            
         // }
         // res.legend.data = res.series.map( d => d.name)
         
         res.title = this.series.map( (s, index) => ({
          textBaseline: 'middle',
          top: (index + 0.5) * 100 / this.series.length-5 + '%',
          text: s.name,
          textStyle:{
              fontSize: 12,
              fontWeight: "normal"
          }
         }))
         
         res.singleAxis = this.series.map( (s, index) => ({
          left: 150,
          type: 'category',
          boundaryGap: false,
          data: this.xAxis.data,
          top: (index * 100 / this.series.length) + '%',
          height: (100 / this.series.length - 7) + '%',
          // axisLabel: {
          //     interval:-2 
          // },
          axisLine: {
            show: true,
            lineStyle:{
              width:0.5
            }
          },
          axisTick: {
            show: false
          }
         }))

        let symbolSize =  this.symbolSize 
        res.series = this.options.series.map( (s, index) => ({
          singleAxisIndex: index,
          coordinateSystem: 'singleAxis',
          type: 'scatter',
          data: this.xAxis.data.map( (d,index) => ([d,s.data[index]])),
          symbolSize: dataItem =>  dataItem[1] * symbolSize
        }))

        res.tooltip.formatter =  d => {
          let x = d.data[0];
          let y = d.data[1];

          x = (isNumber(x)) ? x.toFixed(2) : x;
          y = (isNumber(y)) ? y.toFixed(2) : y;

          return x+", "+y
        }

        return res
      }
    },

    methods:{

       onUpdate ({data, options}) {

        if(!options) return

        data = data || {
          "symbolSize": 4,
          "xAxis": {
            "data": []
          },
          "series": []
        }
        
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        
       
        tempOptions.series = tempData.series;
        this.series = tempData.series;
        this.symbolSize = tempData.symbolSize
        this.xAxis = tempData.xAxis
        this.options = tempOptions;
        this.loading = false

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
      series:[],
      loading:true

    })

  }

</script> 
