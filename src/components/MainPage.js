import React, { Component } from 'react';
import './MainPage.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        let tokenKey = localStorage.getItem('token');

        fetch('https://indian-railway.vercel.app/api/trains?type=SF&page=1' , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenKey
                
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // console.log(data.result.name)
        })
    }

    render() {
        return (
                <div className="main-container">
                    <div className="row">
                        <button onClick={this.handleClick}>Click me!</button>
                        <div className="col-4 p-4" style={{ backgroundColor: "red"}}>
                            <li>Hello</li>
                            <li>Hii</li>
                            <li>hey</li>
                            <li>hep</li>
                            <li>how</li>
                        </div>
                        <div className="col-8 p-4" style={{ backgroundColor: "blue"}}>
                            One of two columns
                        </div>
                    </div>
                </div>
        );
    }
}

export default MainPage;
