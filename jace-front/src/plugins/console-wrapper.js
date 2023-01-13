import {isArray, keys, isObject, isFunction, isNull, isUndefined} from "lodash"
import StackTrace from "stacktrace-js/dist/stacktrace-with-promises-and-json-polyfills.js"

class ConsoleWrapper{
    
    constructor(){
    }

    wrap( methodMap ){
        methodMap = methodMap || {}
        keys(methodMap).forEach( k => {
            this._fixMethod(k,methodMap[k])
        })
    }

    _fixMethod(name, callback) {
        if(console[name]){
            console['$' + name] = console[name];
            if( name != "trace") {
                console[name] = (...a) => {
                    try {
                        let output = a.reduce((output, arg) => 
                          ((isFunction(arg)) ? "f ": "") 
                          + (typeof arg === "object" && (JSON || {}).stringify 
                                ? JSON.stringify(arg,null," ") 
                                : (isNull(arg))
                                    ? "null"
                                    : (isUndefined(arg))
                                        ? "undefined"
                                        : (arg.toString) 
                                            ? arg.toString() 
                                            : arg
                            ), ''
                        )

                        if(callback) {
                            callback(output)
                        }    

                        console['$' + name].apply(undefined, a);
                    
                    } catch (e) {
                        console.error( e.toString())
                        console.trace()
                    }        
                }
            } else {
                console[name] = () => {
                    StackTrace.get()
                        .then( stackframes => {
                            console.log(stackframes.map(sf =>sf.toString()).join('\n'));
                        })
                        .catch(e => {
                            console.error(e.toString())
                        })
                }        
            }
        }
        
    }

    unwrap(){
        keys(console).filter(k => k.startsWith("$")).forEach( k => {
            k = k.substring(1)
            console.log("unwrap ", k)
            console[k] = console["$"+k]
        })
    }
}

export default new ConsoleWrapper()
