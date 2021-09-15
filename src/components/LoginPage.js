import React, { Component } from 'react';
import './LoginPage.css';
import auth from './Auth';

import { withRouter } from 'react-router-dom'

class LoginPage extends Component {

    constructor(props) {
        super (props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleUsername (e) {
        this.setState ({
            username: e.target.value
        })
    }
    
    handlePassword (e) {
        this.setState ({
            password: e.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault();

        const { username, password } = this.state;
        
        fetch('https://indian-railway.vercel.app/api/login' , {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        })
        .then(res => 
            res.json()
        )
        .then((data) => {
            localStorage.setItem('token', data.access_token);
            
            console.log('token', data);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    render() {
        return (
            <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="text" onChange={this.handleUsername} value = {this.state.username} className="form-control" id="exampleInputEmail1"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={this.handlePassword} value = {this.state.password}  className="form-control" id="exampleInputPassword1" />
                    </div>
                
                    <button type="submit" className="btn btn-primary" onClick={
                        () => {
                            auth.login(() => {
                                this.props.history.push('/main');
                            })
                        }
                    }>Login</button>
                   
                </form>
            </div>

        )
    }
}

export default withRouter(LoginPage)
