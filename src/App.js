import React from 'react'
import SearchBox from './components/search-box'
import LocationBox from './components/location-box'
import WeatherBox from './components/weather-box'
import TemperatureGraph from './components/temperature-graph'
import API_KEY from "./config.json";

const api = {
  key: API_KEY,
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
    e.preventDefault(); // Prevents the default event side-effect from occurring

    const city = e.target.elements.city.value // Returns a reference to the element to which the event was originally sent.

    // If city is not undefined, so loaded correctly
    if(city){
      
      // Asynchronously fetching jsons file from the API
      Promise.all([
        fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`).then(val => val.json()),
        fetch(`${api.base}forecast?q=${city}&units=metric&appid=${api.key}`).then(val => val.json())
      ]).then(([weatherresult, forecastresult]) => {

        // Changes state of App component asigning values from json file
        this.setState({
          city: `${weatherresult.name}`,
          country: weatherresult.sys.country,
          temp: weatherresult.main.temp,
          weather: weatherresult.weather[0].main,
          main: weatherresult.weather[0].main,
          humidity: weatherresult.main.humidity,
          pressure: weatherresult.main.pressure,
          graphdata: forecastresult
        })

      }).catch((err) => {
        console.log(err); // Any error cought in fetching with API is going to be displayed at console
      })
      
    } else {
      this.setState({error: true}); // If city is undefined state of error in App component is set to true
    }
    
  }

  render() {
    return (
      <div className='App'>
        <main>
          <SearchBox loadweather={this.getWeather} error={this.state.error}/>
          {/* If the state is not loaded yet or at all, nothing is displayed below searchbox */}
          {(typeof this.state.main !='undefined') ? (
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
              {/* If the data for the graph is not loaded yet or at all, nothing is displayed */}
              {(typeof this.state.graphdata !='undefined') ? (
                    <TemperatureGraph graphdata={this.state.graphdata.list}/>
                ) : ('')}
            </div>
          ) : ('')}
        </main>
      </div>
    );
  }
}

export default App;
