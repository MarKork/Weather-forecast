import React from "react";

const Snow = ({item}) => {
    let num =""
    if(item){
        num =item.snow["3h"]
        if(num<1){
            const string = "lumisadetta <1 mm"
            return <p>{string}</p>
        }else{
            return <p>lumisadetta {Math.round(num)} mm</p>
        }
    }
    return null

}

export default Snow;