import { useState } from 'react'
import './Instructions.css'

export function Instructions(props){
    const [isClicked, setIsClicked] = useState(false);

    function handleClick(){
        setIsClicked(true);
        props.isComplete();
    }

    return(
        <div className='Instructions' style={{display: isClicked ? 'none' : 'visible'}}>
            <h1 className='InstructionsTitle'>Instructions</h1>
            <div className='Rules'>
                <ol>
                    <li>You've got 5 chances to guess the unknown word</li>
                    <li>Start by typing the word and press the Enter key to submit your guess</li>
                    <li>If the letter you typed is part of the word it will be displayed on a yellow background</li>
                    <li>If the letter you typed is part of the word and is in the correct position it will be displayed on a green background</li>
                    <li>Note: There is no autocompletion on doubled letters</li>
                </ol>
            </div>
            <div className='Start' onClick={handleClick}>Start</div>
        </div>
    )
}