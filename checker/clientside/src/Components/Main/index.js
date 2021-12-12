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

    return(
       <div className="container">
        <Report item="hi"/>
       </div>
     )
  }
}


const mapStateToProps=(state)=>{
  console.log(state)
  return {}
}

export default connect(mapStateToProps , {fetchAllMountains})(Main)
