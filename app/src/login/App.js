import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Login from './login.js';
import Register from './register.js';

class App extends Component{
    render(){
        return(
            <div>
                <TopBar/>
                <Routing />
                <Footer />
            </div>
    )
    }
}

class Routing extends Component{

    constructor(props) {
        super(props);
    }


    render(){
        return(
            <Router>
                <div id="login-box">
                    <ul>
                        <li>
                            <Link to="/login">Sign in</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                    <Route exact path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="*" render={() => (
                        <Redirect to="/login"/>
                    )}/>
                </div>
            </Router>
        )
    }
}

const TopBar = ({ }) =>
    <header>
    </header>;

const Footer = ({}) =>
    <footer>
        Taskiro. All rights reserved &copy;
    </footer>;

export default App;