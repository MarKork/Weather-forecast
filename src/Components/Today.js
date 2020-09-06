import React from "react";
import Icon from "./Icon";
import Snow from "./Snow"
import Rain from "./Rain"

const Today = ({weather}) => {

    let currentPlace=weather.city.name
    localStorage.setItem('place', currentPlace)
    let later=[]
    for(let i = 1; i < 5; i++){
        later[i-1]=weather.list[i]
    }

    return (
        <div>
            <div className="today" id="today">
                <h1 id="name-of-place">{weather.city.name}</h1>
                <div id="icon-side">
                    <Icon code={weather.list[0].weather[0].icon} width="200px" height="200px"/>
                </div>
                <div id="text-side">
                    <p id="main-temp">{Math.round(weather.list[0].main.temp)}°</p>
                    <p>tuntuu kuin {Math.round(weather.list[0].main.feels_like)}°</p>
                    <p>{weather.list[0].weather[0].description}</p>
                    {weather.list[0].rain? <Rain item={weather.list[0]} align="left"/>:null}
                    {weather.list[0].snow? <Snow item={weather.list[0]} align="left"/>:null}
                    <p>tuuli {Math.round(weather.list[0].wind.speed)} m/s</p>
                    <p>ilmankosteus {weather.list[0].main.humidity}%</p>
                </div>           
            </div>
            <div className="later-today" id="later-today">
                {later.map((item, key)=>{
                    return(
                        <div key={key} id="weather-later">
                            <Time time={item.dt_txt}/>
                            <div id="icon-and-temp">
                                <Icon code={item.weather[0].icon} width="80px" height="80px" />
                                <p id="temp">{Math.round(item.main.temp)}°</p>
                            </div>
                            <p id="description">{item.weather[0].description}</p>
                            {item.rain? <Rain item={item}/>:null}
                            {item.snow? <Snow item={item}/>:null}
                        </div>
                    )
                })}
            </div>
        </div>   
    )
}

const Time = ({time}) => {
    let currentTime = new Date(time)
    let hours = currentTime.getHours()
    let timeHere = hours + ":00"

    return(
        <p id="time">klo {timeHere}</p>
    )
}

export default Today;