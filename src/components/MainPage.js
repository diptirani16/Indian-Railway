import React, { Component } from 'react';
import './MainPage.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Header from './Header';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainInfo: []
        }
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


    render() {
        const items = this.state.trainInfo.map(i => <> <p>{i.number}</p> <p>{i.name}</p> <hr/> </>);

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
