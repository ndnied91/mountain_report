//
import React, { useState } from "react";
// import Modal from "./Modal";
// import SignInModal from "./SignInModal";
//
// import {signIn} from '../../actions'
//
// import './style.css'
//
//  const Header = ()=> {
//   const [show, setShow] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(false);
//
//   return (
//     <div className="App">
//
//         <h2>Moutains</h2>
//
//
//         <button onClick={() => setShowSignIn(true)}>Login</button>
//         <SignInModal title="Login" onClose={() => setShowSignIn(false)} showSignIn={showSignIn} />
//
//         <button onClick={() => setShow(true)}>Select Mountains</button>
//         <Modal title="Mountain Selector" onClose={() => setShow(false)} show={show} />
//
//     </div>
//   );
// }
//
//
//
//
// export default Header
//
//


import { Button, Modal } from 'react-bootstrap';
import {moutainSelections, fetchSelectedMountains} from '../../actions'
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
 import './style.css'

const Header = (props)=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange=(e)=> {
    console.log(e.target.value)
        props.moutainSelections(e.target.value)
  }

  const collectProps=(props)=>{
        props.fetchSelectedMountains(props.selection) //filers out selected
  }


  return (
    <div>
     <h2>Moutains</h2>
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

export default connect( mapStateToProps, {moutainSelections , fetchSelectedMountains})(Header);
