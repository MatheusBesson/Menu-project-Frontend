import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './components/card/card';
import type { DishData } from './interface/DishData';
import { useDishData } from './hooks/useDishData';
import { CreateModal } from './create-modal/create-modal';

function App() {

  const { data } = useDishData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <>
      <div className='container'>
        <h1></h1>
        <div className='card-grid'>
          {data?.map(dishData =>
            <Card
              price={dishData.price}
              title={dishData.title}
              imageUrl={dishData.imageUrl}
            />
          )}

        </div>
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal}>new dish</button>
      </div>
    </>
  )
}

export default App
