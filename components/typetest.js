import { useEffect, useRef, useState } from "react";
import { wordsTop200, wordsTop1000 } from '../wordlist.js';
import Counter from "../components/counter";
import Words from '../components/words';
import Results from "../components/results";
import RefreshButton from '../components/refreshButton.js';
import Modifiers from "./modifiers.js";
import styles from '../styles/components/typetest.module.css';

export default function TypeTest(props) {
  const inputRef = useRef();

  const [isTestVisible, setIsTestVisible] = useState(true);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const [input, setInput] = useState('');
  const [isInputCorrect, setIsInputCorrect] = useState(true);
  
  const [wordList, setWordList] = useState('Top200');
  const [wordBucket, setWordBucket] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rowIndex, setRowIndex] = useState(0);
  
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [correctCharacterCount, setCorrectCharacterCount] = useState(0);

  function fillWordBucket() {
    let word = '';
    let words = [];

    console.log('fillwordbucket');
    for(let i = 0; i < 500; i++) {
      word = getRandomWord();
      words.push({word: word, userInput: '', isCorrect: false, isCompleted: false, id: i});
    }
    console.log({words});
    setWordBucket(words);
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
    const cCharacterCount = correctCharacterCount; 
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
    setCorrectCharacterCount(cCharacterCount + uInput.length + 1);
  }

  function incrementKeystrokeCount(e) {
    const functionKeysNotIncluded = [8, 16, 17, 18, 37, 38, 39, 40, 224];
    if(functionKeysNotIncluded.includes(e.keyCode)) { return }

    const kCount = keystrokeCount
    setKeystrokeCount(kCount + 1);
  }

  function nextWord() {
    if(rowIndex + 12 - 1 === activeIndex) {
      setRowIndex(activeIndex + 1);
    }
    const aIndex = activeIndex;
    setActiveIndex(aIndex + 1);
  }

  function restartTest(e) {
    if(e.keyCode !== 13) { return }
    
    setInput('');
    if(!isResultsVisible) {
      inputRef.current.focus();
    }

    fillWordBucket();
    setActiveIndex(0);
    setRowIndex(0);
    setCorrectCharacterCount(0);
    setKeystrokeCount(0);
    setIsInputCorrect(true);
    props.setTimer({...props.timer, currentTime: props.timer.initialTime});
    setIsTestVisible(true);
    setIsResultsVisible(false);
    props.setIsActiveTest(false);
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
  }, [props.isActiveTest, input, props.timer]);

  useEffect(() => {
    fillWordBucket();
  }, []);

  return(
    <>
      {isTestVisible && 
        <div className={styles["test-wrapper"]}>
          <Modifiers 
            timer={props.timer} 
            setTimer={props.setTimer}
            isActiveTest={props.isActiveTest}
            setIsActiveTest={props.setIsActiveTest}
          />
          <Counter 
            timer={props.timer}
            setTimer={props.setTimer} 
            isActiveTest={props.isActiveTest} 
            setIsActiveTest={props.setIsActiveTest}
            setIsTestVisible={setIsTestVisible}
            setIsResultsVisible={setIsResultsVisible}
          />
          <div className={styles.test}>
            <Words 
              activeIndex={activeIndex}
              rowIndex={rowIndex}
              isInputCorrect={isInputCorrect}
              wordBucket={wordBucket}
              setWordBucket={setWordBucket}
              wordsPerRow={12}
              
            />
          </div> 
          <input value={input} onChange={handleOnChange} onKeyDown={handleOnKeyDown} ref={inputRef}/>
          <RefreshButton restartTest={restartTest}/>
        </div>
      }

      {isResultsVisible && 
        <Results 
          restartTest={restartTest}
          inputRef={inputRef}
          correctCharacterCount={correctCharacterCount}
          keystrokeCount={keystrokeCount}
        />
      }
    </>
  )
}

function getGrossWPM(totalTypedEntries, time) {
  return (totalTypedEntries / 5) / time;
}

function getNetWPM(grossWPM, uncorrectedErrors, time) {
  return (grossWPM - uncorrectedErrors) / time; 
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}