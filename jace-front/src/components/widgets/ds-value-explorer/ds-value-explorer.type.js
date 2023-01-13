import snippets from "./snippets.js"

export default {
	name:"ds-value-explorer-widget",

    icon: "mdi-triforce",

    getInitialConfig( snippet ){
        snippet = snippet || "default"
        let res = snippets[snippet] || snippets["default"]
        return res
    }

}
