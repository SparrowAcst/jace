module.exports = {
    init: async () => {
        const jaceMark = require("jace-mark")

        const mdToHtml = async (req, res) => {
            try {
                const md = req.body.md
                const result = await jaceMark.render(md, {})
                res.send(result)

            } catch (e) {
                console.log("Error while transform md to html", e)
                res.status(503).send(e)
            }
        }


        const router = require('express').Router()

        router.post("/", mdToHtml)


        return router
    }
}