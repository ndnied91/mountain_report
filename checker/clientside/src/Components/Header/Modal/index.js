
import React, { useEffect , useState } from "react";
import ReactDOM from "react-dom";
import {connect} from 'react-redux'
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const Modal = props => {

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

  const collectProps=(props)=>{
    console.log('clicked')

  }

  const handleChange=(e)=> {
    let isChecked = e.target.checked;
    if(isChecked === true){
        console.log(e.target.value)

        let val = e.target.value
        //save on state here
    }


  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      //here was the unmount thing
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>

          <div className="dpdn">
              <input type="checkbox" value="Whiteface" onChange={e => handleChange(e)}/> Whiteface <br />
              <input type="checkbox" value="mnt_snow"  onChange={e => handleChange(e)}/> Mnt Snow <br />
              <input type="checkbox" value="blu_mnt"  onChange={e => handleChange(e)}/> Blue Mountain <br />
              <input type="checkbox" value="stowe"  onChange={e => handleChange(e)}/> Stowe <br />
              <input type="checkbox" value="hunter"  onChange={e => handleChange(e)}/> Hunter Mountain <br />
              <input type="checkbox" value="hunter" onChange={e => handleChange(e)}/> Hunter Mountain <br />


          </div>
          //need to pull out the values of these selections



          <div className="modal-footer">
            <button onClick={props.onClose} className="button">
              <div onClick={()=>collectProps(props)}>Select</div>
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default connect()(Modal);
