
  <template>
  <div :class="`text-${options.align} ma-2`">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      z-index=1000
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          :content="noReadMessages"
          :value="noReadMessages"
          color="warning"
          bordered
          overlap
        >
          <v-btn class="mx-2" dark small color="primary" v-bind="attrs"
          v-on="on">
            <v-icon dark small class="pr-2"> {{options.icon || 'mdi-bell'}}</v-icon> 
            <span class="font-weight-light">{{options.title}}</span>
          </v-btn>

       
        </v-badge>
      </template>

      <v-card flat>
        <v-toolbar
          color="primary"
          dark
          dense
          flat
        >
          <v-icon class="pr-2"> {{options.icon || 'mdi-bell'}} </v-icon>

          <v-toolbar-title>{{options.title}}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="closeMenu()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        
        </v-toolbar> 
        <v-list 
          two-line
          dense
          height="300"
          style="overflow:auto"
         >
          <template v-for="(item, index) in messages">
            
            <v-list-item
              :key="index"
              @click=""
              v-if ="item"
            >
              <v-list-item-avatar>
                <v-img :src="item.user.photo"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title :class="(index < noReadMessages) ? 'warning--text' : 'font-weight-light'" v-html="formatDate(item.date) + ' ' + (item.user.name || 'ananymous')"></v-list-item-title>
                <v-list-item-subtitle :class="(index < noReadMessages) ? 'caption' : ''" v-html="`${item.data}`"></v-list-item-subtitle>

              </v-list-item-content>

            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-list>

        <v-textarea
          v-if="!options.readonly"
          v-model="newMessage"
          outlined
          class="ma-2"
        >
          <template v-slot:label>
            <div>
              Your message...
            </div>
          </template>
        </v-textarea>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text v-if="!options.readonly" :disabled="!newMessage" @click="send()">Send</v-btn>
          <v-btn color="primary" text @click="closeMenu">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>


<script>

  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";
  import moment from "moment";
  import { extend } from "lodash";

<<< if( jace.mode == "development") { >>>  
  import SSEListenerConfig from "./sse-listener-config.vue";
<<< } >>>

  const urlRE = /((https?:\/\/)([a-zA-Z0-9]+[a-zA-Z0-9_-]*)(:\d{0,4})?([a-zA-Z0-9_\-\/\%\=\{\}\?\+\&\.\:]*))/g;

  export default  {
    
    name:"sse-listener-widget",

    icon: "mdi-bell",

    mixins:[djvueMixin, listenerMixin],

    data: () => ({
      messages: [],
      noReadMessages:0,
      newMessage:"",
      menu: false,
      channel:null,
      subscription:null,
      
      options:{
        align: "right",
        readonly: true,
        channel: null,
        events:["message"],
        title: "User Activity",
        dateFormat:null,
        icon:"mdi-bell"
      }

    }),

    methods:{

      formatDate(date){
        let d = moment(new Date(date))
        return (this.options.dateFormat)? d.format(this.options.dateFormat) : d.fromNow()
      },

      openMenu(){
        this.menu = true
        // this.noReadMessages = 0
      },

      closeMenu(){
        this.menu = false
        this.noReadMessages = 0
      },

      send(){
        this.$pubsub()
          .then( service => service.publish({
            channel: this.options.channel,
            date: new Date(),
            app: this.app.name,
            user: this.app.user,
            data: this.newMessage
          }))
          .then( () => {
            this.newMessage = ""
          })
      },


      onUpdate ({data}) {
        if(!data) return
        this.options = extend( this.options, data )
      },



<<< if( jace.mode == "development") { >>>

    onDelete(){
      this.$pubsub().then(service => service.unsubscribe(this))
    },

    onReconfigure (widgetConfig) {
     return this.$dialogManager.showAndWait(SSEListenerConfig, {width:"90%"},{config:widgetConfig})
    },

<<<}>>>            

    
    subscribe(channel){
      this.$pubsub()
        .then(service => service.subscribe({
            widget:this,
            channel: channel,
            handler: (data) => {
              if(!this.menu){
                this.noReadMessages++
              }
              data.data = data.data.replace("\n","<br/>")//.replace(urlRE,'<a target="_blank" href="$1">$1</a>')
              this.messages = [data].concat(this.messages) //.push(data)
            }
          })
        )
        .then( subscription => {
          this.subscription = subscription
        })
    }
  },  

    watch:{
      menu(newValue){
        if(newValue) this.openMenu()
      },
      "options.channel"(newValue){
        if(!newValue) return
        this.subscribe(newValue)
      }
    },

    
    props:["config"],
    
    mounted(){ this.$emit("init") }

  }

</script> 
<style scoped>
  .bg-white {
    background: white;
  }
</style>
