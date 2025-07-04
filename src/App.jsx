import { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import {langs, generateRandomWord, keys} from "./data";
import generateRandomMessage from './messages';
import Describtion from './components/Describtion';
import Language from './components/Language';
import Letter from './components/Letter';
import Key from './components/Key';

function App() {
  // state variables
  const [randomWord, setRandomWord] =useState(()=> generateRandomWord());
  const [lettersGuessed, setLettersGuessed] = useState([]); // [{key: A, color: red}]
  const [messageStyle, setMessageStyle] = useState({});
  const message = useRef(null);

  // derived variables
  const langIndex = lettersGuessed.filter(keyObj=> !randomWord.includes(keyObj.key)).length-1;// for which index of langs is the next, losing when it reaches Ruby's index in "langs"
  
  let isWon = undefined;
  if (randomWord.every(letter=> lettersGuessed.some(({key})=> key === letter))) {
    isWon = true;
  } else if (langIndex === langs.length-2) {
    isWon = false;
  }

  let disableKeys = false;
  if (isWon !== undefined) {
    disableKeys= true;
  }

  let letterCorrect = '';
  if (lettersGuessed[0] && randomWord.includes(lettersGuessed[lettersGuessed.length-1].key)) {
    letterCorrect = lettersGuessed[lettersGuessed.length-1].key;
  }

  // game functions
  useEffect(()=> {
    if (isWon) { // won
      message.current.innerHTML=
      `<h2>You win!</h2>
      <p class="message-p">Well done!🎉</p>`
      setMessageStyle({backgroundColor: "#10A95B", fontWeight: 500});
    } else if(isWon === false) { // lost
      message.current.innerHTML= 
      `<h2>Game over!</h2>
      <p class="message-p">You lose! Better start learning Assembly 😭</p>`
      setMessageStyle({backgroundColor: "#BA2A2A", fontWeight: 500});
    } else if (langIndex !== -1) { // chosen wrong
      message.current.innerHTML= `<p class="message-p">${generateRandomMessage(langs[langIndex].name)}</p>`
      setMessageStyle({backgroundColor: "#7A5EA7", fontWeight: 400, fontStyle: "italic", border: "1.5px dashed #323232"});
    } else { // reset game
      message.current.innerHTML ='';
      setMessageStyle({});
    }
  }, [langIndex, isWon])

  function keyClick(e) {
    const clickedKey = e.target.textContent;
    e.target.disabled = true;
    let letterFound = false;
    randomWord.forEach(letter=> {
      if (clickedKey === letter) {
        letterFound = true;
      } 
    });
    setLettersGuessed(prev=> [...prev, {key: clickedKey, color: letterFound? "#10A95B": "#EC5D49"}]);
  }

  function restartGame() {
    setLettersGuessed([]);
    setRandomWord(generateRandomWord());
   }

  return (
    <>
      <Describtion />
      <div className="message-container" style={messageStyle} ref={message} aria-live="polite">
      </div>
      <div className="languages">
        {langs.map((lang, index)=> <Language key={index} color={lang.color} bg={lang.backgroundColor} name={lang.name} index={index} langCount={langIndex} />)}
      </div>
      <div className="current-word">
        {randomWord.map((letter, index)=> <Letter key={index} value={letter} letterCorrect={letterCorrect} isWon={isWon} guessedKeys={lettersGuessed} />)}
      </div>
      <div className="keys">
        {keys.map((key, index)=> <Key key={index} value={key} onClick={keyClick} keysColors={lettersGuessed} disable={disableKeys} />)}
      </div>
      {(isWon===true || isWon=== false) &&<button className="restart-btn" onClick={restartGame}>New Game</button>}
    </>
  )
}

export default App;