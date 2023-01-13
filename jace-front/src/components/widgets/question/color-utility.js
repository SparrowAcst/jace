import tinycolor from "./tinycolor.js"
import { isUndefined } from "lodash"


let ColorUtility = class {
  constructor() {}


  _getColor(scale, value, palette, theme, invert) {

    let c;
    let p = (palette.color) ? JSON.parse(JSON.stringify(palette.color)) : [];

    if( palette.isReverse) p.reverse()
    

    if (scale.length == 0 || p.length == 0 || value == null || isUndefined(value)) {
      c = tinycolor("#dedede").toHexString() //tinycolor(theme.themes.light.secondary).lighten(30).toHexString()
    } else {
      let index = Math.round((value - 1) * (p.length-1) / (scale.length-1))
      index = (index == p.length) ? index-1 : index	
      c = p[index]
      // console.log(value, index, c)

    }


    
    c = tinycolor(c);
    if (invert) {
      if (c.isLight()) {
        c = c.darken(50)
      } else {
        c = c.lighten(50)
      }
      c.spin(180);
    }

    return c.toRgbString()

  }

  background(scale, value, palette, theme) {
    return this._getColor(scale, value, palette, theme, false);
  }


  border(scale, value, palette, theme) {
    return tinycolor(this.background(scale, value, palette, theme)).darken(50).toRgbString()
  }

  color(scale, value, palette, theme) {
    return this._getColor(scale, value, palette, theme, true)
  }

}


export default new ColorUtility()
