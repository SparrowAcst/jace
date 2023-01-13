import { keys } from 'lodash';
import t from './raw_tokenizer_uk';
import parse from './parser';
import grammar from './grammar';
import { v4 as uuid } from 'uuid';

const emptyTom = {
    "id": uuid(),
    "type": "text",
    "childs": [],
    "value": "",
    "concept": "SYNTAX"
}


const res = sample => {

    if (!sample) return new Promise(resolve => {
        resolve(emptyTom)
    })

    sample = sample
        .replace(/(\r\n)+/gm,"\n")
        .split(/\n/gm)
        .filter(l => l)
        //.map(l => l.trim().replace(/\ {2,}/gm, " "))
        // .filter(l => l)
        .join("\n")
        // .replace(/\s{2,}/gm, " ")
// console.log(sample)   

    let createStructure = tokens => {

        let text, p, s, ss

        let start = 0

        let rules = {

            startOfText: item => {
                text = {
                    id: uuid(),
                    type: "text",
                    childs: [],
                    pos: [start]
                }
            },

            startOfParagraph: item => {
                p = {
                    id: uuid(),
                    type: "paragraph",
                    childs: [],
                    pos: [start]
                }
            },

            startOfSentence: item => {
                s = {
                    id: uuid(),
                    type: "sentence",
                    childs: [],
                    pos: [start]
                }
                p.childs.push(s)
            },

            startOfSubSentence: item => {
                ss = {
                    id: uuid(),
                    type: "subSentence",
                    childs: [],
                    pos: [start]
                }
                s.childs.push(ss)
            },

            word: item => {

                ss.childs.push({
                    id: uuid(),
                    type: "word",
                    value: item.value,
                    pos: [start, start + item.value.length - 1]
                })

                start += item.value.length

            },

            number: item => {
                ss.childs.push({
                    id: uuid(),
                    type: "number",
                    value: item.value,
                    pos: [start, start + item.value.length - 1]
                })

                start += item.value.length

            },

            date: item => {
                ss.childs.push({
                    id: uuid(),
                    type: "date",
                    value: item.value,
                    pos: [start, start + item.value.length - 1]
                })

                start += item.value.length

            },

            time: item => {
                ss.childs.push({
                    id: uuid(),
                    type: "time",
                    value: item.value,
                    pos: [start, start + item.value.length - 1]
                })

                start += item.value.length

            },

            endOfSubSentence: item => {
                ss.value = ss.childs.map(item => item.value).join("")
                ss.pos.push(ss.pos[0] + ss.value.length - 1)
                start = 0
                if (ss.value.trim() == "") {
                    s.childs.splice(s.childs.length - 1, 1)
                    s.childs = s.childs.concat(ss.childs)
                }
            },

            endOfSentence: item => {
                s.value = s.childs.map(item => item.value).join("")
                s.pos.push(s.pos[0] + s.value.length - 1)

            },

            endOfParagraph: item => {
                p.value = p.childs.map(item => item.value).join("")
                text.childs.push(p)
                p.pos.push(p.pos[0] + p.value.length - 1)

            },

            endOfText: item => {
                text.value = text.childs.map(item => item.value).join("")
                text.pos.push(text.pos[0] + text.value.length - 1)

            },

            whitespace: item => {
                if (item.labels.indexOf("punctuation") >= 0) {
                    s.childs.push({
                        id: uuid(),
                        type: "punctuation",
                        value: item.value,
                        pos: [start, start + item.value.length - 1]
                    })
                    start += item.value.length
                } else {
                    ss.childs.push({
                        id: uuid(),
                        type: "whitespace",
                        value: item.value,
                        pos: [start, start + item.value.length - 1]
                    })
                    start += item.value.length
                }
            }

        }


        tokens.forEach(token => {
            keys(rules).forEach(r => {
                if (token.labels.indexOf(r) >= 0) {
                    rules[r](token)
                }
            })
        })

        return text
    }





    let tokens = t(sample)

    if (tokens.length == 0) {
        return new Promise(resolve => {
            resolve(emptyTom)
        })
    } else {
        return parse(tokens, grammar.tokens)
            .then(tokens => {
                return parse(tokens, grammar.sentences)
            })
            .then(tokens => {
                return createStructure(tokens)
            })
    }


}

export default res