import Head from 'next/head'
import Image from 'next/image'
import Counter from '../components/counter'
import Modifiers from '../components/modifiers'
import Navbar from '../components/navbar'
import TimeSelector from '../components/timeSelector'
import TypeTest from '../components/typetest'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Navbar />
        <Modifiers />
      </div>
      <div className={styles.middle}>
        <TypeTest />
      </div>
      <div className={styles.bottom}>

      </div>

    </div> 
  )
}
