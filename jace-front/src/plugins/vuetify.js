import Vue from '@/plugins/vue'
import Vuetify from 'vuetify/lib'
import VueI18n from 'vue-i18n'
import en from 'vuetify/es5/locale/en'
import uk from 'vuetify/es5/locale/uk'


let en_msg = { $vuetify: en }
let uk_msg = { $vuetify: uk }

Vue.use(Vuetify)
Vue.use(VueI18n)

let i18n = new VueI18n({
  locale: 'en', // set locale
  // messages, // set locale messages
})

i18n.setLocaleMessage("en", en_msg);
i18n.setLocaleMessage("uk", uk_msg);


Vue.prototype._i18n = i18n

export default new Vuetify({
  theme: {
    dark: false,
  },

  icons: {
    iconfont: 'mdi'
  },

  lang: {
    t: (key, ...params) => i18n.t(key, params),
  }

})
