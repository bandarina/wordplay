import { useState, useEffect, useCallback } from 'react';
import './App.css';

import { Header } from './Header/Header';
import { Game } from './Game/Game';
import { grabWord } from './util/GameAPI';
import { isArrayInArray } from './util/GameAPI';
import { Instructions } from './Instructions/Instructions';



function App() {

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wordToGuess, setWordToGuess] = useState([]);
  const [guessedWord, setGuessedWord] = useState([]);
  const [guessArray, setGuessArray] = useState([]);
  const [isInstructionsComplete, setIsInstructionComplete] = useState(false);

  useEffect(()=>{
    setIsGameOver(isArrayInArray(guessArray, wordToGuess) || guessArray.length === 5 ? true : false);
  },[guessArray]);

  useEffect(()=> {
    grabWord().then((resolve) => {
      setWordToGuess((prev)=> isLoading ? resolve : prev);
      console.log(resolve);
      setIsLoading(false)
    })
  }, [round])


  useEffect(()=>{
    setRound((prev) => isGameOver ? prev + 1 : prev);
    setIsLoading(true);
    if(isArrayInArray(guessArray, wordToGuess)){
      setScore((prev) => prev + 50);
    }
    setGuessArray([]);
  }, [isGameOver])



  const handleKeyPressed = useCallback((e) => {
    
    setGuessedWord((prev) => {
      if(e.keyCode >=65 && e.keyCode <= 90 && prev.length < wordToGuess.length){
        return [...prev, e.key.toLowerCase()]
      }else if(e.keyCode === 8){
        return guessedWord.slice(0, -1);
      }
       else{
        return prev;
      }
    });

    setGuessArray((prev) => {
      if(guessedWord.length === wordToGuess.length && e.keyCode === 13){
        setGuessedWord([]);
        return [...prev, guessedWord]
      }else{
        return prev;
      }
    
    });
  }, [guessedWord, wordToGuess]);


  useEffect(() => {


    document.addEventListener('keydown', handleKeyPressed);

    return () => document.removeEventListener('keydown', handleKeyPressed);
  
  },[handleKeyPressed]);

  function handleInstructionClicked(){
    setIsInstructionComplete(true);
  }
  

  return (
    <div className="App">
      <Header />
      {isLoading ? 'The game is loading...' : <Game word={guessedWord} wordToGuess={wordToGuess} guessesArray={guessArray} isInstructions={isInstructionsComplete} score={score} round={round} />}
      <Instructions isComplete={handleInstructionClicked}/>
    </div>
  );
}


export default App;
