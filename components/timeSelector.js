
import styles from '../styles/timeSelector.module.css';

export default function TimeSelector() {
  
  const timeLimits = [{seconds: 15, normalizeFactor: 4}, {seconds: 30, normalizeFactor: 2}, {seconds: 60, normalizeFactor: 1}, {seconds: 120, normalizeFactor: .5}]

  return(
    <div className={styles.buttonGroup}>
      <div className={styles.textButton} onClick={()=> {console.log('clicked')}}>
        {timeLimits[0].seconds}    
      </div>
      <div className={styles.textButton}>
        {timeLimits[1].seconds}
      </div>
      <div className={styles.textButton}>
        {timeLimits[2].seconds}
      </div>
      <div className={styles.textButton}>
        {timeLimits[3].seconds}
      </div>



      {/* <button onClick={() => {console.log('clicked selector')}}>
      </button>
      <button>
      </button>
      <button>
      </button>
      <button>
      </button> */}
    </div>
  )
}