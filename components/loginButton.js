import { useRouter } from "next/router";
import { Login } from "./svgs/login";
import styles from '../styles/components/loginButton.module.css';

export default function LoginButton() {
  const router = useRouter();

  return(
    <button className={styles['login-button']} onClick={() => {router.push('/login')}}>
      <Login fill={'#F54C80'}/>
    </button>
  )
} 