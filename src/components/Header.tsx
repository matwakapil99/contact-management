import React from 'react'

type Props = { onAdd?: ()=>void }

const Header: React.FC<Props> = ({ onAdd })=>{
  return (
    <div className="header">
      <div className="brand">
        <div className="brand-logo">oB</div>
        <div>
          <div className="title">ofBusiness</div>
        </div>
      </div>
    </div>
  )
}

export default Header
