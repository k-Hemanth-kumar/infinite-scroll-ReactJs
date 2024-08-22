import { useState } from 'react'
import './App.css'

function App() {
  const [data,setData]=useState([]);
  const[apiQuery,setApiQuery]=useState("");
  const [noData,setNoData]=useState("");
  
  const handleApiQuery=(e)=>{
    setData([]);
    setNoData([]);
    setApiQuery(e.target.value);
    if(e.target.value.length===0){
      setData([]);
    }
  }
  return(
    <div className='infinite-scroll-container'>
      <div className='infinite-scroll-header'>
        <h2>Hey, Welcome to Infinite Scrolling</h2>
        <input type="text" value={apiQuery} name='query' id='query' className='query' 
        placeholder='Enter input to search' onChange={handleApiQuery} />
      </div>
    </div>
  )

  
}

export default App
