import Navbar from "../components/navbar";
import { useUser } from "../context/userContext"
import styles from '../styles/Account.module.css'

export default function Account() {
  const user = useUser();

  return(
    <div className={styles['container']}>
      <Navbar />
      <div className={styles['account-wrapper']}>
        <div>{user?.email}</div>
        <div className={styles['title']}>WORK IN PROGRESS</div>
      </div>
    </div>
  )
}