//
import React, { useState } from "react";



import { Button, Modal } from 'react-bootstrap';
import {saveUser} from '../../actions'
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
 import './style.css'

const SignIn = (props)=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = (event) => {
     event.preventDefault()
     props.saveUser(event.target, props.selection)
      handleClose()
  }

  return (
    <div>
      <Button variant="primary btn-lg" onClick={handleShow}>
        {props.title}
      </Button>

      <Modal show={show}
             onHide={handleClose}
             animation={false}
            >
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div >
            <form onSubmit={(event)=>handleSubmit(event) }>


            <div className="form-group" >
                <label style={{width: '100%'}}> <input className="form-control" type="text" name="username" placeholder="Enter username..."/> </label>
            </div>


            <div className="form-group" >
                <label style={{width: '100%'}}> <input className="form-control" type="password" name="password" placeholder="Enter password..."/> </label>
            </div>

              <Modal.Footer>
                <Button variant="primary" type="submit"> Sign Up </Button>
              </Modal.Footer>
           </form>
        </div>

        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) =>{
  return { selection: state.selection.selection }
}

export default connect( mapStateToProps, {saveUser})(SignIn);
