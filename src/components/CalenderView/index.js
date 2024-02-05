import styles from "./calenderView.module.css";
import CalenderComponent from "./CalenderComponent";
import TimeSlotView from "../TimeSlotView";
import { useEffect, useState } from "react";

const initialHours = 9
const initialMinutes = 0
const numberOfSlots = 60
const initialTimeSlotVariant = 15

const CalenderView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [result, setResult] = useState(null);
    const [selectedTimeSlotVariant,setSelectedTimeSlotVariant] = useState(initialTimeSlotVariant)
    // const [selectedTimeSlotVariant,setSelectedTimeSlotVariant] = useState(30)
    const [timeSlots,setTimeSlots] = useState({})
    

    // useEffect(()=>{
    //     const initialDateTimestamp = new Date();
    //     // console.log(initialDateTimestamp)
    //     initialDateTimestamp.setHours(initialHours);        // Set hours to 9 (for example)
    //     initialDateTimestamp.setMinutes(initialMinutes);      // Set minutes to 0 (for example)
    //     initialDateTimestamp.setSeconds(0);      // Set seconds to 0 (for example)
    //     initialDateTimestamp.setMilliseconds(0)
    //     // console.log(initialDateTimestamp)
    //     createSlots(initialTimeSlotVariant,initialDateTimestamp)
    // },[])

    useEffect(() => {
        
        let dateTime = new Date(selectedDate)
        // initializing because we need slots starting from a specific hour and minutes
        dateTime.setHours(initialHours);        // Set hours to 9 (for example)
        dateTime.setMinutes(initialMinutes);      // Set minutes to 0 (for example)
        dateTime.setSeconds(0);      // Set seconds to 0 (for example)
        dateTime.setMilliseconds(0)
        
        // createSlots(selectedTimeSlotVariant,dateTime)
        let localTimeSlots = createSlots(initialTimeSlotVariant,dateTime)
        getAvailableSlots(localTimeSlots);
    }, [selectedDate]);

    const handleDateChange = async (value) => {
        // console.log(typeof value)
        setSelectedDate(value);

    };

    const createSlots = (timeInterval,initialDateTimestamp) => {
        // console.log(initialDateTimestamp)
        // let initialDateTime = new Date(initialDateTimestamp)
        let initialDateTime = initialDateTimestamp
        // let localTimeSlots = timeSlots
        let localTimeSlots = {}
        localTimeSlots[initialDateTime.toString()] = {"isAvailable": 0, "dateTimeStamp": initialDateTime.toString(), "isSelected": 0}
        for(let i = 0; i < numberOfSlots-1; i++){
            initialDateTime.setMinutes(initialDateTime.getMinutes() + timeInterval);
            // console.log(initialDateTimestamp)
            let dateTimeString = initialDateTime.toString()
            localTimeSlots[dateTimeString] = {"isAvailable": 0, "dateTimeStamp": dateTimeString, "isSelected": 0}
        }
        console.log(localTimeSlots)
        // setTimeSlots({...localTimeSlots})
        return {...localTimeSlots}

    }

    const getAvailableSlots = async (localTimeSlots) => {
        try {
            // console.log(timeSlots)
            const { formattedSelectedDate, nextDate } = getFromattedDates();
            // console.log({ formattedSelectedDate, nextDate })
            // yesterday.setDate(yesterday.getDate() - 1)

            let apiEndPoint = `https://app.appointo.me/scripttag/mock_timeslots?start_date=${formattedSelectedDate}&end_date=${nextDate}`;
            // console.log(apiEndPoint)
            let availableSlots = []
            await fetch(apiEndPoint, {
                method: "GET",
            })
                .then((response) => {
                    // Check if the response is ok
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    // console.log(response);
                    // response = response.json();
                    // console.log(response);
                    // return response.json();

                    const reader = response.body.getReader();
                    // Initialize a Uint8Array to store chunks of data
                    const chunks = [];
                    // Define a function to recursively read chunks from the stream
                    function read() {
                        // Read a chunk from the stream
                        reader
                            .read()
                            .then(({ done, value }) => {
                                // Check if the stream has been fully consumed
                                if (done) {
                                    // Concatenate all chunks into a single Uint8Array
                                    const result = new Uint8Array(
                                        chunks.reduce(
                                            (acc, chunk) =>
                                                acc.concat(Array.from(chunk)),
                                            []
                                        )
                                    );
                                    // console.log(result)
                                    // Convert the Uint8Array to a string
                                    const text = new TextDecoder().decode(
                                        result
                                    );
                                    // if array is empty handle the case
                                    availableSlots = JSON.parse(text)
                                    handleAvailableSlot(availableSlots,localTimeSlots)
                                } else {
                                    
                                    chunks.push(value);                                    
                                    read();
                                }
                            })
                            .catch((error) => {
                                // Handle any errors that occur during reading
                                console.error(
                                    "Error reading from stream:",
                                    error
                                );
                            });
                    }
                    read();
                })
                .then((data) => {
                    // Process the data here
                    // console.log(data);
                });
            // // handle empty results
        } catch (error) {
            // if api break show some message
            console.log(error)
        }
    };

    const getFromattedDates = () => {
        // console.log(selectedDate)
        let year = selectedDate.getFullYear();
        let month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        let day = String(selectedDate.getDate()).padStart(2, "0");
        const formattedSelectedDate = `${year}-${month}-${day}`;
        // console.log(formattedSelectedDate)
        let nextDate = new Date(formattedSelectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        year = nextDate.getFullYear();
        month = String(nextDate.getMonth() + 1).padStart(2, "0");
        day = String(nextDate.getDate()).padStart(2, "0");
        nextDate = `${year}-${month}-${day}`;

        // console.log(nextDate);

        return { formattedSelectedDate, nextDate };
    };

    const handleAvailableSlot = (availableSlots,localTimeSlots) => {
        
        availableSlots = availableSlots[0]['slots']
        // console.log(availableSlots)
        // let localTimeSlots = localTimeSlots
        // console.log(localTimeSlots)
        for(let i=0; i < availableSlots.length; i++){
            let startTime = availableSlots[i]['start_time']
            // console.log(startTime)
            let endTime = availableSlots[i]['end_time']
            let endTimeDateObj = new Date(endTime)
            let startTimeDateObj = new Date(startTime)
            // console.log(startTimeDateObj)
            const timeDifferenceInMinutes =  ((endTimeDateObj - startTimeDateObj)/1000)/60
            // console.log(timeDifferenceInMinutes)
            const multiplier = timeDifferenceInMinutes/initialTimeSlotVariant
            // console.log(multiplier)
            for(let j = 0; j < multiplier; j++){
                
                // console.log(startTimeDateObj)
                let dateTimeString = startTimeDateObj.toString()
                // console.log(dateTimeString)
                if(localTimeSlots[dateTimeString]){
                    // console.log(dateTimeString)
                    localTimeSlots[dateTimeString]["isAvailable"] = 1
                }
                startTimeDateObj.setMinutes(startTimeDateObj.getMinutes() + initialTimeSlotVariant);
            }

        }
        // console.log(localTimeSlots)
        // console.log(Object.values(localTimeSlots))
        setTimeSlots({...localTimeSlots})
    }

    return (
        <div className={styles["calendar-container"]}>
            <div className={styles["split-view"]}>
                <div className={styles["view-1"]}>
                    <h3>Test Service</h3>
                    <h6>Timezone: Asia/Calcutta</h6>
                    <div>
                        <CalenderComponent
                            selectedDate={selectedDate}
                            handleDateChange={handleDateChange}
                        />
                    </div>
                </div>
                <div className={styles["view-2"]}>
                    <TimeSlotView timeSlots = {timeSlots} selectedTimeSlotVariant = {selectedTimeSlotVariant} setSelectedTimeSlotVariant = {setSelectedTimeSlotVariant} selectedDate = {selectedDate}/>
                </div>
            </div>
            <div className={styles["footer"]}>
                <div>POWERED BY APPOINTO</div>
                <div>
                    <button>
                        Next <span>&#62;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalenderView;
