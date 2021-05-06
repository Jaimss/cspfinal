import { CountdownProps } from '../types/CountdownProps';

import { useState } from 'react'
import { formatWithValidation } from 'next/dist/next-server/lib/utils';

import dadjoke from "@mikemcbride/dad-jokes"

export default function Display({ data }): JSX.Element {

  const [countdowns, setCountdowns] = useState<Array<CountdownProps>>(data)
  const [joke, setJoke] = useState(dadjoke.random())

  const displays = countdowns.map((countdown: CountdownProps) => {
    var now = new Date()
    const date = new Date(countdown.year, countdown.month - 1, countdown.day, countdown.hour, countdown.minute)
    var seconds = (date.getTime() - now.getTime()) / 1000
    const days = Math.floor(seconds / 86400)
    seconds = seconds % 86400
    const hours = Math.floor(seconds / 3600)
    seconds = seconds % 3600
    const minutes = Math.floor(seconds / 60)
    seconds = Math.floor(seconds % 60)
    if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
      return <p className="message" key={countdown.name}>{countdown.name} is finally here! <span className="gray">({getDateStr(date)})</span></p>
    }
    return <p className="message" key={countdown.name}>{countdown.name} is in {days}d {hours}h {minutes}m {seconds}s... <span className="gray">({getDateStr(date)})</span></p>
  })

  const [display, setDisplay] = useState<Array<any>>(displays)

  setInterval(() => {
    const displays = countdowns.map((countdown: CountdownProps) => {
      var now = new Date()
      const date = new Date(countdown.year, countdown.month - 1, countdown.day, countdown.hour, countdown.minute)
      var seconds = (date.getTime() - now.getTime()) / 1000
      const days = Math.floor(seconds / 86400)
      seconds = seconds % 86400
      const hours = Math.floor(seconds / 3600)
      seconds = seconds % 3600
      const minutes = Math.floor(seconds / 60)
      seconds = Math.floor(seconds % 60)
      if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
        return <p className="message" key={countdown.name}>{countdown.name} is finally here! <span className="gray">({getDateStr(date)})</span></p>
      }
      return <p className="message" key={countdown.name}>{countdown.name} is in {days}d {hours}h {minutes}m {seconds}s... <span className="gray">({getDateStr(date)})</span></p>
    })
    setDisplay(displays)
  }, 1000)

  return (
    <div className="page-container">
      <div className="logo-container">
        <img src="./tplogo.png" alt="logo" className="logo" />
      </div>
      <div className="message-container">
        {display.map((d) => {
          return (d)
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

function getDateStr(date) {
  return `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`
}