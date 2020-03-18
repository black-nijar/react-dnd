import React from 'react'
import './App.css'
import AddItem from './Component/AddItem'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'


const App = () => {
  return (
    <div>
      <DndProvider backend={Backend}>
        <AddItem/>
      </DndProvider>
    </div>
  )
}

export default App
