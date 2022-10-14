import { useTestVisible } from "../context/testContext";
import useInterval from "../hooks/useInterval";
import styles from '../styles/components/counter.module.css';

export default function Counter(props) {
  const tv = useTestVisible();
  useInterval(() => {
    if(!props.isActiveTest) {
      return;
    }
      
    if(props.isActiveTest && props.timer.currentTime === 0) {
      tv.setIsTestVisible(false)
      props.setIsActiveTest(false);
      return;
    }

    props.setTimer({...props.timer, currentTime: props.timer.currentTime - 1});
  }, 1000);

  return (
    <div className={styles.counter}>{props.timer.currentTime}</div>
  )
}