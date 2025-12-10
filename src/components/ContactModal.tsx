import React, { useEffect, useState } from 'react'
import { Contact } from '../types'
import { useDispatch } from 'react-redux'
import { addContact, updateContact } from '../store/contactsSlice'
import { isValidEmail, isDigitsOnly } from '../utils/validators'
import { v4 as uuidv4 } from 'uuid'

type Props = { existing?:Contact | null, onClose: ()=>void }

export default function ContactModal({existing, onClose}:Props){
  const [firstName, setFirstName] = useState(existing?.firstName ?? '')
  const [lastName, setLastName] = useState(existing?.lastName ?? '')
  const [email, setEmail] = useState(existing?.email ?? '')
  const [phone, setPhone] = useState(existing?.phone ?? '')
  const [address, setAddress] = useState(existing?.address ?? '')
  const [errors, setErrors] = useState<Record<string,string>>({})
  const dispatch = useDispatch()

  useEffect(()=>{
    const onKey = (e:KeyboardEvent)=>{ if(e.key==='Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown', onKey)
  },[onClose])

  const validate = ()=>{
    const e:Record<string,string> = {}
    if(!firstName.trim()) e.firstName = 'Required'
    if(!lastName.trim()) e.lastName = 'Required'
    if(!email.trim()) e.email = 'Required'
    else if(!isValidEmail(email)) e.email = 'Invalid email'
    if(!phone.trim()) e.phone = 'Required'
    else if(!isDigitsOnly(phone)) e.phone = 'Digits only'
    setErrors(e)
    return Object.keys(e).length===0
  }

  const onSubmit = ()=>{
    if(!validate()) return
    const payload: Contact = existing ? { ...existing, firstName, lastName, email, phone, address } : {
      id: uuidv4(), firstName, lastName, email, phone, address
    }
    if(existing) dispatch(updateContact(payload))
    else dispatch(addContact(payload))
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <div style={{fontWeight:600}}>{existing ? 'Edit Contact' : 'Add Contact'}</div>
          <div><button className="icon-btn" onClick={onClose}>✕</button></div>
        </div>

        <div className="form-row">
          <div>
            <div className="field-label">First name *</div>
            <input className="input" value={firstName} onChange={e=>setFirstName(e.target.value)} />
            {errors.firstName && <div className="error">{errors.firstName}</div>}
          </div>
          <div>
            <div className="field-label">Last name *</div>
            <input className="input" value={lastName} onChange={e=>setLastName(e.target.value)} />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
        </div>

        <div style={{marginBottom:8}}>
          <div className="field-label">Email *</div>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div style={{marginBottom:8}}>
          <div className="field-label">Phone *</div>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>

        <div style={{marginBottom:12}}>
          <div className="field-label">Address</div>
          <input className="input" value={address} onChange={e=>setAddress(e.target.value)} />
        </div>

        <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={onSubmit}>{existing ? 'Save' : 'Add'}</button>
        </div>
      </div>
    </div>
  )
}
