import React, { useEffect, useState } from 'react'
import { Link, useFetcher } from 'react-router-dom'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import useFetch from '../hooks/useFetch'


function ActivityBuilder({data}) {
    const [actid, setActid] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [author, setAuthor] = useState(null)
    const [img, setImg] = useState(null)
    const [date, setDate] = useState(null)
    const [link, setLink] = useState(null)
    const [serverUrl, setServerUrl] = useState(null)
    const { data: serverURL } = useFetch("http://localhost:8002/serverURL")
  
    useEffect(() => {
      if (serverURL && serverURL.length > 0) {
        const firstServerURL = serverURL[0].serverurl
        setServerUrl(firstServerURL)
      }
    }, [serverURL])

    useEffect(()=>{
      setActid(data.actid)
      setTitle(data.title)
      setContent(data.content)
      setAuthor(data.author)
      setImg(data.pic1)
      setDate(data.upload_date)
      setLink(data.link)
    },[actid, title, content, author, img, date, link])
  return (
    <>
    <Row>
        <Col xs={12} md={4}>
          <div className='activityBuilder-img'>
            <Image src={`${serverUrl}${img}`} rounded fluid/>
          </div>
        </Col>
        <Col xs={12} md={8}>
          <h4 className='single-ellipsis'>{title}</h4>
          <hr />
          <p className="activity-multiline-ellipsis">{content}</p>
          <p className='activity-annotation'>{author} | {date}</p>
          <Link to={`/activity/${actid}`}>
            <Button variant="outline-info">繼續閱讀＞</Button>
          </Link>
        </Col>
    </Row>
    <hr />
    </>
  )
}

export default ActivityBuilder