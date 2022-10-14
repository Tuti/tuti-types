import Image from "next/image"
import { Refresh } from './svgs/refresh'
import styles from '../styles/components/refreshbutton.module.css';

export default function RefreshButton(props) {
  return(
    <div className={styles['refresh-button']} onClick={props.restartTestOnClick} onKeyDown={props.restartTest}>
      <Refresh fill={'#F54C80'}/>
      <>Test</>
    </div>
    
  )
}