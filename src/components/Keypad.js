import React,{useState,useEffect} from 'react'

export default function Keypad({usedKeys}) {
    const [letters,setLetters]=useState(null);
    useEffect(()=>{
        fetch('https://mocki.io/v1/3bebadad-2c13-4917-a481-835850d367c0')
        .then(res=>res.json())
        .then(json=>{
            setLetters(json.letters)
        })

    },[])

  return (
    <div className='keypad'>
        {letters && letters.map((l)=>{
            const color=usedKeys[l.key] //l.key will return the color value of the letter e.g a:green b:yellow
            return(
                <div key={l.key} className={color}>{l.key}</div>
            )
        })}
    </div>
  )
}
