import React from 'react'
import NavB from '../components/NavB'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <NavB/>
      <div style={{ backgroundColor: '#f4f6f8' }}>
      <Hero/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
