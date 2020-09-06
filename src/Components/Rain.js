import React from "react";

const Rain = ({item, align}) => {
    let num =""
    if(item){
        num =item.rain["3h"]
        if(num<1){
            const string = "sademäärä <1 mm"
            if(align){
                return <p>{string}</p>
            }
            return <p id="amount">{string}</p>
        }else{
            if(align){
                return <p>sademäärä {Math.round(num)} mm</p>
            }
            return <p id="amount">sademäärä {Math.round(num)} mm</p>
        }
    }
    
   return null
}

export default Rain;