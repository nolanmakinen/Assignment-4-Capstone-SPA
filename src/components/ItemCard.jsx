//Nolan Makinen
//2026-04-21
//Assignment 4: Capstone SPA

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ItemsContext } from '../context/ItemsContext'

export default function ItemCard({ item }){
  const { deleteItem } = useContext(ItemsContext)

  let focalText = ''
  if (item.focalMax) {
    focalText = `${item.focalMin}–${item.focalMax}mm`
  } else {
    focalText = `${item.focalMin}mm`
  }

  let apertureText = ''
  if (item.apertureMax) {
    apertureText = `f/${item.apertureMin}–f/${item.apertureMax}`
  } else {
    apertureText = `f/${item.apertureMin}`
  }

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5>{item.name}</h5>
        <p><strong>Brand:</strong> {item.brand}</p>
        <p><strong>Mount:</strong> {item.mount}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Focal:</strong> {focalText}</p>
        <p><strong>Aperture:</strong> {apertureText}</p>
      </div>

      <div className="card-footer d-flex gap-2">
        <Link to={`/item/${item.id}`} className="btn btn-primary btn-sm">View</Link>
        <Link to={`/edit/${item.id}`} className="btn btn-warning btn-sm">Edit</Link>
        <button className="btn btn-danger btn-sm" onClick={() => {if (window.confirm('Delete this lens?')) {deleteItem(item.id)}}}>Delete</button>
      </div>
    </div>
  )
}