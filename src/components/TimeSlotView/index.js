import { useEffect, useState } from "react"
import TimeSlot from "./TimeSlot"

const timeSlotVariants = {
    "15": {
        "label": "15 min",
        "value": 15,
        "name": "15-min"
    },
    "30": {
        "label": "30 min",
        "value": 30,
        "name": "30-min"
    },
    "45": {
        "label": "45 min",
        "value": 45,
        "name": "45-min"
    },
    "60": {
        "label": "60 min",
        "value": 60,
        "name": "60-min"
    }
}
const initialHours = 9
const initialMinutes = 0
const numberOfSlots = 60
const initialTimeSlotVariant = 15

const TimeSlotView = ({timeSlots,selectedTimeSlotVariant,setSelectedTimeSlotVariant,selectedDate}) => {

    const [listOfTimeSlots,setListOfTimeSlots] = useState({})

    useEffect(()=>{
        console.log(timeSlots)
        if(Object.values(timeSlots).length){
            console.log("yo")
            generateTimeSlotList()
        }   
        
    },[timeSlots,selectedTimeSlotVariant])
    
    const generateTimeSlotList = () => {
        let dateTime = new Date(selectedDate)
        dateTime.setHours(initialHours);        
        dateTime.setMinutes(initialMinutes);     
        dateTime.setSeconds(0);  
        dateTime.setMilliseconds(0)
        let localListOfTimeSlots = {}
        let startTimeObj = dateTime
        console.log(numberOfSlots,selectedTimeSlotVariant,initialTimeSlotVariant)
        console.log((numberOfSlots/(selectedTimeSlotVariant/initialTimeSlotVariant)))
        for(let i = 0; i < (numberOfSlots/(selectedTimeSlotVariant/initialTimeSlotVariant));i++){
            // // console.log(startTimeObj)
            const multiplier = selectedTimeSlotVariant/initialTimeSlotVariant
            // // console.log(selectedTimeSlotVariant/initialTimeSlotVariant)
            let isAvailable = 1
            let timeObj = new Date(startTimeObj)
            // console.log(timeObj)
            console.log("-----------",timeObj,'---------',multiplier)
            for(let j = 0; j < multiplier; j++){
                
                // console.log(startTimeObj)
                
                let dateTimeString = timeObj.toString()
                // console.log(timeSlots)
                console.log(dateTimeString)
                if(!(timeSlots[dateTimeString]?.["isAvailable"])){
                    isAvailable = 0
                    break;
                }
                timeObj.setMinutes(timeObj.getMinutes() + initialTimeSlotVariant);

                 
            }
            if(isAvailable){
            
                let availableStartTimeObj = new Date(startTimeObj)
            
                let availableEndTimeObj = new Date(startTimeObj)
                availableEndTimeObj.setMinutes(availableEndTimeObj.getMinutes()+ selectedTimeSlotVariant)
                let startTimeAmPm = availableStartTimeObj.getHours() >= 12 ? `PM` : `AM`
                console.log(startTimeAmPm)
                let startTime = `${availableStartTimeObj.getHours()}:${availableStartTimeObj.getMinutes()} ${startTimeAmPm}`
                let endTimeAmPm = availableEndTimeObj.getHours() >= 12 ? `PM` : `AM`
                let endTime = `${availableEndTimeObj.getHours()}:${availableEndTimeObj.getMinutes()} ${endTimeAmPm}`
                localListOfTimeSlots[startTimeObj] = {"startDateTimeStamp": startTimeObj.toString(),"endDateTimeStamp":  availableEndTimeObj.toString(),"isSelected": 0, "startTime": startTime, "endTime": endTime}
            }
            
            startTimeObj.setMinutes(startTimeObj.getMinutes() + selectedTimeSlotVariant);
            
        }
       console.log(localListOfTimeSlots)
       setListOfTimeSlots({...localListOfTimeSlots})

    }

    const handleSlotVariant = (e) => {
        let timeSlotVariant = e.target.value        
        timeSlotVariant = parseInt(timeSlotVariant)        
        setSelectedTimeSlotVariant(timeSlotVariant)
    }

    const handleTimeSlotSelection = (startDateTimeStamp) => {
        let localListOfTimeSlots = listOfTimeSlots
        for(let key in localListOfTimeSlots){
            localListOfTimeSlots[key]["isSelected"] = 0
        }
        localListOfTimeSlots[startDateTimeStamp]["isSelected"] = 1
        setListOfTimeSlots({...localListOfTimeSlots})
    }

    return (
        <div>
            <h6>SELECT FROM VARIANTS</h6>
            <div>
                <select name = "" onChange={handleSlotVariant}>
                    {
                        Object.values(timeSlotVariants).map((timeSlotVariantObj) => 
                            <option value={timeSlotVariantObj?.value}>{timeSlotVariantObj?.label}</option>
                        )
                    }
                    
                </select>
            </div>
            <hr/>
            <h6>DAY, DATE - AVAILABLE SLOTS</h6>
            <div>
                {/* show available slots */}
                {Object.values(listOfTimeSlots).map(timeStampObj => {
                    return <div className="">                        
                        <TimeSlot timeStampObj = {timeStampObj} handleTimeSlotSelection={handleTimeSlotSelection}/>
                    </div>
                })}
            </div>
        </div>
    );
};

export default TimeSlotView;
