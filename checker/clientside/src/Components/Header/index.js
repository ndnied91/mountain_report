//
import React from "react";
import {connect} from 'react-redux'



import MoutainSelection from './MoutainSelection'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Header = (props)=> {


  return (
    <div>
     <h2>Mountains</h2>


<div>
    {props.user}
    //save this into cookies
</div>


     <div>
        <MoutainSelection/>
     </div>


     <div>
       <SignIn title={'Sign In'}/>
       <SignUp title={'Sign Up'}/>
     </div>

    </div>
  );
}


const mapStateToProps = (state) => {
  console.log(state.user)
  return {user : state.user}
}

export default connect(mapStateToProps , null )(Header)
