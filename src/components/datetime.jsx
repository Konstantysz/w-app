import React from 'react';

const DateTime = props => {

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
            <div className="date">
                {dateBuilder(new Date())}
            </div>
        )
    
}

export default DateTime