import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaBell } from 'react-icons/fa'
import Avatar from './Avatar'

const Navbar = () => {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false)

  return (
    <div className='navbar'>
      <h2>
        <Link to='/dashboard'>Learnify</Link>
      </h2>
      <GiHamburgerMenu onClick={() => setIsOpenNavbar(true)} />
      <div className={`navbar__overlay ${isOpenNavbar ? 'active' : undefined}`}>
        <div className={`navbar__links ${isOpenNavbar ? 'active' : undefined}`}>
          <div className='navbar__links--closeIcon'>
            <AiOutlineClose onClick={() => setIsOpenNavbar(false)} />
          </div>
          <p>Join Class</p>
          <p>Message</p>
          <div className='navbar__links--notification'>
            <FaBell />
          </div>
          <div className='navbar__links--profile'>
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar