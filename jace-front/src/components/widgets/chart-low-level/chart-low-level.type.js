import snippets from "./snippets.js"

export default {

	name:"chart-low-level-widget",

    icon: "mdi-chart-box-outline",

    getInitialConfig(snippet){
        // snippet = snippet || "Pie"
        let res = snippets//[snippet] || snippets["Graph"]
        return res
    }  
      

}