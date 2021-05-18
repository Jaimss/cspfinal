import { NextApiRequest, NextApiResponse } from "next"
import { CountdownProps } from "../../types/CountdownProps"

const fs = require('fs')

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log("Incoming Request: ", req.method)
    if (req.method == 'POST') {
        const json = JSON.stringify(req.body)
        fs.writeFileSync('./data.json', json, () => { })
        res.status(200).end()
        return
    } else if (req.method == 'GET') {
        fs.exists('./data.json', (exists) => {
            if (!exists) {
                fs.writeFileSync('./data.json', [], { flag: 'wx' }, () => { })
            }
        })
        var json = fs.readFileSync('./data.json', 'utf8')
        res.status(200).json(json)
        res.end()
        return
    }
    res.status(501).send('Not Implemented')
    res.end()
}