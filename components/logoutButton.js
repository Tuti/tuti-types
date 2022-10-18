import { auth} from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { Logout } from './svgs/logout';
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