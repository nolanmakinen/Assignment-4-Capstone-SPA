//Nolan Makinen
//2026-04-21
//Assignment 4: Capstone SPA

import React, { useContext } from 'react'
import ItemCard from '../components/ItemCard'
import { ItemsContext } from '../context/ItemsContext'

export default function ListView(){
  const context = useContext(ItemsContext)

  return (
    <div>
      <div className="row g-2 align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label">Search</label>
          <input type="text" className="form-control" value={context.search} onChange={e => context.setSearch(e.target.value)} placeholder="Search lenses..."/>
        </div>
        <div className="col-md-2">
          <label className="form-label">Category</label>
          <select className="form-select" value={context.category} onChange={e => context.setCategory(e.target.value)}>
            <option value="">All</option>
            {context.categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Mount</label>
          <select className="form-select" value={context.mount} onChange={e => context.setMount(e.target.value)}>
            <option value="">All</option>
            {context.mounts.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Sort By</label>
          <select className="form-select" value={context.sortKey} onChange={e => context.setSortKey(e.target.value)}>
            <option value="name">Name</option>
            <option value="focalMin">Focal Length</option>
            <option value="apertureMin">Aperture</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label">Direction</label>
          <select className="form-select" value={context.sortDir} onChange={e => context.setSortDir(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {context.items.length === 0 && (
        <div className="alert alert-info">No lenses added yet.</div>
      )}
      {contextcontext.items.length > 0 && context.derived.length === 0 && (
        <div className="alert alert-warning">No results match your filters.</div>
      )}
      <div className="row g-3">
        {context.derived.map(item => (
          <div key={item.id} className="col-md-4">
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}