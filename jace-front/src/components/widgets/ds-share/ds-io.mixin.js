export default {
  methods: {

    dpsDownloadCollection(c) {
      return this.$dps.run({
          script: `
					<?javascript
					    $scope.mapper = d => {
					        let res = d.value;
					        res.id = d.id
					        return res
					    };
					?>

					dml.select(from:"${c}", map:{{mapper}})
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


					export("${c}.xlsx")

			`
        })
        .then(res => this.$dps.getBaseURL() + res.data.url)
    },

    dpsLoadCollectionSample(concept) {
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
				`
        })
        .then(res => res.data)
    },

    dpsLoadSchema() {
      return new Promise((resolve, reject) => {
        this.$dps.run({
            script: `
					<?javascript
					    $scope.mapper = d => d.identity
					?>
					ddl.desc("dj-data")
					c.map({{mapper}})
				`
          })
          .then(res => {
            // console.log(res)
            if (res.type == "error") {
              reject(res.data)
            } else {
              resolve(res.data)
            }
          })
      })
    },

    dpsUploadCollections(file) {
      return this.$dps.run({
        script: `

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
    }
  }
}
