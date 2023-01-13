import { find } from "lodash"


export default {

  methods: {

    getQueryString(param) {

      var queryString = {};

      let uri = JSON.parse(JSON.stringify(window.location.href));

      uri.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) { queryString[$1] = $3; }
      );

      return (param) ? queryString[param] : queryString
    },

    accessForOwner() {
      // eslint-disable-next-line
      console.log("accessForOwner ", (this.app.user.isAdmin || this.app.user.isOwner || this.app.user.isCollaborator))
      return (this.app.user.isAdmin || this.app.user.isOwner || this.app.user.isCollaborator)
    },

    accessIsAlowed() {

      if (!this.form.config.access.enabled && !this.app.user.isAdmin && !this.app.user.isOwner && !this.app.user.isCollaborator) {
        return {
          available: false,
          title: "Access denied",
          note: `Form was closed ${(this.form.config.access.lastNotificatedAt) ? this.timeAgo(this.form.config.access.lastNotificatedAt) : ''}.`
        }
      }

      this.app.user.apikey = this.getQueryString("apikey");

      if (this.form.config.access.type == "any") {
        this.app.user.id = this.$djvue.randomName()
        this.app.user.name = "Ananimous"
        this.app.user.icon = "mdi-account-circle-outline"
        this.app.user.photo = "."
        return { available: true }
      }

      console.log("Access for user", this.app.user.email)

      if (this.form.config.access.type == "users") {
        if (this.app.user.email) return { available: true };

        return {
          available: false,
          title: "Access denied",
          note: "Access is alowed for registered respondents. Use your Google+ account for signin.",
          type: "users"
        }
      }

      if (this.form.config.access.type == "invited") {
        if (!this.app.user.id && !this.app.user.apikey) {
          return {
            available: false,
            title: "Access denied",
            note: "Access is alowed for invited respondents only."
          }
        }

        let invitedRespondent = find(this.form.config.access.users, u => {

          if (u.id && this.app.user.id) return u.id == this.app.user.id;
          if (u.apikey && this.app.user.apikey) return u.apikey == this.app.user.apikey;
          return false

        })

        if (invitedRespondent) {
          this.app.user = invitedRespondent
          return { available: true }
        }

        return {
          available: false,
          title: "Access denied",
          note: "Access is alowed for invited respondents only."
        }
      }

      return { available: false }

    }

  }

}
