import React, { Component } from 'react';
import './LoginPage.css';
import auth from './Auth';
import trainLogo from '../icons/train.png';

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

        console.log('hello')

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
            if(data.access_token) {
                localStorage.setItem('token', data.access_token);
                auth.login(() => {
                    this.props.history.push('/main');
                })
                
                console.log('token', data);
            } else throw new Error(data.detail)
        })
        .catch((err) => {
            alert(err);
        })

    }

    render() {
        return (
            <div className="formContainer">
                <img src={trainLogo} width="40%" height="50%" />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row mt-4 mb-3">
                        <label htmlFor="exampleInputEmail1" className="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10 px-4">
                            <input type="text" onChange={this.handleUsername} value = {this.state.username} className="form-control" id="exampleInputEmail1"/>
                        </div>
                    </div>
                    <div className=" form-group row mb-3">
                        <label htmlFor="exampleInputPassword1" className="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10 px-4">
                            <input type="password" onChange={this.handlePassword} value = {this.state.password}  className="form-control" id="exampleInputPassword1" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>

        )
    }   
}

export default withRouter(LoginPage)
