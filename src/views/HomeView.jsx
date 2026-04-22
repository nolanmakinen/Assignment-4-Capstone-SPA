//Nolan Makinen
//2026-04-21
//Assignment 4: Capstone SPA

import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeView(){
  return (
    <div className="text-center">
      <h1 className="mb-3">Lens Database</h1>
      <p className="lead">A single page react app to manage your camera lenses.</p>
      <p>Add lenses, view their specs, and sort through your set of lenses</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/list" className="btn btn-primary">View Lenses</Link>
        <Link to="/new" className="btn btn-success">Add New Lens</Link>
      </div>
    </div>
  )
}