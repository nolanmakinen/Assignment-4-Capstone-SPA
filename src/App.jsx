import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Layout from './layout/Layout'
import HomeView from './views/HomeView'
import ListView from './views/ListView'
import DetailView from './views/DetailView'
import CreateEditView from './views/CreateEditView'
import { ItemsProvider } from './context/ItemsContext'

function NotFound(){
  return (
    <div className='text-center p-5'>
      <h2>404 - Not Found</h2>
      <p className='text-muted'>This page does not exist.</p>
      <Link to="/" className='btn btn-primary mt-3'>Go Home</Link>
    </div>
  )
}

export default function App(){
  return (
    <ItemsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path="list" element={<ListView />} />
          <Route path="item/:id" element={<DetailView />} />
          <Route path="new" element={<CreateEditView />} />
          <Route path="edit/:id" element={<CreateEditView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ItemsProvider>
  )
}