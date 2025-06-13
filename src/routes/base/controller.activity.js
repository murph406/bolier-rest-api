import APIResponse from "../../../src/response/success.js"
import path from 'path'

function welcome(req, res, next) {
    const data = {}
    data.message = 'Hello World'
    console.log("data", data)

    res.send(new APIResponse({ data }))
}

function root(req, res, next) {
    res.sendFile(path.resolve('public', 'index.html'))
}

export {
    welcome,
    root

}

