import React, { useState } from 'react'
import "../App.css";
import Search from "./Search";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map =  ()=>{
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    let x = document.getElementById("map");
    x.style.display="block"
    
    let previous = document.getElementById("elem")
    let el
    if(!previous){
        el = document.createElement("DIV");
        el.setAttribute("id", "elem");
        el.style.height="50vh"
        document.getElementById("map").appendChild(el);
        
    }else{
        el=previous
    }
        //Defining a new map
        const map = new mapboxgl.Map({
            container: el,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [24, 61],
            zoom: 6,
        });
  
        // Adding navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        map.getCanvas().style.cursor = "default"
        map.doubleClickZoom.disable();

        //Getting the longitude an latitude of a double click
        map.on('dblclick', function(e) {
            e.preventDefault();
            
            let lngNow = e.lngLat.lng
            let latNow = e.lngLat.lat
            
            setLat(latNow)
            setLng(lngNow)
            
        });

    return (
        <div>
            <div  id="elem" ></div>
            <Search lat={lat} lng={lng} />
        </div>
    )

}

export default Map