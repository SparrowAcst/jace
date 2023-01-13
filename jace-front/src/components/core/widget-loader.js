import widgetTypesMap from "@/components/widgets/map.js"
import * as Cookie from "tiny-cookie"


export default () => {
  let _appConfig = JSON.parse( sessionStorage.getItem( __application_Config_Key ))
  // console.log(_appConfig)
  let wt = []
  
  _appConfig.pages.forEach( p => {
    let ht = []
    _.values(p.holders).forEach( h => {
      ht = ht.concat(h.widgets.map(w => w.type))
    })
    wt = wt.concat(ht)
  })

  _.values(_appConfig.skin.holders).forEach( h => {
      wt = wt.concat(h.widgets.map(w => w.type))
    })

  wt = _.uniq(wt)
  // console.log("Required widget types", wt)

  let _mode = Cookie.get( __application_Mode_Key ) || "production"

  if( _mode == "development") {
    let res = _.zipObject(
              _.keys(widgetTypesMap),
              _.values(widgetTypesMap).map( w => () => import(w))
    )
    // console.log(res)
    return res
  
  } else {
    let res = _.zipObject(
              wt,
              wt.map( w => () => import(widgetTypesMap[w]))
            )
    // console.log(res)
    return res  
  }  
}



