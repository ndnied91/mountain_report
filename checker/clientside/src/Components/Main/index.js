import React from 'react'

import {connect} from 'react-redux'
import {fetchAllMountains} from '../../actions'
import './style.css'

import Forecast from '../Forecast'
class Main extends React.Component{

  componentDidMount(){
      this.props.fetchAllMountains()
  }
  render(){



const renderMnts = () => {
  return this.props.mountains.map(( {name, trails, lifts, terrain , link, weather} , index )=>{

    return(
      <div key={index}className="indmnt" >

        <div class="card">
          <h5 class="card-header title">{name}</h5>
          <div class="card-body">
            <h5 class="card-title">Conditions</h5>

            <p class="card-text tf-info">
                <span className="trails"><span className="bold">Trails: </span> {trails} </span>
                <span className="lifts"><span className="bold">Lifts: </span> {lifts} </span>
            </p>

            {terrain > 1 ? <div> Terrain: {terrain} </div> : null}

            {weather !== null ? <Forecast weather = {weather}/>: null}


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
