//
import React, { useState } from "react";



import { Button, Modal } from 'react-bootstrap';
import {moutainSelections, fetchSelectedMountains} from '../../actions'
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
 import './style.css'

const MoutainSelection = (props)=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange=(e)=> { props.moutainSelections(e.target.value) }


  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Mountain Selection
      </Button>

      <Modal show={show}
             onHide={handleClose}
             backdrop="static"
             animation={true}
             keyboard={false}
            >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="dpdn">
            <input type="checkbox" value="Blue Mountain" onChange={e => handleChange(e)}/> Blue Mountain <br />
            <input type="checkbox" value="Hunter Mountain" onChange={e => handleChange(e)}/> Hunter Mountain <br />
            <input type="checkbox" value="Mount Snow" onChange={e => handleChange(e)}/> Mount Snow <br />
            <input type="checkbox" value="Mountain Creek" onChange={e => handleChange(e)}/> Mountain Creek <br />
            <input type="checkbox" value="Stowe" onChange={e => handleChange(e)}/> Stowe <br />
            <input type="checkbox" value="Windham Mountain" onChange={e => handleChange(e)}/> Windham Mountain <br />
            <input type="checkbox" value="Whiteface Mountain" onChange={e => handleChange(e)}/> Whiteface <br />
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>props.fetchSelectedMountains(props.selection).then(()=>handleClose())}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps=(state)=>{
  console.log(state.selection)
  return {selection: state.selection.selection }
}

export default connect( mapStateToProps, {moutainSelections , fetchSelectedMountains})(MoutainSelection);
