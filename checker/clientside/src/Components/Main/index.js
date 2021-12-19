import React from 'react'

import {connect} from 'react-redux'
import {fetchAllMountains} from '../../actions'
import './style.css'

import MntProgress from '../MntProgress'


import 'react-circular-progressbar/dist/styles.css';



class Main extends React.Component{

  componentDidMount(){
      this.props.fetchAllMountains()
  }
  render(){


const getPercentage = (trails)=>{
  let arr = trails.split('/')
  console.log(arr)
  if(!(arr[0] === '0')){
    console.log(arr[0] / arr[1])
      return (arr[0] / arr[1]) * 100
  }
  return 0
}


const renderMnts = () => {
  return this.props.mountains.map(( {name, trails, lifts, terrain , link, weather} , index )=>{
    
    return(
      <div key={index}className="">

        <div className="card">
          <h5 className="card-header title">{name}</h5>
          <div className="card-body">
            <h5 className="card-title">Conditions</h5>


          <div className="allContent">

            <MntProgress trails={ getPercentage(trails) } lifts={getPercentage(lifts)} trailInfo={trails} liftInfo={lifts} weather = {weather}/>
                {terrain > 1 ? <div> Terrain: {terrain} </div> : null}
            </div>

                <a href={link} class="btn btn-primary" target="_blank"> Mountain Report</a>
          </div>
        </div>





       </div>
    )
  })
}


    return(
       <div className="content">
        {renderMnts()}

       </div>
     )
  }
}


const mapStateToProps=(state)=>{
  return { mountains: state.mountains }
}

export default connect(mapStateToProps , {fetchAllMountains})(Main)




//
// <div class="card">
//   <h5 class="card-header">Featured</h5>
//   <div class="card-body">
//     <h5 class="card-title">Special title treatment</h5>
//     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>







// <div key={index} className="indmnt">
//   <h1>{name}</h1>
//
//   <div className="tf-info">
//     <div className="trails"> Trails: {trails} </div>
//     <div className="lifts"> Lifts: {lifts} </div>
//   </div>
//
//     {terrain > 1 ? <div> Terrain: {terrain} </div> : null}
//
//     {weather !== null ? <Forecast weather = {weather}/>: null}
//
//   <a href={link} target="_blank"> Mountain Report</a>
//
//  </div>


// {weather !== null ? <Forecast weather = {weather}/>: null}
