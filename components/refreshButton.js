import { Refresh } from './svgs/refresh'
import styles from '../styles/components/refreshbutton.module.css';

export default function RefreshButton(props) {
  return(
    <button className={styles['refresh-button']} onClick={props.restartTestOnClick} onKeyDown={props.restartTest}>
      <Refresh fill={'#F54C80'}/>
    </button>
  )
}