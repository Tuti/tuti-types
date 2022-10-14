
import styles from '../styles/components/timeSelector.module.css';

export default function TimeSelector(props) {
  const timeLimits = [{seconds: 15}, {seconds: 30}, {seconds: 60}, {seconds: 120}];
 
  function handleClick(time) {
    props.setTimer({initialTime: time, currentTime: time});
  }
 
  const timeLimitSelector = timeLimits.map((time, index) => {
    return (
      <div 
        key={index} 
        className={(props.timer.initialTime === time.seconds) ? styles['text-button-active'] : styles['text-button']} 
        onClick={() => handleClick(time.seconds)}
      >
        {time.seconds}
      </div>
    )
  });

  return(
    <div className={styles['button-group']}>
      {timeLimitSelector}
    </div>
  )
}