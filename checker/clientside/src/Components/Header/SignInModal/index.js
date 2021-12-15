
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {connect} from 'react-redux'
import { CSSTransition } from "react-transition-group";
import {handleSubmit} from '../../../actions'

import "./SignInModal.css";



const SignInModal = props => {

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
       console.log('closed on esc key')
    }
  };




  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  },
  []);



  const handleSubmit = (event) => {
     event.preventDefault()

     props.handleSubmit(event.target)
     // console.log(event.target.username.value)
     // console.log(event.target.password.value)
  }


  return ReactDOM.createPortal(
    <CSSTransition
      in={props.showSignIn}

      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>

          <div className="modal-footer">


          <form onSubmit={(event)=>handleSubmit(event) }>
              <label> Name: <input type="text" name="username" /> </label>
              <label> Password: <input type="password" name="password" /> </label>

              <button type="submit" onClick={props.onClose}>Submit</button>
         </form>


          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};



export default connect( null, {handleSubmit})(SignInModal);

                        // <button className="ui button primary" onClick={props.onClose}> Submit </button>
