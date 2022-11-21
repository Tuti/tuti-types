import { useState } from 'react'
import Head from 'next/head';
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
      <Head>
        <title>Tuti Types</title>
        <meta name="Tuti Types" content="a typing test website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar />
        <Modifiers
          timer={timer} 
          setTimer={setTimer}
          isActiveTest={isActiveTest}
          setIsActiveTest={setIsActiveTest}
        />
      </nav>
      
      <main className={styles['center-content']}>
        <TypeTest
          timer={timer} 
          setTimer={setTimer}
          isActiveTest={isActiveTest}
          setIsActiveTest={setIsActiveTest}
        />
      </main>
    </div> 
  )
}
