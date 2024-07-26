import React, { useState, useEffect } from 'react'
import { Table } from 'antd';
import Column from 'antd/es/table/Column';


function Bill({data}) {
    // getToBack
    const [dataSource, setDataSource] = useState(null)
    
    const nextClick = () =>{
        console.log('ok')
    }
    useEffect(()=>{
        setDataSource(data)
    },[data])

  return (
    <>
        <Table dataSource={dataSource}>
            <Column title="店家" dataIndex="store_name" key="store_name" />
            <Column title="品名" dataIndex="goods_name" key="goods_name"/>
            <Column title="單價" dataIndex="price" key="price"/>
            <Column title="數量" dataIndex="quantity" key="quantity"/>
            <Column title="總計" dataIndex="subtotal" key="subtotal"/>
        </Table>
    </>
  )
}

export default Bill