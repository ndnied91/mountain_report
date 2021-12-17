
import React from "react";
import {connect} from 'react-redux'
import { verifyUserViaCookie , fetchSelectedMountains , moutainSelections  , moutainUpdate } from '../../actions'

import Cookies from 'js-cookie'
import MoutainSelection from './MoutainSelection'
import SignIn from './SignIn'
import SignUp from './SignUp'


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
  if(this.props.selection !== null && this.props.selection.length > 1){
       this.props.moutainUpdate(this.props.selection)
       this.props.fetchSelectedMountains(this.props.selection, this.props.user)

       //just for updating the selection
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
        <h2>Mountains</h2>

        <div>
          {this.props.username !== null ? this.props.username : null}
        </div>

          <div>
              <MoutainSelection/>
                {renderLogin()}
                {this.mount()}
          </div>
      </div>
    )
  }
}

//
const mapStateToProps = (state) => {
  // console.log(state)
  return { selection: state.user.selection , user: state.user.id , username: state.user.name }
}

export default connect( mapStateToProps , {verifyUserViaCookie , fetchSelectedMountains , moutainSelections , moutainUpdate} )(Header)


// {Cookies.get('username')  === undefined ? renderLogin(): null }

// {this.props.selection.user}
