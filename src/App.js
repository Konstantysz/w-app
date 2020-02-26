import React from 'react';
import SearchBox from './components/search-box.jsx'
import Location from './components/location.jsx'
import DateTime from './components/datetime.jsx'
import Temperature from './components/temperature'
import Weather from './components/weather'

const api = {
  key: "208785914316c48739fa81461e32198d",
  base: "https://api.openweathermap.org/data/2.5/"
}

class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      temp: undefined,
      weather: undefined,
      error: false,
      main: undefined
    };
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    if(city){
      const api_call = await fetch(
        `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
        );
        
      const result = await api_call.json();
          
      this.setState({
          city: `${result.name}`,
          country: result.sys.country,
          temp: result.main.temp,
          weather: result.weather[0].main,
          main: result.weather[0].main
        })

        console.log(result);
    } else {
      this.setState({error: true});
    }
    
  }

  render() {
    return (
      <div className='App'>
        <main>
          <SearchBox loadweather={this.getWeather} error={this.state.error}/>
          {(typeof this.state.main !="undefined") ? (
            <div>
              <div className="location-box">
                <Location 
                  city={this.state.city} 
                  country={this.state.country}
                />
                <DateTime/>
              </div>
              <div className="weather-box">
                <Temperature temp={this.state.temp}/>
                <Weather weather={this.state.weather}/>
              </div>
            </div>
          ) : ('')}
        </main>
      </div>
    );
  }
}

export default App;
