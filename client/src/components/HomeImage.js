import React from 'react'
import { Card, Image } from 'react-bootstrap';

export default function HomeImage() {
    return (
        <>

            <div className="container">
                <h1>Welcome to Slide! </h1>
                <h3>A place to find the best ski and snowboard coaches.</h3>
                <h3>Ignite your passion for sliding!</h3>
                <Image className="img-fluid" src="https://source.unsplash.com/xZIFEPtRsRI" />
            </div>

        </>
    )
}
