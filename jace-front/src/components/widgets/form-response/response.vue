<template>
  <div>
    
    <div v-if="form">
      <div class="primary--text font-weight-light display-1">
        {{translate("Your_responses")}}
      </div>
      <v-divider></v-divider>

        <div v-for="(q, q_index) in responseReport" :key="q_index" class="mt-3">
          <h2 class="title font-weight-light secondary--text">
            {{q.question.title}} 
            <!-- <span v-if="q.options.required" class="caption warning--text">({{translate('Required')}})</span> -->
          </h2>
          <p class="caption secondary--text font-weight-light pl-3 ma-0">
            {{q.question.note}}
          </p>
          
          
          <div>
          
            <div 
              :class="(q.answer.validation == true) ? 'success--text' : 'warning--text'" 
              class="ma-5 pa-5" 
              style="border:1px solid;"
            >
              <div>
                <div v-if="q.answer.data && q.answer.data.length > 0" class="body-1 pl-3 pt-2 ma-0 font-weight-bold">
                  {{translate("Response")}}
                </div>
                
                <ul v-if="find(unOrdered, l => l == q.question.type) && q.answer.data && q.answer.data.length > 0">
                    <li v-for="(n, nIndex) in q.answer.data" :key="nIndex" class="body-2">
                      {{n}}
                    </li>
                </ul>
                
                <ol v-if="find(ordered, l => l == q.question.type) && q.answer.data && q.answer.data.length > 0">
                    <li v-for="(n, nIndex) in q.answer.data" :key="nIndex" class="body-2">
                      {{n}}
                    </li>
                </ol>

                <div v-if="!find(ordered.concat(unOrdered), l => l == q.question.type) && q.answer.data && q.answer.data.length > 0">
                  {{q.answer.data[0]}}
                </div>  

              </div>  

              <div v-if="q.answer.validation != true" class="error--text pt-2 font-weight-bold">
                {{q.answer.validation}}
              </div>

            </div>  
          
          </div>  



        </div>
    </div>
   
  </div>
</template>
<script>


import i18nMixin from "@/mixins/core/widget-i18n.mixin.js"
import { find } from "lodash"
import moment from "moment"

export default {

  name: "form-response",

  props:["form", "answer"],

  mixins: [i18nMixin],
 
  computed: {

    accessMode() {
      return {
        "any": { icon: "mdi-account", text: "Any_respondents" },
        "users": { icon: "mdi-account-key", text: "Logged_user" },
        "invited": { icon: "mdi-account-star", text: "Invited_respondents" }
      } [this.form.config.access.type]
    },

    responseReport(){
      return this.getResponseReport()
    }

  },

  methods:{
    
    getManyOfManyResponse(qid){
      let a = find(this.answer.data, d => d.id == qid)
      if(!a) return {data:[]}
      return { 
        validation: a.valid,
        data: find(this.form.config.questions, d => d.id == qid ).options.nominals.filter( d => find(a.data, q => q == d.id )).map( d => d.title)
      }  
    },

    getPriorityResponse(qid){
      let a = find(this.answer.data, d => d.id == qid)
      if(!a) return {data:[]}
      return { 
        validation: true, //a.valid,
        data: a.data.map( d => d.title) 
      }  
    },

    getRateResponse(qid){
      let a = find(this.answer.data, d => d.id == qid)
      if(!a) return {data:[]}
      return { 
        validation: a.valid,
        data: [a.data[0]]
      }  
    },

    getRangeResponse(qid){
      let a = find(this.answer.data, d => d.id == qid)
      if(!a) return {data:[]}
      return { 
        validation: a.valid,
        data: [`[${a.data.join(", ")}]`]
      }  
    },

    getInfluenceResponse(qid){
      let a = find(this.answer.data, d => d.id == qid)
      if(!a) return {data:[]}
      let q = find(this.form.config.questions, d => d.id == qid ).options   
      return { 
        validation: a.valid,
        data: a.data.map( d => 
         `${find(q.factors, f => f.id == d.e1).title} > ${d.value} > ${find(q.effects, f => f.id == d.e2).title}`
        )
      }  
    },

    getAssociationResponse(qid){
      let a = find(this.answer.data, d => d.id == qid)
      if(!a) return {data:[]}
      let q = find(this.form.config.questions, d => d.id == qid ).options   
      return { 
        validation: a.valid,
        data: a.data.map( d => 
         `${find(q.entities, f => f.id == d.e1).title} < ${d.value} > ${find(q.entities, f => f.id == d.e2).title}`
        )
      }  
    },

    getResponse(question){
      let handlerMap = {
        "Many of many selection": this.getManyOfManyResponse,
        "One of many selection": this.getManyOfManyResponse,
        "Priority": this.getPriorityResponse,
        "Rate": this.getRateResponse,
        "Range": this.getRangeResponse,
        "Date": this.getRateResponse,
        "Influence": this.getInfluenceResponse,
        "Association": this.getAssociationResponse
      }

      let res = {
        question:{
          id: question.id,
          title: question.options.title,
          note: question.options.note,
          type: question.options.type
        }
      }
      
      let a = find(this.answer.data, d => d.id == res.question.id)
      if(!a){
        res.answer = {
          validation: this.translate("No_response")
        }
      } else {
        res.answer = handlerMap[res.question.type](res.question.id)
      }
      
      return res
    },
    
    getResponseReport(){
      return this.form.config.questions.map( q => this.getResponse(q))
    }

  },

  
  data: () => ({
    moment,
    Date,
    find,

    ordered:[ 
      "Priority"
    ],

    unOrdered:[ 
      "Many of many selection", 
      // "One of many selection",
      "Influence",
      "Association"
    ],
    
    i18n: {
      en: {
        "Last_update": "Last update:",
        "Application": "Application:",
        "Access_for": "Access for:",
        "Any_respondents": "Any respondents",
        "Logged_user": "Logged user",
        "Invited_respondents": "Invited respondents",
        "Opened": "was opened",
        "Closed": "was closed",
        "Question": "Question",
        "Required": "required",
        "Responses": "Responses",
        "Respondent_activity": "Respondent activity:",
        "Total": "Total",
        "Response_type": "Response type:",
        "One of many selection": "one of many selection",
        "Many of many selection": "many of many selection",
        "Rate": "rate",
        "Range": "range",
        "Date": "date",
        "Association": "association",
        "Influence": "influence",
        "Statistic": "Statistic",
        "Entities": "Entities:",
        "Factors": "Factors:",
        "Effects": "Effects:",
        "Scale": "Scale:",
        "Nominals": "Alternatives:",

        "Respondent_can_add_max": "Respondent can add max",
        "Self_variants": "self variants",
        "Respondents_collaboration_detected": "Respondents collaboration detected",
        "Respondent_shuld_select_between": "Respondent shuld select between",
        "And": "and",
        "Variants": "variants",
        "Range_between": "Range between",
        "By_step": "by step",
        "Priority": "priority",
        "Your_responses":"Your responses",
        "Response": "Response",
        "No_response": "No response"


      },
      uk: {
        "Last_update": "Останнє оновлення:",
        "Application": "Застосунок:",
        "Access_for": "Доступ для:",
        "Any_respondents": "будь-кого",
        "Logged_user": "зареєстрованих користувачів",
        "Invited_respondents": "запрошених респондентів",
        "Opened": "було відкрито",
        "Closed": "було закрито",
        "Question": "Запитання",
        "Required": "обов'язкове",
        "Responses": "відповідей",
        "Respondent_activity": "Активність респондентів:",
        "Total": "Загалом",
        "Response_type": "Тип відповіді:",
        "One of many selection": "вибір одного з багатьох варіантів",
        "Many of many selection": "вибір багатьох з багатьох варіантів",
        "Rate": "визначення рейтингу",
        "Range": "визначення діапазону",
        "Date": "визначення дати",
        "Association": "оцінювання зв'язків",
        "Influence": "оцінювання впливів",
        "Statistic": "Статистика",
        "Entities": "Сутності:",
        "Factors": "Фактори:",
        "Effects": "Ефекти:",
        "Scale": "Шкала:",
        "Nominals": "Варіанти:",
        "Respondent_can_add_max": "Респондент може додати максимум",
        "Self_variants": "власних варіантів",
        "Respondents_collaboration_detected": "Респонденти можуть взаємодіяти",
        "Respondent_shuld_select_between": "Респондент має обрати від",
        "And": "до",
        "Variants": "варіантів",
        "Range_between": "Діапазон від",
        "By_step": "з кроком",
        "Priority": "визначення пріоритетів",
        "Your_responses":"Ваші відповіді",
        "Response": "Відповідь",
        "No_response": "Відповідь відсутня"

      }
    }
  })

}

</script>
