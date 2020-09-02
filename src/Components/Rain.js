import React from "react";

const Rain = ({item}) => {
    
    let num =""
    if(item){
        num =item.rain["3h"]
        if(num<1){
            const string = "sademäärä <1 mm"
            return <p>{string}</p>
        }else{
            return <p>sademäärä {Math.round(num)} mm</p>
        }
    }
    
   return null
}

export default Rain;