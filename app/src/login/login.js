import React, { Component } from 'react';
import '../styles/login.css';
import axios from 'axios';
import qs from 'qs'
import ReactDOM from "react-dom";
import Main from '../map/Main';




class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            login: '',
            password: ''
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    onSubmit(event){
        event.preventDefault();
        console.log(this.state);

        axios.post('/api/user/login', qs.stringify({
            login: this.state.login, password:this.state.password
        })).then(function(response){
            console.log(response);
            if (response.status === 200) {
                ReactDOM.render(<Main />, document.getElementById('root'));
            }
        }).catch(function(error){
            console.log(error);
        });

        this.setState({login: '', password: ''});

    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        return (
            <div id="login">
                SIGN IN
                <LoginForm onChange={this.onChange} onSubmit={this.onSubmit}/>
            </div>
        )
    }
}



const LoginForm =({onChange, onSubmit})=>
            <form id="loginForm" onSubmit={onSubmit}>
                <input type="text" name="login" placeholder="login" onChange={onChange} required/>
                <input type="password" name="password" placeholder="Hasło" onChange={onChange} required/>
                <input type="submit" value="Zaloguj się" name="loginButton" />
            </form>;





export default Login;