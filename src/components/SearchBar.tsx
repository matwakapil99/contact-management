import React from 'react'

type Props = { value:string, onChange:(v:string)=>void }
export default function SearchBar({value,onChange}:Props){
  return (
    <input
      className="search"
      placeholder="Search by Name, Contact, Email, State..."
      value={value}
      onChange={e=>onChange(e.target.value)}
    />
  )
}
