import React from 'react'
import "../components/Navbar.css"

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className="logo">iTask</div>
        <div>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact Us</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar