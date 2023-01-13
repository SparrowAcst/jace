import snippets from "./snippets.js"

export default {
	name:"nlp-annotator-widget",

    icon: "mdi-format-color-highlight",

    getInitialConfig( snippet ){
        snippet = snippet || "default"
        let res = snippets[snippet] || snippets["default"]
        return res
    }

}
