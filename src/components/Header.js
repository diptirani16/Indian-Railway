import React, { Component } from 'react';

class Header extends Component {
    render () {
        return (
            <div className="d-flex justify-content-between bg-dark text-light fixed-top" style={{padding: '1%'}}>
                <div>Indian Railway</div>
                <div><i className="fa fa-user-circle" style={{fontSize: '26px'}}></i></div>
            </div>
        )
    }
}

export default Header;