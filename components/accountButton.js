import { useRouter } from "next/router";
import { useUser } from "../context/userContext";
import styles from '../styles/components/accountButton.module.css';

export default function AccountButton(props) {
  const router = useRouter();
  const user = useUser();  
  return(
    <button 
      className={styles['account-button']} 
      onClick={() => {router.push('/account')}}
    > 
      { user.displayName }
    </button>
  )
}