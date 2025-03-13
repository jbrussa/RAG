import React from 'react'
import '../styles/Navbar.css'
import logo from '../assets/logo.webp'

const Navbar = () => {
  return (
    <div className='navbar'>
        
        <img className='logo' src={logo} alt='logo' />
    
        <div className='contact'>
            <button className='contact-button'>Contact Us</button>

        </div>
    </div>
  )
}

export default Navbar
