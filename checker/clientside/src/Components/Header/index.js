
import React from "react";
import {connect} from 'react-redux'
import { verifyUserViaCookie , fetchSelectedMountains } from '../../actions'

import Cookies from 'js-cookie'
import MoutainSelection from './MoutainSelection'
import SignIn from './SignIn'
import SignUp from './SignUp'


class Header extends React.Component{

    componentDidMount(){
        this.props.verifyUserViaCookie(Cookies.get('username'))
        //if cookie is set, get the specific moutains
    }



  render(){

    this.props.fetchSelectedMountains(this.props.userSelect) //CHANGE FROM USER PREF

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
        <h2>Mountains</h2>


        <div>

            <MoutainSelection/>

              {renderLogin()}


        </div>

      </div>
    )
  }
}

//
const mapStateToProps = (state) => {
  console.log(state.user.selection)
  return { userSelect: state.user.selection }
}

export default connect( mapStateToProps , {verifyUserViaCookie , fetchSelectedMountains} )(Header)


// {Cookies.get('username')  === undefined ? renderLogin(): null }
