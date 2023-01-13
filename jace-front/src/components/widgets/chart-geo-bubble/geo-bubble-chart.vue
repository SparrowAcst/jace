<script>
import getGeoJson from "./maps.js"
import getLocations from "./locations.js"
// import geo_util from "./utils.js"
import echartWidget from "@/components/widgets/echart-widget/echart-widget.vue"
import { find, min, max } from "lodash"
// import echarts from "echarts/dist/echarts.esm" //"echarts/dist/echarts-en"

import * as echarts from 'echarts'

export default {

  extends: echartWidget,

  name: "geo-bubble-chart-widget",

  icon: "mdi-map",

  computed: {
    chartOptions() {

      if (!this.options) return
      let res = JSON.parse(JSON.stringify(this.options));

      if (this.config.dataSelectEmitters && this.config.dataSelectEmitters.length > 0 && this.selection.length > 0) {

        let s = this.selection.filter(d => d.selected)
        res.series[0].data = this.serie.filter(d => find(s, e => e.entity.id == d.selector))

      } else {
        res.series[0].data = this.serie
      }

      res.series[0].data = res.series[0].data.filter(d => d.coordinates)
        .map(d => {
          let r = d.coordinates.map(d => d)
          r.push(d.value)
          r.push(d.name)
          return r
        })

      res.series[0].label.normal.formatter = d => `${d.data[3]} ${(Number.isNaN(d.data[2])) ? '' : ': '+d.data[2]}`


      if (res.series[0].data.length > 1) {
        res.geo.boundingCoords = [
          [
            min(res.series[0].data.map(d => d[0])),
            min(res.series[0].data.map(d => d[1]))
          ],
          [
            max(res.series[0].data.map(d => d[0])),
            max(res.series[0].data.map(d => d[1]))
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

      if (res.series[0].data.length == 1) {
        res.geo.boundingCoords = [
          [
            min(res.series[0].data.map(d => d[0])) - 1,
            min(res.series[0].data.map(d => d[1])) - 1
          ],
          [
            max(res.series[0].data.map(d => d[0])) + 1,
            max(res.series[0].data.map(d => d[1])) + 1
          ]
        ]
      }

      // console.log("BUBBLE",res.geo.boundingCoords)

      res.series[0].symbolSize = data =>
        Number.parseFloat(res.widget.height || "150") * 0.1 * (data[2] - this.valueRange.min) / (this.valueRange.max - this.valueRange.min + 0.0000000001) + 10

      res.tooltip = {
        trigger: 'item',
        formatter: d => `${d.data[3]}${(Number.isNaN(d.data[2])) ? '' : ': '+d.data[2]}`
      }


      return res
    }
  },

  methods: {

    onUpdate({ data, options }) {

      // console.log("data",data)
      // console.log("options",options)
      if (!options.visualMap) return

      data = data || {
        "serie": []
      }

      const tempOptions = JSON.parse(JSON.stringify(options));
      const tempData = JSON.parse(JSON.stringify(data));

      let map = getGeoJson(this.config.options.map.scope, this.config.options.map.locale);
      let locations = getLocations(this.config.options.map.scope, this.config.options.map.locale);

      if (!echarts.getMap(this.config.options.map.name)) {
        echarts.registerMap(this.config.options.map.name, map)
      }

      this.serie = tempData.serie.map(d => {
        let f = find(locations, l => l.id == d.selector)
        if (f) {
          d.coordinates = f.coordinates
          return d
        }

      }).filter(d => d)


      this.valueRange = {
        min: min(this.serie.map(d => d.value)),
        max: max(this.serie.map(d => d.value))
      }

      tempOptions.visualMap.min = this.valueRange.min - 0.1 * (this.valueRange.max - this.valueRange.max)
      tempOptions.visualMap.max = this.valueRange.max + 0.1 * (this.valueRange.max - this.valueRange.max)
      tempOptions.visualMap.inRange.color = this.config.options.color;
      tempOptions.visualMap.precision = 3
      this.options = tempOptions;

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
