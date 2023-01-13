export default {
	name:"dps-highlight-widget",

    icon: "mdi-code-braces",

    getInitialConfig(){

        let res = {
            type:"dps-highlight-widget", 
            name:"noname",
            icon:"mdi-language-javascript",
            options: { widget:{
                visible:true
              }
            },
            data:{
              script:`// type highlighted dps here`
            }
        }
        return res
    }	
}
