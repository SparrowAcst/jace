export default {
	
	"Markdown":{
      
        type:"md-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-language-markdown-outline",
        options: { widget:{
            visible: true
          }
        },
        data:{
          source:"embedded",
          embedded:`
#MARKDOWN TIPS
---

### HEADER

    # Header1
    ## Header2
    ### Header3
    #### Header4
    ##### Header5
    ###### Header6
    H1
    ===
    H2
    ---

# Header1
## Header2
### Header3
#### Header4
##### Header5
###### Header6
H1
===
H2
---

### EMPHASIS

    *Italic1* _Italic2_
    **Bold1** __Bold2__
    ***Bold_Italic***
    ~~Strikethrough~~
    
*Italic1* _Italic2_ </br>
**Bold1** __Bold2__ </br>
***Bold_Italic*** </br>
~~Strikethrough~~

### HORIZONTAL LINE

    ---
    ***
    ___

---
***
___

### LIST

    unordered list:
    
    * item-1
      * sub-item-1
      * sub-item-2
    - item-2
      - sub-item-3
      - sub-item-4
    + item-3
      + sub-item-5
      + sub-item-6
    
    

unordered list:

* item-1
  * sub-item-1
  * sub-item-2
- item-2
  - sub-item-3
  - sub-item-4
+ item-3
  + sub-item-5
  + sub-item-6


### TABLE

\`\`\`
Table Header-1 | Table Header-2 | Table Header-3
:--- | :---: | ---:
Table Data-1 | Table Data-2 | Table Data-3
TD-4 | Td-5 | TD-6
Table Data-7 | Table Data-8 | Table Data-9
\`\`\`

Table Header-1 | Table Header-2 | Table Header-3
:--- | :---: | ---:
Table Data-1 | Table Data-2 | Table Data-3
TD-4 | Td-5 | TD-6
Table Data-7 | Table Data-8 | Table Data-9

### LINK

    https://github.com/MinhasKamal/github-markdown-syntax
    [GitHub](https://github.com/MinhasKamal/github-markdown-syntax)
    [click](https://github.com/MinhasKamal/github-markdown-syntax "GitHub Markdown Syntax")
    [README](/README.md)
    [Image](#image)

https://github.com/MinhasKamal/github-markdown-syntax    
[GitHub](https://github.com/MinhasKamal/github-markdown-syntax)    
[click](https://github.com/MinhasKamal/github-markdown-syntax "GitHub Markdown Syntax")    
[README](/README.md)    
[Image](#image)

`
        }
       
    }
}