import React from 'react'

type Props = { title:string, onConfirm:()=>void, onCancel:()=>void }

export default function ConfirmDialog({title,onConfirm,onCancel}:Props){
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div style={{fontWeight:600, marginBottom:12}}>{title}</div>
        <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
