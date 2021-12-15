//
import React from "react";




import MoutainSelection from './MoutainSelection'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Header = (props)=> {


  return (
    <div>
     <h2>Mountains</h2>

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



export default Header;
