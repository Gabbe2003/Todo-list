import React, { useState, useEffect, useCallback } from 'react';
import   './style.css';
import   './checkbox&button.css';


const PasswordGenerator: React.FC = () => {
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeText, setIncludeText] = useState<boolean>(true);
  const [includeSpecialLetters, setIncludeSpecialLetters] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');


  const generateLetters = useCallback(() => {
    let letters = '';
    for (let i = 97; i <= 122; i++) {
      letters += String.fromCharCode(i);
    }
    for (let i = 65; i <= 90; i++) {
      letters += String.fromCharCode(i);
    }
    return letters;
  }, []);

  const letters = generateLetters();
  const numbers = '1234567890';
  const specialLetters = '!"#¤%@£$}{[[¨<>€&/()=?';

  const generatePassCode = useCallback(() => {
    let characters = '';
    if (includeText) {
      characters += letters;
    }
    if (includeNumbers) {
      characters += numbers;
    }
    if (includeSpecialLetters) {
      characters += specialLetters;
    }
    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedPassword(newPassword);
  }, [passwordLength, includeText, includeNumbers, includeSpecialLetters, letters]);

  useEffect(() => {
    generatePassCode();
  }, [generatePassCode]);

  function handelCopy(){
    navigator.clipboard.writeText(generatedPassword)
  } 

  return (
  <div className='container-fluid password-container p-4'>
    <div className="passDisplayer mb-4 d-flex justify-content-between align-items-center">
      <strong className='output'>{generatedPassword}</strong>
    <div className="controllers d-flex align-items-center">
      <button className="btn btn-secondary me-1 fa fa-copy" onClick={handelCopy}></button>
      <button className="btn btn-secondary fa fa-rotate-right" onClick={generatePassCode}></button>
    </div>
  </div>

  <div className='checkbox-container'>

    <div className="passLength">
      <label htmlFor="pass length">length</label>
      <input type="range" value={passwordLength} min="8" max="100" onChange={(e) => setPasswordLength(Number(e.target.value))}/>
      <span>{passwordLength}</span>
    </div>

      <div id="checklist">
        <input value="1" name="r" type="checkbox" id="01" onChange={e => setIncludeNumbers(e.target.checked)} checked={includeNumbers}/>
        <label htmlFor="01">Include Numbers</label>
        <input value="2" name="r" type="checkbox" id="02" onChange={e => setIncludeText(e.target.checked)}  checked={includeText}/>
        <label htmlFor="02">Include Text</label>
        <input value="3" name="r" type="checkbox" id="03" onChange={e => setIncludeSpecialLetters(e.target.checked)} checked={includeSpecialLetters}/>
        <label htmlFor="03">Include Special Letters</label>
      </div>
    </div> 
    <button onClick={generatePassCode} className='passGenerator'>Generate Password</button>
  </div>

  );
};


export default PasswordGenerator;
