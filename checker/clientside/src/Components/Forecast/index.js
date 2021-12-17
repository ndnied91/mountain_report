import React from 'react'

import './style.css'

class Forecast extends React.Component{
  render(){


    let current = this.props.weather[0].current
    let forecast = this.props.weather[0].forecast

    const renderCurrentTemp=()=>{
      return(
            <div>
              <p>Current Temp: {current.temperature}</p>
              <p>Feels like: {current.feelslike}</p>
            </div>
          )
    }

    const renderForecast= ()=>{
        return forecast.map((item, i) => {

          let url = `http://blob.weather.microsoft.com/static/weather4/en-us/law/${item.skycodeday}.gif`
          return(
            <div key={i} className="forecast-day">
            <div>
              {item.shortday} {item.date.replace('2021-', '').replace('2022-', '').replace('-', '/')}
              </div>
                <img src={url} alt={'Weather'}/>
                <div>
                  <span className="high"> {item.high}° </span>
                  <span className="low">{item.low}° </span>

                </div>

             </div>
           )
        });
    }




    return(
      <div>
          {renderCurrentTemp()}
          <div className="flex">
            {renderForecast()}
          </div>
      </div>
      )
  }
}


export default Forecast
