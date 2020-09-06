import React, { useState, useEffect } from 'react'
import "../App.css";
import Search from "./Search"
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Weather =  ()=>{
    const [query, setQuery] = React.useState(localStorage.getItem('place'));
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    
    useEffect(() => {
        let m = document.createElement("DIV");
        m.setAttribute("id", "map");
        let root = document.getElementById("weather")
        let info = document.getElementById("forecast")
        root.insertBefore( m,info)
        
        let el = document.createElement("DIV");
        el.setAttribute("id", "elem");
        el.style.height="50vh"
        document.getElementById("map").appendChild(el);
       
        const map = new mapboxgl.Map({
            container: el, 
            style: "mapbox://styles/mapbox/streets-v11", 
            center: [24, 61],
            zoom: 6,
        });
    
        map.on("load", () => {
            map.resize();
        });
        
        // Adding navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        map.getCanvas().style.cursor = "default"
        map.doubleClickZoom.disable();

        //Getting the longitude an latitude of a double click
        map.on('dblclick', function(e) {
            e.preventDefault();
            setLat(e.lngLat.lat)
            setLng(e.lngLat.lng)
        });
        m.style.display='none'
    }, []);


    //Handling the clicking of the button which is for searching a place
    const handleClick = () => {
        const value = document.getElementById('input-box').value
        if(value===''){
            let oldValue=localStorage.getItem('place')
            setQuery(oldValue)
            return null
        }
        
        setQuery(value)
        localStorage.setItem('place', value)
        let map = document.getElementById("map")
        if(map){
            map.style.display='none'
        }
        
        document.getElementById('input-box').value = ''
        let butt = document.getElementById("get-place-from-map")
        butt.innerText="Valitse paikka kartalta"
        setLat('')
        setLng('')
    }
    
    //Giving the focus to Search-button after writing the place to input box
    var input = document.getElementById("input-box");
    if(input){
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("search-button").click();
            }
        });
    }

    //Handling the clicking of the button which opens a map
    const handleMapButton = () =>{
        let butt = document.getElementById("get-place-from-map")
        if(butt.innerText==="Valitse paikka kartalta"){
            butt.innerText="Sulje kartta"
            let currentMap=document.getElementById("map")
            if(currentMap){
                currentMap.style.display='block'
            }
        }else{
            butt.innerText="Valitse paikka kartalta"
            let currentMap = document.getElementById("map")
            currentMap.style.display = "none"  
            let oldPlace = localStorage.getItem('place')
            if(oldPlace){
                setQuery(oldPlace)
            }
        } 
    }
    
    return(
        <div id="weather">
            <nav>
                <div className="searchForm">
                    <input type="text" placeholder="Hae paikkakuntaa" id="input-box"/>
                    <button onClick={handleClick} id="search-button">Hae</button>
                    <button onClick={handleMapButton} id="get-place-from-map">Valitse paikka kartalta</button>
                </div>
            </nav>
            <div id="forecast">
                <Search query={query} lat={lat} lng={lng}/>
            </div>
        </div>
    )
}

export default Weather