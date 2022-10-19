import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/words.module.css';

export default function Words(props) {
  const words = props.wordBucket.map((value, index) => {
    return  <Word 
              key={index} 
              index={index}
              className={styles.word} 
              word={value.word}
              isActive={(index === props.activeIndex)}
              isInputCorrect={props.isInputCorrect}
              isCorrect={value.isCorrect}
              isCompleted={value.isCompleted}
              updateOffset={props.updateOffset}           
            />    
  });

    return(
    <div className={styles.words}>
      {words}
    </div>
  )
}

function Word(props) {
  const domRef = useRef();

  useEffect(() => {
    const offset = domRef.current.offsetTop;
    props.updateOffset(props.index, offset);
  },[]);

  return(
    <div className={styles['word']}>
      {props.isActive &&  
        <div className={props.isInputCorrect ? styles['correct'] : styles['incorrect']} ref={domRef}>
          {props.word}
        </div>
      }
      {!props.isActive && props.isCompleted && 
        <div className={props.isCorrect ? styles['final-correct'] : styles['final-incorrect']} ref={domRef}>
          {props.word}
        </div>
      }
      {!props.isActive && !props.isCompleted && 
        <div className={styles['not-passed']} ref={domRef}>
          {props.word}
        </div>
      }
    </div>
  )
}