import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const secretWords = ['knobs', 'venom','sword','vague','yatch','blink','mocha','binge','pulse','whale','viper','lemon','olive','hydra','horse'];
  const [randomWord, setRandomWord] = useState('');
  const [success, setSuccess] = useState(false);
  useEffect(()=>{
    setRandomWord(secretWords[Math.floor(Math.random()*secretWords.length)]);
  }, []);
  
  const [words, setWords] = useState([]);
  let temp = '';
  const handleChange = (e) =>{
    temp = e.target.value;
  }
  const handleClick = () =>{
    let count = compareWords(randomWord,temp);
    setSuccess(temp === randomWord);
    setWords(prev=> [...prev, {"name": temp,"count": count}]);
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
  return (
    <div>
      <h1 className='heading'>Guess the Secret Word</h1>
      {/* <h2 style={{display:'flex', justifyContent: 'center'}}>Random Word is {randomWord}</h2> */}
      <div className='inputs'>
        <input className='inputBox' type="text" onChange={handleChange} />
        <button className='submitBtn' type="submit" onClick={handleClick}>Submit</button>
      </div>
      {success? <div className='successBox'>
        <h2 style={{display:'flex', justifyContent: 'center'}}>Congratulations!!!</h2>
        <p style={{display:'flex', justifyContent: 'center'}}>You guessed it within {words.length} attempts</p>
      </div>:
      words.map((item,index)=>(
        <h4 key={index} style={{display:'flex', justifyContent: 'center'}}>{item.name} {item.count}</h4>
      ))}
    </div>
  );
}

export default App;