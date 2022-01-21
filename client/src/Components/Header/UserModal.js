//
import React, { useState } from "react";



import { Button, Modal } from 'react-bootstrap';
import {verifyUser} from '../../actions'
import {connect} from 'react-redux'


import SignIn from './SignIn'
import SignUp from './SignUp'

import './UserModal.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const UserModal = (props)=> {
  const [show, setShow] = useState(false);
  const [loginIn, setLogIn] = useState(false);
  const [active, setActive] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (log) =>{
    // log === 'Sign In' ? setLogIn(false) : setLogIn(true)
    if(log ==='Sign In'){
      setActive(false)
       setLogIn(false)
    }
    else{
      setActive(true)
      setLogIn(true)
    }
    // active === true ? setActive(false) : setActive(true)
    // active === 'Sign In' ? setActive(false) : setActive(true)
  }


  const handleSubmit =async (event) => {
     event.preventDefault()
     const res = await props.verifyUser(event.target)
     if(res === true){ handleClose() }
  }

  return (
    <div>
      <Button variant="btn btn-outline-primary btn-lg" onClick={handleShow}>
        {props.title}
      </Button>



      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div className="login-options">
                   <div className={`${active ?  null : 'active'} signIn `} onClick={()=>handleClick('Sign In')}> Log In </div>
                   <div className={`${active ?  'active' : null} signUp `} onClick={()=>handleClick('Sign Up')}> Sign Up </div>
                </div>

                <div>
                    {loginIn === false ? <SignIn/> : <SignUp/>}
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps=(state)=>{

  return {error: state.user.error }
}

export default connect( mapStateToProps, {verifyUser})(UserModal);



// <div className="push"><SignUp title={'Sign Up'}/></div>
 // <div className="push"><SignIn title={'Sign In'}/></div>
