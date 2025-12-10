import React from 'react'

type Props = { title:string, message?:string, onConfirm:()=>void, onCancel:()=>void }

export default function ConfirmDialog({title, message, onConfirm, onCancel}:Props){
  return (
    <div className="modal-backdrop">
      <div className="confirm-dialog">
        <div className="confirm-title">{title}</div>
        {message && <div className="confirm-message">{message}</div>}
        <div className="confirm-actions">
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
