
import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import {moutainSelections, fetchSelectedMountains , fetchAllMountains , verifyUserViaCookie} from '../../actions'
import {connect} from 'react-redux'

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



  return(
    <div>
      <Button variant="primary" className="btn-lg" onClick={handleShow}> Mountain Selector </Button>

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

        <label for='results'> Results</label>
        <div className="results">

              <div style={ checkMnt('Blue Mountain') ? { display:'block'} : {display : 'none'} } >
                  <input className="hidden" type="checkbox" id="Blue Mountain" value="Blue Mountain" name="Blue Mountain" onChange={e => handleChange(e)} />
                    <label for="Blue Mountain">Blue Mountain</label>
              </div>

              <div style={ checkMnt('Hunter Mountain') ? { display:'block'} : {display : 'none'} } >
                  <input className="hidden" type="checkbox" id="Hunter Mountain" value="Hunter Mountain" name="Hunter Mountain" onChange={e => handleChange(e)} />
                    <label for="Hunter Mountain"> Hunter Mountain</label>
              </div>


              <div style={ checkMnt('Mount Snow') ? { display:'block'} : {display : 'none'} } >
                  <input className="hidden" type="checkbox" id="Mount Snow" value="Mount Snow" name="Mount Snow" onChange={e => handleChange(e)} />
                    <label for="Mount Snow"> Mount Snow</label>
              </div>


              <div style={ checkMnt('Mountain Creek') ? { display:'block'} : {display : 'none'} } >
                  <input className="hidden" type="checkbox" id="Mountain Creek" value="Mountain Creek" name="Mountain Creek" onChange={e => handleChange(e)} />
                    <label for="Mountain Creek"> Mountain Creek</label>
              </div>


              <div style={ checkMnt('Stowe') ? { display:'block'} : {display : 'none'} } >
                  <input className="hidden" type="checkbox" id="Stowe" value="Stowe" name="Stowe" onChange={e => handleChange(e)} />
                    <label for="Stowe"> Stowe</label>
              </div>

              <div style={ checkMnt('Windham Mountain') ? { display:'block'} : {display : 'none'} } >
                  <input className="hidden" type="checkbox" id="Windham Mountain" value="Windham Mountain" name="Windham Mountain" onChange={e => handleChange(e)} />
                    <label for="Windham Mountain"> Windham Mountain</label>
              </div>

              <div style={ checkMnt('Whiteface Mountain') ? { display:'block'} : {display : 'none'} } >
                  <input className="hidden" type="checkbox" id="Whiteface Mountain" value="Whiteface Mountain" name="Whiteface Mountain" onChange={e => handleChange(e)} />
                    <label for="Whiteface Mountain"> Whiteface Mountain</label>
              </div>

        </div>

<br/>
<label for='Available Mountains'> Available Mountains</label>
        <div className="dpdn">

              <div style={ checkMnt('Blue Mountain') ? { display:'none'} : {display : 'block'} } >
                  <input className="hidden" type="checkbox" id="Blue Mountain" value="Blue Mountain" name="Blue Mountain" onChange={e => handleChange(e)} />
                    <label for="Blue Mountain">Blue Mountain</label>
              </div>

              <div style={ checkMnt('Hunter Mountain') ? { display:'none'} : {display : 'block'} } >
                  <input className="hidden" type="checkbox" id="Hunter Mountain" value="Hunter Mountain" name="Hunter Mountain" onChange={e => handleChange(e)} />
                    <label for="Hunter Mountain">Hunter Mountain</label>
              </div>

              <div style={ checkMnt('Mount Snow') ? { display:'none'} : {display : 'block'} } >
                  <input className="hidden" type="checkbox" id="Mount Snow" value="Mount Snow" name="Mount Snow" onChange={e => handleChange(e)} />
                    <label for="Mount Snow">Mount Snow</label>
              </div>


              <div style={ checkMnt('Mountain Creek') ? { display:'none'} : {display : 'block'} } >
                  <input className="hidden" type="checkbox" id="Mountain Creek" value="Mountain Creek" name="Mountain Creek" onChange={e => handleChange(e)} />
                    <label for="Mountain Creek">Mountain Creek</label>
              </div>


              <div style={ checkMnt('Stowe') ? { display:'none'} : {display : 'block'} } >
                  <input className="hidden" type="checkbox" id="Stowe" value="Stowe" name="Stowe" onChange={e => handleChange(e)} />
                    <label for="Stowe">Stowe</label>
              </div>


              <div style={ checkMnt('Windham Mountain') ? { display:'none'} : {display : 'block'} } >
                  <input className="hidden" type="checkbox" id="Windham Mountain" value="Windham Mountain" name="Windham Mountain" onChange={e => handleChange(e)} />
                    <label for="Windham Mountain"> Windham Mountain</label>
              </div>


              <div style={ checkMnt('Whiteface Mountain') ? { display:'none'} : {display : 'block'} } >
                  <input className="hidden" type="checkbox" id="Whiteface Mountain" value="Whiteface Mountain" name="Whiteface Mountain" onChange={e => handleChange(e)} />
                    <label for="Whiteface Mountain"> Whiteface Mountain</label>
              </div>


        </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={()=>props.fetchSelectedMountains(props.selection, props.user).then(()=>handleClose())}>
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
