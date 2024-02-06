import styles from "./loader.module.css"

const Loader = () => {
    return (
        <div className={styles['loader-container']}><img src="./loader.svg" alt="loader"/></div>
    )
}

export default Loader