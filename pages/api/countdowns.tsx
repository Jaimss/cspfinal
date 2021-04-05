import { NextApiRequest, NextApiResponse } from "next"
import { CountdownProps } from "../../types/CountdownProps"

const fs = require('fs')

export default (req: NextApiRequest, res: NextApiResponse<Array<CountdownProps>>) => {
    if (req.method == 'POST') {
        const json = JSON.stringify(req.body)
        fs.writeFile('./data.json', json, err => {
            if (err) {
            } else {
            }
        })
    } else if (req.method == 'GET') {
        fs.readFile('./data.json', 'utf8', (err, json) => {
        res.status(200).json(json)
        })
    }
}