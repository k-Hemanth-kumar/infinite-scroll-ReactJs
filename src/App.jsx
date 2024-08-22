import { useState } from 'react'
import './App.css'

function App() {
  const [data,setData]=useState([]);
  const[apiQuery,setApiQuery]=useState("");
  const [noData,setNoData]=useState("");
  const [error,setError]=useState(false);

  
  const handleApiQuery=(e)=>{
    setData([]);
    setNoData([]);
    setApiQuery(e.target.value);
    if(e.target.value.length===0){
      setData([]);
    }
    /*getData(apiQuery,1)
    .then((data)=>{
      if(!data.docs.length){
        setNoData(true);
      }
      setData((prevData)=>[...prevData,...data.docs])
    })
    .catch((error)=>{
      setError(true);
      console.log(error);
    });*/
  }
  const getData=(apiQuery,pageNumber)=>{
    return new Promise(async (resolve,reject)=>{
      if(apiQuery){
        try {
          const response=await fetch(`https://openlibrary.org/search.json?q=${apiQuery}&page=${pageNumber}`);
          if (response.ok) {
            const data = await response.json();
            resolve(data); // Resolve with the data instead of the raw response
          } else {
            //console.log(`Error: HTTP status ${response.status}`);
            reject(`Error: HTTP status ${response.status}`);
          }
          
        } catch (error) {
          //console.log("error fetching the data",error);
          reject(error);
        }
      }
    })
  }
  return(
    <div className='infinite-scroll-container'>
      <div className='infinite-scroll-header'>
        <h2>Hey, Welcome to Infinite Scrolling</h2>
        <input type="text" value={apiQuery} name='query' id='query' className='query' 
        placeholder='Enter input to search' onChange={handleApiQuery} />
      </div>
      <div className='infinite-scroll-content'></div>
    </div>
  )

  
}

export default App
