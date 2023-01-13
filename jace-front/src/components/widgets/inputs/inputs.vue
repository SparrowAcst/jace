<template>
  <v-card flat v-if="opts.length > 0">
    
    <v-btn
      v-show="minimized" 
      text 
      style="
        width: 100%; 
        text-transform: initial; 
      "
      class="body-1"
      :color="options.color || 'primary'"
      @click="minimized = !minimized"
    >
      {{options.title}}
    </v-btn>
      
    <v-toolbar
      
      v-show="!minimized" 
      
      light
      dense
      style="background:transparent"
      flat
      class="mx-0"
    >
      

      <v-toolbar-title :class="(options.color || 'primary')+'--text'" >{{options.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="minimized = !minimized">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-card-subtitle v-show="!minimized" 
      class="pt-0" style="line-height:1">
      {{options.note}}
    </v-card-subtitle>  
    <div v-show="!minimized" class="px-3"> 
      
      <v-row v-for="(field,index) in opts" :key="index" v-show="isShowed(field)">
        <v-col v-if="field.type == 'note'" class="py-0">
          <div class="caption secondary--text font-weight-light mx-3 my-0 pa-0" style="line-height:1;">
            <i>{{field.value}}</i>
          </div>  
        </v-col>
        <v-col v-if="field.type == 'text'" class="py-0">
          <v-text-field v-model="field.value" prepend-icon="mdi-textbox" :label="field.label" :disabled="field.disabled" :required="field.required" :rules="field.rules" class="body-1"></v-text-field>
        </v-col>
        <v-col v-if="field.type == 'password'" class="py-0">
          <v-text-field v-model="field.value" prepend-icon="mdi-textbox-password" :append-icon="field.showChars ? 'visibility' : 'visibility_off'" :type="field.showChars ? 'text' : 'password'" @click:append="field.showChars = !field.showChars" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1"></v-text-field>
        </v-col>
        <v-col v-if="field.type == 'email'" class="py-0">
          <v-text-field v-model="field.value" prepend-icon="mdi-email-outline" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1"></v-text-field>
        </v-col>
        <v-col v-if="field.type == 'url'" class="py-0">
          <v-text-field v-model="field.value" prepend-icon="mdi-web" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1"></v-text-field>
        </v-col>
        <v-col v-if="field.type == 'textarea'" class="py-0">
          <v-textarea prepend-icon="mdi-text" v-model="field.value" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1"></v-textarea>
        </v-col>
        <v-col v-if="field.type == 'switch'" class="py-0">
          <v-switch :label="field.label" v-model="field.value" :disabled="field.disabled" color="primary" class="body-1"></v-switch>
        </v-col>
        <v-col v-if="field.type == 'range'" class="py-0">
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

        <v-col v-if="field.type == 'slider'" class="py-0">
          <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
            <div class="v-input__control">
              <div class="v-text-field">
                <label aria-hidden="true" class="v-label v-label--active theme--light" :class="(messages[index].length>0) ? 'error--text': ''" style="left: 0px; right: auto; font-size:12px; top:-26px; position:relative;">
                  {{field.label}}: <!-- <span class="body-1 accent--text">{{field.value}}</span> -->
                </label>
                <v-slider class="mx-3" v-model="field.value" :disabled="field.disabled" :max="field.range[1]" :min="field.range[0]" :step="field.step" thumb-size="28" thumb-label="always" thumb-color="accent" color="accent" ticks tick-size="2" :error-messages="messages[index].join(' ')" :rules="field.rules"></v-slider>
              </div>
            </div>
          </div>
        </v-col>

        <v-col v-if="field.type == 'dateRange'" class="py-0">
          <v-menu v-model="field._menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="field.displayedValue" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1" prepend-icon="event" readonly :clearable="field.clearable" v-on="on"></v-text-field>
            </template>
            <v-date-picker 
              v-model="field.value" 
              @change="changeDateRange(index)"
              :min="field.min"
              :max="field.max"
              range
              no-title
            ></v-date-picker>
          </v-menu>
        </v-col>
        
        <v-col v-if="field.type == 'time'" class="py-0">
          <v-menu ref="menu" v-model="field._menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="field.value" :label="field.label" :disabled="field.disabled" :required="field.required" :error-messages="messages[index].join(' ')" :rules="field.rules" class="body-1" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
            <v-time-picker v-if="field._menu" v-model="field.value" format="24hr" full-width @click:minute="field._menu = false"></v-time-picker>
          </v-menu>
        </v-col>
        <v-col v-if=" field.type == 'select' " class="py-0">
          <v-autocomplete v-model="field.value" :items="field.items" :filter="field.filter" color="primary" :label="field.label" :multiple="field.multiple" :clearable="field.multiple" :item-text="field.itemText" :item-value="item => item" :error-messages="messages[index].join(' ')" class="body-1" :search-input.sync="field.search">
          </v-autocomplete>
        </v-col>
        <v-col v-if=" field.type == 'number' " class="py-0">
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
    </div>  

    <div v-show="!minimized" class="pt-3"> 
    
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="resolve" :disabled="!valid">{{options.buttonName || "Apply"}}</v-btn>
      </v-card-actions>
    </div>
    
  </v-card>
</template>
<script>
import { find, isUndefined, isArray, isNull, isString, includes, zipObject, keys, isEqual, extend } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";

<<< if( jace.mode == "development") { >>>
  
  import configDialog from "./inputs-config.vue";

<<< } >>> 



import moment from "moment"

export default {

  name: "inputs-widget",

  icon: "mdi-file-document-box-outline",

  mixins: [djvueMixin, listenerMixin],


  data: () => ({
    valid: true,
    options: null,
    minimized: false,
    search:null,
    opts: [],
    result:[],
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

      valid_multiple_selection: ( min , max ) => value => {
        min = (_.isUndefined(min)) ? 1 : min
        if (_.isUndefined(max)){
          return (value.length >= min) || ( (min == 1) ? "Required." : `Select ${min} or more items.` ) 
        } else {
          return (value.length > min && value.length <= max) || `Select ${min}..${max} items.` 
        }
      }  
    }
  }),

  watch: {
    opts: {
      handler(value) {
        let res = true
        let result = []
        value.forEach((option, index) => {
          
          if(option.type == "select"){
            let newValue = JSON.parse(JSON.stringify(option.value))
            if( this.res  && this.res[index] && !isEqual(this.res[index].value, newValue) ) {
              this.opts[index].search = ""
            } 
          }

          result.push(JSON.parse(JSON.stringify(option)))


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
        this.res = result
      },
      deep: true
    }
  },

  methods: {

    onValidate(data,options){
      if( isString(data) ) {
          try {
            data = JSON.parse(data)
            return data
          } catch (e) {
            return { error: e.toString() }
          }
        }
      return data  
    },


    onUpdate({ data }) {
      if (!data) {
        this.opts = []
        this.options = null
        return
      }
      // console.log("data", data)
      this.opts = this.normalizeOptions(data)
      this.options = data
    },


<<< if( jace.mode == "development") { >>>

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(configDialog, { width: "90%" }, { config: widgetConfig })
    },

<<< } >>>    


    isShowed(field) {
      let deps = field.show || []
      deps = isArray[deps] ? deps : [deps]
      deps = deps.map(d => {
        let f = find(this.opts, f => f.id == d)
        return (f) ? f.value : true
      })
      return deps.reduce((r, d) => d && r, true)
    },

    defaultFilter(item, queryText) {
      item = (_.isString(item)) ? item : item.toString()
      return includes(item.toLowerCase(), queryText.toLowerCase())
    },

    customFilter(itemText) {
      return (item, queryText) => {
        let val = (_.isString(item)) 
          ? item.toLowerCase() 
          : ( _.isString(item[itemText]))
            ? item[itemText].toLowerCase()
            : (item[itemText]) ? item[itemText].toString().toLowerCase() : ""
        return includes(val, queryText.toLowerCase())
      } 
    },



    normalizeOptions(options) {

      let res = []


      if (!options || !options.field) return []

      this.minimized = (!isUndefined(options.minimized) && !isNull(options.minimized)) ? options.minimized : this.minimized

      keys(options.field).forEach(o => {

        options.field[o]._rid = this.randomName

        let type = options.field[o].type || "text"
        let value = options.field[o].value || null
        let rules = (options.field[o].required) ? [this.rules.required].concat((options.field[o].rules) ? options.field[o].rules : []) :
          undefined
        let min, max, displayedValue, search  

        if (options.field[o].type == "range") {
          value = value || []
        }

        if (options.field[o].type == "dateRange") {
          
          min = options.field[o].min
          max = options.field[o].max
          value = (!value) 
              ? [] 
              : (isArray(value) ? value : [value])
                  .map( v => ((v) ? moment(new Date(v)).format("YYYY-MM-DD") : null))
                  .filter(v=>v)
          displayedValue = value.join(" ~ ")
          displayedValue = (displayedValue) ? displayedValue : null      
        }

        if (options.field[o].type == "select") {
          value = value || ((options.field[o].multiple) ? [] : null)
          if (!isNull(value)){
            value = (!options.field[o].multiple) 
              ? find(options.field[o].items, item => 
                  ((options.field[o].itemText) ? item[options.field[o].itemText] : item) 
                  ==
                  ((options.field[o].itemText) ? value[options.field[o].itemText] : value) 
                ) 
              : value
            search = (options.field[o].itemText) ? value[options.field[o].itemText] : value    
          } else {
            search = ""
          }
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
          let r
          if(options.field[o].range && _.isArray(options.field[o].range)) {
            r = this.rules.valid_multiple_selection(options.field[o].range[0], options.field[o].range[1])
          } else {
            r = this.rules.valid_multiple_selection()
          }
          rules = rules.concat(r)
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
          displayedValue,
          min,
          max,
          label: options.field[o].label || o,
          // items: options.field[o].items || [],
          range,
          step: (options.field[o].range && isArray(options.field[o].range) && options.field[o].range.length == 2 && !isUndefined(options.field[o].step)) ?
            options.field[o].step : 0.1,
          showChars: false,
          show: options.field[o].show,
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
            this.customFilter(options.field[o].itemText) : this.defaultFilter,
          search  

        })
        this.messages.push([])
      })

      return res
    },

    getOptions(options) {

      return zipObject(options.map(d => d.id), options)
    },


    changeDateRange(index){
      this.opts[index]._menu = false
      if( moment(this.opts[index].value[0]).isAfter(moment(this.opts[index].value[1])) ) 
        this.opts[index].value.reverse()
      this.opts[index].displayedValue = this.opts[index].value.join(" ~ ")
      this.opts[index].displayedValue = (this.opts[index].displayedValue) ? this.opts[index].displayedValue : null
    },

    resolve() {
      let event 
      if( this.options && this.options.event) {
        event = this.options.event
      } else {
        event = "apply"
      }  
      
      this.emit(event, this.getOptions(this.res))
    }

  },

  created() {
    // this.opts = this.normalizeOptions(_.extend(this.options))
  },

  mounted() { this.$emit("init") },
}

</script>
