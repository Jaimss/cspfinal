import { CountdownProps } from '../types/CountdownProps';

import { useState } from 'react'

export default function Display({data}): JSX.Element {

    const [countdowns, setCountdowns] = useState<Array<CountdownProps>>(data)

    return(
        <div className="page-container">
            <div className="logo-container">
                <img src="./tplogo.png" alt="logo" className="logo" />
            </div>
            <div className="display-container">
                {countdowns.map((countdown: CountdownProps) => {
                    const now = new Date()
                    const date = new Date(countdown.year, countdown.month, countdown.day, countdown.hour, countdown.minute)
                    return <p key={countdown.name}>{countdown.name} is in {date - now}</p>
                })}
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
  const url = `http://localhost:3000/api/countdowns`
  const res: Response = await fetch(url)
  const data: Array<CountdownProps> = await res.json()

  if (!data) {
    return {
      props: { new: Array<CountdownProps>() }
    }
  }

  return { props: { data } }
}