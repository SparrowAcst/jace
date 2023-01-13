<template>
  <div>
    <div v-for="(dialog,index) in items" :key="index">
      <v-dialog v-model="dialog.isActive" :width="dialog.props.width" :height="dialog.props.height" :persistent="dialog.props.persistent" :hide-overlay="dialog.props.hideOverlay">
        <component v-if="dialog.component" :is="dialog.component" :submit="dialog.resolve" :settings="dialog.props" :dialogID="dialog.id"></component>
      </v-dialog>
    </div>
  </div>
</template>
<script>

import Vue from "vue"

import listenerMixin from "@/mixins/core/listener.mixin.js"

import { findIndex, extend, clone, cloneDeep } from "lodash"

export default {
  mixins: [listenerMixin],
  data() {
    return {
      items: [],
      defaultProps: {
        width: "50%",
        persistent: true,
        // height: "500px"
      }
    }
  },

  mounted() {
    Vue.prototype.$dialogWidgetManager = this
  },


  methods: {

    refresh() {
      let temp = this.items.map(d => d)
      this.items = []
      this.$nextTick(() => {
        this.items = temp
      })
    },

    resolver(id, resolve) {

      return result => {
        let index = findIndex(this.items, item => item.id == id)
        if (index < 0) {
          resolve()
          return
        }
        this.items.splice(index, 1)[0]

        // this.refresh()
        resolve(result)
      }
    },

    showAndWait(dialog, props, options) {

      let id = this.randomName();
      // console.log("PUSH", id, props, options)

      let res = new Promise(resolve => {
        let component = {
          id,
          resolve: this.resolver(id, resolve),
          component: dialog,
          options: options,
          props: extend(cloneDeep(this.defaultProps), props, options),
          isActive: true
        }

        this.items.push(component)
        // if(component.updateForce){
        // let temp = cloneDeep(component.props)
        //  component.props = {}   
        //   setTimeout(() => {
        //     component.props = temp
        //   }, 10)
        // // } 
        setTimeout(() => {
          this.emit("update-dialog-view")
        }, 20)
        // console.log(component)

        // console.log(component.props)

      })

      res.dialogID = id
      return res
    }

  }
}

</script>
