import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import KanBan from '../../../components/nav_and_footer/KanBan'
import ActivityBuilder from '../../../components/ActivityBuilder'
import Axios from '../../../components/Axios'

function Activity() {
  const [data, setData] = useState(null)

  const getActivity = () =>{
    const action = '/news/all/'
    Axios().get(action)
    .then((res)=>{
      console.log(res.data)
      return setData(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getActivity()
  },[])
  

  return (
    <>
      <KanBan/>
      <div className='activity-div'>
        <Container fluid>
          <h1>活動專區</h1>
          {data &&
          data.map((item)=>(
            <ActivityBuilder data={item}/>
          ))
          }
        </Container>
      </div>
    </>
  )
}

export default Activity