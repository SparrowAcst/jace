<template>
  <div v-if="items_">
    <v-col class="pa-0">
      <v-row class="mx-0 px-2">
        <div class="primary--text font-weight-light title">{{title}}</div>
      </v-row>
      <v-row v-if="items_.length == 0" class="d-flex justify-center py-3">
        <slot name="no-data"></slot>
      </v-row>
      <div v-else>
        <v-container v-if="draggable_" mt-2>
          <v-row style="border-bottom:1px solid #dedede !important;">
            <v-col cols="2" class="py-1 px-5 mx-1">
              <v-checkbox color="secondary lighten-3" hide-details :indeterminate="indeterminate" v-model="allSelected" style="margin:0; padding:0;" @change="selectGroup()"></v-checkbox>
            </v-col>
            <v-spacer></v-spacer>
            <slot name="menu"></slot>
          </v-row>
          <draggable class="list-group" element="div" v-model="items_" :options="dragOptions" :move="onMove" @start="onStartDrag" @end="onEndDrag">
            <transition-group type="transition" :name="title" tag="div">
              <v-row v-for="item in items_" :key="item[itemKey]" class="list-group-item" style="padding-bottom:0.5em; border-bottom:1px solid #e0e0e0;">
                <v-col cols="2" class="py-1" style="margin:auto;">
                  <v-row>
                    <v-icon class="handle">more_vert</v-icon>
                    <v-checkbox color="secondary lighten-3" hide-details v-model="item.selected" style="margin:0; padding:0;" @change="select()"></v-checkbox>
                  </v-row>
                </v-col>
                <v-col class="py-1">
                  <slot name="item" v-bind:item="item"></slot>
                </v-col>
              </v-row>
            </transition-group>
          </draggable>
        </v-container>
        <v-container v-else mt-2>
          <v-row style="border-bottom:1px solid #dedede !important;">
            <v-col cols="2" class="py-1 px-5 ml-3">
              <v-checkbox secondary hide-details :indeterminate="indeterminate" v-model="allSelected" style="margin:0; padding:0;" @change="selectGroup()"></v-checkbox>
            </v-col>
            <v-spacer></v-spacer>
            <slot name="menu"></slot>
          </v-row>
          <div v-for="item in items_" :key="item[itemKey]">
            <v-row class="mx-0 px-2">
              <v-col class="py-1" cols="1" style="margin:auto;">
                <v-checkbox secondary hide-details v-model="item.selected" style="margin:0; padding:0;" @change="select()"></v-checkbox>
              </v-col>
              <v-col class="py-1">
                <slot name="item" v-bind:item="item"></slot>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-container>
      </div>
    </v-col>
    <v-row class="mx-0">
      <slot name="input">
      </slot>
    </v-row>
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import draggable from "vuedraggable";

export default {

  mixins: [djvueMixin],

  props: [
    "title",
    "items",
    "itemKey",
    "maxLength",
    "fixedLength",
    "draggable"
  ],

  components: {
    draggable
  },

  computed: {
    indeterminate() {
      if (!this.items_) return true
      if (this.selection.length == 0) return false

      return this.selection.length < this.items_.$Zlength
    },

    dragOptions() {
      return {
        animation: 150,
        group: {
          name: this.title
        },
        ghostClass: "ghost",
        dragClass: "drag",
        handle: ".handle"
      }
    }

  },

  methods: {

    onStartDrag() {
      this.isDragging = true
    },

    onEndDrag() {
      this.isDragging = false
      this.$emit("update", this.items_)
    },

    onMove() {
      return true
    },

    select() {
      this.selection = (this.items_) ? this.items_.filter(n => n.selected) : []
      this.$emit("select", this.selection)
    },

    selectGroup() {
      if (this.allSelected) {
        this.items_.forEach(d => { d.selected = true })
      } else {
        this.items_.forEach(d => { d.selected = false })
      }

      this.select()

    }


  },

  data: () => ({
    selection: [],
    allSelected: false,
    items_: []
  }),


  watch: {
    items: {
      handler(value) {
        if (!value) {
          this.items_ = []
          return
        }
        setTimeout(() => {
          this.items_ = value.map(d => d)
        }, 20)
      },
      deep: true
    },

    selection: {
      handler(value) {
        this.allSelected = value.length == this.items_.length
      },
      deep: true
    }

  },



  created() {
    this.draggable_ = (this.draggable || this.draggable == "") ? true : false
    this.maxLength_ = (this.maxLength && this.draggable != "") ? this.maxLength : Number.POSITIVE_INFINITY
    this.items_ = this.items.map(d => d)

  }
}

</script>
<style scoped>
.drag {
  opacity: 0.3;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0 !important;
}

.list-group {
  /*min-height: 20px;*/
}

.list-group-item {}

.list-group-item i {}

</style>
