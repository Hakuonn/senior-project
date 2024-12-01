import React, { useEffect , useState } from 'react'
import { Card } from 'react-bootstrap'
import { Rating } from '@mui/material'
import Axios from 'components/Axios'

/**
 * 關於商家評論的視覺區塊
 * 
 * @param {string} id 商家編號
 * @returns html
 */
function Comment({id}) {

  const [data,setData] = useState(null)

  useEffect(() => {
    Axios().get("comment/store/id/",{
      params:{"store_id":id}
    })
    .then((res) => {
      let response = res.data
      setData(response)
    })
    .catch((err) => {
      alert("伺服器正在維護中！")
      if (err.response.status === 404){
        console.log("查無資料：）")
      }
    })
  },[])

  return (
    <div className='customer-feedback'>
      {data && data.map((item) => (
        <Card key={item.evaid}>
            <Card.Body>
                {/* <Card.Title>{name}</Card.Title> */}
                <Card.Text>{item.explain}</Card.Text>
                <Rating name="read-only" value={item.star} readOnly size='large'/>
            </Card.Body>
            <Card.Footer>撰寫時間：{item.date}</Card.Footer>
        </Card>
      ))}
    </div>
  )
}

export default Comment