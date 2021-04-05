import Countdown from '../components/countdown';
import { CountdownProps } from '../types/CountdownProps';
import { useState } from 'react'

export default function Home({ data }): JSX.Element {

  const [countdowns, setCountdowns] = useState<Array<CountdownProps>>(data)

  return (
    <div className="page-container">
      <div className="center">
        <h3 className="nameheader">Countdown Name</h3>
      </div>
      <div className="center">
        <h3 className="dateheader">Expiration Date</h3>
      </div>
      {countdowns.map((cooldown: CountdownProps) => {
        return <Countdown key={cooldown.name} name={cooldown.name} year={cooldown.year} month={cooldown.month} day={cooldown.day} hour={cooldown.hour} minute={cooldown.minute} />
      })}

      <div className="center">
        <input type="text" name="name" id="name" />
      </div>
      <div className="center">
        <input type="datetime-local" name="date" id="date" />
      </div>
      <div className="center submit-container">
        <input type="submit" value="Submit" id="submit" onClick={() => {

          console.log("clicked")

          const name = (document.getElementById("name") as HTMLInputElement).value
          const dateStr = (document.getElementById("date") as HTMLInputElement).value

          if (name == "" || dateStr == "") {
            alert("Please fill out the form fields completely!")
            return
          }

          console.log(dateStr)
          const date = new Date(dateStr)

          var min;
          if (date.getMinutes() == 0) {
            min = "00"
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
        }} />
      </div>

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
