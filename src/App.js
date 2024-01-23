import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

    //useRef
    const passRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str +="0123456789"
    if(charAllowed) str +="!@#$%^&*-_+=[]{}~`"

    for(let i=1; i<=length; i++)
    {
      let char = Math.floor(Math.random() * str.length +1)
      pass+= str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  const copyPassToClipboard = useCallback(()=>{
    passRef.current?.select()//to select password on copy click
    passRef.current?.setSelectionRange(0,12)//to select password in given range. only 6 letters
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword])

  return (
    <div className = "w-100 container mt-5">
      <div className= "outbox">
        <h4>Password Generator</h4>
        <div className="inputClass">
          <input className="inputButton" type="text" value = {password} placeholder='password' readOnly ref={passRef}/>
          <button className='copyButton' onClick={copyPassToClipboard}>Copy</button>
        </div>
        <div className="buttonClass">
          <div className='rangeClass'>
            <input type="range" min={6} max={12} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <label className='LengthLabel'>Length: {length}</label>
          </div>
          <input type="checkbox" className='checkboxNumber' defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setNumberAllowed((prev) => !prev)}}/><label>Number</label>
          <input type="checkbox" className='checkboxChar' defaultChecked={charAllowed} id="charInput" onChange={()=>setCharAllowed((prev)=> !prev)}/><label>Character</label>
        </div>
      </div>
    </div>
  );
}
export default App;