import TimeSelector from "./timeSelector";
import styles from '../styles/modifiers.module.css';

export default function Modifiers(props) {
  
  return(
    <div className={styles.modifiers}>
      <TimeSelector />
    </div>
  )
}