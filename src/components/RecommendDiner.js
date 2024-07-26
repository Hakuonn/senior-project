import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import { ListGroup } from 'react-bootstrap';
import Axios from '../components/Axios'

/** 
 * 推薦商家 
 **/
function RecommendDiner() {
    const {data: recommendGroup} = useFetch("http://localhost:8002/recommendStore")
    const [data, setData] = useState(null)
    console.log(data)
    const getData = () =>{
      Axios().get('/store_sch/prefer/')
      .then((res)=>{
        let data = res.data
        setData(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    

    useEffect(()=>{
      getData()
    },[])
  return (
    <>
        <h4>推薦店家</h4>
        <ListGroup>
            {recommendGroup &&
            recommendGroup.map((store)=>(
                <ListGroup.Item action href="" variant="light" key={store.id}>{store.name}</ListGroup.Item>
            ))
            }
        </ListGroup>
    </>
  )
}

export default RecommendDiner