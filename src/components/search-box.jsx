import React from 'react';

const SearchBox = props => {
        return (
            <div className="search-box">
                <form onSubmit={props.loadweather}>
                    <div>{props.error ? error() : ""}</div>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="City"
                        name="city"
                        autoComplete="off"
                    />
                </form>
            </div>
        )
    
}

function error() {
    return (
        <div>Error Kurwa</div>
    );
}

export default SearchBox