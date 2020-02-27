import React from 'react';

const Weather = props => {
        return (
            <div className="weather-box">
                <div className="temp">
                    {Math.round(props.temp)}&deg;
                </div>
                <div className="weather">
                    {props.weather}
                </div>
                <div className="humidity">
                    Humidity: {props.humidity}&#37;
                </div>
                <div className="pressure">
                    Pressure: {props.pressure} hPa
                </div>
            </div>
        )
    
}

export default Weather