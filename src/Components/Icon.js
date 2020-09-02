import React from "react";

const Icon = ({code, width, height}) =>{
    let url=`http://openweathermap.org/img/wn/${code}@2x.png` 
    
    return(
        <div>
             <img className="pic" alt="icon of weather description" src={url} style={{width:width, heigth:height}}></img>
        </div>
    )
}

export default Icon;