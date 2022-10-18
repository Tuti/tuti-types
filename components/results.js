import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { sendTypeTestResult } from "../firebase/firestore";
import RefreshButton from "./refreshButton";
import styles from '../styles/components/results.module.css';

export default function Results(props) {
  const user = useUser();
  const normalizeFactor = 60 / props.timer.initialTime;
  const wpm = (props.correctCharacterCount / 5) * normalizeFactor; 
  const accuracy = props.correctCharacterCount / props.keystrokeCount;
  const parsedAccuracy = parseFloat((accuracy * 100)).toFixed(2)+'%';
  const incorrectCharacterCount = props.keystrokeCount - props.correctCharacterCount;
  useEffect(() => {
    const sendResults = async () => {
      await sendTypeTestResult({user, 
                                wpm, 
                                accuracy, 
                                correctCharacterCount: props.correctCharacterCount, 
                                keystrokeCount: props.keystrokeCount, 
                                seconds: props.timer.initialTime
                              });
    }
    sendResults();
  }, [])

  return(
    <div className={styles['container']}>
      <ul className={styles['results-data-list']}>
        <li id={styles['wpm']}>
          <div className={styles['wpm-data-value']}>{wpm}</div>
          <div className={styles['wpm-label']}>Wpm</div>
        </li>
        <hr className={styles['solid-separator']}/>
        <li id={styles['accuracy']}>
          <div className={styles['header']}>Accuracy:</div>
          <div className={styles['data-item']}>{parsedAccuracy}</div>
        </li>
        <hr className={styles['solid-separator']}/>
        <li id={styles['keystrokes']}>
          Keystrokes: (
          <span id={styles['correctCharacterCount']}>
            {props.correctCharacterCount}
          </span>
          |
          <span id={styles['incorrectCharacterCount']}>
            {incorrectCharacterCount}
          </span>
          ) {props.keystrokeCount}
        </li>
        <hr className={styles['solid-separator']}/>
        <li id={styles['correct-words']}>
          Words: {props.correctWordCount}
        </li>
      </ul>
        <RefreshButton restartTest={props.restartTest}/>
    </div>
  )
}

