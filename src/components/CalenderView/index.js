import styles from "./calenderView.module.css";
import CalenderComponent from "./CalenderComponent";
import TimeSlotView from "../TimeSlotView";
import { useEffect, useState } from "react";

const CalenderView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [result, setResult] = useState(null);

    // useEffect(()=>{
    //     getAvailableSlots()
    //     console.log(result)
    // },[result])

    useEffect(() => {
        getAvailableSlots();
    }, [selectedDate]);

    const handleDateChange = async (value) => {
        setSelectedDate(value);
    };

    const getAvailableSlots = async () => {
        try {
            const { formattedSelectedDate, nextDate } = getFromattedDates();
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
                    console.log(response);
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
                                    console.log(result)
                                    // Convert the Uint8Array to a string
                                    const text = new TextDecoder().decode(
                                        result
                                    );
                                    // Process the text data here
                                    console.log(text);
                                    console.log(typeof text)
                                    console.log(JSON.parse(text))
                                    availableSlots = JSON.parse(text)
                                } else {
                                    // Store the chunk in the chunks array
                                    chunks.push(value);
                                    // Continue reading from the stream
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
                    console.log(data);
                });
            // // handle empty results
        } catch (error) {
            // if api break show some message
        }
    };

    const getFromattedDates = () => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const formattedSelectedDate = `${year}-${month}-${day}`;

        const nextDate = new Date(formattedSelectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        console.log(nextDate);

        return { formattedSelectedDate, nextDate };
    };

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
                    <TimeSlotView />
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
