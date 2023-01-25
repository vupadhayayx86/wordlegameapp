import React from 'react'
import Row from './Row'

function Grid({currentGuess,guesses,turn}) {
  return (
    <div>
        {guesses.map((g,i)=>{
            if(turn===i){
                return <Row key={i} currentGuess={currentGuess} />
            }
            return <Row key={i} guess={g}/>
        })
        //mapping through the guesses and outputing row for each guess using Row component
        }
    </div>
  )
}

export default Grid