import Header from "../Header";
import styles from "./home.module.css";
import CalenderView from "../CalenderView";

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className={styles["calender-view"]}>
        <div className={styles["calender-section"]}><CalenderView/></div>
      </div>
    </div>
  );
};

export default Home;
