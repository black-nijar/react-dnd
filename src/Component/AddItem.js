import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import Card from './Card';

const AddItem = () => {
  const [item, setItem] = useState([]);
  const [text, setText] = useState('');

  const deleteItem = (id) => {
    setItem((prevItem) => {
      return prevItem.filter(item => item.id !== id)
    })
  };

  const addItem = (e) => {
    if (!text) {
      alert('Please enter item...')
      e.preventDefault();
    } else {
      e.preventDefault();
      setItem(prevItem => {
        return [{ id: new Date().getTime(), text }, ...prevItem]
      })
      setText('')
    }
  };

  const onChange = (e) => {
    setText(e.target.value)
  };
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = item[dragIndex]
      setItem(
        update(item, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [item],
  )
  const renderCard = (item, index) => {
    return (
      <Card
        key={item.id}
        index={index}
        id={item.id}
        text={item.text}
        moveCard={moveCard}
        deleteItem={deleteItem}
      />
    )
  }
  return (
    <div>
      <form className='form' onSubmit={addItem}> 
        <div>
          <label htmlFor='text'>Enter text :</label>
          <input
            className='form-control'
            placeholder='Enter text'
            onChange={onChange}
            type='text'
            value={text}
          />
        </div>
        <div className='add-button'>
          <button
            className='btn btn-primary'
          >
            Add Item
          </button>
        </div>
      </form>
      <h5 style={{textAlign: 'center'}}>List</h5>
      {
        item.length ? (
          item.map((item, index) => renderCard(item, index))
        ) : (
          <div>
            <h5 style={{textAlign: 'center'}}>Add item</h5>
          </div>
        )
      }
      
    </div>
  )
}

export default AddItem
