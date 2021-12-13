import React from 'react'

import {connect} from 'react-redux'
import {fetchAllMountains} from '../../actions'
import './style.css'

class Main extends React.Component{

  componentDidMount(){
      this.props.fetchAllMountains()
  }
  render(){




const renderMnts = () => {
  return this.props.mountains.map(( {name, trails, lifts, terrain , link} , index )=>{
    return(
      <div key={index} className="indmnt">
        <h1>{name}</h1>
        <div> Trails: {trails} </div>
        <div> Lifts: {lifts} </div>

        {terrain > 1 ? <div> Terrain: {terrain} </div> : null}

        <a href={link}>Weather</a>

       </div>
    )
  })
}


    return(
       <div className="">
        {renderMnts()}
       </div>
     )
  }
}


const mapStateToProps=(state)=>{

  return { mountains: state.mountains}
}

export default connect(mapStateToProps , {fetchAllMountains})(Main)



// <Report item="hi"/>
