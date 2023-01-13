<template>
  <div class="mb-1" :style="(display) ? 'border:1px solid #dedede;  background:white;' : '' ">
    <component ref="content" v-show="config && !disabled" :is="config.question.type[(production) ? 'production' : 'design']" :config="config" :options="options" :answer="answer" :stat="stat" @init="onInitChild" @update:options="onOptionsUpdate" @update:answer="onAnswerUpdate" @extend:options="onOptionsExtend"></component>
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import components from "./parts/index.js"
import { find, isFunction } from "lodash"

export default {

  name: "question-widget",

  icon: "mdi-help-circle-outline",

  mixins: [djvueMixin, listenerMixin],

  components,
  computed: {
    production() {
      return this.isProductionMode
    }
  },

  methods: {
    onInitChild() {
      this.$emit("init")
    },

    onDelete() {
      this.emit("form-delete-question", this.config.id)
    },

    onOptionsUpdate() {
      this.setNeedSave(true)
    },

    onAnswerUpdate() {
      this.emit("form-update-answer", this.answer)
    },

    onOptionsExtend() {
      this.emit("form-extend")
    },

    onSlideStart(wrapper){
      if(this.$refs.content && this.$refs.content.onSlideStart) this.$refs.content.onSlideStart(wrapper)
      // this.$forceUpdate()
    
    }


  },


  props: ["config"],

  data: () => ({
    options: null,
    answer: null,
    stat: null,
    allStat:null,
    display: false,
    disabled: false
  }),

  created() {
    // console.log("CREATE", this.config.id, this.config.question.options)

    // if (this.config.question.options) {
    this.emit("form-insert-question", {
      id: this.config.id,
      options: this.config.question.options
    })
    // this.config.question.options = undefined
    // }

    this.on({
      event: "question-set-options",
      callback: (questions) => {
        // console.log("SET OPTIONS", this.config.id)
        let founded = find(questions, q => q.id == this.config.id)
        this.options = (founded) ? founded.options : this.config.question.options
        if(this.$refs.content)
          if(this.$refs.content.onSetOptions) this.$nextTick( () => {
            if (this.$refs.content && isFunction(this.$refs.content.onSetOptions)) this.$refs.content.onSetOptions(this.options)
          })  
        // console.log(this.options)
      },
      rule: () => true
    })

    this.on({
      event: "question-set-stat",
      callback: (stat) => {
        // console.log("SET STAT")
        this.allStat = stat
        let founded = find(this.allStat.questions, q => q.id == this.config.id)
        // if (!this.stat){
        this.stat = (founded) ? JSON.parse(JSON.stringify(founded)) : null
        // console.log("SET STAT",this.config.id, this.stat)  
        // }
      },
      rule: () => true
    })

    this.on({
      event: "question-set-answers",

      callback: (answers) => {
        // console.log("set answer", this.config.id, answers.map(a=>a.id))
        let founded = find(answers, a => a.id == this.config.id)
        // console.log("Founded", JSON.stringify(founded,null,"\t"))
        this.answer = (founded) ?
          founded : {
            id: this.config.id,
            type: this.config.question.type.title,
            data: JSON.parse(JSON.stringify(this.config.question.answer.data))
          }
      },
      rule: () => true
    })

    this.on({
      event: "question-access",
      callback: (value) => {
        this.display = value || !this.isProductionMode
      },
      rule: () => true
    })

    this.on({
      event: "question-set-disable",
      callback: (value) => {
        this.disabled = value
      },
      rule: () => true
    })

  },

  beforeDestroy() {
    this.off()
  }
}

</script>
