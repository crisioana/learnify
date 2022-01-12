import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import QuizList from './../quizes/QuizList'
import PeopleList from './../people/PeopleList'
import SettingList from './../settings/SettingList'

const ClassDetailModal = ({id, isOpenModal, setIsOpenModal}) => {
  const [currentMenu, setCurrentMenu] = useState('Quizes')

  return (
    <div className={`classDetailModal ${isOpenModal ? 'active' : undefined}`}>
      <div className={`classDetailModal__box ${isOpenModal ? 'active' : undefined}`}>
        <div className='classDetailModal__header'>
          <h3>Class Title Goes Here</h3>
          <AiOutlineClose onClick={() => setIsOpenModal(false)} />
        </div>
        <div className='classDetailModal__body'>
          <div className='classDetailModal__body--top'>
            <h4
              className={currentMenu === 'Quizes' ? 'active' : undefined}
              onClick={() => setCurrentMenu('Quizes')}
            >
              Quizes
            </h4>
            <h4
              className={currentMenu === 'People' ? 'active' : undefined}
              onClick={() => setCurrentMenu('People')}
            >
              People
            </h4>
            <h4
              className={currentMenu === 'Settings' ? 'active' : undefined}
              onClick={() => setCurrentMenu('Settings')}
            >
              Settings
            </h4>
          </div>
          <div className='classDetailModal__body--bottom'>
            {currentMenu === 'Quizes' && <QuizList />}
            {currentMenu === 'People' && <PeopleList />}
            {currentMenu === 'Settings' && <SettingList id={id} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassDetailModal