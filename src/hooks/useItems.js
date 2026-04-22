//Nolan Makinen
//2026-04-21
//Assignment 4: Capstone SPA

import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'a4_items'

export default function useItems(){
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [mount, setMount] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')

  // Load
  useEffect(() => {const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {setItems(JSON.parse(stored))}}, [])

  // Save
  useEffect(() => {localStorage.setItem(STORAGE_KEY, JSON.stringify(items))}, [items])

  function addItem(data){
    const newItem = {...data, id: crypto.randomUUID()}
    setItems(prev => [...prev, newItem])}

  function updateItem(id, patch){setItems(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item))}
  function deleteItem(id){setItems(prev => prev.filter(item => item.id !== id))}
  const mounts = useMemo(() => {return [...new Set(items.map(i => i.mount).filter(Boolean))]}, [items])
  const categories = useMemo(() => {return [...new Set(items.map(i => i.category).filter(Boolean))]}, [items])
  const derived = useMemo(() => {let result = [...items]
    if (search) {
  const term = search.toLowerCase()

  result = result.filter(i => {
    const nameMatch = i.name.toLowerCase().includes(term)
    const focalMatch = String(i.focalMin).includes(term) || (i.focalMax && String(i.focalMax).includes(term))
    const apertureMatch = String(i.apertureMin).includes(term) || (i.apertureMax && String(i.apertureMax).includes(term))
    return nameMatch || focalMatch || apertureMatch
  })
}

    if (category) {result = result.filter(i => i.category === category)}

    if (mount) {result = result.filter(i => i.mount === mount)}

    result.sort((a, b) => {
  let valA = a[sortKey]
  let valB = b[sortKey]

  if (typeof valA === 'string') {
    valA = valA.toLowerCase()
    valB = valB.toLowerCase()
  }

  if (valA < valB) {
    if (sortDir === 'asc') {
      return -1
    } else {
      return 1
    }
  }

  if (valA > valB) {
    if (sortDir === 'asc') {
      return 1
    } else {
      return -1
    }
  }

  return 0
})

    return result
  }, [items, search, category, mount, sortKey, sortDir])

  return {
    items,
    search, setSearch,
    category, setCategory,
    mount, setMount,
    sortKey, setSortKey,
    sortDir, setSortDir,
    categories,
    mounts,
    derived,
    addItem, updateItem, deleteItem
  }
}