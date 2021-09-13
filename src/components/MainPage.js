import React, { Component } from 'react';
import './MainPage.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import Header from './Header';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainInfo: [],
            coordinates: [],
            trainNo: '',
            buttonsArray: [],
            noOfPages: 0,
            trainTypeArr: [],
            anchorEl: null,
        }
        this.handleMap = this.handleMap.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTypes = this.handleTypes.bind(this);
    }

    componentDidMount() {
        let tokenKey = localStorage.getItem('token');

        fetch('https://indian-railway.vercel.app/api/trains?page=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenKey

            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    trainInfo: data.result,
                    noOfPages: Math.ceil(data.total / data.perPage),
                })
                const x = new Array(this.state.noOfPages).fill(null).map((_, index) => index + 1);
                this.setState({
                    buttonsArray: x
                })

            })

    }

    handlePage(pageNo) {
        let tokenKey = localStorage.getItem('token');

        fetch(`https://indian-railway.vercel.app/api/trains?page=${pageNo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenKey

            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    trainInfo: data.result,
                    noOfPages: Math.ceil(data.total / data.perPage),
                    anchorEl: null,
                })
                const x = new Array(this.state.noOfPages).fill(null).map((_, index) => index + 1);
                this.setState({
                    buttonsArray: x
                })

            })

    }

    handleMap(key) {
        let tokenKey = localStorage.getItem('token');


        fetch(`https://indian-railway.vercel.app/api/trains/${key}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenKey
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const arr = data.geometry.coordinates;
                let newArr = [];
                arr.map((item => {
                    let reversedArr = item.reverse();
                    newArr.push(reversedArr)
                    return newArr;
                }))
                this.setState({
                    coordinates: newArr,
                    trainNo: data.properties.number
                })

            })
    }
    
    handleClose = (trainType) => {
    let tokenKey = localStorage.getItem('token');

    fetch(`https://indian-railway.vercel.app/api/trains?type=${trainType}&page=1`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + tokenKey

        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({
                trainInfo: data.result,
                anchorEl: null,
                noOfPages: Math.ceil(data.total / data.perPage)

            })
            const x = new Array(this.state.noOfPages).fill(null).map((_, index) => index + 1);
            this.setState({
                buttonsArray: x
            })

        })
    };

    handleTypes (event) {
        let tokenKey = localStorage.getItem('token');
        this.setState({
            anchorEl: event.currentTarget
        })

    fetch('https://indian-railway.vercel.app/api/trains/types', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + tokenKey

        }
    })
    .then((res) => res.json())
    .then((data) => {
        this.setState({
            trainTypeArr: data.result,
        })
        console.log(this.state.trainTypeArr)
    })
    }








    render() {
        const items = this.state.trainInfo.map(i =>
            <div onClick={() => this.handleMap(i.number)}>
                <p>{i.number}</p>
                <p>{i.name}</p>
                <hr />
            </div>
        );

        const colorOptions = { color: 'red' }





        return (

            <>
                <Header />
                <div className="main-container">
                    <div className="row">
                        <div className="col-4 p-4" style={{ backgroundColor: "rgb(242, 239, 239)" }}>
                            <div style={{ textAlign: 'right'}}>
                                <div>
                                    <Button style={{ border: '1px solid blue', color: 'blue'}} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleTypes}>
                                        Filter
                                    </Button>
                                    <Menu id="simple-menu" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose} >
                                        <MenuItem onClick={() => this.handlePage()}>All</MenuItem>
                                        
                                        {
                                           this.state.trainTypeArr.sort((a,b) => (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0))
                                           .map((type) => 
                                                <MenuItem onClick={() => this.handleClose(type.Code)}>{type.Code} ({type.Name})</MenuItem>
                                            )
                                        }
                                    </Menu>
                                                

                                </div>



                            </div>

                            <PerfectScrollbar style={{ height: '83vh' }}>
                                {items}
                            </PerfectScrollbar>
                            <div className="buttonContainer">
                                {/* <button className="button">1</button> */}
                                {
                                    this.state.buttonsArray.map((x) => <button className="btn btn-outline-dark mb-1" onClick={() => this.handlePage(x)}>{x}</button>)

                                }


                            </div>
                        </div>
                        <div id="map" className="col-8" style={{ backgroundColor: "#ececf2" }}>
                            <div>
                                <MapContainer center={{ lat: 21.00, lng: 78.00 }} zoom={4} scrollWheelZoom={false} style={{ height: '90vh', width: '100%' }}>
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Polyline pathOptions={colorOptions} key={this.state.trainNo} positions={this.state.coordinates} />
                                </MapContainer>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MainPage;
