import { useState } from 'react'
import Modifiers from '../components/modifiers'
import Navbar from '../components/navbar'
import TypeTest from '../components/typetest'
import styles from '../styles/Home.module.css'

export default function Home() {
  const defaultSettings = {
    time: 60, //seconds
    wordList: 'top200',
    wordsPerRow: 12,
  }

  const [isActiveTest, setIsActiveTest] = useState(false);
  const [timer, setTimer] = useState({initialTime: defaultSettings.time, currentTime: 60});

  return (
    <div className={styles.container}>
      <div className={styles['center-content']}>
        <Navbar />
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