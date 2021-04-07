import { CountdownProps } from "../types/CountdownProps";

export default function Countdown({ name, year, month, day, hour, minute, onClick}): JSX.Element {
    return (
        <>
            <div className="center">
                <button id="delete" onClick={onClick}>Delete</button>
                <p className="countdownname">{name}</p>
            </div>
            <div className="center">
                <p className="countdowndate">{month}/{day}/{year} {hour}:{minute}</p>
            </div>
        </>
    )
}