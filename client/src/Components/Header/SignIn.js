

import React  from "react";
import { Button, Modal } from 'react-bootstrap';
import {verifyUser} from '../../actions'
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
 import './style.css'




class SignIn extends React.Component{

  render(){

    const handleSubmit =async (event) => {
       event.preventDefault()
       const res = await this.props.verifyUser(event.target)
    }


const renderError =() =>{
  return(
    <div className="errorMsg"> {this.props.error} </div>
  )
}

    return(
      <div>

            <h3 id="modalMessage">
                Welcome Back
            </h3>

          <form onSubmit={(event)=>handleSubmit(event) }>

              <div className="form-group" >
                  <label style={{width: '100%'}}> <input className="form-control" type="text" name="username" placeholder="Enter username..."/> </label>
              </div>

              <div className="form-group" >
                  <label style={{width: '100%'}}> <input className="form-control" type="password" name="password" placeholder="Enter password..."/> </label>
              </div>

              {this.props.error !== null ? renderError(): null}

            <Modal.Footer>
                <Button variant="btn btn-outline-dark" type="submit"> Log In </Button>
            </Modal.Footer>
         </form>
      </div>
    )
  }
}


const mapStateToProps=(state)=>{
  return {error: state.user.error }
}

export default connect( mapStateToProps, {verifyUser})(SignIn);
