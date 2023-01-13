import snippets from "./snippets.js"

export default {
	name:"nlp-resolver-widget",

    icon: "mdi-source-merge",

    getInitialConfig( snippet ){
        snippet = snippet || "default"
        let res = snippets[snippet] || snippets["default"]
        return res
    }

}
