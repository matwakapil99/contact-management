import React, { useState } from 'react'
import { Contact } from '../types'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../store/contactsSlice'
import ConfirmDialog from './ConfirmDialog'

type Props = { contact:Contact, checked:boolean, onToggle:(v?:boolean)=>void, onEdit:()=>void }

export default function ContactItem({contact, checked, onToggle, onEdit}:Props){
  const dispatch = useDispatch()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDelete = ()=>{
    dispatch(deleteContact(contact.id))
    setConfirmOpen(false)
  }

  const fullAddress = [contact.addressLine1, contact.addressLine2, contact.state, contact.pincode]
    .filter(Boolean)
    .join(', ')

  return (
    <>
      <div className="row">
        <div><input className="checkbox" type="checkbox" checked={checked} onChange={e=>onToggle(e.target.checked)} /></div>
        <div className="contact-name">{contact.firstName} {contact.lastName}</div>
        <div className="contact-phone">{contact.phone}</div>
        <div className="contact-email">{contact.email}</div>
        <div className="contact-address">{fullAddress}</div>
        <div className="actions">
          <button className="icon-btn edit" onClick={onEdit} title="Edit">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a1.75 1.75 0 0 1-.491.349l-3.5 1.5a.75.75 0 0 1-.983-.983l1.5-3.5a1.75 1.75 0 0 1 .349-.491L11.013 2.513zm1.414 1.06a.25.25 0 0 0-.354 0L4.811 10.836a.25.25 0 0 0-.05.07l-1.006 2.347 2.347-1.006a.25.25 0 0 0 .07-.05l7.263-7.262a.25.25 0 0 0 0-.354l-1.06-1.06z"/>
            </svg>
            <span>Edit</span>
          </button>
          <button className="icon-btn delete" onClick={()=>setConfirmOpen(true)} title="Delete">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5zM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528zM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5z"/>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      {confirmOpen && (
        <ConfirmDialog 
          title="Delete Contact" 
          message="Are you sure you want to delete this contact? This action cannot be undone."
          onCancel={()=>setConfirmOpen(false)} 
          onConfirm={handleDelete} 
        />
      )}
    </>
  )
}
