import React, { Component } from 'react';
import './MainPage.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import Header from './Header';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainInfo: [],
            coordinates: [],
            trainNo: ''
        }
        this.handleMap = this.handleMap.bind(this)
    }

    componentDidMount() {
        let tokenKey = localStorage.getItem('token');

        fetch('https://indian-railway.vercel.app/api/trains?type=SF&page=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenKey

            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    trainInfo: data.result
                })

                console.log(data, this.state.trainInfo);
            })

    }

    handleMap () {
        let tokenKey = localStorage.getItem('token');
        

        fetch('https://indian-railway.vercel.app/api/trains/04728' , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + tokenKey
            }
        })
        .then((res) => res.json())
        .then((data) => { 
            this.setState({
                coordinates: data.geometry.coordinates,
                trainNo: data.properties.number
            })
            console.log(this.state.trainNo);
            console.log(this.state.coordinates);

            

        })
    }


    render() {
        const items = this.state.trainInfo.map(i => 
        <div onClick={this.handleMap}> 
            <p>{i.number}</p> 
            <p>{i.name}</p> 
            <hr/> 
        </div>
    );

    const limeOptions = { color: 'lime' }

        return (
            
            <>
                <Header/>
            <div className="main-container">
                <div className="row">
                    <div className="col-4 p-4" style={{ backgroundColor: "rgb(242, 239, 239)" }}>
                        <PerfectScrollbar style={{ height: '83vh' }}>
                            {items}
                        </PerfectScrollbar>
                    </div>
                    <div id="map" className="col-8" style={{ backgroundColor: "#ececf2" }}>
                        <div>
                            <MapContainer center={{ lat: 21.00, lng: 78.00}} zoom={4} scrollWheelZoom={false} style={{ height: '90vh', width: '100%' }}>
                                <TileLayer 
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                                />
                                <Polyline pathOptions={limeOptions} key={this.state.trainNo} positions={this.state.coordinates} />
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
