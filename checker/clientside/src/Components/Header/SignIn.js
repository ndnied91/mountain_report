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


  const handleSubmit = (event) => {
     event.preventDefault()
     console.log(event)
     handleClose()
     props.verifyUser(event.target)
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

export default connect( null, {verifyUser})(SignIn);
