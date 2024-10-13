import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React, {useState}from 'react'

export default function TextForm(props) {


  const [text,setText]=useState('');
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  const handleUpClick=()=>{
    // console.log("Uppercase was clicked"+text);
    let newtext=text.toUpperCase();
    setText(newtext) 
    props.showAlert("Converted to UpperCase","success");
  };
  // const handleDowwnClick=()=>{
  //   // console.log("Lowercase was clicked"+text);
  //   let newtext=text.toLowerCase();
  //   setText(newtext) 
  //   props.showAlert("Converted to LowerCase","success")
  // };

  const handleDownClick = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
    props.showAlert("Converted to LowerCase", "success");
  };
  const handleClearClick=()=>{
    let newtext="";
    setText(newtext)
    props.showAlert("Text Cleared","success") 
  };

  const handleCopy=()=>{
    // let text=document.getElementById("myBox");
    // text.select();
    navigator.clipboard.writeText(text);
    document.getSelection().removeAllRanges();
    props.showAlert("Copied to clipboard","success")
  };

  // Vicky       Kumar  => Vicky kumar => Vickykumar
  const handleExtraspaces=()=>{
    let newtext=text.split(/[  ]+/);
    // console.log(newtext) // ["Vicky", "kumar"]
     setText(newtext.join(" ")); 
    props.showAlert("Extraspace removed","success")
  };
  const handleOnchange=(event)=>{
    // console.log("On Change");
    setText(event.target.value)
  };

  const[isEncrypted, setIsEncrypted]=useState(false)

  const handleEncrypt=()=>{
    let encrypted = btoa(text)
    setText(encrypted)
    setIsEncrypted(true);
}
  const handleDecrypt=()=>{
    if(!base64regex.test(text)){
      props.showAlert("Invalid text.", "warning")
      return
    }
    let decrypted = atob(text)
    setText(decrypted)
    setIsEncrypted(false);
  }

  return (
    <>
    <div className='container' style={{color:props.mode==='dark'?'white':'black'}}>
         <h2 className='mb-4'>{props.heading}</h2>
     <div className="mb-3">
     {/* <label for="myBox" class="form-label">Examples textarea</label> */}
     <textarea className="form-control" value={text} onChange={handleOnchange} style={{backgroundColor: props.mode==='dark'?'rgb(173, 216, 230)':'white',color: props.mode==='#024743'?'white':'black'}} id="myBox" rows="8" placeholder='Enter Some text here...'></textarea>
    </div>
    <button  disabled={isEncrypted || text.length===0}className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to Uppercase</button>
    <button  disabled={isEncrypted || text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleDownClick}>Convert to Lowercase</button>
    <button  disabled={isEncrypted || text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>Clear</button>
    <button  disabled={isEncrypted || text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
    <button  disabled={isEncrypted || text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleExtraspaces}>Remove Spaces</button>
    <button  disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleEncrypt}>Encrypt</button>
    <button  disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleDecrypt}>Decrypt</button>

  </div>
  <div className="container my-3" style={{color:props.mode==='dark'?'white':'#042743'}}>
    <h1>Your text Summary</h1>
    <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
    <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes read</p>
    <h3>Preview</h3>
    <p>{text.length>0?text:"Nothing to preview ...."}</p>
    </div>
  </>
  );
}
