import snippets from "./snippets.js"

export default {

	name:"graph-chart-widget",

    icon: "mdi-graphql",

    getInitialConfig(snippet){
        snippet = snippet || "Pie"
        let res = snippets[snippet] || snippets["Graph"]
        return res
    }  
      

}