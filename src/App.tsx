import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ContactList from './components/ContactList'
import ContactModal from './components/ContactModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store'
import { Contact } from './types'
import { bulkDelete } from './store/contactsSlice'
import ConfirmDialog from './components/ConfirmDialog'

const App: React.FC = ()=> {
  const contacts = useSelector((s: RootState) => s.contacts.items)
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Contact | null>(null)
  const [selected, setSelected] = useState<Record<string,boolean>>({})
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false)
  const dispatch = useDispatch()

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    if(!q) return contacts
    return contacts.filter(c=>{
      const name = (c.firstName + ' ' + c.lastName).toLowerCase()
      const email = c.email.toLowerCase()
      const phone = c.phone.toLowerCase()
      const state = (c.state || '').toLowerCase()
      return name.includes(q) || email.includes(q) || phone.includes(q) || state.includes(q)
    })
  }, [contacts, query])

  const selectedCount = Object.values(selected).filter(Boolean).length

  const handleBulkDelete = () => {
    const ids = Object.entries(selected).filter(([_,v])=>v).map(([k])=>k)
    dispatch(bulkDelete(ids))
    setSelected({})
    setConfirmBulkDelete(false)
  }

  return (
    <div className="app">
      <Header onAdd={()=>{ setEditing(null); setShowModal(true); }} />
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Contact Manager</h2>
        </div>
        
        <div className="toolbar">
          <SearchBar value={query} onChange={setQuery} />
          <div style={{display: 'flex', gap: '12px'}}>
            {selectedCount > 0 && (
              <button className="btn" onClick={()=>setConfirmBulkDelete(true)}>Bulk Delete</button>
            )}
            <button className="btn" onClick={()=>{ setEditing(null); setShowModal(true); }}>Add Contact</button>
          </div>
        </div>
        
        <ContactList 
          contacts={filtered} 
          onEdit={(c)=>{ setEditing(c); setShowModal(true); }}
          selected={selected}
          onToggle={(id, v)=>setSelected(s=> ({...s, [id]: typeof v === 'boolean' ? v : !s[id]}))}
        />
      </div>

      {showModal && (
        <ContactModal onClose={()=>setShowModal(false)} existing={editing} />
      )}

      {confirmBulkDelete && (
        <ConfirmDialog 
          title="Delete Selected Contacts" 
          message={`Are you sure you want to delete ${selectedCount} selected contact${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`}
          onCancel={()=>setConfirmBulkDelete(false)} 
          onConfirm={handleBulkDelete} 
        />
      )}
    </div>
  )
}

export default App
