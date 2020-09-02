import React from "react";
import Icon from "./Icon";
import Snow from "./Snow"
import Rain from "./Rain"

const NextDays = ({weather}) => {
    let date = weather.list[0].dt_txt
    let currentDay = new Date(date)
    let hour=currentDay.getHours()
    let addNum 
    let nextDaysData=[]
        
    switch (hour){
        case 0: ;
            addNum = 4
            break;
        case 3: ;
            addNum = 3
            break;
        case 6: ;
            addNum = 2
            break;
        case 9: ;
            addNum = 1
            break;
        case 12: ;
            addNum = 0
            break;
        case 15: ;
            addNum = -1
            break;
        case 18: ;
            addNum = -2
            break;
        case 21: ;
            addNum = -3
            break;    
        default:
            break;
    }

    for(let i = 1; i < 5; i++){
        let comingDay = new Date()
        comingDay.setDate(currentDay.getDate()+i)
        let dayOfWeek = comingDay.getDay()
        
        let nameOfDay
        switch (dayOfWeek) {
            case 1: nameOfDay = "Ma";
                break;
            case 2: nameOfDay = "Ti";
                break;
            case 3: nameOfDay = "Ke";
                break;
            case 4: nameOfDay = "To";
                break;
            case 5: nameOfDay = "Pe";
                break;
            case 6: nameOfDay = "La";
                break;
            case 0: nameOfDay = "Su";
                break;
            default:
                break;
        }

        nextDaysData[i]=weather.list[addNum+(i*8)]
        nextDaysData[i].weekday=nameOfDay
        
    }
    return(
        <div className="next-days" id="next-days">
            {nextDaysData.map((item, key)=>{
                return(
                    <div key={key} id="next">
                        <h2 id="weekday">{item.weekday}</h2>
                        <div id="icon-and-temp">
                            <Icon code={item.weather[0].icon} width="80px" height="80px"/> 
                            <p id="temp">{Math.round(item.main.temp)}°</p>
                        </div>
                        <p id="description">{item.weather[0].description}</p>
                        {item.rain? <Rain item={item}/>:null}
                        {item.snow? <Snow item={item}/>:null}
                    </div>
                )
            })}
        </div>
    )
}

export default NextDays;