import styles from "./calenderView.module.css";
import CalenderComponent from "./CalenderComponent";
const CalenderView = () => {
    return (
        <div className={styles["calendar-container"]}>
            <div className={styles["split-view"]}>
                <div className={styles["view-1"]}>
                    <h3>Test Service</h3>
                    <h6>Timezone: Asia/Calcutta</h6>
                    <div>
                        <CalenderComponent />
                    </div>
                </div>
                <div className={styles["view-2"]}>
                    <div>yo</div>
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
