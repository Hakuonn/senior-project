import React from 'react'
import { Image } from 'react-bootstrap'
import '../../css/uberEat_store.css'

function EmptyState({src}) {
  return (
    <Image src={src} className="full-page-image" rounded fluid/>
  )
}

export default EmptyState