
import React from "react";
import {connect} from 'react-redux'
import { verifyUserViaCookie , fetchSelectedMountains , moutainSelections  , moutainUpdate } from '../../actions'

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


   renderUser(){
      if(this.props.username !== null){
        return <div className="userName"> {this.props.username}  </div>
      }
      return null
    }


mount(){
  if(this.props.selection !== null && this.props.selection.length > 1){
       this.props.moutainUpdate(this.props.selection)
       this.props.fetchSelectedMountains(this.props.selection, this.props.user)

       //just for updating the selection
       if(this.props.null !==null){
         this.renderUser()
       }
  }
}



  render(){
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
              <MoutainSelection/>

                {this.mount()}

          </div>
      </div>
    )
  }
}

//
const mapStateToProps = (state) => {
  return { selection: state.user.selection , user: state.user.id , username: state.user.user }
}

export default connect( mapStateToProps , {verifyUserViaCookie , fetchSelectedMountains , moutainSelections , moutainUpdate} )(Header)
