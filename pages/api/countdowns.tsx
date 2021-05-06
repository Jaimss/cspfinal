import { NextApiRequest, NextApiResponse } from "next"
import { CountdownProps } from "../../types/CountdownProps"

const fs = require('fs')

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.method)
    if (req.method == 'POST') {
        const json = JSON.stringify(req.body)
        fs.writeFile('./data.json', json, { flag: 'wx' }, () => { })
        res.status(200).end()
        return
    } else if (req.method == 'GET') {
        fs.exists('./data.json', (exists) => {
            if (!exists) {
                fs.writeFile('./data.json', [], { flag: 'wx' }, () => { })
            }
        })
        var json = json = fs.readFileSync('./data.json', 'utf8', { flag: '' })
        res.status(200).json(json)
        res.end()
        return
    }
    res.status(501).send('Not Implemented')
    res.end()
}