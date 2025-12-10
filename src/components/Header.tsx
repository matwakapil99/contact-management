import React from 'react'

type Props = { onAdd?: ()=>void }

const Header: React.FC<Props> = ({ onAdd })=>{
  return (
    <div className="header">
      <div className="brand">
        <div className="title">Contact Manager</div>
        <div className="subtitle">Manage your contacts — Full Name, Email, Phone, Address</div>
      </div>
      <div className="controls">
        <button className="btn" onClick={onAdd}>Add Contact</button>
      </div>
    </div>
  )
}

export default Header
