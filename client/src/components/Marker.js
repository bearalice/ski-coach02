import React from "react";
import "../App.css";

const Marker = (props) => {
    const { color, lat, lng, name } = props;
    return (
        <div>

            <div
                className="pin"
                style={{ backgroundColor: color, cursor: "pointer" }}
                // position="absolute"
                // title={`lat:${lat}, lng:${lng}`}
                title={name}
            />
            <div className="pulse" />
        </div>
    );
};

export default Marker;