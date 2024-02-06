import styles from "./header.module.css";

const Header = () => {
    return (
        <div className={styles["header-container"]}>
            <div className={styles["banner"]}>
                <div>
                    <img src="./time.png" />
                </div>
                <div>
                    <h1>Company Name</h1>
                    <h5>Your slogan goes here</h5>
                </div>
            </div>
            <div className={styles["header-items"]}>
                <div className="dropdown">
                    <div className="dropbtn">
                        <div>Menu &nbsp;</div>
                        <div className="dropbtn-arrow">&#8964;</div>
                    </div>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div className={styles["contact-us"]}>Contact us</div>
                <div className={styles["share-link"]}>
                    <div>
                        <img src="./link.png" />
                    </div>
                    <div>Share link</div>
                </div>
            </div>
        </div>
    );
};

export default Header;
