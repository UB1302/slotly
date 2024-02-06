import styles from "./loader.module.css"

const Loader = () => {
    return (
        <div className={styles['loader-container']}><img src="./loader.svg"/></div>
    )
}

export default Loader