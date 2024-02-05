import styles from "./timeSlot.module.css"

const TimeSlot = ({timeStampObj,handleTimeSlotSelection}) => {
    return (
        <div>
            <div className={timeStampObj.isSelected ? styles["time-slot-container-selected"] :  styles["time-slot-container"]} onClick={() => handleTimeSlotSelection(timeStampObj.startDateTimeStamp)}>
                {`${timeStampObj.startTime}-${timeStampObj.endTime}`}
            </div>
        </div>
    )
}

export default TimeSlot