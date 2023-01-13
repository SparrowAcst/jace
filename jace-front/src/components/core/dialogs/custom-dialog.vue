<template>
   <v-card v-if="options">

      <v-toolbar card dense dark flat color="primary">
         <v-toolbar-title class="font-weight-light">{{options.title}}</v-toolbar-title>
      </v-toolbar>
      <div class="caption secondary--text mx-4 my-2">
        {{options.note}}
      </div>

      <v-divider></v-divider>  
      
      <div class="mx-4 my-3 px-2" style="overflow-y:auto; max-height:35em;">
        <div v-for="field,index in opts" class="my-3">
          
          <v-flex v-if="field.type == 'text'">
              <v-text-field
                v-model="field.value"
                prepend-icon="mdi-textbox"
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :rules="field.rules"
              ></v-text-field>
          </v-flex>

          <v-flex v-if="field.type == 'password'">
              <v-text-field
                v-model="field.value"
                prepend-icon="mdi-textbox-password"
                :append-icon="field.showChars ? 'visibility' : 'visibility_off'"
                :type="field.showChars ? 'text' : 'password'"
                @click:append="field.showChars = !field.showChars"
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :error-messages="messages[index].join(' ')"
                :rules="field.rules"
              ></v-text-field>
          </v-flex>

          <v-flex v-if="field.type == 'email'">
              <v-text-field
                v-model="field.value"
                prepend-icon="mdi-email-outline"
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :error-messages="messages[index].join(' ')"
                :rules="field.rules"
              ></v-text-field>
          </v-flex>

          <v-flex v-if="field.type == 'url'">
              <v-text-field
                v-model="field.value"
                prepend-icon="mdi-web"
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :error-messages="messages[index].join(' ')"
                :rules="field.rules"
              ></v-text-field>
          </v-flex>


          <v-flex v-if="field.type == 'textarea'">
              <v-textarea 
                prepend-icon="mdi-text"
                v-model="field.value" 
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :error-messages="messages[index].join(' ')"
                :rules="field.rules"
              ></v-textarea>
          </v-flex>

          <v-flex v-if="field.type == 'switch'">
            <v-switch
              :label="field.label"
              v-model="field.value"
              :disabled="field.disabled"
              color="primary"
            ></v-switch>
          </v-flex>

          <v-flex v-if="field.type == 'range'">
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
              <div class="v-input__control">
                <div class="v-text-field">
                  <label 
                    aria-hidden="true" 
                    class="v-label v-label--active theme--light"
                    :class = "(messages[index].length>0) ? 'error--text': ''" 
                    style="left: 0px; right: auto; position: absolute;">
                      {{field.label}}
                  </label>
            
                  <v-range-slider 
                    class="mx-3"
                    v-model="field.value"
                    :disabled="field.disabled"
                    :max="field.range[1]" 
                    :min="field.range[0]" 
                    :step="field.step" 
                    thumb-size="24" 
                    thumb-label="always" 
                    thumb-color="primary" 
                    ticks="always" 
                    tick-size="2"
                    :error-messages="messages[index].join(' ')"
                    :rules="field.rules"
                  ></v-range-slider>
                </div>
              </div>
            </div>      
          </v-flex>  

          <v-flex v-if="field.type == 'date'">
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
              <div class="v-input__control">
                <div class="v-text-field py-1">
                  <label 
                    aria-hidden="true" 
                    class="v-label v-label--active theme--light" 
                    style="left: 0px; right: auto; position: absolute;">
                      {{field.label}} {{(field.multiple) ? field.value.join(", ") : ""}}
                  </label>
                        
                  <v-date-picker
                        :aria-label="field.label"
                        v-model="field.value"
                        full-width
                        landscape
                        :multiple="field.multiple"
                        class="v-card--flat"
                        style="border: 1px solid #dedede;"
                        :error-messages="messages[index].join(' ')"
                        

                  ></v-date-picker>
                  <!-- :event-color="date => date[9] % 2 ? 'red' : 'yellow'" -->
                        <!-- :events="functionEvents" -->
                </div>
              </div>
            </div>      
          </v-flex>  

          <v-flex v-if="field.type == 'time'">
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
              <div class="v-input__control" style="display:block;">
                <div class="v-text-field py-1">
                  <label 
                    aria-hidden="true" 
                    class="v-label v-label--active theme--light" 
                    :class = "(messages[index].length>0) ? 'error--text': ''" 
                    style="left: 0px; right: auto; position: absolute;">
                      {{field.label}}
                  </label>
                  <v-time-picker 
                    v-model="field.value" 
                    landscape
                    format="24hr"
                    :multiple="field.multiple"
                    full-width
                    class="v-card--flat"
                    style="border: 1px solid #dedede;"
                    :error-messages="messages[index].join(' ')"
                  ></v-time-picker>      
                </div>
                <div class="v-messages theme--light error--text">
                  <div class="v-messages__wrapper">
                    <div class="v-messages__message">
                      {{messages[index].join(' ')}}
                    </div>
                  </div>
                </div>
              </div>
            </div>      
          </v-flex>

          <v-flex v-if=" field.type == 'select' ">
            <v-autocomplete
              v-model="field.value"
              :items="field.items"
              :filter="field.filter"
              color="primary"
              :label="field.label"
              :multiple="field.multiple"
              :clearable= "field.multiple" 
              :item-text="field.itemText"
              :item-value = "item => item"
              :error-messages="messages[index].join(' ')"
            >
          </v-flex>  

          <v-flex v-if=" field.type == 'number' ">
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
              <div class="v-input__control" style="display:block;">
                <div class="v-text-field py-1">
                  <label 
                    aria-hidden="true" 
                    class="v-label v-label--active theme--light" 
                    :class = "(messages[index].length>0) ? 'error--text': ''" 
                    style="left: 0px; right: auto; position: absolute;">
                      {{field.label}}
                  </label>
                  <v-input
                    :error-messages="messages[index].join(' ')"
                  >
                      <input 
                        type="number" 
                        style="border: 1px solid #e0e0e0; width:100%; padding:2px;" 
                        v-model="field.value"
                        :min="field.range[0]"
                        :max="field.range[1]"
                      ></input>
                  </v-input>  
                </div>
              </div>
            </div>      
          </v-flex>        
        </div> 
      </div>   





      
      

      <!-- <v-flex xs12 pl-3 pr-3 justify-center>
        <input type="file" label="file" v-on:change="fileChanged"/>
      </v-flex>   -->
      
      
     <!--  <v-divider></v-divider>
        <pre class="body-1">{{messages}}</pre> -->
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="secondary" @click="reject">Cancel</v-btn>
        <v-btn flat color="secondary" @click="resolve" :disabled = "!valid">Ok</v-btn>
      </v-card-actions>
      
  </v-card>
</template>

<script>
 import layout from "./custom-dialog-layout.vue";

  export default {
    
    name:"customDialog",

    props:["options"],

    data: () => ({
      valid: true,
      opts:null,
      messages:[],
      rules:{
        required: value => (!_.isUndefined(value) && (value !== null) && (value !== "")) || "Required." ,
        valid_email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },

        valid_url: value => {
          const pattern = /^((https?:\/\/)([a-zA-Z0-9]+[a-zA-Z0-9_-]*)(:\d{0,4})?([a-zA-Z0-9_\-\/\%\=\{\}\?\+\&\.\:]*))$/
          return pattern.test(value) || 'Invalid url.'
        },

        valid_range: value => {
          return (value.length == 2) || "Required."
        },

        valid_one_selection: value => value != null || "Required." ,

        valid_multiple_selection: value => value.length > 0 || "Required."   
      }
    }), 
    
    watch:{
      opts:{
        handler(value){
          
          let res = true
          value.forEach( (option, index) => {
            if(option.required){
              let temp = true
              this.messages[index] = []
              option.rules.forEach( rule => {
                let ruleResult = rule(option.value)
                if( ruleResult != true){
                  this.messages[index].push(ruleResult)
                } 
                temp = temp && (ruleResult == true)
              })
              res = res && temp  
            } 
          })
          this.valid = res
        },
        deep:true
      }    
    },

    methods:{
      // functionEvents (date) {
      //   const [,, day] = date.split('-')
      //   return parseInt(day, 10) % 3 === 0
      // },

      defaultFilter( item, queryText ){
        return _.includes(item.toLowerCase(), queryText.toLowerCase())
      },

      customFilter(itemText) {
        return  ( item, queryText ) => _.includes(item[itemText].toLowerCase(), queryText.toLowerCase())
      },

      // validation(){
      //   return this.opts.reduce( (option, res) => res && option.rules.reduce( (rule, rr) => rr && rule(option.value)))
      // },

      
      normalizeOptions(options){
        
        let res = []

        if(!options || !options.field) return []

        _.keys(options.field).forEach( o => {

          
          let type = options.field[o].type || "text"
          let value = options.field[o].value || null
          let rules = (options.field[o].required)
                      ? [this.rules.required].concat((options.field[o].rules) ? options.field[o].rules : [])
                      : undefined

          if (options.field[o].type == "range"){
            value = value || []
          }

          if (options.field[o].type == "date"){
            if (options.field[o].multiple){
              if ( value ){
                if ( _.isArray(value)){
                    value = value.map( v => moment(new Date(v)).format("YYYY-MM-DD"))
                } else {
                  value = [moment(new Date(value)).format("YYYY-MM-DD")]
                }
              } else {
                value = [moment(new Date()).format("YYYY-MM-DD")]
              }
            } else {
              value = (value) ? moment(new Date(value)).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD")  
            }
          }

          if (options.field[o].type == "select"){
            value = value || ((options.field[o].multiple) ? [] : null)
          }

          if (options.field[o].required && (options.field[o].type == "url")){
            rules = rules.concat(this.rules.valid_url)
          }

          if (options.field[o].required && (options.field[o].type == "email")){
            rules = rules.concat(this.rules.valid_email)
          }

          if (options.field[o].required && (options.field[o].type == "range")){
            rules = rules.concat(this.rules.valid_range)
          }

           if (options.field[o].required && (options.field[o].type == "select") && (options.field[o].multiple)){
            rules = rules.concat(this.rules.valid_multiple_selection)
          }

          let range = options.field[o].range || []
          if (options.field[o].type == "range"){
            range = (options.field[o].type == "range" && options.field[o].range && _.isArray(options.field[o].range) && options.field[o].range.length == 2)
                    ? options.field[o].range
                    : [0,1]
          }


           res.push( {
            id: o,
            type,
            value,
            label: options.field[o].label || o,
            items: options.field[o].items || [],
            range,
            step:  (options.field[o].range && _.isArray(options.field[o].range) && options.field[o].range.length == 2 && !_.isUndefined(options.field[o].step))
                    ? options.field[o].step
                    : 0.1,       
            showChars: false,
            disabled: options.field[o].disabled || false,
            required: options.field[o].required || false,
            rules,
            items: (options.field[o].items)
                      ? options.field[o].items
                      : [],
            multiple: (options.field[o].multiple)
                        ? options.field[o].multiple
                        : false,
            itemText: (options.field[o].itemText)
                        ? options.field[o].itemText
                        : undefined,
            filter: (options.field[o].itemText)
                        ? this.customFilter(options.field[o].itemText)
                        : this.defaultFilter                        

           })
           this.messages.push([])
        })
       
        return res
      },

      getOptions(options){

        return _.zipObject(options.map( d => d.id), options)
      }, 


      resolve(){
        this.$emit('submit', this.getOptions(this.opts))
      },

      reject(){
        this.$emit('submit', null)
      },

    },

    created(){
      this.opts = this.normalizeOptions(_.extend(this.options))
    },

    layout: layout
  }
</script>