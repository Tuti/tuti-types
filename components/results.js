import Image from "next/image"
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { sendTypeTestResult } from "../firebase/firestore";
import styles from '../styles/components/results.module.css';
import RefreshButton from "./refreshButton";

export default function Results(props) {
  const user = useUser();
  const normalizeFactor = 60 / props.timer.initialTime;
  const wpm = (props.correctCharacterCount / 5) * normalizeFactor; 
  const accuracy = props.correctCharacterCount / props.keystrokeCount;

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
    <div className={styles.container}>
      <ul className={styles.resultData}>
        <li id={styles.wpm}>
          <h2>Wpm</h2>
          <span>{`${wpm}`}</span>
        </li>
        <li id={styles.accuracy}>
          <h2>Accuracy</h2>
          <span>{`${accuracy}%`}</span>
        </li>
      </ul>
      <RefreshButton restartTest={props.restartTest}/>
    </div>
  )
}

