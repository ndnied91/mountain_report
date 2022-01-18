
import React from "react";
import {connect} from 'react-redux'
import { verifyUserViaCookie , fetchSelectedMountains , moutainSelections  , moutainUpdate   } from '../../actions'

import Cookies from 'js-cookie'
import MoutainSelection from './MoutainSelection'
import SignIn from './SignIn'
import SignUp from './SignUp'

import LoginBtn from './LoginBtn'

import './style.css'
class Header extends React.Component{
  constructor(props){
    super(props)
      this.state = { searchTerm: '' ,  open: false };
      this.onInputchange = this.onInputchange.bind(this);

  }



  onInputchange(event) {
   this.setState({ searchTerm: event.target.value });
 }



    async componentDidMount(){


      if(Cookies.get('user')){
        console.log('cookie found', Cookies.get('user') )
        await this.props.verifyUserViaCookie(Cookies.get('user'))
      }
      else{
        console.log('cookie not set, clearing selection')
      }

    }

    mount(){
        if(this.props.selection.length > 1){
             this.props.moutainUpdate(this.props.selection)
             this.props.fetchSelectedMountains(this.props.selection, this.props.user)
        }
    }



  render(){

      const renderLogin = () =>{
        return(
          <div>
              <div className="box">
                  <div className="left"> <MoutainSelection/> </div>
                  <div className="push"><SignUp title={'Sign Up'}/></div>
                  <div className="push"><SignIn title={'Sign In'}/></div>
              </div>
          </div>


        )
      }



  return(

      <div>
        <h1 className="mainTitle">Resort Report</h1>
          <div className="test">
              {this.props.error === null && this.state.open === false ? this.mount() : null}

                <div className="break">
                {this.props.username !== null ? <div className="left"> <MoutainSelection/> </div> : null}
                {this.props.username === null ? renderLogin(): null}

                <LoginBtn/>
              </div>

          </div>


      </div>
    )
  }
}

//
const mapStateToProps = (state) => {
  console.log(state)
  return {
        selection: state.user.selection , user: state.user.id , error: state.user.error , username: state.user.user
 }
}

export default connect( mapStateToProps , {verifyUserViaCookie , fetchSelectedMountains , moutainSelections , moutainUpdate   } )(Header)
