import { useRouter } from "next/router";
import { User } from "./svgs/user";
import styles from '../styles/components/loginButton.module.css';

export default function LoginButton() {
  const router = useRouter();

  return(
    <button className={styles['login-button']} onClick={() => {router.push('/login')}}>
      <User fill={'#F54C80'}/>
    </button>
  )
} 