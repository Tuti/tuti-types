import TimeSelector from "./timeSelector";
import styles from '../styles/components/modifiers.module.css';

export default function Modifiers(props) {
  
  return(
    <div className={!props.isActiveTest ? `${styles['modifiers']}` : `${styles['modifiers']} ${styles['hidden']}`}>
      <TimeSelector 
        timer={props.timer} 
        setTimer={props.setTimer}
        isActiveTest={props.isActiveTest}
        setIsActiveTest={props.setIsActiveTest}
      />
    </div>
  )
}