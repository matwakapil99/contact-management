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
  const [addressLine1, setAddressLine1] = useState(existing?.addressLine1 ?? '')
  const [addressLine2, setAddressLine2] = useState(existing?.addressLine2 ?? '')
  const [state, setState] = useState(existing?.state ?? '')
  const [pincode, setPincode] = useState(existing?.pincode ?? '')
  const [errors, setErrors] = useState<Record<string,string>>({})
  const dispatch = useDispatch()

  useEffect(()=>{
    const onKey = (e:KeyboardEvent)=>{ if(e.key==='Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown', onKey)
  },[onClose])

  const handleNameChange = (value: string) => {
    const parts = value.split(' ')
    setFirstName(parts[0] || '')
    setLastName(parts.slice(1).join(' '))
  }

  const validate = ()=>{
    const e:Record<string,string> = {}
    if(!firstName.trim()) e.firstName = 'Name is required'
    if(!email.trim()) e.email = 'Email is required'
    else if(!isValidEmail(email)) e.email = 'Invalid email'
    if(!phone.trim()) e.phone = 'Contact number is required'
    else if(!isDigitsOnly(phone)) e.phone = 'Only digits allowed'
    if(!addressLine1.trim()) e.addressLine1 = 'Address is required'
    if(!pincode.trim()) e.pincode = 'Pincode is required'
    else if(!isDigitsOnly(pincode)) e.pincode = 'Only digits allowed'
    setErrors(e)
    return Object.keys(e).length===0
  }

  const onSubmit = (e?: React.FormEvent)=>{
    e?.preventDefault()
    if(!validate()) return
    const payload: Contact = existing ? 
      { ...existing, firstName, lastName, email, phone, addressLine1, addressLine2, state, pincode } : 
      { id: uuidv4(), firstName, lastName, email, phone, addressLine1, addressLine2, state, pincode }
    if(existing) dispatch(updateContact(payload))
    else dispatch(addContact(payload))
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Add Contact</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="field-label">Name<span className="required">*</span></label>
            <input 
              className={`input ${errors.firstName ? 'error-input' : ''}`}
              placeholder="Enter name" 
              value={firstName + (lastName ? ' ' + lastName : '')} 
              onChange={e=>handleNameChange(e.target.value)} 
            />
            {errors.firstName && <div className="error">{errors.firstName}</div>}
          </div>
          <div className="form-group">
            <label className="field-label">Contact No.</label>
            <input 
              className={`input ${errors.phone ? 'error-input' : ''}`}
              placeholder="Enter contact" 
              value={phone} 
              onChange={e=>setPhone(e.target.value)} 
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="field-label">Email<span className="required">*</span></label>
            <input 
              className={`input ${errors.email ? 'error-input' : ''}`}
              placeholder="Enter email" 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label className="field-label">Address Line 1<span className="required">*</span></label>
            <input 
              className={`input ${errors.addressLine1 ? 'error-input' : ''}`}
              placeholder="Enter address" 
              value={addressLine1} 
              onChange={e=>setAddressLine1(e.target.value)} 
            />
            {errors.addressLine1 && <div className="error">{errors.addressLine1}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="field-label">Address Line 2 (Optional)</label>
            <input 
              className="input" 
              placeholder="Enter address" 
              value={addressLine2} 
              onChange={e=>setAddressLine2(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label className="field-label">State</label>
            <select 
              className="input" 
              value={state} 
              onChange={e=>setState(e.target.value)}
            >
              <option value="">Select state</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="field-label">Pincode<span className="required">*</span></label>
          <input 
            className={`input ${errors.pincode ? 'error-input' : ''}`}
            placeholder="Enter pincode" 
            value={pincode} 
            onChange={e=>setPincode(e.target.value)} 
          />
          {errors.pincode && <div className="error">{errors.pincode}</div>}
        </div>

        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={onSubmit}>Add Contact</button>
        </div>
      </div>
    </div>
  )
}
