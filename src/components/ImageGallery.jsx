import './ImageGallery.css'

function ImageGallery({ images, imageTexts, onImageClick, onTextChange }) {
  // חלוקת התמונות לפי המבנה: 3-2-3
  const row1 = images.slice(0, 3) // 3 תמונות ראשונות
  const row2 = images.slice(3, 5) // 2 תמונות גדולות
  const row3 = images.slice(5, 8) // 3 תמונות אחרונות

  const renderImage = (image, index, isLarge = false) => {
    if (!image) return null
    
    return (
      <div 
        key={index}
        className={`gallery-item-wrapper ${isLarge ? 'large' : ''}`}
      >
        <div 
          className={`gallery-item ${isLarge ? 'large' : ''}`}
          onClick={() => onImageClick(index)}
        >
          <div className="image-frame">
            <div className="image-wrapper">
              <img 
                src={image} 
                alt={`תמונה ${index + 1}`}
                loading="lazy"
              />
              <div className="image-overlay">
                <span className="click-hint">לחץ להחלפה</span>
              </div>
            </div>
          </div>
        </div>
        <div className="image-text-container">
          <textarea
            className="image-text"
            placeholder="הוסף טקסט כאן..."
            value={imageTexts[index] || ''}
            onChange={(e) => onTextChange(index, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            rows={2}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="gallery-container">
      {/* שורה ראשונה - 3 תמונות קטנות */}
      <div className="gallery-row row-small">
        {row1.map((img, idx) => renderImage(img, idx))}
      </div>

      {/* שורה שנייה - 2 תמונות גדולות */}
      <div className="gallery-row row-large">
        {row2.map((img, idx) => renderImage(img, idx + 3, true))}
      </div>

      {/* שורה תחתונה - 3 תמונות קטנות */}
      <div className="gallery-row row-small">
        {row3.map((img, idx) => renderImage(img, idx + 5))}
      </div>
    </div>
  )
}

export default ImageGallery

