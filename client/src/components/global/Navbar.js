import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaBell } from 'react-icons/fa'
import JoinClass from './../student/dashboard/JoinClass'
import CreateClass from './../teacher/dashboard/CreateClass'
import Avatar from './Avatar'

const Navbar = () => {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false)
  const [openJoinClass, setOpenJoinClass] = useState(false)
  const [openCreateClass, setOpenCreateClass] = useState(false)

  return (
    <>
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
            <p onClick={() => setOpenJoinClass(true)}>Join Class</p>
            <p onClick={() => setOpenCreateClass(true)}>Create Class</p>
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

      <JoinClass
        openJoinClass={openJoinClass}
        setOpenJoinClass={setOpenJoinClass}
      />

      <CreateClass
        openCreateClass={openCreateClass}
        setOpenCreateClass={setOpenCreateClass}
      />
    </>
  )
}

export default Navbar