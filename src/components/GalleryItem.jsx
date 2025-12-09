import './GalleryItem.css'

function GalleryItem({ imagePath, displayName, index, isLarge, onClick }) {
  const animationDelay = index * 0.1 // Staggered animation delay

  return (
    <div 
      className={`gallery-item-wrapper ${isLarge ? 'large' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div 
        className={`gallery-item ${isLarge ? 'large' : ''}`}
        onClick={onClick}
      >
        <div className="image-frame">
          <div className="image-wrapper">
            <img 
              src={imagePath} 
              alt={displayName}
              loading="lazy"
            />
            <div className="image-overlay">
              <span className="click-hint">לחץ להחלפה</span>
            </div>
          </div>
        </div>
      </div>
      <div className="image-text-container">
        <div className="image-text">
          {displayName}
        </div>
      </div>
    </div>
  )
}

export default GalleryItem

