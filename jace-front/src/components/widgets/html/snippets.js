export default {
	
	"default":{
      
        type:"html-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-language-html5",
        options: { widget:{
            visible: true
          }
        },
        data:{
          source:"embedded",
          embedded:`<h2 color="#eee"><center>not configured<center></h2><p>Use options dialog for configure this widget</p>`
        }
       
    },

    "title":{
      type:"html-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-language-html5",
        options: { widget:{
            visible: true
          }
        },
        data:{
          source:"embedded",
          embedded:`<h1>DJApp {{app.name}}.Page title</h1>`
        }
       
    },

    "paragraph":{
      type:"html-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-language-html5",
        options: { widget:{
            visible: true
          }
        },
        data:{
          source:"embedded",
          embedded:`<p>
          Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, 
          dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, 
          sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. 
          Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. 
          Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. 
          Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.
          </p>`
        }
    },

    "banner":{
      type:"html-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-language-html5",
        options: { widget:{
            visible: true
          }
        },
        data:{
          source:"embedded",
          embedded:`<div style="
        height:150px; 
        background:url(./img/content_banner_turqoise.png) no-repeat"
>
    <div style="    color: white;
    padding: 10px 0 0 300px;
    font-size: 48px;
    font-weight: bold;">
        DJVUE
    </div>
    <div style="    color: white;
    padding: 0 0 0 350px;
    margin-top:-10px;
    font-size: small;
    ">
        <i>Build your SPA online</i>
    </div>
    
</div>`
        }
    },

    "Theme Features":{
      
        type:"html-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-language-html5",
        options: { widget:{
            visible: true
          }
        },
        data:{
          source:"embedded",
          embedded:`
          <h2 class="accent--text">
    <center>
        Theme features
    </center>
</h2>
<h4 class="primary--text">Background colors usage:</h4>
<pre style="padding:0 0 0 3em">
&lt;div class="[background color class]"&gt;...&lt;/div&gt;    
</pre>

<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="primary">
    <center>primary</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="secondary">
    <center>secondary</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="accent">
    <center>accent</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="info">
    <center>info</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="error">
    <center>error</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="warning">
    <center>warning</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="success">
    <center>success</center>
</div>

<h4 class="primary--text">Text colors usage:</h4>
<pre style="padding:0 0 0 3em">
&lt;div class="[text color class]"&gt;...&lt;/div&gt;    
</pre>

<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="primary--text">
    <center>primary--text</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="secondary--text">
    <center>secondary--text</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="accent--text">
    <center>accent--text</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="info--text">
    <center>info--text</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="error--text">
    <center>error--text</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="warning--text">
    <center>warning--text</center>
</div>
<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="success--text">
    <center>success--text</center>
</div>

<h4 class="primary--text">White text usage:</h4>
<pre style="padding:0 0 0 3em">
&lt;div class="[background color class] white--text"&gt;...&lt;/div&gt;    
</pre>


<div 
    style="width:30%; margin:0.25em; border-radius:0.25em;" 
    class="primary white--text">
    <center>white--text</center>
</div>

<h4 class="primary--text">Font size classes:</h4>
<div class="pa-5 mb-3 v-card v-card--flat theme--dark teal"><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.display-4</code></div><div class="flex display-4">Light 112sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.display-3</code></div><div class="flex display-3">Regular 56sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.display-2</code></div><div class="flex display-2">Regular 45sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.display-1</code></div><div class="flex display-1">Regular 34sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.headline</code></div><div class="flex headline">Regular 24sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.title</code></div><div class="flex title">Medium 20sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.subheading</code></div><div class="flex subheading">Regular 16sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.body-2</code></div><div class="flex body-2">Medium 14sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.body-1</code></div><div class="flex body-1">Regular 14sp</div></div><div class="layout mb-3 align-center justify-start"><div class="mr-3" style="min-width: 85px;"><code>.caption</code></div><div class="flex caption">Regular 12sp</div></div></div>

<h4 class="primary--text">Font weight classes:</h4>
<div class="pa-5 v-card v-card--flat theme--light"><div class="mb-3"><div class="font-weight-thin my-2 display-2">Roboto Thin</div><kbd>.font-weight-thin</kbd></div><div class="mb-3"><div class="font-weight-light my-2 display-2">Roboto Light</div><kbd>.font-weight-light</kbd></div><div class="mb-3"><div class="font-weight-regular my-2 display-2">Roboto Regular</div><kbd>.font-weight-regular</kbd></div><div class="mb-3"><div class="font-weight-medium my-2 display-2">Roboto Medium</div><kbd>.font-weight-medium</kbd></div><div class="mb-3"><div class="font-weight-bold my-2 display-2">Roboto Bold</div><kbd>.font-weight-bold</kbd></div><div class="mb-3"><div class="font-weight-black my-2 display-2">Roboto Black</div><kbd>.font-weight-black</kbd></div><div class="mb-3"><div class="font-weight-thin my-2 display-2 font-italic">Roboto Thin Italic</div><kbd>.font-weight-thin.font-italic</kbd></div><div class="mb-3"><div class="font-weight-light my-2 display-2 font-italic">Roboto Light Italic</div><kbd>.font-weight-light.font-italic</kbd></div><div class="mb-3"><div class="font-weight-regular my-2 display-2 font-italic">Roboto Regular Italic</div><kbd>.font-weight-regular.font-italic</kbd></div><div class="mb-3"><div class="font-weight-medium my-2 display-2 font-italic">Roboto Medium Italic</div><kbd>.font-weight-medium.font-italic</kbd></div><div class="mb-3"><div class="font-weight-bold my-2 display-2 font-italic">Roboto Bold Italic</div><kbd>.font-weight-bold.font-italic</kbd></div><div class="mb-3"><div class="font-weight-black my-2 display-2 font-italic">Roboto Black Italic</div><kbd>.font-weight-black.font-italic</kbd></div></div>

<h4 class="primary--text">Text-transforms:</h4>
<div class="pa-5 hidden-sm-and-down v-card v-card--flat theme--light"><div class="layout my-3 align-center justify-space-between wrap"><div class="flex display-3">Quantum Mechanics</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Regular</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex d-flex align-start display-4 font-weight-thin">6.626069x10<sup class="display-2 font-weight-light mt-4">-34</sup></div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Thin</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex display-1 font-italic font-weight-bold">One hundred percent cotton bond</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Bold italic</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex display-4 font-weight-bold">Quasiparticles</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Bold</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex title">It became the non-relativistic limit of quantum field theory</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Condensed</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex display-4 font-weight-light font-italic">PAPERCRAFT</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Light italic</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex title font-italic font-weight-medium">Probabilistic wave - particle wavefunction orbital path</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Medium italic</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex display-4 font-weight-black">ENTANGLED</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Black</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex display-1 font-weight-medium">Cardstock 80lb ultra-bright orange</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Medium</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex display-4 font-weight-thin">STATIONERY</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Thin</div></div><div class="layout my-3 align-center justify-space-between wrap"><div class="flex display-2 font-weight-light">POSITION, MOMENTUM &amp; SPIN</div><div class="flex hidden-md-and-down text-xs-right text-uppercase grey--text">Condensed Light</div></div></div>
          `
        }
       
    },

}