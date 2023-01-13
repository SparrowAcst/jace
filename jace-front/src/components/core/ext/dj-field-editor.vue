<template>
  <div>
    <v-col>
      <v-row class="mx-0 px-2">
        <div class="primary--text font-weight-light title">{{title}}</div>
        <v-spacer></v-spacer>
        <v-btn icon small color="primary--text" @click="reverseSelection()" :disabled="items_.length == 0">
          <v-icon class="primary--text">mdi-check</v-icon>
        </v-btn>
        <v-btn icon small color="primary--text" @click="addItem()" :disabled="!newItemTitle">
          <v-icon class="primary--text">mdi-plus</v-icon>
        </v-btn>
        <v-divider vertical class="mx-2"></v-divider>
        <v-btn icon small color="primary--text" @click="deleteItems" :disabled="selection.length == 0">
          <v-icon class="primary--text">mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="items_.length == 0" class="d-flex justify-center py-3">
        <span class="body-2 secondary--text">No data available.</span>
      </v-row>
      <div v-else>
        <v-container v-if="draggable_" mt-2>
          <draggable class="list-group" element="div" v-model="items_" :options="dragOptions" :move="onMove" @start="onStartDrag" @end="onEndDrag">
            <transition-group type="transition" :name="title" tag="div">
              <v-row v-for="item in items_" :key="item.$$dj_id" class="list-group-item" style="padding-bottom:0.5em; border-bottom:1px solid #e0e0e0;">
                <v-col class="py-1" v-if="!fixedLength_" style="margin:auto;">
                  <v-row>
                    <v-icon class="handle">more_vert</v-icon>
                    <v-checkbox secondary hide-details v-model="item.selected" style="margin:0; padding:0;" @change="select()"></v-checkbox>
                  </v-row>
                </v-col>
                <v-col cols="10" class="py-1" style="margin:auto;">
                  <span v-if="readOnly">{{item.$$dj_edited}}</span>
                  <v-edit-dialog v-else :return-value.sync="value" @open="onOpen(item)" @save="onSave(item)">
                    {{item.$$dj_edited}}
                    <template v-slot:input>
                      <v-text-field v-model="value" required :rules="$$dj_rules" label="Edit" single-line></v-text-field>
                    </template>
                  </v-edit-dialog>
                </v-col>
              </v-row>
            </transition-group>
          </draggable>
        </v-container>
        <v-container v-else mt-2>
          <div v-for="item in items_" :key="item.$$dj_id">
            <v-row class="mx-0 px-2">
              <v-col class="py-1" cols=1 v-if="!fixedLength_" style="margin:auto;">
                <v-checkbox secondary hide-details v-model="item.selected" style="margin:0; padding:0;" @change="select()"></v-checkbox>
              </v-col>
              <v-col class="py-1" cols=10 style="margin:auto;">
                <span v-if="readOnly">{{item.$$dj_edited}}</span>
                <v-edit-dialog v-else :return-value.sync="value" @open="onOpen(item)" @save="onSave(item)">
                  {{item.$$dj_edited}}
                  <template v-slot:input>
                    <v-text-field v-model="value" :rules="$$dj_rules" label="Edit" single-line></v-text-field>
                  </template>
                </v-edit-dialog>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-container>
      </div>
    </v-col>
    <v-textarea v-if="!fixedLength_" v-model="newItemTitle" :label="label" :rules="$$dj_newItem_rules" @keyup.enter="addItem" :disabled="items_.length >= this.maxLength_" auto-grow outlined :rows="1">
    </v-textarea>
  </div>
</template>
<script>
import { isNull, isUndefined, isArray, uniq } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import draggable from "vuedraggable";

export default {

  mixins: [djvueMixin],

  props: [
    "items",
    "itemField",
    "title",
    "label",
    "maxLength",
    "fixedLength",
    "readOnly",
    "draggable",
    "rules",
    "required",
    "unique"
  ],

  components: {
    draggable
  },

  computed: {

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
      this.$emit("update", this.items_.map(d => d.$$dj_data))
    },

    onMove() {
      return true
    },

    addItem() {

      let insertedItems = this.newItemTitle.split("\n").map(d => d.trim()).filter(d => d)
      if (insertedItems.length == 0) return

      this.newItemTitle = null

      insertedItems.forEach(item => {
        if (this.$$dj_newItem_rules.map(r => r(item)).filter(r => r != true).length > 0) return
        if (this.items_.length >= this.maxLength_) return;
        let newItem = {
          $$dj_id: this.$djvue.randomName(),
          $$dj_edited: item
        }
        if (this.$$itemField) {
          newItem.$$dj_data = {}
          newItem.$$dj_data[this.$$itemField] = item
        } else {
          newItem.$$dj_data = item
        }

        this.items_ = this.items_ || []
        this.items_.push(newItem)
      })

      this.$emit("update", this.items_.map(d => d.$$dj_data))
    },

    select() {
      this.selection = (this.items_) ? this.items_.filter(n => n.selected) : []
    },

    reverseSelection() {
      this.items_.forEach(n => {
        n.selected = !n.selected
      })
      this.select()
    },

    deleteItems() {
      this.selection.forEach(s => {
        const index = this.items_.indexOf(s)
        this.items_.splice(index, 1)
      })
      this.selection = []
      this.$emit("update", this.items_.map(d => d.$$dj_data))
    },

    setValue(item, value) {

      if (isNull(value) || isUndefined(value)) return

      value = value.trim()

      if (this.$$dj_saveItem_rules.map(r => r(value, item)).filter(d => d != true).length > 0) return
      if (this.$$itemField) {
        item.$$dj_data[this.$$itemField] = value
      } else {
        item.$$dj_data = value
      }
      item.$$dj_edited = value
      this.$emit("update", this.items_.map(d => d.$$dj_data))
    },

    onSave(item) {
      this.setValue(item, this.value)
      this.savedItem = null
    },


    onOpen(item) {
      if (this.savedItem) this.setValue(this.savedItem, this.value)

      this.savedItem = (this.editedItem) ? this.editedItem : item
      this.editedItem = item
      this.$nextTick(() => { this.$emit("updateValue", this.editedItem) })

    },

    requiredCallback(v) {
      return (!!v && v != "") || (this.$$dj_required || "Required.")
    },

    uniqueNewItemCallback(v) {
      if (!v) return true
      let res = v
        .split("\n")
        .map(d => d.trim())
        .filter(d => d)
      res = res.concat(this.items_.map(d => d.$$dj_edited))
      let length1 = res.length
      res = uniq(res)
      let length2 = res.length

      let delta = length1 - length2

      return (delta == 0) || (this.$$dj_unique || "Doublicates detected.")
    },

    uniqueCallback(v) {

      if (!this.editedItem) return true
      return this.items_.filter(d => {
        return d.$$dj_id != this.editedItem.$$dj_id && d.$$dj_edited == v
      }).length == 0 || (this.$$dj_unique || 'Doublicate.')

    },

    uniqueSaveItemCallback(v) {

      return this.items_.filter(d => {
        return d.$$dj_id != this.item$$dj_id && d.$$dj_edited == v
      }).length == 0 || (this.$$dj_unique || 'Doublicate.')

    },



    prepareItems() {
      this.items_ = this.items.map(d => ({
        $$dj_id: this.randomName(),
        $$dj_data: d,
        $$dj_edited: (this.$$itemField) ? d[this.$$itemField].trim() : d.trim()
      })) || []

      this.editedItem = null
    }



  },

  data: () => ({
    newItemTitle: null,
    selection: [],
    items_: null,
    editedItem: null,
    savedItem: null,
    value: null
  }),



  created() {

    this.selection = []
    this.draggable_ = (this.draggable || this.draggable == "") ? true : false
    this.fixedLength_ = (this.fixedLength || this.fixedLength == "") ? true : false

    this.$$dj_required = (this.required || this.required == "") ? this.required : false

    this.$$dj_unique = (this.unique || this.unique == "") ? this.unique : false

    this.maxLength_ = (this.maxLength && this.draggable != "") ? this.maxLength : Number.POSITIVE_INFINITY
    this.$$itemField = (this.itemField && this.itemField != "") ? this.itemField : null

    this.prepareItems()

    this.$$dj_rules = []
    if (this.$$dj_required) this.$$dj_rules.push(this.requiredCallback)
    if (this.$$dj_unique) this.$$dj_rules.push(this.uniqueCallback)
    if (this.rules && isArray(this.rules)) this.$$dj_rules = this.$$dj_rules.concat(this.rules)

    this.$$dj_newItem_rules = []
    if (this.$$dj_unique) this.$$dj_newItem_rules.push(this.uniqueNewItemCallback)
    if (this.rules && isArray(this.rules)) this.$$dj_newItem_rules = this.$$dj_newItem_rules.concat(this.rules)

    this.$$dj_saveItem_rules = []
    if (this.$$dj_required) this.$$dj_saveItem_rules.push(this.requiredCallback)
    if (this.$$dj_unique) this.$$dj_saveItem_rules.push(this.uniqueSaveItemCallback)
    if (this.rules && isArray(this.rules)) this.$$dj_saveItem_rules = this.$$dj_saveItem_rules.concat(this.rules)

    this.$on("updateValue", (source) => {
      setTimeout(() => {
        this.value = (this.$$itemField) ? source.$$dj_data[this.$$itemField] : source.$$dj_data
        this.savedItem = source
      }, 100)
    })

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
