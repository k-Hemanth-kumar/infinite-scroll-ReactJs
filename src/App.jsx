import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './components/actionslice';
import InfiniteScrollContent from './components/infinite-scrollcontent';
function App() {
  const [data,setData]=useState([]);
  const[apiQuery,setApiQuery]=useState("");
  const [noData,setNoData]=useState(true);
  const [error,setError]=useState({flag:false,message:""});
  const handleApiQuery=(e)=>{
    setData([]);
    setNoData(false);
    setApiQuery(e.target.value);
    if(e.target.value.length===0){
      setData([]);
    }
  }
  const getData=(apiQuery,pageNumber)=>{
    return new Promise(async (resolve,reject)=>{
      if(apiQuery){
        try {
          const response=await fetch(`https://openlibrary.org/search.json?q=${apiQuery}&page=${pageNumber}`);
          if (response.ok) {
            const data = await response.json();
            resolve(); // Resolve with the data instead of the raw response
            if(!data.docs.length){
              setNoData(true);
            }
            console.log(data)
            setData((prevData)=>[...prevData,...data.docs]);
          } else {
            console.log(`Error: HTTP status ${response.status}`);
            setError({flag:true,message:error});
            reject();
          }
          
        } catch (error) {
          console.log("error fetching the data",error);
          setError({flag:true,message:error});
          reject();
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
      <div className='infinite-scroll-content'>
        {error.flag?<p style={{width:'100%',textAlign:'center'}}>Something went wrong. {error.message}</p>:apiQuery!==""&&(
        <InfiniteScrollContent noData={noData} fetchData={getData} data={data} apiQuery={apiQuery} />
      )}
      </div>
    </div>
  )

  
}

export default App
