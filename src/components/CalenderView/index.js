import styles from "./calenderView.module.css";
import CalenderComponent from "./CalenderComponent";
import TimeSlotView from "../TimeSlotView";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { toast } from "react-toastify";
import {useDispatch } from "react-redux";
import { setLoader } from "../../redux/reducer/loader";

const initialHours = 9;
const initialMinutes = 0;
const numberOfSlots = 60;
const initialTimeSlotVariant = 15;

const CalenderView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlotVariant, setSelectedTimeSlotVariant] = useState(
        initialTimeSlotVariant
    );

    const [timeSlots, setTimeSlots] = useState({});
    const [selectedTimeStamp, setSelectedTimeStamp] = useState("");
    const [showModal, setShowModal] = useState(false);    
    const dispatch = useDispatch();

    useEffect(() => {
        let dateTime = new Date(selectedDate);
        // initializing because we need slots starting from a specific hour and minutes
        dateTime.setHours(initialHours);
        dateTime.setMinutes(initialMinutes);
        dateTime.setSeconds(0);
        dateTime.setMilliseconds(0);
        let localTimeSlots = createSlots(initialTimeSlotVariant, dateTime);
        getAvailableSlots(localTimeSlots);
    }, [selectedDate]);

    const handleDateChange = async (value) => {
        setSelectedDate(value);
    };

    const createSlots = (timeInterval, initialDateTimestamp) => {
        try {
            let initialDateTime = initialDateTimestamp;
            let localTimeSlots = {};
            localTimeSlots[initialDateTime.toString()] = {
                isAvailable: 0,
                dateTimeStamp: initialDateTime.toString(),
                isSelected: 0,
            };
            for (let i = 0; i < numberOfSlots - 1; i++) {
                initialDateTime.setMinutes(
                    initialDateTime.getMinutes() + timeInterval
                );
                let dateTimeString = initialDateTime.toString();
                localTimeSlots[dateTimeString] = {
                    isAvailable: 0,
                    dateTimeStamp: dateTimeString,
                    isSelected: 0,
                };
            }

            return { ...localTimeSlots };
        } catch (error) {}
    };

    const getAvailableSlots = async (localTimeSlots) => {
        try {
            dispatch(setLoader({ isLoading: true }));
            const { formattedSelectedDate, nextDate } = getFromattedDates();

            let apiEndPoint = `https://app.appointo.me/scripttag/mock_timeslots?start_date=${formattedSelectedDate}&end_date=${nextDate}`;

            let availableSlots = [];
            await fetch(apiEndPoint, {
                method: "GET",
            })
                .then((response) => {
                    // Check if the response is ok
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

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

                                    // Convert the Uint8Array to a string
                                    const text = new TextDecoder().decode(
                                        result
                                    );
                                    // if array is empty handle the case
                                    availableSlots = JSON.parse(text);
                                    handleAvailableSlot(
                                        availableSlots,
                                        localTimeSlots
                                    );
                                } else {
                                    chunks.push(value);
                                    read();
                                }
                            })
                            .catch((error) => {
                                // Handle any errors that occur during reading
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
        }
    };

    const getFromattedDates = () => {
        try {
            let year = selectedDate.getFullYear();
            let month = String(selectedDate.getMonth() + 1).padStart(2, "0");
            let day = String(selectedDate.getDate()).padStart(2, "0");
            const formattedSelectedDate = `${year}-${month}-${day}`;
            let nextDate = new Date(formattedSelectedDate);
            nextDate.setDate(nextDate.getDate() + 1);
            year = nextDate.getFullYear();
            month = String(nextDate.getMonth() + 1).padStart(2, "0");
            day = String(nextDate.getDate()).padStart(2, "0");
            nextDate = `${year}-${month}-${day}`;

            return { formattedSelectedDate, nextDate };
        } catch (error) {}
    };

    const handleAvailableSlot = (availableSlots, localTimeSlots) => {
        try {
            availableSlots = availableSlots[0]["slots"];

            for (let i = 0; i < availableSlots.length; i++) {
                let startTime = availableSlots[i]["start_time"];
                let endTime = availableSlots[i]["end_time"];
                let endTimeDateObj = new Date(endTime);
                let startTimeDateObj = new Date(startTime);

                const timeDifferenceInMinutes =
                    (endTimeDateObj - startTimeDateObj) / 1000 / 60;

                const multiplier =
                    timeDifferenceInMinutes / initialTimeSlotVariant;

                for (let j = 0; j < multiplier; j++) {
                    let dateTimeString = startTimeDateObj.toString();

                    if (localTimeSlots[dateTimeString]) {
                        localTimeSlots[dateTimeString]["isAvailable"] = 1;
                    }
                    startTimeDateObj.setMinutes(
                        startTimeDateObj.getMinutes() + initialTimeSlotVariant
                    );
                }
            }
            setTimeSlots({ ...localTimeSlots });
            dispatch(setLoader({ isLoading: false }));
        } catch (error) {}
    };

    const handleNextBtn = () => {
        try {
            if (!selectedTimeStamp) {
                // show toast please select a time slot to proceed
                toast(`Please select a time slot to proceed`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    type: "warning",
                });
                return;
            }
            setShowModal(true);
        } catch (error) {}
    };

    return (
        <div className={styles["calendar-container"]}>
            <div className={styles["split-view"]}>
                <div className={styles["view-1"]}>
                    <div className={styles["info"]}>
                        <h3>Test Service</h3>
                        <h6>
                            <span>Timezone:</span> Asia/Calcutta
                        </h6>
                    </div>
                    <div className={styles["calendar-section"]}>
                        <CalenderComponent
                            selectedDate={selectedDate}
                            handleDateChange={handleDateChange}
                            setSelectedDate = {setSelectedDate}
                        />
                    </div>
                </div>
                <div className={styles["view-2"]}>
                    <TimeSlotView
                        timeSlots={timeSlots}
                        selectedTimeSlotVariant={selectedTimeSlotVariant}
                        setSelectedTimeSlotVariant={setSelectedTimeSlotVariant}
                        selectedDate={selectedDate}
                        setSelectedTimeStamp={setSelectedTimeStamp}
                        setTimeSlots={setTimeSlots}
                    />
                </div>
            </div>
            <div className={styles["footer"]}>
                <div className={styles["tag"]}>
                    POWERED BY <a href="#">APPOINTO</a>
                </div>
                <div>
                    <button
                        className={styles["next-btn"]}
                        onClick={handleNextBtn}
                    >
                        Next &nbsp;<span>&#62;</span>
                    </button>
                </div>
            </div>
            {showModal && <Modal setShowModal={setShowModal} />}
        </div>
    );
};

export default CalenderView;
