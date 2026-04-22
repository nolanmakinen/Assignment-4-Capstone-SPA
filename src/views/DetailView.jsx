//Nolan Makinen
//2026-04-21
//Assignment 4: Capstone SPA

import React, { useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ItemsContext } from '../context/ItemsContext'

export default function DetailView(){
  const { id } = useParams()
  const navigate = useNavigate()
  const context = useContext(ItemsContext)

  const item = context.items.find(i => i.id === id)

  if (!item) {
    return <div className="alert alert-danger">Lens not found</div>
  }

  return (
    <div>
      <Link to="/list" className="btn btn-secondary mb-3">Back</Link>
      <div className="card">
        <div className="card-body">
          <h3>{item.name}</h3>
          <p><strong>Brand:</strong> {item.brand}</p>
          <p><strong>Mount:</strong> {item.mount}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Focal:</strong>{' '}{item.focalMax ? `${item.focalMin}–${item.focalMax}mm` : `${item.focalMin}mm`}</p>
          <p><strong>Aperture:</strong>{' '}{item.apertureMax ? `f/${item.apertureMin}–f/${item.apertureMax}` : `f/${item.apertureMin}`}</p>
          {item.description && <p>{item.description}</p>}
        </div>

        <div className="card-footer d-flex gap-2">
          <Link to={`/edit/${item.id}`} className="btn btn-warning">Edit</Link>
          <button className="btn btn-danger" onClick={() => {
              if (window.confirm('Delete this lens?')) {
                context.deleteItem(item.id)
                navigate('/list')}}}>Delete</button>
        </div>
      </div>
    </div>
  )
}