import React, { useState,useEffect  } from "react";
import axios from 'axios'
import Today from "./Today";
import NextDays from "./NextDays";

const Search = ({query, lng, lat}) =>{
    const [weather, setWeather] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        if(lng){
            fetchingDataLngLat()
        }
        else if(query){
            fetchingDataQuery(query)
        }else{
            let currentQuery=localStorage.getItem('place')
            if(currentQuery){
                fetchingDataQuery(currentQuery)
            }
        }   
    }, [lng||query])
    
    
    //Fetching the weather data according to longitude and latitude from map
    const fetchingDataLngLat = async()=>{
        if(weather!==null){
            setElementsHidden() 
        }
        setisLoading(true)
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&lang=fi&APPID=af58c95c7c728dd1e20c6d499b294f78`)
        setWeather(data.data)        
        setisLoading(false)
        if(weather!==null){
            setElementsVisible() 
            let info=document.getElementById("info")
            info.style.display='block'
        }
    }

    //Fetching the data according to the input of the input box 
    const fetchingDataQuery = async(query)=>{
        if(weather!==null){
            setElementsHidden() 
        }
        setisLoading(true)
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&lang=fi&APPID=af58c95c7c728dd1e20c6d499b294f78`)
        setWeather(data.data)
        setisLoading(false)   
        if(weather!==null){
            setElementsVisible() 
            let info=document.getElementById("info")
            info.style.display='block'
        }
    }
    
    return(
        <div id="info">
            {isLoading && <div className="loader"></div>}
            {weather && weather.city.name ? 
            <div>
                <Today weather={weather} />
                <NextDays weather={weather}/>
            </div>    
            :null}
        </div>
    )
}

const setElementsHidden = () =>{
    document.getElementsByTagName("h1")[0].style.display="none"
    let ptags = document.getElementsByTagName("p")
    for (let i = 0; i < ptags.length; i++) {
        ptags[i].style.visibility="hidden"
    }
    let h2tags = document.getElementsByTagName("h2")
    for (let i = 0; i < h2tags.length; i++) {
        h2tags[i].style.visibility="hidden"
    }
    let imgtags = document.getElementsByTagName("img")
    for (let i = 0; i < imgtags.length; i++) {
        imgtags[i].style.visibility="hidden"
    }
}

const setElementsVisible = () =>{
    document.getElementsByTagName("h1")[0].style.display="block"
    let ptags = document.getElementsByTagName("p")
    for (let i = 0; i < ptags.length; i++) {
        ptags[i].style.visibility="visible"
    }
    let h2tags = document.getElementsByTagName("h2")
    for (let i = 0; i < h2tags.length; i++) {
        h2tags[i].style.visibility="visible"
    }
    let imgtags = document.getElementsByTagName("img")
    for (let i = 0; i < imgtags.length; i++) {
        imgtags[i].style.visibility="visible"
    }
}

export default Search;