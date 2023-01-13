import snippets from "./snippets.js"

export default {

	name:"uml-chart-widget",

    icon: "mdi-shape-outline",

    getInitialConfig(snippet){
        snippet = snippet || "Use Case Diagram"
        let res = snippets[snippet] || snippets["Use Case Diagram"]
        return res
    }    

}