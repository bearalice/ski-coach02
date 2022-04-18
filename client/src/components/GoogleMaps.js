import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";


const Map = ({ coordinates }) => {
    const [center, setCenter] = useState({ lat: 49.15, lng: -122.8 });
    const [zoom, setZoom] = useState(10);
    const MAPKEY = process.env.REACT_APP_MAPKEY;
    return (
        <>
            <h3>Fantastic ski coaches and where to find them</h3>

            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: MAPKEY }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    {/* {partners.map(function (p) {
          return <Marker lat={p[1]} lng={p[0]} name="My Marker" color="blue" />;
        })} */}
                    {coordinates.map(function (p) {
                        return <Marker key={p} lat={p[1]} lng={p[0]} name={p[2]} color="red" />;
                    })}
                </GoogleMapReact>
            </div>
        </>
    );
};

export default Map;