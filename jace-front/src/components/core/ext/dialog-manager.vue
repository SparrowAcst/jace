<template>
  <div>
    <div v-for="(dialog,index) in items" :key="index">
      <v-dialog v-model="dialog.isActive" :width="dialog.props.width" :height="dialog.props.height" :persistent="dialog.props.persistent" :hide-overlay="dialog.props.hideOverlay">
        <component v-if="dialog.component" :is="dialog.component" :submit="dialog.resolve" :options="dialog.props" :dialogID="dialog.id"></component>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import { findIndex, extend, clone } from "lodash"
export default {

  data() {
    return {
      items: [],
      defaultProps: {
        width: "50%",
        persistent: true,
        height: "500px"
      }
    }
  },

  mounted() {
    Vue.prototype.$dialogManager = this
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
          props: extend(clone(this.defaultProps), props, options),
          isActive: true
        }

        this.items.push(component)

        // console.log(component)

      })

      res.dialogID = id
      return res
    }

  }
}

</script>
