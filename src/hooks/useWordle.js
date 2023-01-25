import { useState } from "react"

const useWordle=(solution)=>{
const [turn,setTurn]=useState(0)
const [currentGuess,setCurrentGuess]=useState('')
const [guesses,setGuesses]=useState([...Array(6)]) // creates array of length 6 with all values as undefined
const [history,setHistory]=useState([])
const [isCorrect,setIsCorrect]=useState(false)
const [usedKeys,setUsedKeys]=useState({}) 

//format guess into an array of letter objects and colors
//e.g [{key:'a', color:'yellow'}]

const formatGuess=()=>{
   // console.log('formatting the guess' + currentGuess)
   let solutionArray=[...solution]  //spreading solution into a single letter
   let formattedGuess=[...currentGuess].map((l)=>{ //formatting each letter in user guess to grey using map function
    return {key:l,color:'grey'}
   })

   //Checking for any green letter. Inside for each l is letter and i is index
   formattedGuess.forEach((l,i)=>{
    if(solutionArray[i]===l.key){  
        formattedGuess[i].color='green'
        solutionArray[i]=null 
        //checking if the formatted guess letter matches solution array method 
        //if match happens then set color to green and set that letter as null to avoid matching for yellow
    }
   })

   //find any yellow colors
   formattedGuess.forEach((l,i)=>{
    //if a letter in formatted guess is part of solution array and its color is not green make it's color as yellow
    if(solutionArray.includes(l.key) && l.color !== 'green'){
        formattedGuess[i].color='yellow'
        solutionArray[solutionArray.indexOf(l.key)]=null
    }
   // console.log(formattedGuess)
    
   })
   return formattedGuess
}

//add a new guess to the guesses state
//updates the isCorrect state if the guess is correct
//add one to the turn state
const addNewGuess=(formattedGuess)=>{
    if(currentGuess===solution){
        setIsCorrect(true)
    }
    // using setGuesses useState function to append newGuess on each turn.Spreading out the value in newGuesses and adding formatted guess on each turn
    setGuesses((prevGuessess)=>{
        let newGuessess = [...prevGuessess]
        newGuessess[turn]=formattedGuess
        return newGuessess
    })

    setHistory((prevHistory)=>{
        return [...prevHistory,currentGuess]
    })
    setTurn((prevTurn)=>{
        return prevTurn+1
    })

    //Setting used keys complex logic
    setUsedKeys((prevUsedKeys)=>{
        let newKeys={...prevUsedKeys}

        formattedGuess.forEach((l)=>{
            const currentColor=newKeys[l.key]
            if(l.color==='green'){
                newKeys[l.key]='green'
                return
            }
            if(l.color==='yellow' && currentColor!=='green'){
                newKeys[l.key]='yellow'
                return
            }
            if(l.color==='grey' && currentColor!=='green' && currentColor!=='yellow'){
                newKeys[l.key]='grey'
                return
            }
        })
        return newKeys
    })
    setCurrentGuess('')
}


//handle keyup event & track current guess
//if user presses enter, add the new guess
const handleKeyup=({key})=>{
    //console.log(key);
    //Handle Enter keypress from the user
    if(key==='Enter'){
        //Only add guess if turn is less than 5
        if(turn > 5){
            console.log('You used all your turns')
            return
        }
        //do not allow duplicate words
        if(history.includes(currentGuess)){
            console.log('You have already used that word')
            return
        }
        if(currentGuess.length !==5){
            console.log('Word must be 5 character long')
            return
        }
        //Call format guess if all the above conditions are satisfied
       // console.log(formatGuess());
       const formatted=formatGuess();
       addNewGuess(formatted);
        
    }
    //To make backspace  functional
    if(key==='Backspace'){
        setCurrentGuess((prev)=>{
            return prev.slice(0,-1)
        })
        return 
    }
    //Creating a regular expression to ensure only alphabets are taken as input and length < 5
    if(/^[A-Za-z]$/.test(key)){
        if(currentGuess.length<5){
            setCurrentGuess((prev)=>{
                return prev+key
            })
        }
    }

}
    return {turn,currentGuess,guesses,isCorrect,handleKeyup,usedKeys}
}

export default useWordle;


