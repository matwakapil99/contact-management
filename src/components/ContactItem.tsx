import React from 'react'
import { Contact } from '../types'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../store/contactsSlice'

type Props = { contact:Contact, checked:boolean, onToggle:(v?:boolean)=>void, onEdit:()=>void }

export default function ContactItem({contact, checked, onToggle, onEdit}:Props){
  const dispatch = useDispatch()

  const onDelete = ()=>{
    if(window.confirm('Delete this contact?')){
      dispatch(deleteContact(contact.id))
    }
  }

  return (
    <div className="row">
      <div><input className="checkbox" type="checkbox" checked={checked} onChange={e=>onToggle(e.target.checked)} /></div>
      <div>
        <div className="contact-name">{contact.firstName} {contact.lastName}</div>
        <div className="small">{contact.address}</div>
      </div>
      <div className="small">{contact.email}</div>
      <div className="small">{contact.phone}</div>
      <div>
        <button className="icon-btn" onClick={onEdit}>Edit</button>
        <button className="icon-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
