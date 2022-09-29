import { useEffect, useReducer, useRef, useState } from "react";
import { wordsTop200, wordsTop1000 } from '../wordlist.js';
import Counter from "../components/counter";
import Words from '../components/words';
import Results from "../components/results";
import RefreshButton from '../components/refreshButton.js';
import styles from '../styles/typetest.module.css';

export default function TypeTest() {
  const MAX_CHARACTERS_PER_ROW = 68; //good amount for well formatted row
  const INITIAL_TIME = 60; //seconds
  const inputRef = useRef();

  const [isTestVisible, setIsTestVisible] = useState(true);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const [timer, setTimer] = useState(INITIAL_TIME);
  const [wordListNumber, setWordListNumber] = useState(0);
  const [input, setInput] = useState('');
  const [isInputCorrect, setIsInputCorrect] = useState(true);
  const [isActiveTest, setIsActive] = useState(false);
  const [activeBucket, setActiveBucket] = useState([]);
  const [nextBucket, setNextBucket] = useState([]);
  const [completeBucket, setCompleteBucket] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [correctCharacterCount, setCorrectCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wordIDs, setWordIDs] = useState(0); //running count of word id's

  function fillWordBucket(setWordBucket) {
    let words = [];
    let characterCount = 0;
    let wordID = wordIDs; 

    while(characterCount < MAX_CHARACTERS_PER_ROW) { 
      let word = getRandomWord();
      characterCount += word.length + 1; //to account for space
      words.push({word: word, id: wordID++});
    }
    setWordBucket(words)
    setWordIDs(wordID);
  }

  function getRandomWord() {
    switch(wordListNumber) {
      case 0: 
        console.log(wordsTop200.length);
        return wordsTop200[getRandomInt(199)]; //no one will know ok
      case 1: 
        return wordsTop1000[getRandomInt(1000)];
       default: 
        console.log('error generating word');
    }
  }

  function updateRows() {
    const nRow = nextBucket;
    setActiveBucket(nRow);
    fillWordBucket(setNextBucket);
  }

  function updateisInputCorrect(e) {
    const currentWord = activeBucket[activeIndex].word;
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
    const currentWord = activeBucket[activeIndex].word;
    const cCharacterCount = correctCharacterCount; 
    const cBucket = completeBucket;
 
    if(uInput !== currentWord) { 
      console.log(`correct char count: ${cCharacterCount}`);
      setCompleteBucket([...cBucket, {word: currentWord, userinput: uInput, correct: false}]);
      return; 
    }

    console.log(`correct char count: ${cCharacterCount + uInput.length}`);
    setCompleteBucket([...cBucket, {word: currentWord, userInput: uInput, correct: true}]);
    setCorrectCharacterCount(cCharacterCount + uInput.length + 1);
  }

  function incrementKeystrokeCount(e) {
    const functionKeysNotIncluded = [8, 16, 17, 18, 37, 38, 39, 40, 224];
    if(functionKeysNotIncluded.includes(e.keyCode)) { return }

    let code = e.keyCode;
    console.log({code});
    const kCount = keystrokeCount;

    // if(e.keyCode === 32) {
    //   console.log('increment keycount with space')
    //   setKeystrokeCount(kCount + 2); //acounts for space
    //   return;
    // }
    setKeystrokeCount(kCount + 1);
  }

  function nextWord() {
    //UPDATES ROW IF REACHED END
    if(activeBucket.length <= activeIndex + 1) {
      updateRows();
      setActiveIndex(0);
      return;
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
    console.log('restart test');
    
    //called 3 times to have 2 completely new rows
    updateRows();
    updateRows();
    updateRows();

    setCompleteBucket([]);
    setActiveIndex(0);
    setCorrectCharacterCount(0);
    setKeystrokeCount(0);
    setIsInputCorrect(true);
    setTimer(INITIAL_TIME);
    setIsTestVisible(true);
    setIsResultsVisible(false);
    setIsActive(false);
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
    if(!isActiveTest && input !== '' && timer === INITIAL_TIME) {
      // console.log('useeffect')
      setIsActive(true);
    }
  }, [isActiveTest, input]);

  return(
    <>
      {isTestVisible && 
        <div className={styles["test-wrapper"]}>
          <Counter 
            timer={timer} 
            setTimer={setTimer} 
            isActiveTest={isActiveTest} 
            setIsActive={setIsActive}
            setIsTestVisible={setIsTestVisible}
            setIsResultsVisible={setIsResultsVisible}
          />
          <div className={styles.test}>
            <Words 
              wordCount={wordCount}
              activeIndex={activeIndex}
              activeBucket={activeBucket}
              setActiveBucket={setActiveBucket}
              nextBucket={nextBucket}
              setNextBucket={setNextBucket}
              wordIDs={wordIDs}
              setWordIDs={setWordIDs}
              fillWordBucket={fillWordBucket}
              isInputCorrect={isInputCorrect}
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
