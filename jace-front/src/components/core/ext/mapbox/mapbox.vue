<template>
  <div class="mapbox-directive" :style="style"></div>
</template>
<script>
import mapboxgl from "mapbox-gl"
import utils from "./geo-utils"
import { extend, isArray } from "lodash"

import listenerMixin from "@/mixins/core/listener.mixin.js"


mapboxgl.accessToken = "pk.eyJ1IjoiYm9sZGFrIiwiYSI6ImNrb3hiYzR1MjBjanQyd3BjYTd0ZWQ3YWQifQ.ltyw6AzijlLZUBKBqH3mjQ"


export default {

  name: "mapbox",

  mixins: [listenerMixin],

  computed: {
    style() {
      return {
        height: (this.options.height || 250) + "px",
        width: "100% !important"
      }
    }
  },

  methods: {

    getMap() {
      return this.map
    },
    clearSources() {
      this.sources.forEach(source => {
        this.map.removeSource(source.id)
      })
      this.sources = []
    },
    clearLayers() {
      this.layers.forEach(layer => {
        this.map.removeLayer(layer.id)
      })
      this.layers = []
    },
    autoPane() {
      if (this.sources.length == 0) return
      this.map.setCenter(utils.getCenterFromSources(this.sources))
      this.map.fitBounds(utils.getBboxFromSources(this.sources), { padding: 10 })
    },
    addOptions(options) {
      let sources = (options.source) ? (isArray(options.source)) ? options.source : [options.source] : []
      let layers = (options.layer) ? (isArray(options.layer)) ? options.layer : [options.layer] : []
      this.sources = this.sources.concat(sources)
      this.layers = this.layers.concat(layers)

      sources.forEach(source => {
        this.map.addSource(source.id, source.options)
      })

      layers.forEach(layer => {
        this.map.addLayer(layer)
      })

      this.autoPane()
    },
    replaceOptions(options) {

      let sources = (options.source) ? (isArray(options.source)) ? options.source : [options.source] : []
      let layers = (options.layer) ? (isArray(options.layer)) ? options.layer : [options.layer] : []

      let updatedSources = this.sources.filter(s => sources.map(us => us.id).includes(s.id))
      let updatedLayers = this.layers.filter(l => layers.map(ul => ul.id).includes(l.id))

      updatedLayers.forEach(layer => {
        if (this.map.getSource(layer.id))
          this.map.removeLayer(layer.id)
      })

      updatedSources.forEach(source => {
        if (this.map.getSource(source.id))
          this.map.removeSource(source.id)
      })

      this.sources = this.sources.filter(s => !sources.map(us => us.id).includes(s.id))
      this.layers = this.layers.filter(l => !layers.map(ul => ul.id).includes(l.id))

      this.sources = this.sources.concat(sources)
      this.layers = this.layers.concat(layers)

      sources.forEach(source => {
        this.map.addSource(source.id, source.options)
      })

      layers.forEach(layer => {
        this.map.addLayer(layer)
      })

      this.autoPane()
    },
    setOptions(options) {

      this.clearLayers()
      this.clearSources()

      this.sources = (options.source) ? (isArray(options.source)) ? options.source : [options.source] : []
      this.layers = (options.layer) ? (isArray(options.layer)) ? options.layer : [options.layer] : []

      this.sources.forEach(source => {
        this.map.addSource(source.id, source.options)
      })

      this.layers.forEach(layer => {
        this.map.addLayer(layer)
      })

      this.autoPane()
    },
    resizeHandler() {
      this.width = this.$el.clientWidth
      this.map.resize()
    },
    initChart(options) {

      this.map = new mapboxgl.Map(extend({}, this.options.mapStyle, { container: this.$el }));

      this.map.on('load', () => {
        this.setOptions(this.options)
        this.$emit("loaded")
      })

      if (window.attachEvent) {
        window.attachEvent('onresize', this.resizeHandler);
      } else {
        window.addEventListener('resize', this.resizeHandler);
      }
    }
  },


  props: ["options"],

  watch: {
    options: {
      handler: function(value) {
        if (value) {
          if (this.map) {
            setTimeout(() => {
              this.map.resize()
            }, 10)
          }
        }
      },
      deep: true
    }
  },

  mounted() {
    this.initChart(this.options)
    setTimeout(() => {
      this.map.resize()
    }, 10)
  },

  beforeDestroy() {
    if (window.attachEvent) {
      window.detachEvent('onresize', this.resizeHandler);
    } else {
      window.removeEventListener('resize', this.resizeHandler, false);
    }
    this.off()
  },


  data: () => ({
    chart: null,
    map: null,
    sources: [],
    layers: []
  })
}

</script>
<style scoped>
.mapbox-directive {
  width: 100% !important;
}

</style>
