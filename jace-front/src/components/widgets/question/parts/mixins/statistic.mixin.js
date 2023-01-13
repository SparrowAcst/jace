import echart from "@/components/core/ext/echart.vue";

export default {

  components: { echart },

  methods: {

    truncate(value, length) {
      length = length || 50;
      return (value.toString().length <= length) ?
        value.toString() :
        ((value.toString().length - length) > 10) ?
        value.toString().substring(0, length) + '...' :
        value.toString()
    },

    redrawStat() {
      // console.log("REDRAW",this.config.id, this.statOptions)
      if(this.statOptions){
        let _temp = JSON.parse(JSON.stringify(this.statOptions))
        this.statOptions = null;
          setTimeout(() => {
            this.statOptions = _temp
            // this.statOptions.redraw = !this.statOptions.redraw
          },1000)  
      }
    }

  },

  watch: {
    active(value) { 
      // console.log(value)
      if(value > 0) {
        this.emit("form-get-stat")
        setTimeout(() => {
          this.redrawStat()
        }, 10)  
      }
    },

    stat(){
      // console.log("STAT",this.config.id, this.stat)
      this.statOptions = this.calculateStat()
      this.statOptions.redraw = false
      // this.redrawStat()
    }

  },

  data: () => ({
    statOptions: null
  })

  
}
