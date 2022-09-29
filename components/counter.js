import useInterval from "../hooks/useInterval";
import styles from '../styles/counter.module.css';

export default function Counter(props) {
  useInterval(() => {
    if(!props.isActiveTest)
      return;
      
    if(props.isActiveTest && props.timer === 0) {
      props.setIsTestVisible(false);
      props.setIsResultsVisible(true);
      props.setIsActive(false);
      return;
    }

    props.setTimer(props.timer - 1);
  }, 1000);

  return (
    <div className={styles.counter}>{props.timer}</div>
  )
}