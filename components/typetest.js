import { useEffect, useRef, useState } from "react";
import { wordsTop200, wordsTop1000 } from '../wordlist.js';
import { useTestVisible } from "../context/testContext.js";
import Counter from "../components/counter";
import Words from '../components/words';
import Results from "../components/results";
import RefreshButton from '../components/refreshButton.js';
import styles from '../styles/components/typetest.module.css';

export default function TypeTest(props) {
  const inputRef = useRef();
  const tv = useTestVisible();

  const [input, setInput] = useState('');
  const [isInputCorrect, setIsInputCorrect] = useState(true);
  const [wordList, setWordList] = useState('Top200');
  const [wordBucket, setWordBucket] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rowOffsets, setRowOffsets] = useState([]);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [correctCharacterCount, setCorrectCharacterCount] = useState(0);
  const [correctWordCount, setCorrectWordCount] = useState(0);

  function fillWordBucket() {
    let word = '';
    let words = [];

    for(let i = 0; i < 500; i++) {
      word = getRandomWord();
      words.push({word: word, userInput: '', isCorrect: false, isCompleted: false, offset: 0});
    }
    setWordBucket(words);
  }

  function updateOffset(index, offset) {
    let bucket = wordBucket;
    let rOffset = rowOffsets;
    const word = wordBucket[index];
    bucket[index]= {...word, offset: offset};
    
    if(!rOffset.includes(offset)) {
      rOffset.push(offset);
      setRowOffsets(rOffset);
    }
    setWordBucket(bucket);
  }

  function getRandomWord() {
    switch(wordList) {
      case 'Top200': 
        return wordsTop200[getRandomInt(199)]; //no one will know ok
      case 'Top1000': 
        return wordsTop1000[getRandomInt(1000)];
       default: 
        console.log('error generating word');
    }
  }

  function updateisInputCorrect(e) {
    const currentWord = wordBucket[activeIndex].word
    const userInput = e.target.value;
    const length = userInput.length;
    const subCurrentWord = currentWord.toString().substring(0, length);
    const isCorrect = userInput === subCurrentWord;

    if(userInput === ' ') { 
      console.log('spacebar');
      setIsInputCorrect(true); //resets to true because new word
      return;
    }
    setIsInputCorrect(isCorrect);
  }

  function updateWordStats() {
    const uInput = input;
    const activeWord = wordBucket[activeIndex];
    let wBucket = wordBucket;

    if(uInput !== activeWord.word) { 
      let word = {...activeWord, isCompleted: true};
      wBucket[activeIndex] = word;
      setWordBucket(wBucket);      
      return; 
    }

    let word = {...activeWord, isCompleted: true, isCorrect: true}
    wBucket[activeIndex] = word;
    setWordBucket(wBucket);
    setCorrectCharacterCount(correctCharacterCount => correctCharacterCount + uInput.length + 1);
    setCorrectWordCount(correctWordCount => correctWordCount + 1);
  }

  function incrementKeystrokeCount(e) {
    const functionKeysNotIncluded = [8, 16, 17, 18, 37, 38, 39, 40, 224];
    if(functionKeysNotIncluded.includes(e.keyCode)) { return }
    setKeystrokeCount(keystrokeCount => keystrokeCount + 1);
  }

  function nextWord() {
    const nextWord = activeIndex + 1;
    const rOffsets = rowOffsets;
    const wBucket = wordBucket;

    if(wBucket[nextWord].offset === rOffsets[1] ) {
      const updatedBucket = () => {
        for(let i = 0; i < wBucket.length; i++) {
          if(wBucket[i].offset === rOffsets[1]) {
            return wBucket.slice(i);
          }
        }
      }
      setWordBucket(updatedBucket);
      setActiveIndex(0);
      return;
    }
    setActiveIndex(activeIndex => activeIndex + 1);
  }

  function restartTest(e) {
    if(e.keyCode !== 13) { return }
    
    setInput('');
    if(tv.isTestVisible) {
      inputRef.current.focus();
    }

    setWordBucket ([]);
    fillWordBucket();
    setRowOffsets([]);
    setActiveIndex(0);
    setCorrectCharacterCount(0);
    setKeystrokeCount(0);
    setIsInputCorrect(true);
    props.setTimer({...props.timer, currentTime: props.timer.initialTime});
    props.setIsActiveTest(false);
    tv.setIsTestVisible(true);
  }

  function restartTestOnClick() {
    setInput('');
    if(tv.isTestVisible) {
      inputRef.current.focus();
    }

    fillWordBucket();
    setRowOffsets([]);
    setActiveIndex(0);
    setCorrectCharacterCount(0);
    setKeystrokeCount(0);
    setIsInputCorrect(true);
    props.setTimer({...props.timer, currentTime: props.timer.initialTime});
    props.setIsActiveTest(false);
    tv.setIsTestVisible(true);
  }

  function handleOnChange(e) {
    setInput(e.target.value.trim());
    updateisInputCorrect(e);
  }
  
  function handleOnKeyDown(e) {
    incrementKeystrokeCount(e);
    if(e.keyCode !== 32) { return }
    updateWordStats();
    setInput(''); //clears input
    nextWord();
  }

  useEffect(() => {
    if(!props.isActiveTest && input !== '' && props.timer.initialTime === props.timer.currentTime) {
      props.setIsActiveTest(true);
    }
  }, [props.isActiveTest, input, props, props.timer]);

  useEffect(() => {
    fillWordBucket();
  }, []);

  return(
    <>
      {tv.isTestVisible && 
        <div className={styles["test-wrapper"]}>
          <Counter 
            timer={props.timer}
            setTimer={props.setTimer} 
            isActiveTest={props.isActiveTest} 
            setIsActiveTest={props.setIsActiveTest}
            setIsTestVisible={props.setIsTestVisible}
          />
          <div className={styles.test}>
            <Words 
              activeIndex={activeIndex}
              isInputCorrect={isInputCorrect}
              wordBucket={wordBucket}
              setWordBucket={setWordBucket}
              wordsPerRow={12}
              updateOffset={updateOffset}
            />
          </div> 
          <input 
            className={styles['word-input']} 
            value={input} 
            onChange={handleOnChange} 
            onKeyDown={handleOnKeyDown} 
            ref={inputRef}/>
          <RefreshButton 
            restartTest={restartTest} 
            restartTestOnClick={restartTestOnClick}
          />
        </div>
      }
      {!tv.isTestVisible && 
        <Results 
          timer={props.timer}
          restartTest={restartTest}
          inputRef={inputRef}
          correctCharacterCount={correctCharacterCount}
          keystrokeCount={keystrokeCount}
          correctWordCount={correctWordCount}
        />
      }
    </>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
