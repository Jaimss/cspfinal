import { CountdownProps } from "../types/CountdownProps";

export default function Countdown({ name, year, month, day }: CountdownProps): JSX.Element {
    return (
        <>
            <div className="center">
                <p className="countdownname">{name}</p>
            </div>
            <div className="center">
                <p className="countdowndate">{year}-{month}-{day}</p>
            </div>
        </>
    )
}