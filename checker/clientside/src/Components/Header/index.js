
import React from "react";
import {connect} from 'react-redux'
import { verifyUserViaCookie , fetchSelectedMountains , moutainSelections  , moutainUpdate , fetchAllMountains } from '../../actions'

import Cookies from 'js-cookie'
import MoutainSelection from './MoutainSelection'
import SignIn from './SignIn'
import SignUp from './SignUp'

import './style.css'
class Header extends React.Component{

    async componentDidMount(){
      if(Cookies.get('user')){
        console.log('cookie found', Cookies.get('user') )
        await this.props.verifyUserViaCookie(Cookies.get('user'))

      }
      else{
        console.log('cookie not set')
      }

    }

    mount(){
        if(this.props.selection.length > 1){
             this.props.moutainUpdate(this.props.selection)
             this.props.fetchSelectedMountains(this.props.selection, this.props.user)
        }
    }



  render(){

    const signOut= ()=>{
       Cookies.remove('user')
       this.props.fetchAllMountains() //gets all moutains
       this.props.verifyUserViaCookie(null) //resets all values

       // make a call to get the moutains and render component
    }

    const renderSignOutBtn = () =>{
      console.log(this.props.username)
      return(
          <button className="btnn" onClick={signOut}> Sign Out </button>
      )
    }


      const renderLogin = () =>{
        return(
          <div>
            <SignIn title={'Sign In'}/>
            <SignUp title={'Sign Up'}/>
          </div>
        )
      }


  return(
      <div>
        <h1>Mountain Report</h1>

          <div className="test">

            <span className="username">{this.props.username}</span>
              { this.props.username !== null ?  <button className="btnn" onClick={signOut}> Sign Out </button> : null }

              <MoutainSelection/>

              {this.props.error === null ? this.mount() : null}
              {this.props.username === null ? renderLogin(): null}

          </div>
      </div>
    )
  }
}

//
const mapStateToProps = (state) => {
  return { selection: state.user.selection , user: state.user.id   , error: state.user.error , username: state.user.user }
}

export default connect( mapStateToProps , {verifyUserViaCookie , fetchSelectedMountains , moutainSelections , moutainUpdate  , fetchAllMountains} )(Header)

// {this.mount()}
