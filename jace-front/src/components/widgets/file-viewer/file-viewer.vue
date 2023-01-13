<template>
    <div id="webviewer" ref="viewer"></div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import isString from "lodash"

import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";

<<< 
if (jace.mode == "development") { 
>>>

    import configDialog from "./file-viewer-config.vue";

<<<
} 
>>>



import moment from "moment"

export default {

    name: "file-viewer-widget",

    icon: "mdi-file-document-box-outline",

    mixins: [djvueMixin, listenerMixin],

    props: ["config"],

    data: () => ({
        options: null,
        instance: null
    }),

    watch: {
        options: {
            handler(newValue, oldValue) {
                if (newValue && newValue.url && this.instance) {
                  // if(oldValue && oldValue.url != newValue.url)
                    this.instance.loadDocument(newValue.url)
                }
            },
            deep: true
        }
    },

    methods: {

        // onValidate(data,options){
        //   if( isString(data) ) {
        //       try {
        //         data = JSON.parse(data)
        //         return data
        //       } catch (e) {
        //         return { error: e.toString() }
        //       }
        //     }
        //   return data  
        // },


        onUpdate({ data }) {
            console.log("onUpdate", data)
            if (!data) {
                this.options = null
                return
            }
            // console.log("data", data)
            // this.opts = this.normalizeOptions(data)
            this.options = null
            this.$nextTick(() => {
              this.options = data  
            })
        },


        <<<
        if (jace.mode == "development") { 
        >>>

            onReconfigure(widgetConfig) {
                    return this.$dialogManager.showAndWait(configDialog, { width: "90%" }, { config: widgetConfig })
                },

        <<<
        } >>>



    },

    created() {
        this.options = this.config.data.embedded || null
        console.log("created", this.options)
    },

    async mounted() {
        const path = `modules/webviewer`
        this.instance = await WebViewer({
            path,
            // initialDoc: newValue.url, // replace with your own PDF file
        }, this.$refs.viewer)

        this.$emit("init")

    },
}
</script>