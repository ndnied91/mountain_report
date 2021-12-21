//
// import React from "react";
// import {connect} from 'react-redux'
// import { verifyUserViaCookie , fetchSelectedMountains , moutainSelections   , fetchAllMountains   , resetSelection} from '../../actions'
//
// import Cookies from 'js-cookie'
// import MoutainSelection from './MoutainSelection'
// import SignIn from './SignIn'
// import SignUp from './SignUp'
// import './style.css'
//
// class Header extends React.Component{
//   constructor(props){
//     super(props)
//       this.state = { searchTerm: '' , open: false };
//       this.handleButtonClick = this.handleButtonClick.bind(this);
//       this.handleClickOutside = this.handleClickOutside.bind(this);
//
//
//   }
//
//   handleButtonClick = (e) => {
//     e.stopPropagation()
//      this.setState((state) => { return { open: !state.open }; });
//    }
//
//
//    container = React.createRef();
//    state = {  open: false };
//
//
//
//    handleClickOutside = (event) => {
//      if (
//        this.container.current &&
//        !this.container.current.contains(event.target)
//      ) {
//        this.setState({
//          open: false,
//        });
//      }
//    };
//
//
//
//    // componentWillUnmount() {
//    //   document.removeEventListener("mousedown", this.handleClickOutside);
//    // }
//
//
//     async componentDidMount(){
//       // document.addEventListener("mousedown", this.handleClickOutside);
//       // this.props.resetSelection() //this resets the list
//       console.log('firing')
//       if(Cookies.get('user')){
//         console.log('cookie found', Cookies.get('user') )
//         await this.props.verifyUserViaCookie(Cookies.get('user'))
//       }
//     }
//
//     // mount(){
//     //     if(this.props.selection.length > 1){
//     //       console.log('called when clicked on sign in ')
//     //       console.log(this.props.selection)
//     //          // this.props.moutainUpdate(this.props.selection)
//     //          // this.props.fetchSelectedMountains(this.props.selection, this.props.user)
//     //     }
//     // }
//
//
//
//   render(){
//
//     const signOut= ()=>{
//        Cookies.remove('user')
//        this.props.fetchAllMountains() //gets all moutains
//        this.props.verifyUserViaCookie(null) //resets all values
//        this.props.resetSelection() //this resets the list
//     }
//
//
//
//       const renderLogin = () =>{
//         return(
//           <div>
//               <div className="box">
//                   <div className="left"> <MoutainSelection/> </div>
//                   <div className="push"><SignUp title={'Sign Up'}/></div>
//                   <div className="push"><SignIn title={'Sign In'}/></div>
//               </div>
//           </div>
//
//
//         )
//       }
//
//
//
//   return(
//       <div>
//         <h1 className="mainTitle">Mountain Report</h1>
//           <div className="">
//                 <div className="btnContainer" ref={this.container}>
//
//                   <div className="btnContainer">
//
//                     <button type="button" className="signOutBtn" onClick={(e)=>this.handleButtonClick(e)}>
//                       {this.props.username !== null ?  <div className="btnn btn btn-outline-primary btn-lg" > {this.props.username} </div> : null }
//
//                     </button>
//
//
//                     {this.props.user !== null && this.state.open && (
//                       <div className="dropdown">
//                         <ul> <li>Setting</li> </ul>
//                         <ul> <li onClick={signOut}>Log out</li> </ul>
//                       </div>
//                     )}
//
//                   </div>
//                 </div>
//
//
//                 <div className="break">
//
//                     {this.props.username === null ? renderLogin(): null}
//               </div>
//           </div>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   return { selection: state.user.selection ,
//             user: state.user.id,error: state.user.error , username: state.user.user
//  }
// }
//
// export default connect( mapStateToProps , {verifyUserViaCookie , fetchSelectedMountains , moutainSelections   , fetchAllMountains  , resetSelection} )(Header)





import React from "react";
import {connect} from 'react-redux'
import { verifyUserViaCookie , fetchSelectedMountains , moutainSelections  , moutainUpdate , fetchAllMountains , resetSelection } from '../../actions'

import Cookies from 'js-cookie'
import MoutainSelection from './MoutainSelection'
import SignIn from './SignIn'
import SignUp from './SignUp'

import './style.css'
class Header extends React.Component{
  constructor(props){
    super(props)
      this.state = { searchTerm: '' };
      this.onInputchange = this.onInputchange.bind(this);
  }

  onInputchange(event) {
   this.setState({ searchTerm: event.target.value });

   //we can get the correct mountains here
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


    // console.log(this.props.mountains)

    const signOut= ()=>{
       Cookies.remove('user')
       this.props.fetchAllMountains() //gets all moutains
       this.props.verifyUserViaCookie(null) //resets all values
       this.props.resetSelection()

       // make a call to get the moutains and render component
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

                  <div className="inputSearch">
                    <input type="search" className="searchBar form-control rounded"
                        placeholder="Search Mountains" aria-label="Search"
                        aria-describedby="search-addon"
                        onChange={this.onInputchange}  />
                 </div>
              </div>
          </div>
      </div>
    )
  }
}

//
const mapStateToProps = (state) => {
  console.log(state)
  return { selection: state.user.selection ,
            user: state.user.id   ,
            error: state.user.error ,
            username: state.user.user
 }
}

export default connect( mapStateToProps , {verifyUserViaCookie , fetchSelectedMountains , moutainSelections , moutainUpdate  , fetchAllMountains , resetSelection} )(Header)



// onChange={this.onInputchange}
