import React from "react";
import classnames from "classnames";

export default class Day extends React.Component{
    render(){
        const { day, weekday, active, quincena, today } = this.props.day;

        return <div className={classnames("day", {
            "weekend": (weekday > 5),
                "active" : active,
            "quincena fire shake-slow shake-constant": quincena,
            "today": today
        }
        )}>
            <span className="quincena-text fire">{day}</span>

            { today && <div className="you-are-here" alt="you are here">  </div>}
        </div>;
    }
}

