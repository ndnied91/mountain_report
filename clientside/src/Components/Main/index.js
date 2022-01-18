import React from 'react'
import MntProgress from '../MntProgress'

import {connect} from 'react-redux'
import {fetchAllMountains  , updateMountainForce} from '../../actions'
import 'react-circular-progressbar/dist/styles.css';
import './style.css'


import { HouseFill , TicketFill , CloudyFill } from 'react-bootstrap-icons';


class Main extends React.Component{
  constructor(props){
    super(props)
      this.state = { searchTerm: ''  ,  disabled: false};
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({searchTerm: event.target.value});
  }

  handleClick = () => {
    console.log('clicked')
      this.setState({ mssg: "Hi there!" });
    };


  componentDidMount(){
      this.props.fetchAllMountains()
  }



  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.mountains !== prevProps.mountains) {
      console.log('UPDATED MOUNTAIN')
      this.setState({disabled: false})
    }
  }








  render(){
      const getPercentage = (trails)=>{
        let arr = trails.split('/')
        if(!(arr[0] === '0')){
            return (arr[0] / arr[1]) * 100
        }
          return 0
      }




const renderSearch = () =>{
  return(
  <div className="inputSearch">
     <input type="search" className="searchBar form-control rounded"
         placeholder="Search Mountains" aria-label="Search"
         aria-describedby="search-addon"
         onChange={this.handleChange}/>
  </div>
)
}



const renderTime = (timestamp) =>{

  let d = new Date(timestamp)
  let current = d.toLocaleString('en-US', { timeZone: 'America/New_York' });
  return current.replaceAll(',', '')
  this.setState({ key: Math.random() });
  return timestamp
}



const updateMnt =(name , selection)=>{
  this.props.updateMountainForce(name ,selection)
  this.setState({disabled: true})

  //set the button as disabled until state rerenders
}


const renderMnts = () => {

  if(this.props.mountains.length > 0){

  return this.props.mountains.map(( {name, trails, lifts, terrain , link, weather ,report , tickets , timestamp} , index )=>{

      if( name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ){

          return(
          <div key={index} >
            <div className="card">
            <div onClick={this.handleClick}>
              <h5 className="card-header title">{name}
              <button className={`btn btn-outline-danger floated ${this.state.disabled ? "disabled" : ""}`}
                      onClick={()=>updateMnt(name , this.props.selection)}>
                              Force Update</button>

              </h5>
            </div>

            <div className="card-body">
              <p key={this.state.key}> Last Update: {renderTime(timestamp)} </p>
                <h5 className="card-title">Conditions</h5>
                  <div className="allContent">
                      <MntProgress trails={ getPercentage(trails) } lifts={getPercentage(lifts)}
                              trailInfo = {trails}
                              liftInfo = {lifts}
                              weather = {weather}/>
                  </div>
                  <div className="links">
                      <a href={link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                      <span className="btn-text">Visit website </span>
                        <span className="btn-icon"> <HouseFill size={24}/> </span>
                      </a>
                      <a href={tickets} className="btn btn-danger" target="_blank" rel="noopener noreferrer">
                      <span className="btn-text">Buy Tickets </span>
                        <span className="btn-icon"> <TicketFill size={24}/> </span>

                      </a>
                      <a href={report} className="btn btn-success" target="_blank" rel="noopener noreferrer">
                      <span className="btn-text">Buy Tickets </span>
                        <span className="btn-icon"> <CloudyFill size={24} /> </span>
                      </a>
                </div>
              </div>
            </div>
           </div>
        )
    }
    else{
      return null
    }
  })
}
}


    return(
       <div className="top-container">

          <div>
            {this.props.user !== null ? renderSearch() : null }
          </div>

          <div className="content">
          {renderMnts()}
          </div>

       </div>
     )
  }
}


const mapStateToProps=(state)=>{
  // console.log(state)
  return { mountains: state.mountains , user: state.user.user , selection: state.selection.selection }
}

export default connect(mapStateToProps , {fetchAllMountains , updateMountainForce })(Main)


// <button className="btn btn-outline-danger floated" onClick={()=>updateMnt(name , this.props.selection)}> Force Update</button>
// <button className="btn btn-outline-danger floated" onClick={()=>this.props.updateMountainForce(name , this.props.selection)}> Force Update</button>
