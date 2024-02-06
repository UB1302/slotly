import { useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import styles from "./timeSlotView.module.css";
import Loader from "../Loader";

const timeSlotVariants = {
    15: {
        label: "15 min",
        value: 15,
        name: "15-min",
    },
    30: {
        label: "30 min",
        value: 30,
        name: "30-min",
    },
    45: {
        label: "45 min",
        value: 45,
        name: "45-min",
    },
    60: {
        label: "60 min",
        value: 60,
        name: "60-min",
    },
};
const Months = {"0":"JANUARY","1":"FEBRUARY","2":"MARCH","3":"APRIL","4":"MAY","5":"JUNE","6":"JULY","7":"AUGUST","8":"SEPTEMER","9":"OCTOBER","10":"NOVEMBER","11":"DECEMBER"}
const Days = {"0":"SUNDAY","1":"MONDAY","2":"TUESDAY","3":"WEDNESDAY","4":"THURSDAY","5":"FRIDAY","6":"SATURDAY"}
const initialHours = 9;
const initialMinutes = 0;
const numberOfSlots = 60;
const initialTimeSlotVariant = 15;

const TimeSlotView = ({
    timeSlots,
    selectedTimeSlotVariant,
    setSelectedTimeSlotVariant,
    selectedDate,
    setSelectedTimeStamp,
    isLoading,
    setTimeSlots
}) => {
    const [listOfTimeSlots, setListOfTimeSlots] = useState({});

    useEffect(() => {        
        if (Object.values(timeSlots).length) {
            
            generateTimeSlotList();
        }
    }, [timeSlots, selectedTimeSlotVariant]);

    const generateTimeSlotList = () => {
        let dateTime = new Date(selectedDate);
        dateTime.setHours(initialHours);
        dateTime.setMinutes(initialMinutes);
        dateTime.setSeconds(0);
        dateTime.setMilliseconds(0);
        let localListOfTimeSlots = {};
        let startTimeObj = dateTime;
      
        for (
            let i = 0;
            i <
            numberOfSlots / (selectedTimeSlotVariant / initialTimeSlotVariant);
            i++
        ) {
            
            const multiplier = selectedTimeSlotVariant / initialTimeSlotVariant;
            
            let isAvailable = 1;
            let timeObj = new Date(startTimeObj);
            
            for (let j = 0; j < multiplier; j++) {                

                let dateTimeString = timeObj.toString();                
                if (!timeSlots[dateTimeString]?.["isAvailable"]) {
                    isAvailable = 0;
                    break;
                }
                timeObj.setMinutes(
                    timeObj.getMinutes() + initialTimeSlotVariant
                );
            }
            if (isAvailable) {
                let availableStartTimeObj = new Date(startTimeObj);

                let availableEndTimeObj = new Date(startTimeObj);
                availableEndTimeObj.setMinutes(
                    availableEndTimeObj.getMinutes() + selectedTimeSlotVariant
                );
                let startTimeAmPm =
                    availableStartTimeObj.getHours() >= 12 ? `PM` : `AM`;
                
                let startTime = `${availableStartTimeObj.getHours()}:${availableStartTimeObj.getMinutes() === 0 ? "00" : availableStartTimeObj.getMinutes()} ${startTimeAmPm}`;
                let endTimeAmPm =
                    availableEndTimeObj.getHours() >= 12 ? `PM` : `AM`;
                let endTime = `${availableEndTimeObj.getHours()}:${availableEndTimeObj.getMinutes() === 0 ? "00" : availableEndTimeObj.getMinutes()} ${endTimeAmPm}`;
                localListOfTimeSlots[startTimeObj] = {
                    startDateTimeStamp: startTimeObj.toString(),
                    endDateTimeStamp: availableEndTimeObj.toString(),
                    isSelected: 0,
                    startTime: startTime,
                    endTime: endTime,
                };
            }

            startTimeObj.setMinutes(
                startTimeObj.getMinutes() + selectedTimeSlotVariant
            );
        }
        
        setListOfTimeSlots({ ...localListOfTimeSlots });
        return
    };

    const handleSlotVariant = (e) => {
        let timeSlotVariant = e.target.value;
        timeSlotVariant = parseInt(timeSlotVariant);
        setSelectedTimeSlotVariant(timeSlotVariant);
        return
    };

    const handleTimeSlotSelection = (startDateTimeStamp) => {
        let localListOfTimeSlots = listOfTimeSlots;        
        let selectedValue = "";

        for (let key in localListOfTimeSlots) {
           if(localListOfTimeSlots[key]["isSelected"] === 1){
            selectedValue = key
           }
            localListOfTimeSlots[key]["isSelected"] = 0;
        }
        if(selectedValue === startDateTimeStamp){

        }else{
            localListOfTimeSlots[startDateTimeStamp]["isSelected"] = 1
            setSelectedTimeStamp(startDateTimeStamp)
            // let startDateTimeStampObj = new Date(startDateTimeStamp)
            // let localTimeSlots = {...timeSlots}
            // console.log(localTimeSlots)
            // const multiplier = selectedTimeSlotVariant / initialTimeSlotVariant;
                        
            // // let timeObj = new Date(startTimeObj);
            
            // for (let j = 0; j < multiplier; j++) {                

            //     let dateTimeString = startDateTimeStampObj.toString();            
            //     localTimeSlots[dateTimeString]["isAvailable"] = 0
            //     startDateTimeStampObj.setMinutes(
            //         startDateTimeStampObj.getMinutes() + initialTimeSlotVariant
            //     );
            // }
            // console.log(localTimeSlots)
            // setTimeSlots({...localTimeSlots})
            // set timeslots
        }

        setListOfTimeSlots({ ...localListOfTimeSlots });
        return
    };

    return (
        <div className={styles["time-slot-container"]}>
            <h6>SELECT FROM VARIANTS</h6>
            <div className={styles["select-container"]}>
                <select name="" onChange={handleSlotVariant}>
                    {Object.values(timeSlotVariants).map(
                        (timeSlotVariantObj) => (
                            <option value={timeSlotVariantObj?.value}>
                                {timeSlotVariantObj?.label}
                            </option>
                        )
                    )}
                </select>
            </div>
            <hr />
            <h6>{`${Days[selectedDate.getDay()]},${(Months[selectedDate.getMonth()]).substring(0,3)} ${selectedDate.getDate()}`} - AVAILABLE SLOTS</h6>
            {isLoading ? <Loader/> : 
            <div className={styles["time-slot-section"]}>
                {/* show available slots */}
                {Object.values(listOfTimeSlots).length ? Object.values(listOfTimeSlots).map((timeStampObj) => {
                    return (
                        <div className="">
                            <TimeSlot
                                timeStampObj={timeStampObj}
                                handleTimeSlotSelection={
                                    handleTimeSlotSelection
                                }
                            />
                        </div>
                    );
                }) : <div>Sorry! No slot available</div>}
            </div>
}
        </div>
    );
};
{/* <img className="pyxl-absolute pyxl-top-0 pyxl-left-0 pyxl-food-classify-spinner-animate pyxl-w-full pyxl-h-full " src="https://spyne-static.s3.amazonaws.com/console/project/orange-ellipse.svg" /> */}
export default TimeSlotView;
