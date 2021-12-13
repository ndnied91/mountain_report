
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {connect} from 'react-redux'
import { CSSTransition } from "react-transition-group";
import {moutainSelections, fetchSelectedMountains} from '../../../actions'

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
    console.log(props.selection)
    //make a call to external
    props.fetchSelectedMountains(props.selection)
  }

  const handleChange=(e)=> {
        props.moutainSelections(e.target.value)
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
              <input type="checkbox" value="Mnt Snow" onChange={e => handleChange(e)}/> Mnt Snow <br />
              <input type="checkbox" value="Blu Mnt" onChange={e => handleChange(e)}/> Blue Mountain <br />
              <input type="checkbox" value="Stowe" onChange={e => handleChange(e)}/> Stowe <br />
          </div>




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

const mapStateToProps=(state)=>{
  return {selection: state.selection.selection }
}

export default connect( mapStateToProps, {moutainSelections , fetchSelectedMountains})(Modal);
