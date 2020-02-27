import React from 'react'
import SearchBox from './components/search-box'
import LocationBox from './components/location-box'
import WeatherBox from './components/weather-box'

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
      main: undefined,
      humidity: undefined,
      pressure: undefined
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
          main: result.weather[0].main,
          humidity: result.main.humidity,
          pressure: result.main.pressure
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
            <div className="content-box">
              <LocationBox 
                city={this.state.city} 
                country={this.state.country}
              />
              <WeatherBox 
                temp={this.state.temp} 
                weather={this.state.weather}
                humidity={this.state.humidity}
                pressure={this.state.pressure}
              />
            </div>
          ) : ('')}
        </main>
      </div>
    );
  }
}

export default App;
