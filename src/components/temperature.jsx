import React from 'react';

const Temperature = props => {
        return (
            <div className="temp">
                {Math.round(props.temp)}&deg;
            </div>
        )
    
}

export default Temperature