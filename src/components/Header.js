import React, { Component } from 'react';
import auth from './Auth';

import { withRouter } from 'react-router-dom'

class Header extends Component {
    constructor(props){
        super(props);

        
    }
    render () {
        return (
            <div className="d-flex justify-content-between bg-dark text-light fixed-top" style={{padding: '1%'}}>
                <div>Indian Railway</div>
                <div><button className="text-light bg-dark mx-4" onClick={
                    () => {
                        auth.logout(() => {
                            this.props.history.push('/');
                        })
                    }
                }>Logout</button><i className="fa fa-user-circle" style={{fontSize: '26px'}}></i></div>
            </div>
        )
    }
}

export default withRouter(Header);