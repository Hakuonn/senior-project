import React from 'react'
import SimpleSlider from '../components/uberEat_C_C/SimpleSlider'
import LogIn from '../components/uberEat_C_C/LogIn'
import KanBan from '../components/nav_and_footer/KanBan'
import { Container } from 'react-bootstrap'



function Home({baseUrl}) {
  return (
    <Container>
        <KanBan/>
        <SimpleSlider baseUrl={baseUrl}/>
        <LogIn/>
    </Container>
  )
}

export default Home