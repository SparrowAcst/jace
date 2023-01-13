
export default {


  methods: {
    translate(key) {
      let res = this.$i18n.t(`${this._uid}.${key}`)
      if (res == `${this._uid}.${key}`) res = this.$i18n.t(`${key}`)
      return res
    }
  },


  created() {

    if (!this.i18n) return

    let en = this.$i18n.getLocaleMessage("en")
    en[this._uid] = this.i18n.en
    let uk = this.$i18n.getLocaleMessage("uk")
    uk[this._uid] = this.i18n.uk

    this.$i18n.setLocaleMessage("en", en);
    this.$i18n.setLocaleMessage("uk", uk);
  }


}
