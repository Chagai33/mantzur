import React from 'react'

function PersonBox({ image, label, onClick }) {
  return (
    <div 
      className={`person-box ${!image ? 'placeholder' : ''}`} 
      onClick={onClick}
    >
      
      {image && <img src={image.src} alt={label} />}
      
      <div className="label">{label || '...'}</div>
    </div>
  )
}

export default PersonBox

