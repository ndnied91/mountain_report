//
import React  from "react";
import { Button, Modal } from 'react-bootstrap';

import {saveUser} from '../../actions'
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
 import './style.css'




class SignUp extends React.Component{
  render(){

    const handleSubmit = (event) => {
      console.log(event.target)
       event.preventDefault()

       this.props.saveUser(event.target, this.props.selection)
    }


    return(
      <div >

          <h3 id="modalMessage">
              Sign Up Today
          </h3>

          <form onSubmit={(event)=>handleSubmit(event) }>


          <div className="form-group" >
              <label style={{width: '100%'}}> <input className="form-control" type="text" name="username" placeholder="Enter username..."/> </label>
          </div>


          <div className="form-group" >
              <label style={{width: '100%'}}> <input className="form-control" type="password" name="password" placeholder="Enter password..."/> </label>
          </div>

            <Modal.Footer>
              <Button variant="btn btn-outline-dark" type="submit"> Sign Up </Button>
            </Modal.Footer>
         </form>
      </div>

    )
  }
}

const mapStateToProps = (state) =>{
  return { selection: state.selection.selection }
}

export default connect( mapStateToProps, {saveUser})(SignUp);
