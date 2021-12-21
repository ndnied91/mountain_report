import React from 'react'
import MntProgress from '../MntProgress'

import {connect} from 'react-redux'
import {fetchAllMountains , moutainUpdateViaSearch} from '../../actions'
import 'react-circular-progressbar/dist/styles.css';
import './style.css'


class Main extends React.Component{
  constructor(props){
    super(props)
      this.state = { searchTerm: '' };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({searchTerm: event.target.value});
  }


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






const renderMnts = () => {
  return this.props.mountains.map(( {name, trails, lifts, terrain , link, weather ,report , tickets} , index )=>{

      if(name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
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
                      <a href={link} className="btn btn-primary" target="_blank" rel="noopener noreferrer"> Visit website</a>
                      <a href={tickets} className="btn btn-danger" target="_blank" rel="noopener noreferrer"> Buy Tickets</a>
                      <a href={report} className="btn btn-success" target="_blank" rel="noopener noreferrer"> Mountain Report</a>
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


    return(
       <div>

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
  return { mountains: state.mountains , user: state.user.user }
}

export default connect(mapStateToProps , {fetchAllMountains , moutainUpdateViaSearch})(Main)
