import snippets from "./snippets.js"

export default {
	name:"tree-widget",

    icon: "mdi-database",

    getInitialConfig( snippet ){
        snippet = snippet || "default"
        let res = snippets[snippet] || snippets["default"]
        return res
    }

}
