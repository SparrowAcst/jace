export default [{
    title: "Injection",
    children: [{
        title: "javascript",
        snippet: "\n<?javascript \n?>\n"
      },
      {
        title: "json",
        snippet: "\n<?json \n?>\n"
      },
      {
        title: "csv",
        snippet: "\n<?csv \n?>\n"
      },
      {
        title: "xml",
        snippet: "\n<?xml \n?>\n"
      },
      {
        title: "text",
        snippet: "\n<?text \n?>\n"
      },
      {
        title: "html",
        snippet: "\n<?html \n?>\n"
      }
    ]
  },
  {
    title: "Attributes",
    children: [{
        title: "bindable",
        snippet: "{{variable}}"
      },
      {
        title: "scriptable",
        snippet: "<? d => d ?>"
      }
    ]
  },
  {
    title: "Variables",
    children: [{
        title: "set",
        snippet: "\nset(\"variable\")\n"
      },
      {
        title: "get",
        snippet: "\nget(\"variable\")\n"
      },
      {
        title: "return",
        snippet: "\nreturn(\"variable\")\n"
      }
    ]
  },
  {
    title: "Data Definition",
    children: [{
        title: "Get collection definition"
      },
      {
        title: "Create collection"
      },
      {
        title: "Drop collection"
      }, {
        title: "Alter collection"
      }, {
        title: "Create collection"
      }
    ]
  },
  {
    title: "Data Manipulation",
    children: [{
        title: "Select data",
        snippet: "dml.select(\n    from:'sdi-wbgini',\n    return:'value',\n    where: <? d => d.value.year == '2015' ?>,\n    into: 'gini'\n)"
      },
      {
        title: "Update data"
      },
      {
        title: "Insert data"
      },
      {
        title: "Insert or Update data"
      },
      {
        title: "Delete data"
      },
      {
        title: "Load data"
      }
    ]
  },
  {
    title: "Data Transformation",
    children: [{
        title: "Select"
      },
      {
        title: "Order by"
      },
      {
        title: "Group by"
      },
      {
        title: "Inner join"
      },
      {
        title: "Left join"
      },
      {
        title: "Outer join"
      },
      {
        title: "Map"
      },
      {
        title: "Count by"
      },
      {
        title: "Unique by"
      },
      {
        title: "Limit (take)"
      }
    ]
  },
  {
    title: "Statistic",
    children: [{
        title: "Min",
        children: []
      },
      {
        title: "Max",
        children: []
      },
      {
        title: "Rank",
        children: []
      },
      {
        title: "Median",
        children: []
      },
      {
        title: "Average",
        children: []
      },
      {
        title: "Entropy",
        children: []
      },
      {
        title: "Granulation",
        children: []
      },
      {
        title: "Correlation",
        children: []
      },
      {
        title: "K-means (clusters)",
        children: []
      },
      {
        title: "K-means (centroids)",
        children: []
      },
      {
        title: "PCA (eigen values)",
        children: []
      },
      {
        title: "PCA (scores)",
        children: []
      },
      {
        title: "PCA (loadings)",
        children: []
      }

    ]
  },
  {
    title: "Widgets",
    children: [{
        title: "Table",
        snippet: `
					// ==> snippet "Table" 
					dml.select(from:"wdi-countries", return:"value")
					set("countries")

					dml.select(from:"sdi-wbgini", return:"value", where:<? d => d.value.year == "2015" ?>)
					set("gini")

					dml.select(from:"sdi-wbsf", return:"value", where:<? d => d.value.year == "2015" ?>)
					set("sf")

					get("countries")
					c.innerJoin(with:{{gini}}, on:"3_alpha_code")
					c.map(<? 
					    d => ({
					        "3_alpha_code": d.left["3_alpha_code"],
					        country: d.left.short_name,
					        gini: d.right.value
					    })
					?>)
					c.innerJoin(with:{{sf}}, on:"3_alpha_code")
					c.map(<? 
					    d => ({
					        country: d.left.country,
					        gini_2015: Number.parseFloat(Number.parseFloat(d.left.gini).toFixed(3)),
					        sf_2015: Number.parseFloat(Number.parseFloat(d.right.value).toFixed(3))
					    })
					?>)

					c.order(by:"sf_2015",as:"asc")
					set("data")

					<?javascript
					    $scope.result = {
					        dataset:{
					            "dimensions": Object.keys($scope.data[0]),
					            "source": $scope.data
					        }
					    };
					?>
					return("result")
					// <== snippet "Table"
				`
      },
      {
        title: "Data Selector",
        snippet: `
					// ==> snippet "Data Selector"
					dml.select(from:"wdi-countries", return:"value")
					set("countries")
					dml.select(from:"sdi-wbsf", return:"value")
					c.unique("3_alpha_code")
					c.order()
					c.innerJoin(with:{{countries}}, on:<? (a,b)=> a == b["3_alpha_code"] ?>)
					c.map(<? 
					    d => ({
					        title: d.right.short_name,
					        id: d.left
					    })
					?>)
					// <== snippet "Data Selector"
				`
      },

      {
        title: "Bar Chart",
        snippet: `
					
					dml.select(
					    from:"sdi-wbsf", 
					    return:"value", 
					    where:<? d => d.value.year == "2015" ?>,
					    into:"sdi_wbsf"
					)

					dml.select(from:"sdi-ni", 
					    return:"value", 
					    where:<? d => d.value.year == "2015" ?>,
					    into:"sdi_ni"
					)

					dml.select(from:"sdi-cp",
					    return:"value", 
					    where:<? d => d.value.year == "2015" ?>,
					    into:'sdi_cp'
					)

					dml.select(from:"wdi-countries", return:"value")

					c.innerJoin(
					    with:{{sdi_wbsf}}, 
					    on:"3_alpha_code", 
					    return:<? d => {
					        let res = d.left
					        res["State Fragility"] = Number.parseFloat(Number.parseFloat(d.right.value).toFixed(3))
					        return res
					    } ?>
					)

					c.innerJoin(
					    with:{{sdi_ni}}, 
					    on:"3_alpha_code", 
					    return:<? d => {
					        let res = d.left
					        res["Prolifiration Index"] =  Number.parseFloat(Number.parseFloat(d.right.value).toFixed(3))
					        return res
					    } ?>
					)

					c.innerJoin(
					    with:{{sdi_cp}}, 
					    on:"3_alpha_code", 
					    return:<? d => {
					        let res = d.left
					        res["Corruption Perception"] =  Number.parseFloat(Number.parseFloat(d.right.value).toFixed(3))
					        return res
					    } ?>
					)

					set("data")

					<?javascript

					    $scope.res = {
					        
					        yAxis: ["State Fragility", "Prolifiration Index", "Corruption Perception"],     
					        series: $scope.data.map( d => {
					            return {
					                name: d.short_name,
					                selector: d["3_alpha_code"],
					                type:"bar",
					                data: [d['State Fragility']]
					                        .concat([d['Prolifiration Index']])
					                        .concat([d['Corruption Perception']])
					            }
					        })
					    };    

					?>

					return ("res")

				`
      },
      {
        title: "Line Chart",
        children: []
      },
      {
        title: "Scatter Chart",
        children: []
      },
      {
        title: "Radar Chart",
        children: []
      },
      {
        title: "Geo Chart",
        children: []
      }

    ]
  }

]
