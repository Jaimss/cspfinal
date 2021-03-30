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
        return <Countdown key={cooldown.name} name={cooldown.name} year={cooldown.year} month={cooldown.month} day={cooldown.day} hour={cooldown.hour} minute={cooldown.minute} second={cooldown.second} />
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
          const date = (document.getElementById("date") as HTMLInputElement).value

          if (name == "" || date == "") {
            alert("Please fill out the form fields completely!")
            return
          }

          countdowns.push({
            name: name,
            year: 2020,
            day: 2020,
            month: 2002,
            minute: 3,
            hour: 3
          })
          setCountdowns(countdowns)
        }} />
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
      props: { new :Array<CountdownProps>() }
    }
  }

  return { props: { data } }
}
