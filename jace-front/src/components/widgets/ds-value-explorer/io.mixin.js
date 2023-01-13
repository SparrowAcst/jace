export default {
	methods:{
		getIndicatorList(concepts){
			return new Promise(( resolve, reject) => {
				this.$dps.run({
					script:`
						<?javascript
						    $scope.mapper = d => ({
						        concept: d.value.concept,
						        name: d.value.name,
						        type: d.value.type
						    });
						?>
						dml.select(from:"${concepts}", map:{{mapper}})
						c.order(by:"type")
					`
				}).then(res => {
					if(res.type == "error"){
						reject(res.data)
					} else {
						resolve(res.data)
					}	
				})	
			})
		},

		getYearList(concept, concepts, collections){
			return new Promise( (resolve,reject) => {
				this.$dps.run({
					script:`
						<?javascript
						    // input parameters
						    
						    $scope.rootConcept = "${concept}";
						    $scope.conceptFilter = d => d.value.concept == $scope.rootConcept
						    $scope.collectionFilter = d => d.value.def == "${concepts}."+ $scope.rootConcept;
						    
						?>

						dml.select(from:"${concepts}", return:"value", where:{{conceptFilter}})
						set("indicator")

						dml.select(from:"${collections}", return:"value", where:{{collectionFilter}})
						set("collection")

						<?javascript
						    $scope.dataCollection = $scope.collection[0].concept.split(".")[0];
						?>

						dml.select(from:{{dataCollection}}, return: "value")
						c.unique("year")
						c.order()
					`
				}).then(res => {
					if(res.type == "error"){
						reject(res.data)
					} else {
						resolve(res.data)
					}	
				})
			})
			
		},

		getCountryList(concept, concepts, collections, countries){
			return new Promise((resolve, reject) => {
				this.$dps.run({
					script:`
						<?javascript
						    // input parameters
						    
						    $scope.rootConcept = "${concept}";
						    $scope.conceptFilter = d => d.value.concept == $scope.rootConcept
						    $scope.collectionFilter = d => d.value.def == "${concepts}."+ $scope.rootConcept;
						    
						?>

						dml.select(from:"${concepts}", return:"value", where:{{conceptFilter}})
						set("indicator")

						dml.select(from:"${collections}", return:"value", where:{{collectionFilter}})
						set("collection")

						<?javascript
						    $scope.dataCollection = $scope.collection[0].concept.split(".")[0];
						    
						    $scope.joinOn = (a, b) => a == b["${this.config.metadata.mapper.id}"]
						    $scope.joinMapper = d => ({
						        id: d.left,
						        name: d.right["${this.config.metadata.mapper.name}"]
						    });
						?>

						dml.select(from:"${countries}", return:"value")
						set("countries")

						dml.select(from:{{dataCollection}}, return: "value")
						c.unique("${this.config.metadata.mapper.id}")

						c.innerJoin(with:{{countries}}, on:{{joinOn}})

						c.map({{joinMapper}})
						c.order(by:"name")
					`
				}).then(res => {
					if(res.type == "error"){
						reject(res.data)
					} else {
						resolve(res.data)
					}	
				})	
			})
			
		},

		getTree(concept, concepts, collections, filter){
			// console.log(filter)
			return this.$dps.run({
				script:`
					<?javascript
				    // input parameters
					    $scope.rootConcept = "${concept}";
					    
					    $scope.filters = ${JSON.stringify(filter)}
				
					?>
					

					dml.select(from:"${concepts}", return:"value")
					set("indicators")
					
					dml.select(from:"${collections}", return:"value")
					set("collections")

					<?javascript
					    $scope.datapoints = []

					    let getTree = concept => {
					        
					        let f = _.find($scope.indicators,d => d.concept == concept)
					        let children = (f && f.args) ? f.args.split(",").map(d => d.trim()) :[]
					        let datapoint = _.find($scope.collections, c => c.def && c.def.split(".")[1] == concept )
					        let names = []
					        
					        if(datapoint){
					            names = datapoint.concept.split(".")  
					            $scope.datapoints.push({
					                collection: names[0],
					                field: names[1]
					            })
					        }
					        
					        return {
					            concept: concept,
					            name: (f) ? f.name : "n/a",
					            range:(f) ? f.range : "n/a",
					            datapoint: {
					                collection: names[0],
					                field: names[1]
					            },
					            children : children.map(getTree)
					        }
					    };
					    
					    $scope.res = getTree($scope.rootConcept);
					    
					    $scope.valuesScript = $scope.datapoints.map( d => 
					    'dml.select(from:"'+d.collection+'",return:"value"); set("data.'+d.collection+'");').join("")+"return('data')"
					 

					?>
					run({{valuesScript}})
					set("data")

					<?javascript
					    
					    
					    let findValues = node => {
					        
					        if(node.datapoint.collection){
					            
					            node.values = 
					            $scope.filters.map( f => {
					                let r = Object.assign({}, f)
					                let founded = _.find($scope.data[node.datapoint.collection], f)
					                if(founded){
					                    
					                    r["${this.config.metadata.mapper.id}"] = undefined
					                    r.id = founded["${this.config.metadata.mapper.id}"]
					                    r.value = founded[node.datapoint.field] || "n/a"
					                   
					                } 
					                return r
					            })
					            
					        }
					        
					        if(node.children){
					            node.children.forEach( c => {findValues(c)})
					        }
					    };
					    
					    res = findValues($scope.res);
					?>

					return ("res")
				`
			}).then(res => res.data)	
		}
	}	
}