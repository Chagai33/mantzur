import { useState, useEffect } from 'react'
import './Lightbox.css'

function Lightbox({ images, currentIndex, onSelect, onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(currentIndex)

  useEffect(() => {
    setSelectedIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleImageClick = (index) => {
    setSelectedIndex(index)
  }

  const handleConfirm = () => {
    onSelect(selectedIndex)
  }

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="סגור">
          ×
        </button>
        
        <h2 className="lightbox-title">בחר תמונה להצגה</h2>
        
        <div className="lightbox-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className={`lightbox-item ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleImageClick(index)}
            >
              <div className="lightbox-image-wrapper">
                <img src={image} alt={`תמונה ${index + 1}`} />
                {selectedIndex === index && (
                  <div className="selected-indicator">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="lightbox-actions">
          <button className="lightbox-button cancel" onClick={onClose}>
            ביטול
          </button>
          <button className="lightbox-button confirm" onClick={handleConfirm}>
            אישור
          </button>
        </div>
      </div>
    </div>
  )
}

export default Lightbox

