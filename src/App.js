import React from 'react'
import SearchBox from './components/search-box'
import LocationBox from './components/location-box'
import WeatherBox from './components/weather-box'
import TemperatureGraph from './components/temperature-graph'

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
      pressure: undefined,
      graphdata: undefined
    };
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    if(city){
      
      Promise.all([
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`).then(val => val.json()),
        fetch(`${api.base}forecast?q=${city}&appid=${api.key}`).then(val => val.json())
      ]).then(([weatherresult, forecastresult]) => {

        this.setState({
          city: `${weatherresult.name}`,
          country: weatherresult.sys.country,
          temp: weatherresult.main.temp,
          weather: weatherresult.weather[0].main,
          main: weatherresult.weather[0].main,
          humidity: weatherresult.main.humidity,
          pressure: weatherresult.main.pressure,
          graphdata: forecastresult.list
        })

        console.log(weatherresult);
        console.log(forecastresult);
   
      }).catch((err) => {
        console.log(err);
      });
      
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
              <TemperatureGraph graphdata={this.state.graphdata}/>
            </div>
          ) : ('')}
        </main>
      </div>
    );
  }
}

export default App;
