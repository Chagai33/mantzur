import React from 'react'

function PersonBox({ image, label, onClick, className, id }) {
  return (
    <div 
      id={id}
      className={`person-box ${!image ? 'placeholder' : ''} ${className || ''}`} 
      onClick={onClick}
    >
      
      {image && <img src={image.src} alt={label} />}
      
      <div className="label">{label || '...'}</div>
    </div>
  )
}

export default PersonBox

