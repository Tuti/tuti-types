import { useRouter } from 'next/router';
import { useTestVisible } from '../context/testContext';
import { useUser } from '../context/userContext';
import styles from '../styles/components/navbar.module.css';
import LogoutButton from './logoutButton';
import LoginButton from './loginButton';
import AccountButton from './accountButton';

export default function Navbar() {
  const router = useRouter();
  const user = useUser();
  const tv = useTestVisible();

  function routeToHome() {
    //If pressed in results page, will bring you back to test
    //page with whatever was left in the user input 
    //To fix, will need to pull state up or use a global state manager
    //Will fix in the future once I decide what solution to do
    tv.setIsTestVisible(true);
    router.push('/');
  }

  return(
    <div className={styles['navbar']}>
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