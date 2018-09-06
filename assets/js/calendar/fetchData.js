import React from 'react';

const fetchData = () => {
  return fetch('api')
    .then(response => response.json())
    .then(json => {
      const placeHolders = [];
      const drawMonths = {};

      for (let i = 0; i < json.month_dates[0].weekday - 1; i++) {
        placeHolders.push(<div key={`placeholder-${i}`} />);
      }

      json.month_dates.forEach(date => {
        drawMonths[date.day] = Object.assign(date, {
          quincena: false,
          active: false,
          today: false,
        });
      });

      json.dates_until.forEach(date => {
        drawMonths[date.day].active = true;
      });

      drawMonths[json.next_day].quincena = true;

      drawMonths[json.today_day].today = true;

      return { placeHolders, drawMonths, json };
    });
};

export default fetchData;
