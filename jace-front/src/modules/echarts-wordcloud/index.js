// module.exports = require('./src/wordCloud');
import registerWordCloud from "./src/wordCloud.js"

export default echarts => { registerWordCloud(echarts) }
