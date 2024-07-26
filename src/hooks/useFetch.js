import React, { useState, useEffect } from 'react'


/*** 
 * 抓取資料，並回傳一個data object
 * 在需要抓取資料的component裡打上：
 * const {data: dataName} = useFetch("網址")
 ***/
function useFetch(url) {
    const [data, setData] = useState(null)
    useEffect(() => {
      fetch(url)
      .then((res)=>{
        return res.json();
      })
      .then((data)=>{
        setData(data);
      })
    },[url]);
    
    return {data}
}


export default useFetch