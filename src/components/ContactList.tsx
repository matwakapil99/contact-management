import React from 'react'
import { Contact } from '../types'
import ContactItem from './ContactItem'

type Props = { 
  contacts: Contact[], 
  onEdit: (c:Contact)=>void,
  selected: Record<string,boolean>,
  onToggle: (id:string, v?:boolean)=>void
}

export default function ContactList({contacts, onEdit, selected, onToggle}:Props){
  return (
    <div className="list">
      <div className="row header">
        <div />
        <div>Name</div>
        <div>Contact</div>
        <div>Email</div>
        <div>Address</div>
        <div>Action</div>
      </div>

      {contacts.length===0 && (
        <div className="empty">
          <div className="empty-icon">📋</div>
          <div className="empty-text">No contacts found</div>
        </div>
      )}

      {contacts.map(c=> (
        <ContactItem 
          key={c.id} 
          contact={c} 
          checked={!!selected[c.id]} 
          onToggle={v=>onToggle(c.id, v)} 
          onEdit={()=>onEdit(c)} 
        />
      ))}
    </div>
  )
}
