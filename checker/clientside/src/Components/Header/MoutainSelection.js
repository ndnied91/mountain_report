
import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import {moutainSelections, fetchSelectedMountains , fetchAllMountains , verifyUserViaCookie} from '../../actions'
import {connect} from 'react-redux'


import Cookies from 'js-cookie'

import 'bootstrap/dist/css/bootstrap.min.css';
 import './style.css'

const MoutainSelection = (props)=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange=(e)=> {
    props.moutainSelections(e.target.value)
   }

   const checkMnt=(value)=>{
      if(props.selection.indexOf(value) > -1){
        return true
      }
      else
        return false
   }

   // const signOut= ()=>{
     // console.log('signing out now')
      // Cookies.remove('user')
      // props.fetchAllMountains() //gets all moutains
      // props.verifyUserViaCookie(null)
      //make a call to get the moutains and render component
   // }


  return(
    <div>
      <Button variant="primary" className="test" onClick={handleShow}> + </Button>

      <span className="username">{props.username}</span>




      <Modal show={show}
             onHide={handleClose}
             backdrop="static"
             animation={true}
             keyboard={false}
            >
        <Modal.Header closeButton>
          <Modal.Title>Mountain Selector</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div>{props.selection}</div>

        <div className="dpdn">
            <input type="checkbox" checked ={ checkMnt('Blue Mountain')} value="Blue Mountain" onChange={e => handleChange(e)}/> Blue Mountain <br />
            <input type="checkbox" checked ={ checkMnt('Hunter Mountain')} value="Hunter Mountain" onChange={e => handleChange(e)}/> Hunter Mountain <br />
            <input type="checkbox" checked ={ checkMnt('Mount Snow')} value="Mount Snow" onChange={e => handleChange(e)}/> Mount Snow <br />
            <input type="checkbox" checked ={ checkMnt('Mountain Creek')}value="Mountain Creek" onChange={e => handleChange(e)}/> Mountain Creek <br />
            <input type="checkbox" checked ={ checkMnt('Stowe')} value="Stowe" onChange={e => handleChange(e)}/> Stowe <br />
            <input type="checkbox" checked ={ checkMnt('Windham Mountain')} value="Windham Mountain" onChange={e => handleChange(e)}/> Windham Mountain <br />
            <input type="checkbox" checked ={ checkMnt('Whiteface Mountain')} value="Whiteface Mountain" onChange={e => handleChange(e)}/> Whiteface <br />
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={( )=>props.fetchSelectedMountains(props.selection, props.user).then(()=>handleClose())}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {selection: state.selection.selection , user: state.user.id  , username: state.user.user }
}

export default connect( mapStateToProps, {moutainSelections , fetchSelectedMountains , fetchAllMountains , verifyUserViaCookie})(MoutainSelection);


// <button className="btnn" onClick={signOut}> Sign Out</button>
