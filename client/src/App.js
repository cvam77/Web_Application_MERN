import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login'
import Home from './Components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './Components/Register';
import UrlKeyword from './Components/UrlKeyword';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/urlkeyword" component={UrlKeyword}/>
    </Router>
  );
}

export default App;
