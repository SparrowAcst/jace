<template>
  <div class="ma-3">
    <v-layout column>
      
      <v-layout row wrap>
        <v-flex xs12 pa-1>
         <dj-holder name="Top" @init="onInitChild"></dj-holder>
        </v-flex>
      </v-layout>
      
      <v-layout row wrap>  
        <v-flex class="xs4" pa-1>
          <dj-holder name="Column 1" @init="onInitChild"></dj-holder>
        </v-flex>
        <v-flex class="xs4" pa-1>
          <dj-holder name="Column 2" @init="onInitChild"></dj-holder>
        </v-flex>
        <v-flex class="xs4" pa-1>
          <dj-holder name="Column 3" @init="onInitChild"></dj-holder>
        </v-flex>
      </v-layout>
      <v-layout row wrap>  
        <v-flex class="xs12" pa-1>
          <dj-holder name="Bottom" @init="onInitChild"></dj-holder>
        </v-flex>
      </v-layout>
    </v-layout>
  </div>
</template>
<script>
import mixin from "@/mixins/core/layout.mixin.js"

export default {
  components: {
    "dj-holder": () => import("@/components/core/holder.vue")
  },

  mixins: [mixin],

  computed:{
    topClass(){
      return `xs${this.topSize}`
    },
    topAlign(){
      return "justify-center"
    }
  },

  methods: {

    onBeforeInit() {
      this._waitList = ["Top", "Column 1", "Column 2", "Column 3", "Bottom"]
    }
  },

  data:() => ({
    topSize:6
  })

}

</script>
