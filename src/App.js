import './App.css';
import Navbar from './component/Navbar';
import Textform from './component/Textform';
import About from './component/about';
import { useState } from 'react';
import Alert from './component/Alert'; 
import { Route, Routes } from 'react-router-dom';

 
function App() {
  const [alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  const [mode,setMode]=useState('light'); //whether darkmode is on or not

  const removebodyClass=()=>{
    document.body.classList.remove('bg-light')
    document.body.classList.remove('bg-dark')
    document.body.classList.remove('bg-warning')
    document.body.classList.remove('bg-success')
    document.body.classList.remove('bg-danger')
  }
  
  const togglemode=(cls)=>{
    removebodyClass();
    document.body.classList.add('bg-'+cls)
    // if (typeof cls === 'string') {
    //   document.body.classList.add('bg-' + cls); // Ensure cls is a string
    // }  else {
    //   console.error('Class name must be a string');
    // }
    if(mode==='light')
      {
      setMode('dark');
      document.body.style.backgroundColor='#042743'
      showAlert('Dark mode is enabled',"success");
  }
    else
    {
      setMode('light'); 
      document.body.style.backgroundColor='white'
      showAlert('Darkmode is disabled',"success");
     }
  }
   return (
    <>
    {/* <Navbar/> */}
   <Navbar title="TEXT UTILS LIVE" aboutText="About" mode={mode} togglemode={togglemode}/>   
   <Alert alert={alert}/>
   <div className="container my-3">
    <Routes>
      <Route exact path='/about' element={<About mode={mode} />} />
      <Route exact path="/" element ={<Textform heading="Text Utils-Word Counter,Charcter Counter,Remove Extra spaces" mode={mode} showAlert={showAlert} />} />
    </Routes>
   {/* <Textform heading="Enter the text to analyze" mode={mode} showAlert={showAlert}/> */}
   {/* <About/> */}
   </div>
   </>
  );
}

export default App;
