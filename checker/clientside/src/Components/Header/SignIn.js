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
      <Button variant="primary" onClick={handleShow}>
        {props.title}
      </Button>

      <Modal show={show}
             onHide={handleClose}
             animation={false}
            >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div>
            <form onSubmit={(event)=>handleSubmit(event) }>
                <label> Name: <input type="text" name="username" /> </label>
                <label> Password: <input type="password" name="password" /> </label>

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
