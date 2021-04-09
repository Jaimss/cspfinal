import ReactTooltip from 'react-tooltip';

export default function Countdown({ name, year, month, day, hour, minute, onClick}): JSX.Element {
    return (
        <>
            <div className="center">
                <ReactTooltip />
                <p data-tip="Click to Delete!" className="nameRow countdownname" onClick={onClick}>{name}</p>
            </div>
            <div className="center">
                <p className="dateRow countdowndate">{month}/{day}/{year} {hour}:{minute}</p>
            </div>
        </>
    )
}