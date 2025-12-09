import './ImageGallery.css'
import GalleryItem from './GalleryItem'

function ImageGallery({ images, onImageClick }) {
  // חלוקת התמונות לפי המבנה: 3-2-3
  const row1 = images.slice(0, 3) // 3 תמונות ראשונות
  const row2 = images.slice(3, 5) // 2 תמונות גדולות
  const row3 = images.slice(5, 8) // 3 תמונות אחרונות

  // Extract display name from image path
  const getDisplayName = (imagePath) => {
    try {
      // Get filename from path (e.g., "/Pic/Grandma Sarah.jpg" -> "Grandma Sarah.jpg")
      const filename = imagePath.split('/').pop()
      // Remove file extension (e.g., "Grandma Sarah.jpg" -> "Grandma Sarah")
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
      // Decode URI to handle Hebrew characters
      return decodeURIComponent(nameWithoutExt)
    } catch (e) {
      // Fallback to image number if parsing fails
      return `תמונה ${imagePath}`
    }
  }

  return (
    <div className="gallery-container">
      {/* שורה ראשונה - 3 תמונות קטנות */}
      <div className="gallery-row row-small">
        {row1.map((img, idx) => (
          <GalleryItem
            key={idx}
            imagePath={img}
            displayName={getDisplayName(img)}
            index={idx}
            isLarge={false}
            onClick={() => onImageClick(idx)}
          />
        ))}
      </div>

      {/* שורה שנייה - 2 תמונות גדולות */}
      <div className="gallery-row row-large">
        {row2.map((img, idx) => (
          <GalleryItem
            key={idx + 3}
            imagePath={img}
            displayName={getDisplayName(img)}
            index={idx + 3}
            isLarge={true}
            onClick={() => onImageClick(idx + 3)}
          />
        ))}
      </div>

      {/* שורה תחתונה - 3 תמונות קטנות */}
      <div className="gallery-row row-small">
        {row3.map((img, idx) => (
          <GalleryItem
            key={idx + 5}
            imagePath={img}
            displayName={getDisplayName(img)}
            index={idx + 5}
            isLarge={false}
            onClick={() => onImageClick(idx + 5)}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageGallery

