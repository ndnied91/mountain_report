import React from 'react'
import MntProgress from '../MntProgress'
import {connect} from 'react-redux'
import {fetchAllMountains} from '../../actions'
import 'react-circular-progressbar/dist/styles.css';
import './style.css'


class Main extends React.Component{

  componentDidMount(){
      this.props.fetchAllMountains()
  }
  render(){


const getPercentage = (trails)=>{
  let arr = trails.split('/')
  if(!(arr[0] === '0')){
      return (arr[0] / arr[1]) * 100
  }
  return 0
}


const renderMnts = () => {
  return this.props.mountains.map(( {name, trails, lifts, terrain , link, weather ,report , tickets} , index )=>{

    return(
      <div key={index} >
        <div className="card">
          <h5 className="card-header title">{name}</h5>
          <div className="card-body">
            <h5 className="card-title">Conditions</h5>

              <div className="allContent">
              <MntProgress trails={ getPercentage(trails) } lifts={getPercentage(lifts)} trailInfo={trails} liftInfo={lifts} weather = {weather}/>
                  {terrain > 1 ? <div> Terrain: {terrain} </div> : null}
              </div>
              <div className="links">
                  <a href={link} className="btn btn-primary" target="_blank"> Visit website</a>
                  <a href={tickets} className="btn btn-danger" target="_blank"> Buy Tickets</a>
                  <a href={report} className="btn btn-success" target="_blank"> Mountain Report</a>
            </div>
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
