


import React from "react";
import Cookies from 'js-cookie'
import {connect} from 'react-redux'


import {  fetchAllMountains , verifyUserViaCookie , resetSelection } from '../../actions'


import './LoginBtn.css'

class LoginBtn extends React.Component{
  constructor(props){
    super(props)
      this.state = {  open: false };

      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
  }


  handleButtonClick = (e) => {
    this.state.open ? this.setState({ open : false}) : this.setState({ open : true})
   }




    container = React.createRef();


        handleClickOutside = (event) => {
          if (
            this.container.current &&
            !this.container.current.contains(event.target)
          ) {
            this.setState({
              open: false,
            });
          }
        };



     componentWillUnmount() {
          document.removeEventListener("mousedown", this.handleClickOutside);
        }



    async componentDidMount(){
      document.addEventListener("mousedown", this.handleClickOutside);
    }






  render(){

    const signOut= ()=>{
       Cookies.remove('user')
       this.props.fetchAllMountains() //gets all moutains
       this.props.verifyUserViaCookie(null) //resets all values
       this.props.resetSelection()

       this.setState({open: false})

       // make a call to get the moutains and render component
    }



      return(
                <div className="btnContainer" ref={this.container}>
                <div className="btnContainer">
                        <button type="button" className="signOutBtn" onClick={(e)=>this.handleButtonClick(e)}>
                        {this.props.username !== null ?  <div className="btnn btn btn-outline-primary btn-lg" > {this.props.username} </div> : null }
                        </button>


                        {this.props.user !== null && this.state.open && (
                            <div className="dropdown">
                            <ul> <li >Setting</li> </ul>
                            <ul> <li onClick={signOut}>Log out</li> </ul>
                            </div>
                        )}
                </div>
            </div>


        )
  }
}

const mapStateToProps = (state) => {
  return { username: state.user.user }
}

export default connect( mapStateToProps , {fetchAllMountains , verifyUserViaCookie , resetSelection} )(LoginBtn)
