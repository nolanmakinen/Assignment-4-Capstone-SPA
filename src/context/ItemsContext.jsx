//Nolan Makinen
//2026-04-21
//Assignment 4: Capstone SPA

import React, { createContext } from 'react'
import useItems from '../hooks/useItems'

export const ItemsContext = createContext(null)

export function ItemsProvider({ children }) {
  const itemsData = useItems()
  const value = {...itemsData}

  return (<ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>)
}