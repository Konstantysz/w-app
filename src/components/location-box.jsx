import React from 'react';

const LocationBox = props => {

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday", "Sunday"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()]
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className="location-box">
            <div className="location">
                   {props.city}, {props.country}
            </div>
            <div className="date">
                {dateBuilder(new Date())}
            </div>
        </div>
    )
    
}

export default LocationBox