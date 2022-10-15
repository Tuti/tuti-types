import { useRouter } from 'next/router';
import { useTestVisible } from '../context/testContext';
import { useUser } from '../context/userContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Login } from './svgs/login';
import { Logout } from './svgs/logout';
import styles from '../styles/components/navbar.module.css';
import LogoutButton from './logoutButton';
import LoginButton from './loginButton';
import AccountButton from './accountButton';

export default function Navbar() {
  const router = useRouter();
  const user = useUser();
  const tv = useTestVisible();

  function routeToHome() {
    tv.setIsTestVisible(true);
    router.push('/');
  }

  function routeToLogin() {
    router.push('/login');
  }

  return(
    <div className={styles.navbar}>
      <div className={styles['left']}>
        <div className={styles['title']} onClick={routeToHome}>Tuti-Types</div>
      </div>
      <div className={styles['right']}>
        {user !== null && 
          <>
            <AccountButton />
            <LogoutButton />
          </>
        }
        {user === null && 
         <LoginButton />
        }
      </div>
    </div>
  )
}