import styles from '../styles/components/words.module.css';

export default function Words(props) {
  const activeRow = props.wordBucket.slice(props.rowIndex, (props.rowIndex + props.wordsPerRow)).map((value, index) => {
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

  const nextRow = props.wordBucket.slice(props.rowIndex + props.wordsPerRow, props.rowIndex + props.wordsPerRow * 2).map((value) => {
    return <Word
            key={value.id}
            className={styles.word}
            word={value.word}
            isCorrect={value.isCorrect}
            isCompleted={value.isCompleted}
          />
  });

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
  return(
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