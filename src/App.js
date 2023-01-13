import React, {useEffect, useState} from 'react';
import './App.css';
import partyPopper from './partyPopper.png';

function App() {
  const secretWords = ['knobs', 'venom','sword','vague','yatch','blink','mocha','binge','pulse','whale','viper','lemon','olive','hydra','horse'];
  const [randomWord, setRandomWord] = useState('');
  const [success, setSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  useEffect(()=>{
    setRandomWord(secretWords[Math.floor(Math.random()*secretWords.length)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [words, setWords] = useState([]);
  const [entered, setEntered] = useState('');
  const handleChange = (e) =>{
    setEntered(e.target.value);
  }
  const handleClick = () =>{
    let count = compareWords(randomWord,entered);
    setSuccess(entered === randomWord);
    if(entered.length===5) setWords(prev=> [...prev, {"name": entered,"count": count}]);
    if(entered===randomWord){
      document.body.style.backgroundImage = `url(${partyPopper})`;
    }
    setEntered('');
  }
  const compareWords = (s1, s2) => {
    let count = 0;
    for(let i in s1) {
        if(s2.includes(s1[i])){
          count++;
        }
    }
    return count;
  }
  const getHintWord = () =>{
    return randomWord.charAt(0)+ " _ "+randomWord.charAt(2)+" _  "+randomWord.charAt(4);
  }
  return (
    <div id='parentDiv' className='container'>
      <h1 className='heading'>Guess the Secret Word</h1>
      <p className='inputs' style={{marginBottom: '2rem'}}>Enter the 5 letter word with distinct letters. You can access hint after 3 unsuccessful attempts.</p>
      {/* <h2 style={{display:'flex', justifyContent: 'center'}}>Random Word is {randomWord}</h2> */}
      <div className='inputs'>
        <input id="input-word" className='inputBox' type="text" value={entered} onChange={handleChange} />
        <button className='submitBtn' type="submit" onClick={handleClick}>Submit</button>
      </div>
      {words.length>=3 && !success && <div className='hintBox'>
        <button className='hintBtn' onClick={()=>setShowHint(!showHint)}>See Hint</button>
        {showHint && <p className='hintWord'>{getHintWord()}</p>}
      </div>}
      
      {success? <div className='successBox'>
        <h2 className='inputs'>Congratulations!!!</h2>
        <p className='inputs'>You guessed it within {words.length} attempts</p>
      </div>:
      words.length? <table>
        <thead>
      <tr>
        <th>Guess</th>
        <th># of Matching letters</th>
      </tr>
      </thead>
      <tbody>
      {words.map((item,index)=>(
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.count}</td>
        </tr>
      ))}
      </tbody>
    </table>: <></>
    }
    </div>
  );
}

export default App;