import Image from "next/image"
import styles from '../styles/components/refreshbutton.module.css';

export default function RefreshButton(props) {
  return(
    <>
      <button className={styles.refresh} onClick={props.restartTest} onKeyDown={props.restartTest}>
        <Image src={'/refresh.svg'} alt={'refresh icon'} width={32} height={24}/>
      </button>
    </>
  )
}