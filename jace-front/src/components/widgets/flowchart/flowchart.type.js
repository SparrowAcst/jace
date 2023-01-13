import snippets from "./snippets.js"

export default {
	name:"flowchart-widget",

    icon: "mdi-shape-outline",

    getInitialConfig( snippet ){
        snippet = snippet || "default"
        let res = snippets[snippet] || snippets["default"]
        return res
    }

}
