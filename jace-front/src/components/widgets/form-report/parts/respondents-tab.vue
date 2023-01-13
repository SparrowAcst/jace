<template>

  <v-card flat>
    <v-toolbar flat color="transparent" dense>
       <v-btn fab dark icon absolute bottom left small color="primary" @click="inverseSelection">
          <v-icon>mdi-check-outline</v-icon>
       </v-btn>
       <v-btn fab dark icon absolute bottom left small color="primary" @click="notifyUsers" style="margin-left: 36px !important;" :disabled="selection.length==0">
          <v-icon>mdi-email-outline</v-icon>
       </v-btn>
      <v-btn fab dark icon absolute bottom right small color="primary" @click="deleteUsers()" :disabled="selection.length==0">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>

    </v-toolbar> 
    <v-divider></v-divider>

    
    <v-container fluid grid-list-md mt-3 pa-2>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md6 lg4 pa-2>
             <v-layout column>
              <v-data-iterator :items="form.config.access.users" :rows-per-page-items="[-1]" column wrap>

                <v-layout row slot="item" slot-scope="props"  align-center justify-start fill-height>
                  
                    <v-checkbox secondary hide-details v-model="props.item.selected" @change="selectUser(props.item)" style="margin:0; padding:0;"></v-checkbox>
                    <v-avatar v-if="props.item.photo">
                        <dj-img :src="props.item.photo" :icon="(props.item.icon) ? props.item.icon : 'mdi-account'">
                    </v-avatar>
                    <v-progress-circular
                        v-else
                        indeterminate
                        size="24"
                        color="secondary ligten-2"
                    ></v-progress-circular>
                  
                  <v-flex xs9 justify-center pl-3>
                    <v-layout column>
                      <div class="body-2">{{props.item.name}}</div>
                      <div class="caption">{{props.item.email}}</div>
                      <div class="caption accent--text" v-if="props.item.apikey">apikey: {{props.item.apikey}}</div>
                      <div class="caption" v-if="props.item.lastNotifiedAt">notified {{timeAgo(props.item.lastNotifiedAt)}}</div>
                    </v-layout>  
                  </v-flex>
                </v-layout>  

              </v-data-iterator>
              <v-divider></v-divider>

              <v-autocomplete 
                v-model="newEmail" 
                :items="user_email_list" 
                :label="label"
                :error="error"
                :success="success"  
                :search-input.sync="searchEmail" 
                @keyup.enter="selectEmail" 
                @input="addNewEmail" 
              >
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


  let compile = (template,context) => {
     _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    let result = _.template(template)(context)

    _.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

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
         return _.differenceWith(this.userlist, this.form.config.access.users, (a,b) => a.email == b.email).map(u => u.email)
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

        notifyUsers(){

          let users = this.form.config.access.users.filter( u => u.selected).map( u => {
            let item = JSON.parse(JSON.stringify(u))
            item.context = {metadata: this.form.metadata, respondent: u}
            return item
          })

          this.sendMails(users, this.form.config.access.notificationTemplate)
            .then( res => {
              this.form.config.access.users
                .filter( u => u.selected)
                .forEach(u => {
                  u.lastNotifiedAt = new Date()
                })
               this.$emit("update", this.form.config.access)  
            })
        },

        timeAgo(d) {
          return moment(new Date(d)).fromNow();
        },

        
        isValidEmail(value){
          let emailRegex = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
          let t = emailRegex.test(value);
          if(t) return true
          return false //"Invalid email address format"  
        },

        isUniqueEmail(value){
          let index = _.findIndex(this.form.config.access.users, u => u.email == value)
          if(index == -1) return true
          return false //"Email doublicate detected"  
        },

        selectEmail(){
          
          let validation = this.isValidEmail(this.searchEmail)
          this.errorMessages = (validation == true) ? [] : validation
          
          validation = this.isUniqueEmail(this.searchEmail)
          if(validation != true){
            this.errorMessages.push(validation)  
          }
          
          
          if(this.errorMessages.length == 0) {
            this.newEmail = this.searchEmail
            this.addNewEmail()
          } else {
            this.cancelAddNewEmail()
          } 
        },
        
        cancelAddNewEmail(){
            this.newEmail = null;
            this.searchEmail = null;  
        },

        addNewEmail(){
            let newUser = _.find(this.userlist, u => u.email == this.newEmail)
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
                if(res.type == "none"){
                  let index = _.findIndex(this.form.config.access.users, u => u.email == newUser.email)
                  if(index >= 0){
                    let u = this.form.config.access.users.splice(index,1)[0]
                    // console.log(u)
                    u.photo = "./"
                    u.icon = "mdi-account-question-outline"
                    this.form.config.access.users.push(u)
                  }
                } else {
                  let index = _.findIndex(this.form.config.access.users, u => u.email == newUser.email)
                  if(index >= 0){
                    let u = this.form.config.access.users.splice(index,1)[0]
                    // console.log(u)
                    u.photo = res.profile.photo
                    u.name = res.profile.name
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
            _.differenceWith(this.form.config.access.users, this.selection, (a,b) => a.email == b.email)
          this.selection = []  
          this.$emit("update", this.form.config.access)
        },

        selectUser(user){
          let index = _.findIndex(this.form.config.access.users, u => u.email == user.email)
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
          this.selection = _.find(this.accessModes, m => m.key == value.config.access.type)  
        },

        searchEmail(value){
          
          if(!value){
            this.label = "Type or select respondent email"
            this.error = false
            this.success = false
            return
          }

          if(!this.isValidEmail(value)){
            this.label = "Invalid email format"
            this.error = true
            this.success = false
            return
          }

          if(!this.isUniqueEmail(value)){
            this.label = "Email doublicate detected"
            this.error = true
            this.success = false
            return
          }

          this.label = "Add foreign respondent"
          this.error = false
          this.success = true
          

        }

      },

      data:() => ({
        
        userlist:[],
        searchEmail: null,
        newEmail: null,
        errorMessages:[],
        label:"Type or select respondent email",
        error:false,
        success:false

      })


  }    

</script>