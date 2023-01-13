import { mapKeys } from "lodash"

export default {
  methods: {
    translate(key) {
      return this.$t(`${this.id}_${key}`)
    },

    _initI18n() {
      if (!this.i18n) return;

      this.$i18n_id = this.$djvue.randomName()

      let messages = {
        en: mapKeys(this.i18n.en, (value, key) => `${this.id}_${key}`),
        uk: mapKeys(this.i18n.uk, (value, key) => `${this.id}_${key}`)
      };

      this.$i18n.mergeLocaleMessage("en", messages.en);
      this.$i18n.mergeLocaleMessage("uk", messages.uk);

    },

    _destroyI18n() {
      // if(!this.i18n) return

      // let messages = {
      // 	en:  this.$i18n.getLocaleMessage("en"),
      // 	uk:  this.$i18n.getLocaleMessage("uk")
      // };

      // messages.en = _.pick(messages.en, _.keys(messages.en).filter((key => !key.startsWith(this.id))))
      // messages.uk = _.pick(messages.uk, _.keys(messages.uk).filter((key => !key.startsWith(this.id))))

      // this.$i18n.setLocaleMessage("en", messages.en);
      //    		this.$i18n.setLocaleMessage("uk", messages.uk);
      //    		this.app.config.i18n = messages 

    }
  },

  created() {
    this._initI18n()
  },

  beforeDestroy() {
    this._destroyI18n()
  }
}
