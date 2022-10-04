import { useEffect, useState } from 'react';
import styles from '../styles/words.module.css';

export default function Words(props) {

  const activeRow = props.wordBucket.slice(props.rowIndex, (props.rowIndex + props.WORDS_PER_ROW)).map((value, index) => {
    return <Word 
              key={value.id} 
              className={styles.word} 
              word={value.word}
              isActive={(props.activeIndex - props.rowIndex) === index}
              isInputCorrect={props.isInputCorrect}
              isCorrect={value.isCorrect}
              isCompleted={value.isCompleted}
            />    
  });

  const nextRow = props.wordBucket.slice(props.rowIndex + props.WORDS_PER_ROW, props.rowIndex + props.WORDS_PER_ROW * 2).map((value) => {
    return <Word
            key={value.id}
            className={styles.word}
            word={value.word}
            isCorrect={value.isCorrect}
            isCompleted={value.isCompleted}
          />
  });

  // const nextRow = props.nextBucket.map((value) => {
  //   const inCorrect = props.isInputCorrect;
  //   console.log({inCorrect});
  //   return <Word 
  //             key={value.id} 
  //             className={styles.word} 
  //             word={value.word}
  //           />
  // })

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
    // <div 
    //   className={ (props.isActive && props.isInputCorrect) ? `${styles.active} ${styles.word}` : 
    //               (props.isActive && !props.isInputCorrect) ? `${styles.incorrect} ${styles.word}` : `${styles.word}`}    
    // >
    //   {props.word}
    // </div>

    <div className={styles.word}>
      {props.isActive &&  
        <div className={props.isInputCorrect ? `${styles.correct}` : `${styles.incorrect}`}>
          {props.word}
        </div>
      }

      {!props.isActive && props.isCompleted && 
        <div className={props.isCorrect ? styles['final-correct'] : styles['final-incorrect']}>
          {props.word}
        </div>
      }

      {!props.isActive && !props.isCompleted && 
        <>
          {props.word}
        </>
      }
    </div>



   
    
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
