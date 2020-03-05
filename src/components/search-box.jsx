import React from 'react';

const SearchBox = props => {
        return (
            <div className="search-box">
                <form onSubmit={props.loadweather}>
                    <div>{props.error ? error() : ""}</div>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Enter city name for its weather"
                        name="city"
                        autoComplete="off"
                    />
                </form>
            </div>
        )
    
}

function error() {
    console.log('Error with searchbox occured')
    return (
        <div>Error</div>
    )
}

export default SearchBox