import React, { useState } from 'react'
import "../App.css";
import Map from "./Map";
import Search from "./Search"
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Weather =  ()=>{
    const [query, setQuery] = React.useState(localStorage.getItem('place'));
    const [showMap, setShowMap] = useState(false)

    //Handling the clicking of the button which is for searching a place
    const handleClick = () => {
        setShowMap(false)
        const value = document.getElementById('input-box').value
        if(value){
            setQuery(value)
            localStorage.setItem('place', value)
        }
        if(value===''){
            let oldValue=localStorage.getItem('place')
            setQuery(oldValue)
        }
        let map = document.getElementById("map")
        if(map){
            map.style.display='none'
        }
        
        document.getElementById('input-box').value = ''
        let butt = document.getElementById("get-place-from-map")
        butt.innerText="Valitse paikka kartalta"
        setShowMap(false)
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
        setQuery(null)
        let butt = document.getElementById("get-place-from-map")
        if(butt.innerText==="Valitse paikka kartalta"){
            butt.innerText="Sulje kartta"
            setShowMap(true)
            let info=document.getElementById("info")
            if(info){
               info.style.display='none'
            }
        }else{
            butt.innerText="Valitse paikka kartalta"
            setShowMap(false)
            let currentMap = document.getElementById("map")
            currentMap.style.display = "none"  
            let oldPlace = localStorage.getItem('place')
            if(oldPlace){
                setQuery(oldPlace)
            }
        } 
    }

    
    return(
        <div>
            <nav>
                <div className="searchForm">
                    <input type="text" placeholder="Hae paikkakuntaa" id="input-box" size="18"/>
                    <button onClick={handleClick} id="search-button">Hae</button>
                    <button onClick={handleMapButton} id="get-place-from-map">Valitse paikka kartalta</button>
                </div>
                
            </nav>
            <div id="mapAndInfo">
                {showMap? <Map />:null}
                <div id="map" style={{display: "none"}}></div>
                {query? <Search query={query}/>:null}
            </div>
        </div>
    )
    
}

export default Weather