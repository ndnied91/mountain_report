

// import Header from '../Header'
// import Main from '../Main'
//
// import Footer from '../Footer'
//
// import './style.css'
// function App() {
//
//   //define updateChapter
//
//   return (
//
//     <div className="cont">
//       <Header/>
//       <Main/>
//
//       <Footer/>
//    </div>
//   );
// }
//
// export default App;


// import { Link , Router, HashRouter} from 'react-router-dom'
// import { BrowserRouter, Route,Routes,  Switch, Redirect , HashRouter  } from 'react-router-dom'

import { BrowserRouter, Route, Routes, Redirect , HashRouter  } from 'react-router-dom'
// import { Router, Route   } from 'react-router-dom';

import Header from '../Header'
import Main from '../Main'
import Contact from '../Contact'

import Footer from '../Footer'

import './style.css'
function App() {





  return (
  <div className="cont">

  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/contact" element={<Contact />} />

    </Routes>
      <Footer/>
  </BrowserRouter>



   </div>
  );
}

export default App;
