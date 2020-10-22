import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanage-map.css';

import mapIcon from '../utils/mapIcon';

import api from '../services/api';

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {

    const [data, setData] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setData(response.data)
        })
    }, [data])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>

                <footer>
                    <strong>Fortaleza</strong>
                    <span>Ceará</span>
                </footer>
            </aside>

            <Map
                center={[-3.7899266, -38.5889879]}
                zoom={12.5}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`http://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {data.map((orphanage) => (
                    <Marker
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}

            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    )
}

export default OrphanagesMap;