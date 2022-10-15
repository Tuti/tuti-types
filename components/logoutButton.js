import { Logout } from './svgs/logout';
import { auth } from '../firebase/firebase';
import styles from '../styles/components/logoutButton.module.css';

export default function LogoutButton () {
  return(
    <button
      className={styles['logout-button']} 
      onClick={() => {signOut(auth)}}
    >
      <Logout fill={'#F54C80'} />
    </button>
  )
}