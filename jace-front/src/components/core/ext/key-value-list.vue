<template>
  <div v-if="items">
    <v-data-table :headers="headers" :items="items" dense show-select hide-default-footer :items-per-page="Number.POSITIVE_INFINITY" v-model="selected" style="display: inline-grid;">
      <template v-slot:top>
        <v-row class="mx-2 my-0">
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon small @click="add()" v-on="on" class="primary--text pr-1">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon small :disabled="selected.length == 0" @click="remove()" v-on="on" class="primary--text pr-1">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
            <span>Remove</span>
          </v-tooltip>
        </v-row>
        <v-divider></v-divider>
      </template>
      <template v-slot:item.key="props">
        <v-edit-dialog :return-value.sync="key_" @save="onSave(props.item)" @open="onEdit(props.item)"> {{ props.item.key }}
          <template v-slot:input>
            <v-text-field v-model="key_" :rules="[required, unique]" required label="Edit" single-line></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.value="props">
        <v-edit-dialog :return-value.sync="value_" @save="onSave" @open="onEdit(props.item)"> {{ props.item.value }}
          <template v-slot:input>
            <v-text-field v-model="value_" label="Edit" single-line></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <pre class="caption">{{object}}</pre>
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import { extend, toPairs } from "lodash"

export default {

  name: "KeyValueEditor",

  props: ["object", "value"],

  mixins: [djvueMixin],

  data() {
    return {
      selected: [],
      editedItem: null,
      headers: [
        { text: "Key", value: 'key', class: 'text-xs-left' },
        { text: "Value", value: 'value', class: 'text-xs-left' },
      ],
      key_: null,
      value_: null,
      required: v => (!!v && v != "") || "Required",
      unique: v => this.items.filter(d => d.key != this.editedItem.key && d.key == v).length == 0 || 'Doublicate key!',
      items: null
    }
  },

  methods: {

    onEdit(item) {
      this.editedItem = item
      this.key_ = this.editedItem.key
      this.value_ = this.editedItem.value
    },

    onSave() {
      setTimeout(() => {

        if (this.unique(this.key_) != true || this.required(this.key_) != true) return
        let updated = extend({}, this.object[this.editedItem.key])
        updated[this.value] = this.value_
        delete this.object[this.editedItem.key]
        this.object[this.key_] = updated
        this.items = toPairs(this.object).map(d => ({ key: d[0], value: d[1][this.value] }))

      }, 0)
    }

  },
  created() {
    this.items = toPairs(this.object).map(d => ({ key: d[0], value: ((this.value) ? d[1][this.value] : d[1]) }))
  }

}

</script>
