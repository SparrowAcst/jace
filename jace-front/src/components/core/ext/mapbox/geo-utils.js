import mapboxgl from "mapbox-gl"
import {flatten} from "lodash"
import {
    center, 
    bbox,
    bboxPolygon
} from "@turf/turf"


let getBboxFromSources = sources => {
    let features = flatten(sources.filter( s => s.options.type == "geojson").map(s => s.options.data.features))
    return bbox({ "type": "FeatureCollection", features })
}

let getCenterFromSources = sources => {
    let b = getBboxFromSources(sources)
    return [(b[2]+b[0])/2,(b[3]+b[1])/2]
}    

export default {
    center,
    bbox,
    getBboxFromSources,
    getCenterFromSources
}