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
      <div key={index} className="indmnt">
        <h1>{name}</h1>
        <div> Trails: {trails} </div>
        <div> Lifts: {lifts} </div>

          {terrain > 1 ? <div> Terrain: {terrain} </div> : null}

          {weather !== null ? <Forecast weather = {weather}/>: null}

        <a href={link} target="_blank"> Mountain Report</a>

       </div>
    )
  })
}


    return(
       <div className="">
       {this.props.currentUser}
        {renderMnts()}

       </div>
     )
  }
}


const mapStateToProps=(state)=>{
  console.log(state.user.name)
  return { mountains: state.mountains , currentUser: state.user.user}
}

export default connect(mapStateToProps , {fetchAllMountains})(Main)
