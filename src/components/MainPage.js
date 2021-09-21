import React, { Component } from 'react';
import './MainPage.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import Header from './Header';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import sourceImg from '../icons/source.png'
import destinationImg from '../icons/destination.png';
import Pagination from '@material-ui/lab/Pagination';

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
            fromStation: [0, 0],
            toStation: [0, 0],
            page: 1
        }
        this.handleMap = this.handleMap.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTypes = this.handleTypes.bind(this);
        this.handleAll = this.handleAll.bind(this);
    }

    componentDidMount() {
        let tokenKey = localStorage.getItem('token');

        console.log('Login SuccesssFull....!')

        console.log('Token: ', tokenKey)

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
                this.setState({
                    trainInfo: data.result,
                    anchorEl: null,
                    page: pageNo
                })
                console.log('hello')
            })

    }

    handleAll() {
        let tokenKey = localStorage.getItem('token');

        fetch(`https://indian-railway.vercel.app/api/trains?page=1`, {
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
                    fromStation: newArr[0],
                    toStation: newArr[newArr.length - 1],
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

    handleTypes(event) {
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
        const iconSource = new L.Icon({
            iconUrl: sourceImg,
            iconSize: [10, 15],
        })

        const iconDestination = new L.Icon ({
            iconUrl: destinationImg,
            iconSize: [10, 15],
        })
        
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
                            <div style={{ textAlign: 'right' }}>
                                <div>
                                    <Button style={{ border: '1px solid blue', color: 'blue' }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleTypes}>
                                        Filter
                                    </Button>
                                    <Menu id="simple-menu" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose} >
                                        <MenuItem onClick={() => this.handleAll()}>All</MenuItem>

                                        {
                                            this.state.trainTypeArr.sort((a, b) => (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0))
                                                .map((type) =>
                                                    <MenuItem onClick={() => this.handleClose(type.Code)}>{type.Code} ({type.Name})</MenuItem>
                                                )
                                        }
                                    </Menu>


                                </div>



                            </div>

                            <PerfectScrollbar style={{ height: '72vh' }}>
                                {items}
                            </PerfectScrollbar>
                            <div className="buttonContainer">
                            <Pagination count={this.state.noOfPages} page={this.state.page} onChange={(_, page) => this.handlePage(page)} color="primary" shape="rounded"/>


                            </div>
                        </div>
                        <div id="map" className="col-8" style={{ backgroundColor: "#ececf2" }}>
                            <div>
                                <MapContainer center={{ lat: 21.00, lng: 78.00 }} zoom={4} scrollWheelZoom={false} style={{ height: '90vh', width: '100%' }}>
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker key="source" position={this.state.fromStation} icon={ iconSource }>
                                        <Popup>
                                            Source
                                        </Popup>
                                    </Marker>
                                    <Marker key="destination" position={this.state.toStation} icon={ iconDestination }>
                                        <Popup>
                                            Destination
                                        </Popup>
                                    </Marker>
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
