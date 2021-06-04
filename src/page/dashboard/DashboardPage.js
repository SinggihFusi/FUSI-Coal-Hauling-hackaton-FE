// import { Map,  } from 'leaflet'
import React, { Component } from 'react'
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, ZoomControl } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
// import ErrorIcon from '@material-ui/icons/Error';

import gi from './grey.png'
import ri from './red.png'
import oi from './orange.png'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import CommonService from '../../service'

export class DashboardPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpenNotif: false,
            data: [],
        }
        this.comService = new CommonService();
    }

    componentDidMount() {
        this.getData();
        this.doInterval();
        const ws = this.comService.wsConnect();
        ws.onopen = () => {
            console.log('konek');
        }
        ws.onmessage = () => (e => {
            console.log('e');
        })
    }

    getData = async () => {
        await this.comService.getData({}).then(e => {
            this.setState({ data: e });
        })
    }

    doInterval() {
        this.myInterval = setInterval(() => {
            this.getData();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    _created = (e) => {
        const { layer, layerType } = e;

        if (layerType === 'marker') {
            console.log('coor', layer.getLatLng());
        } else if (layerType === 'polygon') {
            console.log('coor', layer.getLatLngs());
        }
    }

    _edited = (e) => {
        e.layers.eachLayer(a => {
            console.log(a.toGeoJSON())
        });
    }

    _handlePopupClick = (e) => {
        // console.log('marker clicked', e)
    }

    _handlePopupClose = () => {
        // console.log('popup closed')
    }

    hideNotif = () => {
        if (this.state.isOpenNotif) {
            document.getElementById('bt-notif').style.display = 'none'
        } else {
            document.getElementById('bt-notif').style.display = 'flex'
        }
        this.setState({ isOpenNotif: !this.state.isOpenNotif })
    }

    logout = () => {
        this.comService.removeUser()
        this.props.history.push('/login')
    }

    _getIconSpeed = (speed) => {
        if (speed < 1) {
            return greyIcon;
        } else if (speed > 0 && speed < 60) {
            return orangeIcon;
        } else if (speed > 60) {
            return redIcon;
        }
        return greyIcon;
    }

    center = [-0.5925272555976754, 115.6866489659337]
    centerJkt = [-6.229364466652012, 106.83601727926892];

    render() {
        return (
            <div style={{ height: '100vh', width: '100vw', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <MapContainer center={this.center} zoom={10} style={{ height: '100vh', width: '100vw' }} zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />

                    {/* draw */}
                    {/* <FeatureGroup>
                        <EditControl position='topright' onCreated={this._created} onEdited={this._edited} />
                    </FeatureGroup> */}

                    {this.state.data?.map((val, idx) => {
                        return (
                            <Marker position={[val.lat, val.long]} key={idx} icon={this._getIconSpeed(val.speed)} eventHandlers={{
                                click: this._handlePopupClick,
                            }}>
                                <Popup onClose={this._handlePopupClose}>
                                    <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '200px', maxWidth: '300px' }}>
                                        <div style={{ marginBottom: '5px', fontSize: '1.2em' }}><strong>Details Trucks - {val.id}</strong></div>
                                        <TableContainer component={Paper}>
                                            <Table size="small" aria-label="a dense table">
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">Name</TableCell>
                                                        <TableCell align="right">{val.name}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">Truck ID</TableCell>
                                                        <TableCell align="right">{val.id}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">Brand</TableCell>
                                                        <TableCell align="right">{val.brand}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">Load Weight</TableCell>
                                                        <TableCell align="right">{val.type}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    })}

                </MapContainer>

                {/* logo app */}
                <div style={{ top: '4%', left: '5%', display: 'flex', position: 'absolute', zIndex: '999' }}>
                    <p style={{ fontWeight: '700', color: '#4400ab', margin: '0', fontSize: '1.2em' }}>ITM</p>
                </div>

                {/* button notif & logout */}
                <div style={{ top: '4%', right: '5%', display: 'flex', position: 'absolute', zIndex: '999' }}>
                    <AssignmentIcon onClick={this.hideNotif} style={{ marginRight: '20px', color: '#4400ab', cursor: 'pointer' }} />
                    <ExitToAppIcon style={{ color: '#4400ab', cursor: 'pointer' }} onClick={this.logout} />
                </div>

                {/* legend */}
                <div style={{ height: '15vh', display: 'flex', position: 'absolute', bottom: '0', left: '0', zIndex: '999' }}>
                    <div style={{ backgroundColor: '#4400ab', height: '100%', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 10px', boxSizing: 'border-box' }}>
                        <img src={gi} alt='stoped' style={{ height: '30px', width: '30px', marginBottom: '5px' }} />
                        <p style={{ margin: '0', fontSize: '.7em', marginBottom: '10px' }}>STOPPED</p>
                        <p style={{ margin: '0', fontSize: '1.4em' }}>{this.state.data?.filter(e => e.speed < 1).length}</p>
                    </div>
                    <div style={{ backgroundColor: '#4400ab', height: '100%', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 10px', boxSizing: 'border-box' }}>
                        <img src={oi} alt='stoped' style={{ height: '30px', width: '30px', marginBottom: '5px' }} />
                        <p style={{ margin: '0', fontSize: '.7em', marginBottom: '10px' }}>ON TRACK</p>
                        <p style={{ margin: '0', fontSize: '1.4em' }}>{this.state.data?.filter(e => e.speed > 0 && e.speed < 60).length}</p>
                    </div>
                    <div style={{ backgroundColor: '#4400ab', height: '100%', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 10px', boxSizing: 'border-box' }}>
                        <img src={ri} alt='stoped' style={{ height: '30px', width: '30px', marginBottom: '5px' }} />
                        <p style={{ margin: '0', fontSize: '.7em', marginBottom: '10px' }}>OVER SPEED</p>
                        <p style={{ margin: '0', fontSize: '1.4em' }}>{this.state.data?.filter(e => e.speed > 60).length}</p>
                    </div>
                </div>

                {/* notification delivery */}
                <div id='bt-notif' style={{ top: '10%', right: '5%', display: 'none', flexDirection: 'column', position: 'absolute', zIndex: '999', alignItems: 'flex-start' }}>
                    {this.state.data?.reverse().map((val, idx) =>
                        val.speed > 0 ? (
                            <div key={idx} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '2px 2px 8px 2px #888888' }}>
                                <p style={{ margin: '0 10px 0 0' }}>{val.name} <span style={{ color: '#ff7700', fontWeight: '600' }}>Just Driving at </span>{val.timestamp}</p>
                            </div>
                        ) : (<div key={idx}></div>)
                    )}
                </div>

                {/* info overspeed */}
                <div style={{ top: '10%', left: '5%', position: 'absolute', zIndex: '999', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {this.state.data?.map((val, idx) =>
                        val.speed > 60 ? (
                            <div key={idx} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', display: 'flex', alignItems: 'center', boxShadow: '2px 2px 8px 2px #888888' }}>
                                <img src={ri} alt='stoped' style={{ height: '7px', width: '7px', marginRight: '5px' }} />
                                <p style={{ margin: '0 10px 0 0' }}>{val.name} <span style={{ color: '#ff004c', fontWeight: '600' }}>Over Speed </span><span style={{ color: '#a3a3a3', fontWeight: '600' }}>{val.speed} km/h</span></p>
                            </div>
                        ) : (<div key={idx}></div>)
                    )}
                </div>

            </div>
        )
    }
}

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const greyIcon = new L.Icon({
    iconUrl: gi,
    iconRetinaUrl: gi,
    iconAnchor: null,
    popupAnchor: [-0, -2],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [12, 12]
});

const redIcon = new L.Icon({
    iconUrl: ri,
    iconRetinaUrl: ri,
    iconAnchor: null,
    popupAnchor: [-0, -2],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [12, 12]
});

const orangeIcon = new L.Icon({
    iconUrl: oi,
    iconRetinaUrl: oi,
    iconAnchor: null,
    popupAnchor: [-0, -2],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [12, 12]
});

export default DashboardPage
