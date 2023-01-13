export default {
	methods:{

		dpsLoadCollectionSample(concept){
			return this.$dps.run({
				script: `
					<?javascript
					    $scope.mapper = d => {
					        let res = d.value;
					        res.id = d.id
					        return res
					    };
					?>

					dml.select(from:"${concept}", map:{{mapper}})

					set("data")

					<?javascript
					    $scope.attr = $scope.data.map( d => Object.keys(d));
					    $scope.field = [];
					    $scope.attr.forEach( a => {
					        $scope.field = _.union($scope.field,a)
					    });
					    
					    $scope.publisher = d => {
					        let res ={}
					        $scope.field.forEach( f => {
					            res[f] = ( d[f] ) ? d[f] : null
					        })
					        return res
					    };    
					?>
					get("data")
					c.limit()
					c.map({{publisher}})
					set("data")
					<?javascript
					    $scope.res = {
					        dataset:{
					            dimensions: Object.keys($scope.data[0]),
					            source: $scope.data
					        }
					    };
					?>
					return("res")
				`})
			.then( res => res.data )
		},

		dpsLoadSchema(){
			return this.$dps.run({
				script:`
					<?javascript
					    $scope.mapper = d => d.identity
					?>
					ddl.desc("dj-data")
					c.map({{mapper}})
				`})
			.map( res => res.data)
		},

		dpsUploadCollections(file){
			return this.$dps.run({
				script:`

					<?javascript
					    $scope.file = $scope.$file.name;
					?>

					file.load({{file}})
					set("db")
					ddl.desc()
					set("collections")


					<?javascript
					    let m = {
					        "identity": "",
					        "schema": "dj-data",
					        "attributes": {
					            "value": {
					                "type": "json"
					            }
					        },
					        "permissions": {
					            "create": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "alter": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "drop": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "desc": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "select": {
					                "role": [
					                    "any",
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "insert": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "update": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "delete": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            }
					        },
					    };    
					    

					    
					    $scope.sheets = Object.keys($scope.db);
					    $scope.collections = $scope.collections.map(c => c.identity)

					    $scope.toBeDrop = $scope.sheets
					                        .filter( s => _.find($scope.collections, c => c == s))

					    $scope.toBeCreate = $scope.sheets
					                .map( s => {
						                 let res = Object.assign({},m);
						                 res.identity = s
						                 return res
					                });
					    $scope.values = $scope.sheets.map( s => $scope.db[s].map(v=> ({id:v.id, value:v})));
					    
					    $scope.ddlDropScript = $scope.toBeDrop
					        .map( c => 
					            'ddl.drop(model:"'+c+'");info("'+c+'")'
					        )
					        .join(";")
					    $scope.ddlDropScript = ($scope.ddlDropScript) ? $scope.ddlDropScript : "ctx('noop')"
					    
					    $scope.ddlCreateScript = $scope.toBeCreate
					        .map( ( c, index ) => 
					            'info({{toBeCreate['+index+'].identity}});ddl.create(model:{{toBeCreate['+index+']}})'
					        )
					        .join(";");
					    $scope.ddlCreateScript = ($scope.ddlCreateScript) ? $scope.ddlCreateScript : "ctx('noop')"
					    
					    $scope.dmlScript = $scope.sheets
					        .map( ( s, index ) => 
					            'info("'+s+'");dml.insertOrUpdate(into:"'+s+'", values:{{values['+index+']}});info()'
					        )
					        .join(";");
					    
					?>
					info("Drop collections")
					run({{ddlDropScript}})
					info("Create collections")
					run({{ddlCreateScript}})
					info("Insert or update values")
					run({{dmlScript}})
					log()
					`,
					state: {},
          			file: file
			}).then(res => res.data)
		},

		dpsDownloadCollection(c){
			return this.$dps.run({
				script:`
					<?javascript
					    $scope.mapper = d => {
					        let res = d.value;
					        res.id = d.id
					        return res
					    };
					?>

					dml.select(from:"${c.concept}", map:{{mapper}})
					set("data")

					<?javascript
					    $scope.attr = $scope.data.map( d => Object.keys(d));
					    $scope.field = [];
					    $scope.attr.forEach( a => {
					        $scope.field = _.union($scope.field,a)
					    });
					    
					    $scope.publisher = d => {
					        let res ={}
					        $scope.field.forEach( f => {
					            res[f] = ( d[f] ) ? d[f] : null
					        })
					        return res
					    }    
					?>
					get("data")
					c.map({{publisher}})


					export("${c.concept}.xlsx")

			`})
			.then( res => this.$dps.getBaseURL() + res.data.url)
		},

		dpsLoadConcepts( metadata ){
			return this.$dps.run({
				script:`
					<?javascript
					    
					    $scope.mapper = d => {
					        let res = d.value
					        res.id = d.id
					        return res
					    };
					   
					?>  

					dml.select(from:"${metadata.concepts}", map:{{mapper}})
					c.uniqueBy("topic")
					c.order()
					set("topics")

					<?javascript
					    $scope.tree = {name:"topic",children:[]}
					    
					    $scope.topics.forEach (t => {
					        
					        let path = t.split(":")
					        let current = $scope.tree.children
					        
					        path.forEach(( part, index ) => {
					            let f = _.find(current, t => t.name == part)
					            if(!f) {
					                current.push({
					                    name:part, 
					                    children: [],
					                    type:"topic",
					                    path: (index == path.length-1) ? t : undefined
					                })
					                current = current[current.length-1].children
					            } else {
					                current = f.children
					            }
					        })
					        
					    })
					    
					    $scope.tree = $scope.tree.children
					?>

					return ("tree")
					`})
			.then(res => res.data)

		},

		dpsLoadEntityInfo(metadata,e){
	        return this.$dps.run({
		        script:`
		        	<?javascript
					    $scope.mapper = d => d.value; 
					?>
					dml.select(from:"${e.concept}", map:{{mapper}})
					set("data")

					dml.select(from:"${metadata.collections}", map:{{mapper}})
					set("collections")

					dml.select(from:"${metadata.concepts}", map:{{mapper}})
					set("indicators")

					<?javascript
					    let getCollectionDef = concept => {
					      let collection = $scope.collections.filter( c => c.concept == concept)[0]
					      collection.attr = $scope.collections
					        .filter( c => c.concept.split(".").length>1 && c.concept.split(".")[0] == concept)
					        .map( a => {
					            if( a.ref ) {
					                let names = a.ref.split(".")
					                a.ref = {}
					                a.ref.attr = names[1]
					                a.ref.collection = getCollectionDef(names[0])
					            }
					            if( a.def ){
					                a.def = _.find($scope.indicators, i => i.concept == a.def.split(".")[1])
					            }
					            return a
					        })
					    
					      return collection
					    }
					    $scope.counts = {
					        total: $scope.data.length 
					    }
					    Object.keys( $scope.data[0]).forEach( key => {
					        $scope.counts[key] = _.unique($scope.data, key).length
					    });
					    $scope.res = getCollectionDef("${e.concept}")
					    $scope.res.count = $scope.counts.total
					    $scope.res.attr = $scope.res.attr.map( a => {
					        a.count = $scope.counts[a.concept.split(".")[1]]
					        return a
					    })
					?>
					return ("res")
		        `})
	        	.then( res => res.data )
	  
      },

      dpsLoadDatapointInfo(metadata, dp){
        return this.$dps.run({
	        script:`
				<?javascript
				    $scope.mapper = d => d.value; 
				?>
				dml.select(from:"${dp.concept}", map:{{mapper}})
				set("data")

				dml.select(from:"${metadata.collections}", map:{{mapper}})
				set("collections")

				dml.select(from:"${metadata.concepts}", map:{{mapper}})
				set("indicators")

				<?javascript
				    let getCollectionDef = concept => {
				      let collection = $scope.collections.filter( c => c.concept == concept)[0]
				      collection.attr = $scope.collections
				        .filter( c => c.concept.split(".").length>1 && c.concept.split(".")[0] == concept)
				        .map( a => {
				            if( a.ref ) {
				                let names = a.ref.split(".")
				                a.ref = {}
				                a.ref.attr = names[1]
				                a.ref.collection = getCollectionDef(names[0])
				            }
				            if( a.def ){
				                a.def = _.find($scope.indicators, i => i.concept == a.def.split(".")[1])
				            }
				            return a
				        })
				    
				      return collection
				    }
				    $scope.counts = {
				        total: $scope.data.length 
				    }
				    Object.keys( $scope.data[0]).forEach( key => {
				        $scope.counts[key] = _.unique($scope.data, key).length
				    });
				    $scope.res = getCollectionDef("${dp.concept}")
				    $scope.res.count = $scope.counts.total
				    $scope.res.attr = $scope.res.attr.map( a => {
				        a.count = $scope.counts[a.concept.split(".")[1]]
				        return a
				    })
				?>
				return ("res")
        `})
        .then(res => res.data)
      },

      dpsLoadDatapoints(metadata){
        return this.$dps.run({
        	script:`
				<?javascript
				    $scope.mapper = d => {
				        let res = d.value;
				        res.id = d.id;
				        return res
				    };
				    
				    $scope.isDatapoint = d => d.value.type == "datapoint";

				?>

				dml.select(from:"${metadata.collections}", where:{{isDatapoint}}, map:{{mapper}})
        `})
        .then( res => res.data )
      },

    dpsLoadEntities(metadata){
        return this.$dps.run({
        	script:`
				<?javascript
				    $scope.mapper = d => {
				        let res = d.value;
				        res.id = d.id;
				        return res
				    };
				    
				    $scope.isEntity = d => d.value.type == "entity";

				?>

				dml.select(from:"${metadata.collections}", where:{{isEntity}}, map:{{mapper}})
        `})
        .then( res =>  res.data )
      },

    dpsLoadSample(metadata, dp){
        return this.$dps.run({
          	script:`
          		<?javascript
				    $scope.mapper = d => d.value; 
				?>
				dml.select(from:"${dp.concept}", map:{{mapper}})
				c.limit()
				set("data")
				<?javascript
				    $scope.res = {
				        dataset:{
				            dimensions: Object.keys($scope.data[0]),
				            source: $scope.data
				        }
				    };
				?>
				return("res")
        `})
        .then(res => res.data)
    },

    dpsLoadEntitySample(metadata,e){
        return this.$dps.run({
          script:`
          	<?javascript
			    $scope.mapper = d => d.value; 
			?>
			dml.select(from:"${e.concept}", map:{{mapper}})
			c.limit()
			set("data")
			<?javascript
			    $scope.res = {
			        dataset:{
			            dimensions: Object.keys($scope.data[0]),
			            source: $scope.data
			        }
			    };
			?>
			return("res")
          `})
        .then(res => res.data)
      },


    dpsLoadIndicators(metadata, p){
                
        return this.$dps.run({
        	script: `
				<?javascript
				    
				    $scope.mapper = d => {
				        let res = {}
				        res.id = d.id
				        res.concept = d.value.concept
				        res.name = d.value.name
				        res.topic = d.value.topic
				        res.definition = d.value.definition
				        res.type = "indicator"
				        return res
				    };
				    
				    $scope.asCollectionsDef = item => {
				        let res = item.value
				        res.id = item.id
				        return res
				    };
				    
				    $scope.selector = d => d.value.topic == "${p.path}";
				   
				?>  

				dml.select(from:"${metadata.concepts}", where:{{selector}}, map:{{mapper}})
				set("indicators")
				dml.select(from:"${metadata.collections}", map:{{asCollectionsDef}})
				set("cDef")

				<?javascript

				    let getCollectionDef = concept => {
				      let collection = $scope.cDef.filter( c => c.concept == concept)[0]
				      collection.attr = $scope.cDef
				        .filter( c => c.concept.split(".").length>1 && c.concept.split(".")[0] == concept)
				        .map( a => {
				            if( a.ref ) {
				                let names = a.ref.split(".")
				                a.ref = {}
				                a.ref.attr = names[1]
				                a.ref.collection = getCollectionDef(names[0])
				            }
				            return a
				        })
				    
				      return collection
				    }


				    $scope.indicators = $scope.indicators.map( ind => {
				        ind.datapoints = $scope.cDef
				            .filter( c => c.def && c.def.split(".")[1] == ind.concept )
				            .map( c => getCollectionDef(c.concept.split(".")[0]))
				            
				        return ind    
				    })
				?>

				return("indicators")
			`})
        .then( res => res.data )
      }

	}
}