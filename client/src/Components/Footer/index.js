import React from 'react'
import { Link , Router, HashRouter} from 'react-router-dom'
import './style.css'

const Footer = () =>{

  return(
     <div className="footer-container">
           <div className="footer">
                     <div style={{display: 'flex' ,  justifyContent: 'center' , fontSize: '15px'  }}>

                        <HashRouter>
                          <span className="trail"> <Link to="/" > <p className="footerLinks"> Home </p> </Link></span>
                          <span className="line">|</span>
                          <span className="trail"> <Link to="/contact" > <p className="footerLinks">  Contact </p> </Link></span>


                          <span className="line">|</span>
                        <a className="footerLinks" target="_blank" href='https://github.com/ndnied91'> <i className="fab fa-github fa-lg"></i> </a>
                          <span className="line">|</span>
                        <a className="footerLinks" target="_blank" href='https://www.instagram.com/danny_n00/'> <i className="fab fa-instagram fa-lg"></i> </a>
                          <span className="line">|</span>
                        <a className="footerLinks" target="_blank" href='https://www.linkedin.com/in/daniel-niedzwiedzki/'><i className="fab fa-linkedin fa-lg"></i> </a>
                        </HashRouter>


             </div>
               <div className="footerLinks copyright"> Copyright 2022 </div>
           </div>




     </div>
   )
}

export default Footer
