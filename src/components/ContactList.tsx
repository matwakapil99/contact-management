import React, { useState } from 'react'
import { Contact } from '../types'
import ContactItem from './ContactItem'
import { useDispatch } from 'react-redux'
import { bulkDelete } from '../store/contactsSlice'
import ConfirmDialog from './ConfirmDialog'

type Props = { contacts: Contact[], onEdit: (c:Contact)=>void }

export default function ContactList({contacts, onEdit}:Props){
  const [selected, setSelected] = useState<Record<string,boolean>>({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const dispatch = useDispatch()

  const toggle = (id:string, v?:boolean)=>{
    setSelected(s=> ({...s, [id]: typeof v === 'boolean' ? v : !s[id]}))
  }

  const allSelected = Object.values(selected).filter(Boolean).length

  const handleBulkDelete = ()=>{
    setConfirmOpen(true)
  }

  const confirmBulk = ()=>{
    const ids = Object.entries(selected).filter(([_,v])=>v).map(([k])=>k)
    dispatch(bulkDelete(ids))
    setSelected({})
    setConfirmOpen(false)
  }

  return (
    <div className="list">
      <div className="row header">
        <div />
        <div>Full name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Actions</div>
      </div>

      {contacts.length===0 && <div className="empty">No contacts yet</div>}

      {contacts.map(c=> (
        <ContactItem key={c.id} contact={c} checked={!!selected[c.id]} onToggle={v=>toggle(c.id, v)} onEdit={()=>onEdit(c)} />
      ))}

      <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
        <div className="small-muted">{contacts.length} contacts</div>
        <div className="bulk-actions">
          {allSelected>0 && (
            <>
              <div className="small-muted">{allSelected} selected</div>
              <button className="btn ghost" onClick={handleBulkDelete}>Bulk Delete</button>
            </>
          )}
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog title="Delete selected contacts?" onCancel={()=>setConfirmOpen(false)} onConfirm={confirmBulk} />
      )}
    </div>
  )
}
