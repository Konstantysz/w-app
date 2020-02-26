import React from 'react';

const Location = props => {
        return (
            <div className="location">
                {props.city}, {props.country}
            </div>
        )
    
}

export default Location