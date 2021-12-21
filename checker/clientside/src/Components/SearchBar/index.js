import React from 'react'
import {connect} from 'react-redux'

import './style.css'

class SearchBar extends React.Component{
  constructor(props){
    super(props)
      this.state = { searchTerm: '' };
      this.handleChange = this.handleChange.bind(this);
  }

handleChange(event){
  this.setState({searchTerm: event.target.value});

  //get mountains and compare string
  ///return the restults and render as the selected mountains
}




  render(){

    const renderSearchResults=(value)=>{
        let arr = []

      this.props.selection.map((item)=>{

        if(item.toLowerCase().includes(value.toLowerCase())){
          arr.push(item)
        }
      })

      console.log(arr)

      //set it as the selection
    }


    renderSearchResults(this.state.searchTerm)


    return(
       <div className="inputSearch">
          <input type="search" className="searchBar form-control rounded"
              placeholder="Search Mountains" aria-label="Search"
              aria-describedby="search-addon"
              onChange={this.handleChange}/>
       </div>
     )
  }
}



const mapStateToProps = (state) => {
  return { selection: state.user.selection }
}



export default connect( mapStateToProps , {} )(SearchBar)
