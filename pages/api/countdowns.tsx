import { NextApiRequest, NextApiResponse } from "next"
import { CountdownProps } from "../../types/CountdownProps"

export default (req: NextApiRequest, res: NextApiResponse<Array<CountdownProps>>) => {
    if (req.method == 'POST') {
        res.status(200)
    } else if (req.method == 'GET') {
        res.status(200).json([{
            name: "This is the countdown.",
            year: 2020,
            month: 12,
            day: 31,
            hour: 12,
            minute: 0,
        }])
    }
}