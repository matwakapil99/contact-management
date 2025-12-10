import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ContactList from './components/ContactList'
import ContactModal from './components/ContactModal'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { Contact } from './types'

const App: React.FC = ()=> {
  const contacts = useSelector((s: RootState) => s.contacts.items)
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Contact | null>(null)

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    if(!q) return contacts
    return contacts.filter(c=>{
      const name = (c.firstName + ' ' + c.lastName).toLowerCase()
      return name.includes(q) || c.email.toLowerCase().includes(q)
    })
  }, [contacts, query])

  return (
    <div className="app">
      <Header onAdd={()=>{ setEditing(null); setShowModal(true); }} />
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <ContactList contacts={filtered} onEdit={(c)=>{ setEditing(c); setShowModal(true); }} />
      </div>

      {showModal && (
        <ContactModal onClose={()=>setShowModal(false)} existing={editing} />
      )}
    </div>
  )
}

export default App
