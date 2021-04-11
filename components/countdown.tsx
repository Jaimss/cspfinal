import ReactTooltip from 'react-tooltip';

export default function Countdown({ name, year, month, day, hour, minute, onClick }): JSX.Element {
    return (
        <>
            <p data-tip="Click to Delete!" className="countdown-name" onClick={onClick}>{name}</p>
            <p className="countdown-date">{month}/{day}/{year} {hour}:{minute}</p>
            <ReactTooltip />
        </>
    )
}