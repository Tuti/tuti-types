import { useEffect, useState } from 'react';
import styles from '../styles/words.module.css';

export default function Words(props) {
  const MAX_CHARACTERS_PER_ROW = 70; //good amount for well formatted row

  useEffect(() => {
    props.fillWordBucket(props.setActiveBucket);
    props.fillWordBucket(props.setNextBucket);
  }, [])

  const activeRow = props.activeBucket.map((value, index) => {
    return <Word 
              key={value.id} 
              className={styles.word} 
              word={value.word}
              isActive={props.activeIndex === index}
              isInputCorrect={props.isInputCorrect}
            />    
  })

  const nextRow = props.nextBucket.map((value) => {
    return <Word 
              key={value.id} 
              className={styles.word} 
              word={value.word}
            />
  })

  return(
    <div className={styles.words}>
      <div className={styles.row}>
        {activeRow}
      </div>
      <div className={styles.row}>
        {nextRow}
      </div>
    </div>
  )
}

function Word(props) {

  // <div className={props.isActive ? `${styles.active} ${styles.word}` : `${styles.word}`}>

  return(
    <div 
      className={ (props.isActive && props.isInputCorrect) ? `${styles.active} ${styles.word}` : 
                  (props.isActive && !props.isInputCorrect) ? `${styles.incorrect} ${styles.word}` : `${styles.word}`}    
    >
      {props.word}
    </div>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
