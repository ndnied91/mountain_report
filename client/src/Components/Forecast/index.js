import React from 'react'

import './style.css'

class Forecast extends React.Component{
  render(){

    let forecast = this.props.weather[0].forecast

    const renderForecast= ()=>{
        return forecast.map((item, i) => {

          let url = `http://blob.weather.microsoft.com/static/weather4/en-us/law/${item.skycodeday}.gif`
          return(
            <div key={i} className="forecast-day">

            <div className="date-day">
            <p>{item.shortday} </p>
            <p>{item.date.replace('2021-', '').replace('2022-', '').replace('-', '/')} </p>

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
          <div className="flex">
            {renderForecast()}
      </div>
      )
  }
}


export default Forecast
