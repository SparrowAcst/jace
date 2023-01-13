<template>
  <v-card v-if="options">
    <v-card-title class="white--text title primary py-1">
      <v-icon class="white--text">{{options.icon}}</v-icon>
      <span class="ml-1 font-weight-light">{{options.title}}</span>
      <v-spacer></v-spacer>
      <v-btn text icon small @click="reject">
        <v-icon small class="white--text">mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="caption secondary--text mx-4 my-2">
      {{options.note}}
    </div>
    <v-divider></v-divider>
    <v-col cols="12" class="mr-2 px-1">
      <v-row class="mx-2" v-for="(field,index) in opts" :key="index" v-show="isShowed(field)">
        <v-col v-if="field.type == 'text'">
          <v-text-field v-model="field.value" prepend-icon="mdi-textbox" :label="field.label" :disabled="field.disabled" :required="field.required" :rules="field.rules" class="body-1"></v-text-field>
        </v-col>
        <v-col v-if="field.type == 'password'">
          <v-text-field v-model="field.value" prepend-icon="mdi-textbox-password" :append-icon="field.showChars ? 'visibility' : 'visibility_off'" :type="field.showChars ? 'text' : 'password'" @click:append="field.showChars = !field.showChars" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1"></v-text-field>
        </v-col>
        <v-col v-if="field.type == 'email'">
          <v-text-field v-model="field.value" prepend-icon="mdi-email-outline" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1"></v-text-field>
        </v-col>
        <v-col v-if="field.type == 'url'">
          <v-text-field v-model="field.value" prepend-icon="mdi-web" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1"></v-text-field>
        </v-col>
        <v-col v-if="field.type == 'textarea'">
          <v-textarea prepend-icon="mdi-text" v-model="field.value" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1"></v-textarea>
        </v-col>
        <v-col v-if="field.type == 'switch'">
          <v-switch :label="field.label" v-model="field.value" :disabled="field.disabled" color="primary" class="body-1"></v-switch>
        </v-col>
        <v-col v-if="field.type == 'range'">
          <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
            <div class="v-input__control">
              <div class="v-text-field">
                <label aria-hidden="true" class="v-label v-label--active theme--light" :class="(messages[index].length>0) ? 'error--text': ''" style="left: 0px; right: auto; position: absolute;">
                  {{field.label}}
                </label>
                <v-range-slider class="mx-3" v-model="field.value" :disabled="field.disabled" :max="field.range[1]" :min="field.range[0]" :step="field.step" thumb-size="24" thumb-label="always" thumb-color="primary" ticks="always" tick-size="2" :error-messages="messages[index].join(' ')" :rules="field.rules"></v-range-slider>
              </div>
            </div>
          </div>
        </v-col>
        <v-col v-if="field.type == 'date'">
          <v-menu v-model="field._menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="field.value" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="field.value" @input="field._menu = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col v-if="field.type == 'time'">
          <v-menu ref="menu" v-model="field._menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="field.value" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
            <v-time-picker v-if="field._menu" v-model="field.value" format="24hr" full-width @click:minute="field._menu = false"></v-time-picker>
          </v-menu>
        </v-col>
        <v-col v-if=" field.type == 'select' ">
          <v-autocomplete v-model="field.value" :items="field.items" :filter="field.filter" color="primary" :label="field.label" :multiple="field.multiple" :clearable="field.multiple" :item-text="field.itemText" :item-value="item => item" :error-messages="messages[index].join(' ')" class="body-1"></v-autocomplete>
        </v-col>
        <v-col v-if=" field.type == 'number' ">
          <div class="v-input body-1 v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--is-booted">
            <div class="v-input__prepend-outer">
              <div class="v-input__icon v-input__icon--prepend">
                <v-icon>mdi-numeric</v-icon>
              </div>
            </div>
            <div class="v-input__control">
              <div class="v-input__slot">
                <div class="v-text-field__slot">
                  <label :for="field._rid" class="v-label v-label--active theme--light" style="left: 0px; right: auto; position: absolute;">
                    {{field.label}}
                  </label>
                  <input :id="field._rid" type="number" v-model="field.value" :min="field.range[0]" :max="field.range[1]" />
                </div>
              </div>
              <div class="v-text-field__details">
                <div class="v-messages theme--light">
                  <div class="v-messages__wrapper">{{messages[index].join(' ')}}.</div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="secondary" @click.native="reject()">Cancel</v-btn>
      <v-btn text color="secondary" @click.native="resolve()" :disabled="!valid">Ok</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { isUndefined, isArray, includes, extend, find, keys, zipObject } from "lodash"
import moment from "moment"
export default {

  name: "customDialog",

  props: ["options", "submit"],

  data: () => ({
    valid: true,
    opts: null,
    messages: [],
    rules: {
      required: value => (!isUndefined(value) && (value !== null) && (value !== "")) || "Required.",
      valid_email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },

      valid_url: value => {
        const pattern = /^((https?:\/\/)([a-zA-Z0-9]+[a-zA-Z0-9_-]*)(:\d{0,4})?([a-zA-Z0-9_\-/%={}?+&.:]*))$/
        return pattern.test(value) || 'Invalid url.'
      },

      valid_range: value => {
        return (value.length == 2) || "Required."
      },

      valid_one_selection: value => value != null || "Required.",

      valid_multiple_selection: value => value.length > 0 || "Required."
    }
  }),

  watch: {
    opts: {
      handler(value) {

        let res = true
        value.forEach((option, index) => {
          if (option.required) {
            let temp = true
            this.messages[index] = []
            option.rules.forEach(rule => {
              let ruleResult = rule(option.value)
              if (ruleResult != true) {
                this.messages[index].push(ruleResult)
              }
              temp = temp && (ruleResult == true)
            })
            res = res && temp
          }
        })
        this.valid = res
      },
      deep: true
    }
  },

  methods: {

    defaultFilter(item, queryText) {
      return includes(item.toLowerCase(), queryText.toLowerCase())
    },

    customFilter(itemText) {
      return (item, queryText) => includes(item[itemText].toLowerCase(), queryText.toLowerCase())
    },

    isShowed(field) {
      // console.log(field)
      let deps = field.show || []
      deps = isArray[deps] ? deps : [deps]
      deps = deps.map(d => {
        let f = find(this.opts, f => f.id == d)
        return (f) ? f.value : true
      })
      // console.log(deps.reduce( (r,d) => d && r, true))
      return deps.reduce((r, d) => d && r, true)
    },


    normalizeOptions(options) {

      let res = []

      if (!options || !options.field) return []

      keys(options.field).forEach(o => {

        options.field[o]._rid = this.randomName

        let type = options.field[o].type || "text"
        let value = options.field[o].value || null
        let rules = (options.field[o].required) ? [this.rules.required].concat((options.field[o].rules) ? options.field[o].rules : []) : undefined

        if (options.field[o].type == "range") {
          value = value || []
        }

        if (options.field[o].type == "date") {
          // if (options.field[o].multiple) {
          //   if (value) {
          //     if (_.isArray(value)) {
          //       value = value.map(v => moment(new Date(v)).format("YYYY-MM-DD"))
          //     } else {
          //       value = [moment(new Date(value)).format("YYYY-MM-DD")]
          //     }
          //   } else {
          //     value = [moment(new Date()).format("YYYY-MM-DD")]
          //   }
          // } else {
          value = (value) ? moment(new Date(value)).format("YYYY-MM-DD") : null //moment(new Date()).format("YYYY-MM-DD")
          // }
        }

        if (options.field[o].type == "select") {
          value = value || ((options.field[o].multiple) ? [] : null)
        }

        if (options.field[o].required && (options.field[o].type == "url")) {
          rules = rules.concat(this.rules.valid_url)
        }

        if (options.field[o].required && (options.field[o].type == "email")) {
          rules = rules.concat(this.rules.valid_email)
        }

        if (options.field[o].required && (options.field[o].type == "range")) {
          rules = rules.concat(this.rules.valid_range)
        }

        if (options.field[o].required && (options.field[o].type == "select") && (options.field[o].multiple)) {
          rules = rules.concat(this.rules.valid_multiple_selection)
        }

        let range = options.field[o].range || []
        if (options.field[o].type == "range") {
          range = (options.field[o].type == "range" && options.field[o].range && isArray(options.field[o].range) && options.field[o].range.length == 2) ?
            options.field[o].range : [0, 1]
        }


        res.push({
          id: o,
          _rid: options.field[o]._rid,
          _menu: false,
          type,
          value,
          label: options.field[o].label || o,
          // items: options.field[o].items || [],
          range,
          step: (options.field[o].range && isArray(options.field[o].range) && options.field[o].range.length == 2 && !isUndefined(options.field[o].step)) ?
            options.field[o].step : 0.1,
          showChars: false,
          disabled: options.field[o].disabled || false,
          required: options.field[o].required || false,
          rules,
          items: (options.field[o].items) ?
            options.field[o].items : [],
          multiple: (options.field[o].multiple) ?
            options.field[o].multiple : false,
          itemText: (options.field[o].itemText) ?
            options.field[o].itemText : undefined,
          filter: (options.field[o].itemText) ?
            this.customFilter(options.field[o].itemText) : this.defaultFilter

        })
        this.messages.push([])
      })

      return res
    },

    getOptions(options) {

      return zipObject(options.map(d => d.id), options)
    },


    resolve() {
      this.submit(this.getOptions(this.opts))
    },

    reject() {
      this.submit(null)
    },

  },

  created() {
    this.opts = this.normalizeOptions(extend(this.options))
  }

}

</script>
