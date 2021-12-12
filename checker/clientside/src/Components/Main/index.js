import React from 'react'

import Report from '../Report'

import {connect} from 'react-redux'
import {fetchAllMountains} from '../../actions'
import './style.css'

class Main extends React.Component{

  componentDidMount(){
      this.props.fetchAllMountains()
  }
  render(){

const renderMnts = () => {
  return this.props.mountains.map((item)=>{
    return(
      <div>

        <h1>{item.name}</h1>
        <div> Trails: {item.trails} </div>
        <div> Lifts: {item.lifts} </div>

       </div>
    )
  })
}


    return(
       <div className="container">
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
