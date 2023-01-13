<script>
import getGeoJson from "./maps.js";
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue";
import  { extend, flattenDeep, min, max } from "lodash"
import * as echarts from 'echarts'

// import echarts from "echarts/dist/echarts.esm"  //"echarts/dist/echarts-en"
export default {

  extends: echartWidget,

  name: "geo-markers-chart-widget",

  icon: "mdi-map-marker",

  computed: {
    chartOptions() {

      if (!this.options) return
      let res = extend({}, this.options);

      res.series.forEach(s => {
        if (s.type == "scatter" && s.coordinateSystem == "geo")
          s.label.normal.formatter = d => `${d.data[3]} ${(Number.isNaN(d.data[2])) ? '' : ': '+d.data[2]}`
      })

      let boundedPoints = flattenDeep(res.series
        .filter(s => s.type == "scatter" && s.coordinateSystem == "geo")
        .map(s => s.data.map(p => ({ x: p[0], y: p[1] })))
      )

      if (boundedPoints.length > 1) {
        res.geo.boundingCoords = [
          [
            min(boundedPoints.map(d => d.x)),
            min(boundedPoints.map(d => d.y))
          ],
          [
            max(boundedPoints.map(d => d.x)),
            max(boundedPoints.map(d => d.y))

          ]
        ]

        res.geo.boundingCoords = [
          [
            res.geo.boundingCoords[0][0] - 0.1 * (res.geo.boundingCoords[1][0] - res.geo.boundingCoords[0][0]),
            res.geo.boundingCoords[0][1] - 0.1 * (res.geo.boundingCoords[1][1] - res.geo.boundingCoords[0][1])
          ],
          [
            res.geo.boundingCoords[1][0] + 0.1 * (res.geo.boundingCoords[1][0] - res.geo.boundingCoords[0][0]),
            res.geo.boundingCoords[1][1] + 0.1 * (res.geo.boundingCoords[1][1] - res.geo.boundingCoords[0][1])
          ]
        ]
      }

      if (boundedPoints.length == 1) {
        res.geo.boundingCoords = [
          [
            min(boundedPoints.map(d => d.x)) - 1,
            min(boundedPoints.map(d => d.y)) - 1
          ],
          [
            max(boundedPoints.map(d => d.x)) + 1,
            max(boundedPoints.map(d => d.y)) + 1
          ]
        ]
      }


      res.series.forEach(s => {
        if (s.type == "scatter" && s.coordinateSystem == "geo") {
          s.tooltip = {
            trigger: 'item',
            formatter: d => `${d.data[3]}${(Number.isNaN(d.data[2])) ? '' : ': '+d.data[2]}`
          }
          if (s.symbolSizeRange)
            s.symbolSize = data => {
              let v = (max(s.symbolSizeRange) - min(s.symbolSizeRange)) * (data[2] - this.valueRange.min) / (this.valueRange.max - this.valueRange.min + 0.0000000001) + min(s.symbolSizeRange)
              return v
            }
        } else {
          s.symbolSize = s.symbolSize || 6
        }
        if (s.type == "lines") {
          s.tooltip = {
            trigger: 'item',
            formatter: d =>  `${d.data.originName}-${d.data.destName} : ${d.data.value}`
          }
        }
      })

      // res.series.forEach( s => {
      //   if( s.type == "lines" && s.lineStyle && s.lineStyle.normal &&  s.lineStyle.normal.widthRange){
      //       console.log("s.lineStyle.normal.widthRange")
      //       let values = s.data.map( d => d.value)
      //       let range = [_.min(values),_.max(values)]
      //       s.lineStyle.normal.width = d => {
      //         let v = (_.max(s.lineStyle.normal.widthRange) - _.min(s.lineStyle.normal.widthRange))*(d.value - _.min(range))/(_.max(range)-_.min(range))+_.min(s.lineStyle.normal.widthRange)
      //         console.log(d,range,v)
      //         return v
      //       }
      //   }    
      // })

      res.tooltip = {
        trigger: 'item',
        formatter: d => `${d.data[3]}${(Number.isNaN(d.data[2])) ? '' : ': '+d.data[2]}`
      }

      res.legend = {
        backgroundColor: "rgba(127,127,127,0.4)",

        data: res.series.map((s, index) => {
          s.name = (s.name) ? s.name : `Serie ${index}`
          return s.name
        })
      }

      return res
    }
  },

  methods: {

    onUpdate({ data, options }) {
      if (!options) return

      // data = data || []

      const tempOptions = extend(extend({}, options), data);

      let map = getGeoJson(this.config.options.map.scope, this.config.options.map.locale);

      if (!echarts.getMap(this.config.options.map.name)) {
        echarts.registerMap(this.config.options.map.name, map)
      }

      let series = tempOptions.series
        .filter(s => s.type == "scatter" && s.coordinateSystem == "geo")
        .map(s => ({
          min: min(s.data.map(v => v[2])),
          max: max(s.data.map(v => v[2])),
        }))

      this.valueRange = {
        min: min(series.map(s => s.min)),
        max: max(series.map(s => s.max))
      }

      if (tempOptions.colorScale) {
        tempOptions.visualMap.min = this.valueRange.min - 0.1 * (this.valueRange.max - this.valueRange.max)
        tempOptions.visualMap.max = this.valueRange.max + 0.1 * (this.valueRange.max - this.valueRange.max)
        tempOptions.visualMap.inRange.color = this.config.options.color;
        tempOptions.visualMap.precision = 3
      } else {
        tempOptions.visualMap = undefined
      }

      this.options = extend({}, tempOptions);
      // console.log("options",this.options)


    },

  
    // onError (error) {
    //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
    // },

    onDataSelect(emitter, data) {
      this.selection = JSON.parse(JSON.stringify(data.selection))
    }
  },


  data: () => ({
    options: null,
    selection: [],
    serie: null,
    valueRange: []
  })

}

</script>
