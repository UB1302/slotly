
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

const TimeSlotView = ({}) => {


    const handleSlotVariant = (e) => {
        console.log(e.target.value)
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
            </div>
        </div>
    );
};

export default TimeSlotView;
