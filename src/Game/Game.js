import './Game.css';

export function Game(props){

    function conditionalFormatting(element, index){
        if(props.wordToGuess?.includes(element) && props.wordToGuess[index] !== element){
            return 'Letter close';
        }
        else if(props.wordToGuess[index] === element){
            return 'Letter exact';
        }
        else{
            return 'Letter';
        }
    }

    return(
        <div className='Game' style={{display: props.isInstructions ? 'flex' : 'none'}}>
            <div className='GameTitle' style={{display: props.word.length === 0 && props.guessesArray.length === 0 ? 'flex' : 'none'}}>
                Start by typing the word
            </div>
            <div className='Guesses'>
                {props.guessesArray.map((element, index) =>{ 
                    return <div key={index} className='Guess'>{element.map((element, secondIndex) => <div key={secondIndex} className={conditionalFormatting(element, secondIndex)}>{element}</div> )}</div>
            })}   
            </div>
            <div className='WordGuess'>
                {props.wordToGuess.map((element, index)=> <div key={index} className='Letter'>{props.word[index]}</div>)}
            </div>
            <div className='GameStatus'>
                <div className='Round'>Round: {props.round}</div>
                <div className='Score'>Score: {props.score}</div>
            </div>
        </div>
    )
}