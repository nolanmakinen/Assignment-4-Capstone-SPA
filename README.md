# Lens Database SPA

## Overview
A React SPA for managing camera lenses with filtering, sorting, and CRUD functionality.

## Features
- Add / edit / delete lenses
- Filter by category and mount
- Search by name, focal length, aperture
- Persistent storage using localStorage
- React Context for global state

## Routes
- / → Home
- /list → Lens list
- /item/:id → Detail view
- /new → Create lens
- /edit/:id → Edit lens

## Data Model
- id
- name
- brand
- mount
- category
- focalMin / focalMax
- apertureMin / apertureMax

## How to run
```
npm install
npm run dev
```
