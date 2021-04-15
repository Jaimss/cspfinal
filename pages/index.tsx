import Countdown from '../components/countdown';
import { CountdownProps } from '../types/CountdownProps';
import dadjoke from "@mikemcbride/dad-jokes"

import { useState } from 'react'

export default function Home({ data }): JSX.Element {

  const [countdowns, setCountdowns] = useState<Array<CountdownProps>>(data)
  const [joke, setJoke] = useState(dadjoke.random())

  return (
    <div className="page-container">
      <div id="theme-switcher" onClick={() => {
        // code to switch theme here
        const root = document.getElementsByTagName('html')[0]
        const theme = root.getAttribute("class")
        if (theme == "light") {
          root.setAttribute("class", "dark")
        } else {
          root.setAttribute("class", "light")
        }
        setJoke(dadjoke.random())
      }}>Switch Theme</div>
      {/*event name & date header*/}
      <h3 className="name-header">Event Name</h3>
      <h3 className="date-header">Event Date (24 HR)</h3>
      {countdowns.map((countdown: CountdownProps) => {
        return <Countdown key={countdown.name} name={countdown.name} year={countdown.year} month={countdown.month} day={countdown.day} hour={countdown.hour} minute={countdown.minute} onClick={() => {
          countdowns.splice(countdowns.indexOf(countdown), 1)
          setCountdowns([...countdowns])
          sendCountdownAPI([...countdowns])
          setJoke(dadjoke.random())
        }} />
      })}

      <input type="text" name="name" id="name" />
      <input type="datetime-local" name="date" id="date" />
      <input type="submit" value="Submit" id="submit" onClick={() => {
        const name = (document.getElementById("name") as HTMLInputElement).value
        const dateStr = (document.getElementById("date") as HTMLInputElement).value

        if (name == "" || dateStr == "") {
          alert("Please fill out the form fields completely!")
          return
        }

        if (countdowns.some((item) => item.name === name)) {
          alert("Please use a different Name!")
          return
        }

        const date = new Date(dateStr)

        var min;
        if (date.getMinutes() == 0) {
          min = "00"
        } else if (date.getMinutes() >= 1 && date.getMinutes() <= 9) {
          min = "0" + date.getMinutes().toString()
        } else {
          min = date.getMinutes()
        }

        const countdownTemp = {
          name: name,
          year: date.getFullYear(),
          day: date.getDate(),
          month: date.getMonth() + 1,
          minute: min,
          hour: date.getHours()
        }
        countdowns.push(countdownTemp)
        sendCountdownAPI([...countdowns])
        setCountdowns([...countdowns])
        setJoke(dadjoke.random())
      }} />
      <p className="dadjoke">{joke}</p>
    </div>
  )
}

export async function sendCountdownAPI(countdown: Array<CountdownProps>) {
  const url = `http://localhost:3000/api/countdowns`
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(countdown));
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
