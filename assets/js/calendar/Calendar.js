import React from "react";
import Countdown from 'react-countdown-now';


import Day from './Day';


import styles from "./styles.css";


const countDownRenderer = ({ days, hours, minutes, seconds  }) => {
    return <span> {days} dias {hours} horas {minutes} minutos {seconds} segundos </span>;
};

export default class Calendar extends React.Component{


    constructor(props){
        super(props);

        const fetchData = () => {
            fetch('api').then(response => response.json()).then(json => {
                const placeHolders = [];
                const drawMonths = {};

                console.log(json);

                for (let i = 0; i < json.month_dates[0].weekday - 1; i++) {
                    placeHolders.push(<div key={`placeholder-${i}`} />);
                }

                json.month_dates.forEach(date => {
                    drawMonths[date.day] = Object.assign(date, { quincena: false, active: false, today: false });
                });

                json.dates_until.forEach(date => {
                    drawMonths[date.day].active = true;
                });

                drawMonths[json.next_day].quincena = true;

                drawMonths[json.today_day].today = true;

                this.setState({
                    placeHolders: placeHolders,
                    drawMonths: drawMonths,
                    isToday: json.is_today,
                    next: Date.parse(json.next)
                });

            })
        };

        fetchData();
        setInterval(fetchData, 60000);

        this.state = {
            placeHolders: [],
            drawMonths: [],
            isToday: false,
            next: Date.now()
        };
    }

    render(){
        return <div>

            <div className="yes-no">{this.state.isToday ? <span>SI!</span> : <div>
                <h1>No!</h1>
            </div> }</div>

            <div className="calendar">
                <div className="calendar-title">L</div>
                <div className="calendar-title">M</div>
                <div className="calendar-title">M</div>
                <div className="calendar-title">J</div>
                <div className="calendar-title">V</div>
                <div className="calendar-title">S</div>
                <div className="calendar-title">D</div>
                {this.state.placeHolders}
                {Object.values(this.state.drawMonths).map((dom) => { return <Day key={dom.day} day={dom}/>;}) }
            </div>

            {!this.state.isToday && <div className="countdown-text">faltan
                <Countdown date={this.state.next} renderer={countDownRenderer} />
            </div>}
        </div>;
    }
}