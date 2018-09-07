import React from 'react';
import Countdown from 'react-countdown-now';

import Day from './Day';
import fetchData from './fetchData';

import './styles.css';

const countDownRenderer = ({ days, hours, minutes, seconds }) => {
  return (
    <React.Fragment>
      {' '}
      {days} dias {hours} horas {minutes} minutos {seconds} segundos
    </React.Fragment>
  );
};

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeHolders: [],
      drawMonths: [],
      isToday: false,
      next: Date.now(),
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    setInterval(this.fetchData, 60000);
    this.fetchData();
  }

  fetchData() {
    fetchData().then(({ placeHolders, drawMonths, json }) => {
      this.setState({
        placeHolders: placeHolders,
        drawMonths: drawMonths,
        isToday: json.is_today,
        sillyImage: json.payday_image,
        next: Date.parse(json.next),
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="yes-no">
          {this.state.isToday ? (
            <span>SI!</span>
          ) : (
            <div>
              <h1>No!</h1>
            </div>
          )}
        </div>

        <div className="calendar-grid-container">
          <div className="calendar">
            <div className="calendar-title">L</div>
            <div className="calendar-title">M</div>
            <div className="calendar-title">M</div>
            <div className="calendar-title">J</div>
            <div className="calendar-title">V</div>
            <div className="calendar-title">S</div>
            <div className="calendar-title">D</div>
            {this.state.placeHolders}
            {Object.values(this.state.drawMonths).map(dom => {
              return <Day key={dom.day} day={dom} sillyImage={this.state.sillyImage} />;
            })}
          </div>
        </div>

        {!this.state.isToday && (
          <div className="countdown-text">
            faltan
            <Countdown date={this.state.next} renderer={countDownRenderer} />
          </div>
        )}
      </React.Fragment>
    );
  }
}
