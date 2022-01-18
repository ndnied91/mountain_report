
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
      this.state = { searchTerm: '' ,  open: false  , notShow: true  };
      this.onInputchange = this.onInputchange.bind(this);

      this.handleNavCollapse = () => {
                if(this.state.notShow === true){ this.setState({notShow : false}) }
                else{ this.setState({notShow : true}) }
      }

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
          // <div>
          //     <div className="box">
          //         <div className="left"> <MoutainSelection/> </div>
          //         <div className="buttonUpdate">
          //
          //           <div ref={(ref) => this._div = ref} > {/* this is for dropdown, DONT TOUCH  */}
          //               <div ref={node => this.node = node}> {/* this is for dropdown, DONT TOUCH  */}
          //
          //               <button className="navbar-toggler"  style={{float: 'right' }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          //                 <span onClick ={ ()=> this.handleNavCollapse() } className="navbar-toggler-icon"></span>
          //               </button>
          //
          //                 <nav className="navbar navbar-expand-lg navbar-light bannerGround" >
          //                     <div className={`${this.state.notShow ? 'collapse ' : null} navbar-collapse `} >
          //                         <div className="push"><SignUp title={'Sign Up'}/></div>
          //                         <div className="push"><SignIn title={'Sign In'}/></div>
          //                     </div>
          //                 </nav>
          //             </div>
          //          </div>
          //
          //         </div>
          //     </div>
          // </div>
          <div ref={node => this.node = node}> {/* this is for dropdown, DONT TOUCH  */}

                 <nav className="navbar navbar-expand-lg navbar-light bannerGround" >


                    <div className="left"> <MoutainSelection/> </div>

                       <button className="navbar-toggler"  style={{float: 'right' }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                         <span onClick ={ ()=> this.handleNavCollapse() } className="navbar-toggler-icon"></span>
                       </button>

                       <div className={`${this.state.notShow ? 'collapse ' : null} navbar-collapse `} >

                      <div style= {{width: '100%' , height: '40px' }}>

                        <ul className="navbar-nav mt-0 mt-lg-0 collapseStyling" >
                          <li className="nav-item"> <div className="push"><SignUp title={'Sign Up'}/></div> </li>
                          <li className="nav-item"> <div className="push"><SignIn title={'Sign In'}/></div> </li>
                        </ul>

                       </div>
                     </div>
                   </nav>

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
