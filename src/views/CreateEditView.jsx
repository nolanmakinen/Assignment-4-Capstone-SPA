//Nolan Makinen
//2026-04-21
//Assignment 4: Capstone SPA

import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import { ItemsContext } from '../context/ItemsContext'

export default function CreateEditView(){
  const { id } = useParams()
  const navigate = useNavigate()
  const context = useContext(ItemsContext)

  const existing = id ? context.items.find(i => i.id === id) : null

  if (id && !existing) {
    return <div className="alert alert-danger">Item not found.</div>
  }

  function handleSave(data){
    if (id) {
      context.updateItem(id, data)
    } else {
      context.addItem(data)
    }
    navigate('/list')
  }
  return (
    <div>
      <h2 className="h5 mb-3">{id ? 'Edit Item' : 'Add Item'}</h2>
      <ItemForm initial={existing || {}} onSave={handleSave} onCancel={() => navigate(-1)}/>
    </div>
  )
}