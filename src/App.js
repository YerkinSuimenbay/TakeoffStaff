import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Login from "./login/Login";
import { useGlobalContext } from "./store/context";
import { Contacts } from "./contacts/Contacts";

function App() {
  const { loggedIn } = useGlobalContext()
  return (
    <Router>
    {!loggedIn && <>
          {/* <Route path="/register" component={Register}/> */}
          <Route path="/auth" component={Login}/>
          <Redirect to="/auth"/>
          {/* {showFeedback && <Feedback />} */}
      </>}
      {loggedIn && 
        <main className="main">
            <div className="main__center">
            <Switch>
                <Route exact path="/" component={Contacts}/>
                <Route exact path="/home" render={() => <Redirect to='/' />}/>                    
                <Redirect to='/' />
            </Switch>
            {/* <Footer /> */}
            {/* </>} */}
            </div>
        </main>
      }
    </Router>
);
}

export default App;
