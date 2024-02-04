
import styles from "./header.module.css"


const Header = () => {
    return (
        <div className={styles['header-container']}>
            <div className={styles['banner']}>
                <div>logo</div>
                <div>
                    <h1>Company Name</h1>
                    <h5>Your slogan goes here</h5>
                </div>
            </div>
            <div className={styles['header-items']}>
                <div>Menu</div>
                <div>Contact us</div>
                <div>Share link</div>
            </div>            
        </div>
    )
}

export default Header