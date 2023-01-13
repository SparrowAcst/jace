<template>

  <v-card flat>
    <v-toolbar flat color="transparent" dense>
      
     <!-- <v-dialog v-model="showNewMetadataDialog" max-width="30%"> -->
       
       <v-btn fab dark icon absolute bottom left small color="primary" @click="inverseSelection">
          <v-icon>mdi-check-outline</v-icon>
       </v-btn>
       <v-btn fab dark icon absolute bottom left small color="primary" @click="" style="margin-left: 36px !important;" :disabled="selection.length==0">
          <v-icon>mdi-email-outline</v-icon>
       </v-btn>
     <!--    <v-card>
          <v-toolbar dark flat color="primary">
            <v-icon large>mdi-plus</v-icon>
            <v-toolbar-title>New metadata</v-toolbar-title>
          </v-toolbar>
          <v-flex xs12 pl-3 pr-3 justify-center>
            <v-text-field label="Metadata key" v-model="newMetadataKey" hint="Enter unique metadata key">
            </v-text-field>
          </v-flex>
          <v-flex xs12 pl-3 pr-3 justify-center>
            <v-text-field label="Metadata Value" v-model="newMetadataValue">
            </v-text-field>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancelNewMetadata">Cancel</v-btn>
            <v-btn flat color="primary" @click="commitNewMetadata">Ok</v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>  
      --> 
      <v-btn fab dark icon absolute bottom right small color="primary" @click="deleteUsers()" :disabled="selection.length==0">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>

    </v-toolbar> 
    <v-divider></v-divider>

    
    <v-container fluid grid-list-md mt-3 pa-2>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md6 lg4 pa-2>
             <v-layout column>
              
            <!--   <v-flex xs12 class="subheading"> Invited respondents: {{this.form.config.access.users.length}} </v-flex>
              
              <v-divider></v-divider> -->
              
              <v-data-iterator :items="form.config.access.users" :rows-per-page-items="[-1]" column wrap>

                <v-layout row slot="item" slot-scope="props"  align-center justify-start fill-height>
                  
                  <!-- <v-flex xs1 justify-center style="border:1px solid;"> -->
                    <v-checkbox secondary hide-details v-model="props.item.selected" @change="selectUser(props.item)" style="margin:0; padding:0;"></v-checkbox>
                  <!-- </v-flex> -->

                  <!-- <v-flex xs2 justify-center style="border:1px solid;"> -->
                    <v-avatar v-if="props.item.photo">
                        <dj-img :src="props.item.photo" :icon="(props.item.icon) ? props.item.icon : 'mdi-account'">
                    </v-avatar>
                    <v-progress-circular
                        v-else
                        indeterminate
                        size="24"
                        color="secondary ligten-2"
                    ></v-progress-circular>
                  <!-- </v-flex> -->
                  
                  <v-flex xs9 justify-center pl-3>
                    <v-layout column>
                      <div class="body-2">{{props.item.name}}</div>
                      <div class="caption">{{props.item.email}}</div>
                      <div class="caption accent--text" v-if="props.item.apikey">apikey: {{props.item.apikey}}</div>
                    </v-layout>  
                  </v-flex>
                </v-layout>  

              </v-data-iterator>
              <v-divider></v-divider>

              <v-autocomplete v-model="newEmail" :items="user_email_list" label="Select respondent email"  :search-input.sync="searchEmail" :rules="[isValidEmail]"  @keyup.enter="selectEmail" :error-messages="errorMessages" @input="addNewEmail" >
                <!-- <template slot="selection" slot-scope="data">
                  <v-chip outline label color="primary" :selected="data.selected" close class="chip--select-multi">
                    {{ data.item }}
                  </v-chip>
                </template> -->
                <template slot="item" slot-scope="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item"></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
                <template slot="no-data">
                  <v-list-tile @click="selectEmail">
                      Add foreign user: "{{searchEmail}}"
                  </v-list-tile>
                </template>
              </v-autocomplete>


                 
             </v-layout>
             
          </v-flex>

          <v-divider vertical></v-divider>

          <v-flex d-flex>
            <v-layout column pa-2>
              <div class="subheading">Invitation template</div>
              <editor
                    :content="form.config.access.notificationTemplate" 
                    lang="html" 
                    :sync="true"
                    @change="onUpdateSource"
                    style="border:1px solid #e0e0e0"
              > 
              </editor>
              <div class="subheading">Preview</div>
              <v-flex xs-12 v-html="preview" class="pa-2" style="border:1px solid #e0e0e0"></v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
    </v-container>      
    

  </v-card>  

</template>

<script>
  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import formIoMixin from "../mixins/form-io.mixin.js";
  import editor from 'djvue/components/core/ext/ace-editor.vue';
  import { find, findIndex, differenceWith, template, templateSettings } from "lodash"
  
  let compile = (_template,context) => {
     templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    let result = template(_template)(context)

    templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

    return result
    
  }

  export default  {
      
      mixins:[djvueMixin, listenerMixin, formIoMixin],
      
      props:["form"],

      components:{
        editor
      },
      
      computed:{
        user_email_list(){
         return differenceWith(this.userlist, this.form.config.access.users, (a,b) => a.email == b.email).map(u => u.email)
        },

        selection(){
          return this.form.config.access.users.filter( u => u.selected)
        },

        preview(){
          let context = {}
          context.metadata = this.form.metadata;
          context.respondent = (this.selection.length > 0) ? this.selection[0] : {
            name: "Dummy",
            email: 'dummy@example.com' ,
            apikey:'dummy_apikey'
          }
          context.app = this.app
          try {
            return compile(this.form.config.access.notificationTemplate, context);  
          } catch(e) {
            return `<h2 class="error--text subheading">Cannot display preview</h2><p class="error--text caption">${e.toString()}</p>`
          }
        }

      },
      
      methods:{

        timeAgo(d) {
          return moment(new Date(d)).fromNow();
        },

        
        isValidEmail(value){
          let emailRegex = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
          let t = emailRegex.test(value);
          if(t) return true
          return "Invalid email address format"  
        },

        selectEmail(){
          let validation = this.isValidEmail(this.searchEmail)
          this.errorMessages = (validation == true) ? [] : validation
          if(this.errorMessages.length == 0) {
            this.newEmail = this.searchEmail
            this.addNewEmail()
          }  
        },

        addNewEmail(){
            let newUser = find(this.userlist, u => u.email == this.newEmail)
            let needSearchProfile = false;
            if(!newUser){
              newUser = {
                name:this.newEmail,
                email:this.newEmail,
                apikey: this.apikey()
              }
              needSearchProfile = true;
            }
            newUser.selected = true;

            this.form.config.access.users.push(newUser)
            this.$emit("update", this.form.config.access)
            if(needSearchProfile){
              this.findUserProfile(newUser.email).then(res => {
                // console.log("FIND PROFILE", res)
                if(res.type="none"){
                  let index = findIndex(this.form.config.access.users, u => u.email == newUser.email)
                  if(index >= 0){
                    let u = this.form.config.access.users.splice(index,1)[0]
                    // console.log(u)
                    u.photo = "./"
                    u.icon = "mdi-account-question-outline"
                    this.form.config.access.users.push(u)
                  }
                }
              })  
            }
            

            this.newEmail = null;
            this.searchEmail = null;  
          
        },

        apikey(){
          return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
        },

        deleteUsers(){
          this.form.config.access.users = 
            differenceWith(this.form.config.access.users, this.selection, (a,b) => a.email == b.email)
          this.selection = []  
          this.$emit("update", this.form.config.access)
        },

        selectUser(user){
          let index = findIndex(this.form.config.access.users, u => u.email == user.email)
          this.form.config.access.users.splice(index,1,user)
        },

        inverseSelection(){
          this.form.config.access.users.forEach( u => {
            u.selected = !u.selected
            this.selectUser(u)
          })

        },

        onUpdateSource(value){
          this.form.config.access.notificationTemplate = value
        }
        
      },

      created(){
         this.$portal.get("/api/users/list")
          .then(res => {
            this.userlist = res.data
          })
 
      },

      watch:{
        form(value){
          this.selection = find(this.accessModes, m => m.key == value.config.access.type)  
        }
      },

      data:() => ({
        
        userlist:[],
        searchEmail: null,
        newEmail: null,
        errorMessages:[]

      })


  }    

</script>