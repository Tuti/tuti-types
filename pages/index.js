import { useState } from 'react'
import Modifiers from '../components/modifiers'
import Navbar from '../components/navbar'
import TypeTest from '../components/typetest'
import styles from '../styles/Home.module.css'
import { useUser } from '../context/userContext'
import { sendUserData, sendTypeTestResult } from '../firebase/firestore'

export default function Home() {
  const defaultSettings = {
    time: 60, //seconds
    wordList: 'top200',
    wordsPerRow: 12,
  }

  const [isActiveTest, setIsActiveTest] = useState(false);
  const [timer, setTimer] = useState({initialTime: defaultSettings.time, currentTime: 60});
  const user = useUser();

  function test() {
    console.log('test test test');
  }

  return (
    <div className={styles.container}>
      <div>
        <Navbar />
        <Modifiers
          timer={timer} 
          setTimer={setTimer}
          isActiveTest={isActiveTest}
          setIsActiveTest={setIsActiveTest}
        />
      </div>
      
      <div className={styles['center-content']}>
        <TypeTest
          timer={timer} 
          setTimer={setTimer}
          isActiveTest={isActiveTest}
          setIsActiveTest={setIsActiveTest}
        />
      </div>
    </div> 
  )
}
