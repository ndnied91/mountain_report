
import React from "react";
import {connect} from 'react-redux'
import { verifyUserViaCookie , fetchSelectedMountains , moutainSelections  , moutainUpdate , fetchAllMountains } from '../../actions'

import Cookies from 'js-cookie'
import MoutainSelection from './MoutainSelection'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SearchBar from '../SearchBar'
import './style.css'

class Header extends React.Component{

    async componentDidMount(){
      console.log('firing')
      if(Cookies.get('user')){
        console.log('cookie found', Cookies.get('user') )
        await this.props.verifyUserViaCookie(Cookies.get('user'))
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
    }


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
        <h1 className="mainTitle">Mountain Report</h1>
          <div className="test">
              {this.props.username !== null ?  <button className="btnn btn btn-outline-primary btn-lg" onClick={signOut}> {this.props.username} </button> : null }
              {this.props.error === null ? this.mount() : null}

                <div className="break">
                    {this.props.username !== null ? <div className="left"> <MoutainSelection/> </div> : null}
                    {this.props.username === null ? renderLogin(): null}
              </div>

                  {this.props.username !== null ? <SearchBar/>: null}
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { selection: state.user.selection ,
            user: state.user.id,error: state.user.error , username: state.user.user
 }
}

export default connect( mapStateToProps , {verifyUserViaCookie , fetchSelectedMountains , moutainSelections , moutainUpdate  , fetchAllMountains} )(Header)



// onChange={this.onInputchange}
