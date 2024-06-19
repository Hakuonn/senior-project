import React, { useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { BsSearch } from "react-icons/bs";

/***
*搜索欄
***/
function Search({ setWebaction, setSearch}) {
  const [input, setInput] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    setSearch(input)
    setWebaction('search')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className='mb-3' size='lg'>
          <Form.Control
              placeholder='搜尋商店'
              aria-label='search'
              value={input}
              onChange={(e)=>setInput(e.target.value)}
          />
          <Button variant='success' type='submit'><BsSearch/></Button>
      </InputGroup>
    </Form>
  )
}

export default Search