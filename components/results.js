import Image from "next/image"
import styles from '../styles/components/results.module.css';
export default function Results(props) {
  const normalizeFactor = 1
  const wpm = (props.correctCharacterCount / 5) * normalizeFactor; 
  const accuracy = (props.correctCharacterCount / props.keystrokeCount);

  const count = props.correctCharacterCount;
  const keystroke = props.keystrokeCount;

  console.log({wpm, accuracy, count, keystroke});
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
      <button
        onKeyDown={(e) => {props.restartTest(e)}}
      >
        <Image src={'/refresh.svg'} alt={'refresh icon'} width={32} height={24}/>
      </button>
    </div>
  )
}

