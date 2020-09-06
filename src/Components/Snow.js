import React from "react";

const Snow = ({item, align}) => {
    let num =""
    if(item){
        num =item.snow["3h"]
        if(num<1){
            const string = "lumisadetta <1 mm"
            if(align){
                return <p>{string}</p>
            }
            return <p id="amount">{string}</p>
        }else{
            if(align){
                return <p>lumisadetta {Math.round(num)} mm</p>
            }
            return <p id="amount">lumisadetta {Math.round(num)} mm</p>
        }
    }
    return null

}

export default Snow;