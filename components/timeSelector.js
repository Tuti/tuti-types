
import styles from '../styles/timeSelector.module.css';

export default function TimeSelector() {
  
  const timeLimits = [{seconds: 15, normalizeFactor: 4}, {seconds: 30, normalizeFactor: 2}, {seconds: 60, normalizeFactor: 1}, {seconds: 120, normalizeFactor: .5}]

  return(
    <div className={styles.timeButtons}>
      <button onClick={() => {console.log('clicked selector')}}>
        {timeLimits[0].seconds}    
      </button>
      <button>
        {timeLimits[1].seconds}
      </button>
      <button>
        {timeLimits[2].seconds}
      </button>
      <button>
        {timeLimits[3].seconds}
      </button>
    </div>
  )
}