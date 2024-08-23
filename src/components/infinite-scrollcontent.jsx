import { useEffect, useRef, useState } from "react";
import { getData } from "./actionslice";

export default function InfiniteScrollContent({ data, noData, fetchData,apiQuery }) {
    console.log("renderd")
    const [loading,setLoading]=useState(false);
    const pageNumber=useRef(1);
    const observer=useRef(null);
    useEffect(()=>{
        const debouncetime=setTimeout(() => {
            handleData();
        }, 1000);
        return ()=>{
            clearTimeout(debouncetime)
        }
    },[apiQuery]);

    const observeLastElement=(node)=>{
        console.log(node,pageNumber.current);
        if(loading){
            return;
        }
        if(observer.current){
            observer.current.disconnect();
        }
        observer.current=new IntersectionObserver((entries)=>{
            console.log(entries);
            if(entries[0].isIntersecting){
                pageNumber.current+=1
                handleData();
            }
        },{threshold:1,rootMargin:'-50px'});
        if(node){
            observer.current.observe(node);
        }
    }


    const handleData=()=>{
        setLoading(true);
        fetchData(apiQuery,pageNumber.current).finally(()=>{
            setLoading(false);
        })
    }
    return(<>
    <div className="infinitescroll-wrapper">
        {
            noData?<span className="no-results">No search results found.</span>:(
                data.map((item,index)=>{
                    if(index===data.length-1){
                        return renderListElement(item,index,observeLastElement);
                    }
                    return renderListElement(item,index,null);
                })
            )
        }
    </div>
        <div className="row loader_row">
            {loading&&<div className="col-md-12" >
                <div className="loader" id="loader">
                    <span></span>
                    <span>
                    </span>
                    <span></span>
                </div>
            
            </div>}
        </div>
    </>
        );
}

function renderListElement(item,index,ref){
    //console.log(ref,title,key)
    return <p className="item" key={index} ref={ref}>{item.title}</p>
}