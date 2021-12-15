import React from 'react'



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
            <div key={i}>
              Low:{item.low}
              High:{item.high}
              {item.shortday}
              Date:{item.date.replace('2021-', '').replace('2022-', '').replace('-', '/')}

            <img src={url} alt={'Weather'}/>
             </div>
           )
        });
    }




    return(
      <div>
          {renderCurrentTemp()}
          {renderForecast()}
      </div>
      )
  }
}


export default Forecast
