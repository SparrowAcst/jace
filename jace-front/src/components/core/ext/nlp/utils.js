import { isFunction, isArray, find, last, drop, findIndex, take, flatten } from "lodash"
import Diff from "@netilon/differify"
import * as se from "./sentence-extractor/index.js"
import { v4 as uuid } from 'uuid';
import tinycolor from "./tinycolor.js"


let forEachNode = (node, beforeAction, afterAction) => {
    if (beforeAction && isFunction(beforeAction)) beforeAction(node)
    if (node.childs && isArray(node.childs)) node.childs.forEach(n => {
        forEachNode(n, beforeAction, afterAction)
    })
    if (afterAction && isFunction(afterAction)) afterAction(node)
}



let findNode = (node, test) => {
    if (test(node)) return node
    if (node.childs && isArray(node.childs))
        for (let index in node.childs) {
            let res = findNode(node.childs[index], test)
            if (res) return res
        }
    return null
}

let selectNodes = (node, test, selection) => {
    selection = selection || []
    if (test(node)) selection.push(node)
    if (node.childs && isArray(node.childs))
        for (let index in node.childs) {
            selectNodes(node.childs[index], test, selection)
        }
    return selection
}

let replaceNode = (tom, id, node) => {
    let f = findNode(tom, n => n.id == id)
    if (!f) return
    let parent = getParent(f, tom)
    let index = findIndex(parent.childs, node => node.id == f.id)
    let childs = parent.childs.splice(index, 1, node)
}

let replaceNodeByContent = (tom, node) => {
    let f = findNode(tom, n => n.value == node.value)
    if (!f) return
    let parent = getParent(f, tom)
    let index = findIndex(parent.childs, node => node.id == f.id)
    let childs = parent.childs.splice(index, 1, node)
}

let getParent = (node, root) => {
    // return findNode(root, n => n.childs && find(n.childs, item => diff.compare(item, node).status == "EQUAL"))
    return findNode(root, n => n.childs && find(n.childs, item => item.id == node.id))
    


    // if(root){
    // return findNode(root, n => n.childs && find(n.childs, item => diff.compare(item, node).status == "EQUAL"))
    // } else {
    //   return node._tom_parent
    // }

} //item => item.id == node.id))

let getSiblings = (node, root) => {
    let parent = getParent(node, root)
    return (parent) ? parent.childs : []
}

let getStyle = (element, property) => {
    return window.getComputedStyle ?
        window.getComputedStyle(element, null).getPropertyValue(property) :
        element.style[property.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); })];
}



//--------------------------------- diff -----------------------------------------------


let diff = new Diff({ mode: { object: "DIFF", array: "DIFF" } })

let originalBranchName = "original"
let currentBranchName = "current"


let tom2Plain = node => {

    let syntaxNode = ["word", "text", "paragraph", "sentence", "subSentence", "number", "whitespace", "punctuation"]
    let versionNode = ["DIFF", "BRANCH"]

    forEachNode(node, n => {
        n.concept = (syntaxNode.includes(n.type)) ? "SYNTAX" : (versionNode.includes(n.type)) ? "VERSION" : "SEMANTIC"
    })


    let res = []
    let i = 0;
    forEachNode(node, n => {
        if (n.childs) {
            res.push({ action: "START", concept: n.concept, type: n.type, value: n.value, name: n.name })
        } else {
            res.push({ action: "TERMINAL", concept: n.concept, type: n.type, value: n.value, terminalIndex: i++ })
        }
    }, n => {
        if (n.childs) {
            res.push({ action: "STOP", concept: n.concept, type: n.type, name: n.name })
        }
    })
    return res
}

let plain2Tom = (data, parentStack) => {

    if (data.length == 0) return

    parentStack = parentStack || []

    let node = data[0]

    if (node.terminalIndex) {
        delete node.terminalIndex
    }

    let parent = last(parentStack)

    switch (node.action) {

        case "START":
            node.childs = []
            parentStack.push(node)
            if (parent) {
                parent.childs.push(node)
            }
            plain2Tom(drop(data), parentStack)
            break

        case "TERMINAL":
            if (parent) {
                parent.childs.push(node)
            }
            plain2Tom(drop(data), parentStack)
            break

        case "STOP":
            parentStack.pop()
            plain2Tom(drop(data), parentStack)
            break

    }

    // markParents(node)
    return node
}


let isAnnotationOpened = branch => {
    let c = 0
    branch.forEach((item, index) => {
        if (item.action == "START" && item.concept == "SEMANTIC") {
            c++
            return
        }
        if (item.action == "STOP" && item.concept == "SEMANTIC") {
            c--
            return
        }
    })
    return c > 0
}

let takeSegment = (fragment, stopped) => {
    let i = findIndex(fragment.source, stopped)
    let slice = take(fragment.source, i + 1)
    fragment.source = drop(fragment.source, slice.length)
    fragment.branch = fragment.branch.concat(slice)
    return fragment
}

let segmentBranches = (original, current) => {

    if (isAnnotationOpened(original.branch)) {
        original = takeSegment(original, item => item.action == "STOP" && item.concept == "SEMANTIC")
        current = takeSegment(current, item => diff.compare(original.branch[original.branch.length - 2], item).status == "EQUAL")
        let res = segmentBranches(current, original)
        return {
            current: res.original,
            original: res.current
        }
    }

    if (isAnnotationOpened(current.branch)) {
        let res = segmentBranches(current, original)
        return {
            current: res.original,
            original: res.current
        }
    }


    if (original.branch[0].concept == "SEMANTIC" && current.branch[0].concept == "SEMANTIC") {

        if (diff.compare(original.source[0], current.source[0]).status == "EQUAL" &&
            !isAnnotationOpened(original.branch) &&
            !isAnnotationOpened(current.branch)
        ) {

            return {
                current,
                original
            }

        }


        if (original.branch.length > current.branch.length) {
            let suffix = takeSegment(current, item => diff.compare(original.branch[original.branch.length - 2], item).status == "EQUAL")

            let res = segmentBranches(original, suffix)
            return {
                current: res.current,
                original: res.original
            }

        }

        if (original.branch.length < current.branch.length) {
            let res = segmentBranches(current, original)
            return {
                current: res.original,
                original: res.current
            }
        }

    }


    return {
        original,
        current
    }

}

let diffSequence = data => [{ action: "START", type: "DIFF" }, { action: "START", type: "BRANCH", name: originalBranchName }]
    .concat(data.original.branch)
    .concat([{ action: "STOP", type: "BRANCH", name: originalBranchName }, { action: "START", type: "BRANCH", name: currentBranchName }])
    .concat(data.current.branch)
    .concat([{ action: "STOP", type: "BRANCH", name: currentBranchName }, { action: "STOP", type: "DIFF" }])



let getDifferenceTom = (d1, d2) => {
    originalBranchName = d1.branch || "original"
    currentBranchName = d2.branch || "current"


    let l1 = tom2Plain(d1)
    let l2 = tom2Plain(d2)

    let res = []
    let c = true
    for (; l2.length > 0 && l1.length > 0 && c;) {


        if (l1[0].concept == "SYNTAX" && diff.compare(l1[0], l2[0]).status == "EQUAL") {
            res.push(l1[0])
            l1 = drop(l1)
            l2 = drop(l2)
            continue
        }

        if (
            (l1[0].concept == "SYNTAX" && l2[0].concept == "SEMANTIC") ||
            (l2[0].concept == "SYNTAX" && l1[0].concept == "SEMANTIC")
        ) {

            let b1 = [l1[0]]
            let b2 = [l2[0]]
            let tres = segmentBranches({
                source: drop(l1),
                branch: b1
            }, {
                source: drop(l2),
                branch: b2
            })
            l1 = tres.original.source
            l2 = tres.current.source

            res = res.concat(diffSequence(tres))
            continue
        }

        if (l1[0].concept == "SEMANTIC" && l2[0].concept == "SEMANTIC") {
            let f1 = takeSegment({ source: l1, branch: [] }, item => item.action == "STOP" && item.concept == "SEMANTIC")
            let f2 = takeSegment({ source: l2, branch: [] }, item => item.action == "STOP" && item.concept == "SEMANTIC")

            if (diff.compare(f1.branch, f2.branch).status == "EQUAL") {
                res = res.concat(f1.branch)
                l1 = drop(l1, f1.branch.length)
                l2 = drop(l2, f1.branch.length)
            } else {

                let tres = segmentBranches(f1, f2)

                l1 = tres.original.source
                l2 = tres.current.source

                res = res.concat(diffSequence(tres))

            }
            continue
        }



    }

    return plain2Tom(res)
}

let EQUAL_STARTEGY = (src, dest) => null

let OVERRIDE_STRATEGY = (src, dest) => src.childs

let UNION_STRATEGY = (src, dest) => {
    if (src.childs.length == 1 &&
        src.childs[0].concept == "SEMANTIC" &&
        dest.childs.length == src.childs[0].childs.length &&
        !find(dest.childs, n => n.concept == "SEMANTIC")
    ) return src.childs

    if (dest.childs.length == 1 &&
        dest.childs[0].concept == "SEMANTIC" &&
        src.childs.length == dest.childs[0].childs.length &&
        !find(src.childs, n => n.concept == "SEMANTIC")
    ) return dest.childs

    return null

}



let mergeDiff = (diff, strategy) => {
    // diff must be DIFF node
    let destination = diff.childs[0]
    let source = diff.childs[1]
    strategy = strategy || EQUAL_STARTEGY
    // strategy returns array of TOM nodes
    return strategy(source, destination)
}

let mergeTom = (tom, strategy) => {
    forEachNode(tom, node => {
        if (node.type == "DIFF") {
            let merged = mergeDiff(node, strategy)
            if (merged) {
                let parent = getParent(node, tom)
                parent.childs.splice(
                    findIndex(parent.childs, n => diff.compare(node, n).status == "EQUAL"),
                    1,
                    merged
                )

                parent.childs = flatten(parent.childs)
            }
        }
    })
    return tom
}

let resolveStrategies = {
    EQUAL: EQUAL_STARTEGY,
    OVERRIDE: OVERRIDE_STRATEGY,
    UNION: UNION_STRATEGY
}

let tokenize = se.tokenize

let extractSentences = text => se.extractSentences(text)
    .then(res => {
        // console.log("TOM", res)
        forEachNode(res, node => {
            node.concept = "SYNTAX"
        })
        return res
    })


let markParents = (node, parent) => {
    // console.log("!!!",node, parent)
    node._tom_parent = parent
    if (node.childs && isArray(node.childs)) node.childs.forEach(n => {
        markParents(n, node)
    })
}


// let createAnnotation = (tom, annotation) => {
//       annotation.text = tom.value.substring(annotation.pos[0],annotation.pos[1]+1)
//       if(!annotation.text) return tom
//       let selection = findNode(tom, node => node.value == annotation.text)
//       if(!selection) return tom
//       let parent = getParent(selection, tom)
//       let index = findIndex(parent.childs, node => node.id == selection.id)
//       let childs = parent.childs.splice(index,1)


//       let newAnnotation = {
//         type: annotation.type,
//         childs,
//         id: uuid(),
//         concept:"SEMANTIC",
//         value: childs.map(node => node.value).join(""),
//         pos:[childs[0].pos[0],childs[childs.length-1].pos[1]] 
//       }

//       parent.childs.splice(index, 0, newAnnotation)
//       // markParents(tom)
//       return tom
// }


let includes = (outer, inner) => outer[0] <= inner[0] && inner[1] <= outer[1]

let nestedIn = (tom, node, nesting) => {
  let p = getParent(node,tom)
  if(!p) return false
  return nesting.includes(p.type)  
}  

let createAnnotation = (tom, annotation) => {
    let selection = selectNodes(tom, node => includes(annotation.pos, node.pos) && nestedIn(tom,node,annotation.nestedIn))
    
    if (selection.length == 0) return

    let parent = getParent(selection[0], tom)
    let start = findIndex(parent.childs, node => node.id == selection[0].id)
    let stop = findIndex(parent.childs, node => node.id == selection[selection.length - 1].id)
    let childs = parent.childs.splice(start, stop - start + 1)


    let newAnnotation = {
        id: uuid(),
        type: annotation.type,
        childs,
        concept: "SEMANTIC",
        pos: [childs[0].pos[0], childs[childs.length - 1].pos[1]],
        value: childs.map(node => node.value).join("")
    }

    parent.childs.splice(start, 0, newAnnotation)


}



let buildTom = opts => extractSentences(opts.text)
    .then(tom => {
        // console.log(JSON.stringify(tom, null," "))
        if (opts.entities) {
            opts.entities.forEach(e => {
                createAnnotation(tom, e)
            })
        }

        // markParents(tom)

        return tom
    })


let buildText = root => {
    let entities = selectNodes(root, node => node.concept == "SEMANTIC")
    return {
        id: root.id,
        node: root.type,
        concept: root.concept,
        text: root.value,
        entities: entities.map(e => ({
            type: e.type,
            pos: [e.pos[0] - root.pos[0], e.pos[1] - root.pos[0]]
        }))
    }
}


export {

    forEachNode,
    findNode,
    replaceNode,
    replaceNodeByContent,
    selectNodes,
    getParent,
    getSiblings,
    getStyle,
    getDifferenceTom,
    plain2Tom,
    tom2Plain,
    mergeTom,
    EQUAL_STARTEGY,
    OVERRIDE_STRATEGY,
    UNION_STRATEGY,
    resolveStrategies,
    tokenize,
    extractSentences,
    buildTom,
    buildText,
    tinycolor

}