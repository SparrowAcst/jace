export default {
	methods:{

		getOntology(){

			return new Promise(( resolve, reject) => {

				this.$dps.run({
					script:
					`
					<?javascript

					    //input params
					    
					    $scope.concepts = "${this.config.metadata.concepts}";
					?>  

					dml.select(from:{{concepts}}, return:"value")
					set("indicators")

					<?javascript
					    
					    $scope.tree = {name:"topic",children:[]}
					    
					    $scope.indicators
					        .map( t => {
					            t.topic += ":"+t.name
					            return t
					        })
					        .forEach (t => {
					       
					        let path = t.topic.split(":").map(t=> t.trim())
					        let current = $scope.tree.children
					        path.forEach(( part, index ) => {
					            let f = _.find(current, t => t.name == part)
					            if(!f) {
					                current.push({
					                    name:part, 
					                    children: [],
					                    type: (index == path.length-1) ? "indicator" : "topic"
					                })
					                current = current[current.length-1].children
					            } else {
					                current = f.children
					            }
					        })
					    })
					    
					    $scope.tree = ( $scope.tree.children.length == 1 ) ? $scope.tree.children[0] : $scope.tree;
					?>

					return ("tree")
					`
				}).then(res => {
					if( res.type == "error" ){
						reject( res.data )
					} else {
						resolve( res.data )	
					}
				})


			})
			
		}
	}	
}