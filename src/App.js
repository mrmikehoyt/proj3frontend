import React from 'react';
import SignUp from './components/SignUp/SignUp'
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'


function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/signUP" component={SignUp} />
      <Route path="/chat" component={Chat}/>
    </Router>
  );
}

export default App;
