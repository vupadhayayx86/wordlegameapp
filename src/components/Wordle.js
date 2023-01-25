
import { useState } from 'react'
import { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
export default function Wordle({solution}) {

    //importing custom hooks from useWordle Hook
    const {currentGuess,handleKeyup,guesses,isCorrect,turn,usedKeys}=useWordle(solution)
    const [showModal,setShowModal]=useState(false) //setting modal value to false default

    //useEffect to handle keyup event everytime user presses some key on the keyboard
    useEffect(()=>{
        //register keyup event with handleKeyup function
        window.addEventListener('keyup',handleKeyup)
        if(isCorrect){
          setTimeout(()=>setShowModal(true),2000)
         //show modal with some delay so the tiles filp after pressing enter
          window.removeEventListener('keyup',handleKeyup)
        }

        if(turn >5){
          setTimeout(()=>setShowModal(true),2000)
          window.removeEventListener('keyup',handleKeyup)
        }
        //un-register keyup event with handlekey up function
        return ()=>window.removeEventListener('keyup',handleKeyup)
    },[handleKeyup,turn,isCorrect])

    useEffect(()=>{
      console.log(guesses,turn,isCorrect)
    },[guesses,turn,isCorrect])
    
  return (
    <div>
    <div>{currentGuess}</div>
    <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    <Keypad usedKeys={usedKeys}/>
    {showModal &&  <Modal isCorrect={isCorrect} turn={turn} solution={solution} /> }
    </div>
  )
}
