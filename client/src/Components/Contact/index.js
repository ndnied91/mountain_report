


import React from 'react'


import {connect} from 'react-redux'
// import { postFeedback } from '../actions'

import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'


class Contact extends React.Component{
  constructor(props){
    super(props)
      this.state={ topic: '' , comment: '' , email: '' }

      this.onInputchange = this.onInputchange.bind(this);
  }



  onInputchange(event) {
     this.setState({
       [event.target.name]: event.target.value
     });
   }




  render(){


    const onSubmitForm = async ()=>{
        await this.props.postFeedback(this.state)
        this.setState({ topic: '' , comment: '' , email: '' })
    }



    return(
      <div id="cContact">
        <div className="contact-form" style={{paddingTop: '50px' }}>

          <h1 id="form-title"> Please let us know how we're doing!</h1>

                  <div>
                      Topic
                      <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="topic" type="text"  placeholder="Topic" value={this.state.topic} onChange={this.onInputchange} />
                  </div>


                  <div>
                      Comments
                      <textarea className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="comment" type="text" value={this.state.comment}
                      placeholder='Please let us know you liked or what you would like to see changed'  onChange={this.onInputchange} />
                  </div>


                  <div>
                      Email
                      <input className="form-control" style={{height: '55px' , marginBottom: "20px"}} name="email" type="text"  placeholder='optional' value={this.state.email}  onChange={this.onInputchange} />
                  </div>


                  <div className="row">
                      <div className="col-12 col-md-8">
                        <button className="btn btn-outline-secondary btn-lg btn-block disabled" type="submit"  onClick={onSubmitForm} > Submit </button>
                        <br/>
                      </div>

                      <div className="col-12 col-md-4">
                          <button class="btn btn-outline-danger btn-lg btn-block" type="submit"  onClick={ () => this.setState({ topic: '' , comment: '' , email: '' }) } > Cancel </button>
                      </div>
                  </div>



       </div>




       </div>
    )
  }
}




export default connect( null)(Contact)

// export default connect( null , {postFeedback})(Contact)
