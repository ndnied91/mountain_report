//
import React, { useState } from "react";



import { Button, Modal } from 'react-bootstrap';
import {verifyUser} from '../../actions'
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
 import './style.css'

const SignIn = (props)=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit =async (event) => {
     event.preventDefault()
     const res = await props.verifyUser(event.target)

    if(res === true){
      handleClose()
    }

  }

  return (
    <div>
      <Button variant="btn btn-outline-primary btn-lg" onClick={handleShow}>
        {props.title}
      </Button>



      <Modal show={show}
             onHide={handleClose}
             animation={false}
            >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div>
            <form onSubmit={(event)=>handleSubmit(event) }>

                <div className="form-group" >
                    <label style={{width: '100%'}}> <input className="form-control" type="text" name="username" placeholder="Enter username..."/> </label>
                </div>

                <div className="form-group" >
                    <label style={{width: '100%'}}> <input className="form-control" type="password" name="password" placeholder="Enter password..."/> </label>
                </div>


                <Modal.Footer>
                  <div>{props.error}</div>
                  <Button variant="secondary" onClick={props.onClose}> Forgot Password </Button>
                  <Button variant="primary" type="submit"> Sign In </Button>

                </Modal.Footer>
           </form>
        </div>

        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps=(state)=>{

  return {error: state.user.error }
}

export default connect( mapStateToProps, {verifyUser})(SignIn);
