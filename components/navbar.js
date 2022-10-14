import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useUser } from '../context/userContext';
import { auth } from '../firebase/firebase';
import Image from 'next/image';
import styles from '../styles/components/navbar.module.css';
import { useTestVisible } from '../context/testContext';


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
            <div 
              className={styles['button']} 
              onClick={() => {router.push('/account')}}
            > 
              {user?.displayName}
            </div>
            <div
              className={styles['button']} 
              onClick={() => {signOut(auth)}}
            >
              {/* change color later and change fix height alignment*/}
              <Image src={'/signout.svg'} alt={'signout icon'} width={24} height={24}/>
              
            </div>
          </>
        }
        {user === null && 
          <>
            <button onClick={routeToLogin}>login</button>
          </>
        }
      </div>
    </div>
  )
}