//Nolan Makinen
//2026-04-21
//Assignment 4: Capstone SPA

import React, { useState } from 'react'

export default function ItemForm({ initial = {}, onSave, onCancel }){
  const [form, setForm] = useState({
    name: initial.name || '',
    brand: initial.brand || '',
    mount: initial.mount || '',
    category: initial.category || '',
    focalMin: initial.focalMin || '',
    focalMax: initial.focalMax || '',
    apertureMin: initial.apertureMin || '',
    apertureMax: initial.apertureMax || '',
    description: initial.description || ''
  })

  const [errors, setErrors] = useState({})

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validate(values){
    const errs = {}

    if (!values.name.trim()) errs.name = 'Name is required'
    if (!values.brand.trim()) errs.brand = 'Brand is required'
    if (!values.mount) errs.mount = 'Mount is required'
    if (!values.category) errs.category = 'Category is required'

    if (values.category === 'Prime') {
      if (!values.focalMin || Number(values.focalMin) <= 0)
        errs.focalMin = 'Valid focal length required'

      if (!values.apertureMin || Number(values.apertureMin) < 0.7)
        errs.apertureMin = 'Valid f-stop required'
    }

    if (values.category === 'Zoom') {
      if (!values.focalMin || !values.focalMax)
        errs.focalRange = 'Both focal values required'
      else if (Number(values.focalMin) > Number(values.focalMax))
        errs.focalRange = 'Min must be ≤ Max'

      if (!values.apertureMin || !values.apertureMax)
        errs.apertureRange = 'Both aperture values required'
      else if (Number(values.apertureMin) > Number(values.apertureMax))
        errs.apertureRange = 'Min must be ≤ Max'
    }

    return errs
  }

  function handleBlur(){setErrors(validate(form))}

  function onSubmit(e){
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    const cleaned = {...form, focalMin: Number(form.focalMin), focalMax: form.focalMax ? Number(form.focalMax) : null, apertureMin: Number(form.apertureMin), apertureMax: form.apertureMax ? Number(form.apertureMax) : null}
    onSave(cleaned)
  }

  return (
    <form className="row g-3" onSubmit={onSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name} onChange={handleChange} onBlur={handleBlur}/>
        <div className="invalid-feedback">{errors.name}</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Brand</label>
        <input name="brand" className={`form-control ${errors.brand ? 'is-invalid' : ''}`} value={form.brand} onChange={handleChange} onBlur={handleBlur}/>
        <div className="invalid-feedback">{errors.brand}</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Mount</label>
        <select name="mount" className={`form-select ${errors.mount ? 'is-invalid' : ''}`} value={form.mount} onChange={handleChange} onBlur={handleBlur}>
          <option value="">Select...</option>
          <option value="Canon EF">Canon EF</option>
          <option value="Sony E">Sony E</option>
          <option value="Nikon F">Nikon F</option>
          <option value="Micro Four Thirds">Micro 4/3</option>
        </select>
        <div className="invalid-feedback">{errors.mount}</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Category</label>
        <select name="category" className={`form-select ${errors.category ? 'is-invalid' : ''}`} value={form.category} onChange={handleChange} onBlur={handleBlur}>
          <option value="">Select...</option>
          <option value="Prime">Prime</option>
          <option value="Zoom">Zoom</option>
        </select>
        <div className="invalid-feedback">{errors.category}</div>
      </div>
      {form.category === 'Prime' && (
        <>
          <div className="col-md-3">
            <label className="form-label">Focal Length (mm)</label>
            <input type="number" name="focalMin" className={`form-control ${errors.focalMin ? 'is-invalid' : ''}`} value={form.focalMin} onChange={handleChange} onBlur={handleBlur}/>
            <div className="invalid-feedback">{errors.focalMin}</div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Aperture</label>
            <input type="number" step="0.1" name="apertureMin" className={`form-control ${errors.apertureMin ? 'is-invalid' : ''}`} value={form.apertureMin} onChange={handleChange} onBlur={handleBlur}/>
            <div className="invalid-feedback">{errors.apertureMin}</div>
          </div>
        </>
      )}
      {form.category === 'Zoom' && (
        <>
          <div className="col-md-3">
            <label className="form-label">Min mm</label>
            <input type="number" name="focalMin" className="form-control" value={form.focalMin} onChange={handleChange} onBlur={handleBlur}/>
          </div>
          <div className="col-md-3">
            <label className="form-label">Max mm</label>
            <input type="number" name="focalMax" className="form-control" value={form.focalMax} onChange={handleChange} onBlur={handleBlur}/>
          </div>
          <div className="col-12 text-danger">{errors.focalRange}</div>
          <div className="col-md-3">
            <label className="form-label">Min f-stop</label>
            <input type="number" step="0.1" name="apertureMin" className="form-control" value={form.apertureMin} onChange={handleChange} onBlur={handleBlur}/>
          </div>
          <div className="col-md-3">
            <label className="form-label">Max f-stop</label>
            <input type="number" step="0.1" name="apertureMax" className="form-control" value={form.apertureMax} onChange={handleChange} onBlur={handleBlur}/>
          </div>
          <div className="col-12 text-danger">{errors.apertureRange}</div>
        </>
      )}
      <div className="col-12">
        <textarea name="description" className="form-control" value={form.description} onChange={handleChange}/>
      </div>
      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary">Save</button>{onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}