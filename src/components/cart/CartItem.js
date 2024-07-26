import React from 'react'
import { Form, Button } from 'react-bootstrap'

/*** 
 *已廢棄
 ***/
function CartItem({data, setUnitPrice}) {
  return (
    <>
    <tr>
        <td><Button variant='danger'>刪除</Button></td>
        <td>{data.item}</td>
        <td>{data.store}</td>
        <td>{data.price}</td>  
        <td>
            <Form.Select aria-label="amount select" onChange={(e)=>setUnitPrice(e.target.value)} defaultValue={0}>
                <option value={0}>選擇數量</option>
                <option value={1 * data.price}>1</option>
                <option value={2 * data.price}>2</option>
                <option value={3 * data.price}>3</option>
            </Form.Select>
        </td>
    </tr>
    </>
  )
}

export default CartItem