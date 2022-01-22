import React from "react";

import './style.css'


// Import react-circular-progressbar module and styles
import {
  CircularProgressbarWithChildren
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";


import Forecast from '../Forecast'

const percentage = 66;


const MntProgress = (props) => {


  const renderCurrentTemp=()=>{
        let current = props.weather[0].current
        let url = props.weather[0].current.imageUrl

    return(
          <div >
              <div className="weather-area">
                <img src={url} alt={'Weather'}/>
                <span  className="current-temp">{current.temperature}° </span>
                <p className="feelslike-temp">Feels Like {current.feelslike}°</p  >
              </div>

          </div>
        )
}





return(
  <div>
      <div style={{ marginBottom: 0 }} className="mntsConds">
           <hr style={{ border: "2px solid #ddd" }} />
              <div style={{ marginTop: 0 }}>
                  <span style={{ display: "flex"}}  className="mntsConds">

                  <AnimatedProgressProvider
                  valueStart={0}
                  valueEnd={props.trails}
                  duration={0.5}
                  easingFunction={easeQuadInOut}>


                  {value => {
                    const roundedValue = Math.round(value);
                    return (
                            <CircularProgressbarWithChildren
                              value={value}
                              text={`${roundedValue}%` }
                              label={'Trails'}
                              styles={{
                                root: { transform: 'scale(0.6) translateX(-10%)' },
                                path: {
                                  stroke: `rgba(62, 152, 199, ${percentage / 100})`,
                                  strokeLinecap: 'butt',
                                  transition: 'stroke 0.5s ease 0s'
                                },
                                trail: {
                                  stroke: '#d6d6d6',
                                  strokeLinecap: 'butt',
                                  transform: 'rotate(0.25turn)',
                                  transformOrigin: 'center center'
                                },
                                text: {
                                  textColor: 'black',
                                      fill: 'black',
                                      fontSize: '18px',
                                      transform: 'translateY(-4px)',
                                      margin: '-40px'
                                },
                                background: { fill: '#3e98c7' }
                              }}
                            >

                                <div className="trail_info">
                                      <p style={{textAlign: 'center' , margin: "0" , fontWeight: "bold"}}>{'Trails'}</p>
                                      <p style={{textAlign: 'center' }}>{props.trailInfo}</p>
                                </div>

                          </CircularProgressbarWithChildren>
                    );
                  }}



                  </AnimatedProgressProvider>

                  <div >
                    <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={props.lifts}
                    duration={1.4}
                    easingFunction={easeQuadInOut}>

                    {value => {
                      const roundedValue = Math.round(value);
                      return (
                            <CircularProgressbarWithChildren
                              value={value}
                              text={`${roundedValue}%` }
                              styles={{
                                root: { transform: 'scale(0.6) translateX(-50%)' },
                                path: {
                                  stroke: `rgba(62, 152, 199, ${percentage / 100})`,
                                  strokeLinecap: 'butt',
                                  transition: 'stroke 0.5s ease 0s'
                                },
                                trail: {
                                  stroke: '#d6d6d6',
                                  strokeLinecap: 'butt',
                                  transform: 'rotate(0.25turn)',
                                  transformOrigin: 'center center'
                                },
                                text: {
                                  textColor: 'black',
                                      fill: 'black',
                                      fontSize: '18px',
                                      transform: 'translateY(-4px)'
                                },
                                background: { fill: '#3e98c7' }
                              }}
                            >
                            <div className="lift_info">
                                <p style={{textAlign: 'center', margin: "0" ,  fontWeight: "bold"}}>{'Lifts'}</p>
                                <p style={{textAlign: 'center' }}>{props.liftInfo}</p>
                            </div>
                          </CircularProgressbarWithChildren>
                    );
                  }}
                  </AnimatedProgressProvider>
                  </div>


                  <div className="current-feelslike">
                  {props.weather !== null ? renderCurrentTemp() : null}
                  </div>
                </span>


          </div>
      </div>

      {props.weather !== null ? <Forecast weather = {props.weather}/>: null}
  </div>
  )
}


export default MntProgress


// <div className="infoClick" onClick={()=>alert('CLICKED')}/>
