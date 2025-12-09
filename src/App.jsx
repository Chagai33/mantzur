import { useState, useEffect } from 'react'
import Header from './components/Header'
import ImageGallery from './components/ImageGallery'
import Lightbox from './components/Lightbox'
import { loadImages } from './utils/imageLoader'

function App() {
  const [images, setImages] = useState([])
  const [imageTexts, setImageTexts] = useState({})
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageSlot, setCurrentImageSlot] = useState(null)

  useEffect(() => {
    const loadedImages = loadImages()
    setImages(loadedImages)
    
    // טעינת בחירות קודמות מ-localStorage
    const savedSelections = localStorage.getItem('imageSelections')
    if (savedSelections) {
      try {
        const selections = JSON.parse(savedSelections)
        // עדכון התמונות לפי הבחירות השמורות
        const updatedImages = loadedImages.map((img, idx) => {
          if (selections[idx] !== undefined) {
            return loadedImages[selections[idx]]
          }
          return img
        })
        setImages(updatedImages)
      } catch (e) {
        console.error('Error loading saved selections:', e)
      }
    }
    
    // טעינת טקסטים שמורים
    const savedTexts = localStorage.getItem('imageTexts')
    if (savedTexts) {
      try {
        setImageTexts(JSON.parse(savedTexts))
      } catch (e) {
        console.error('Error loading saved texts:', e)
      }
    }
  }, [])

  const handleImageClick = (slotIndex) => {
    setCurrentImageSlot(slotIndex)
    setIsLightboxOpen(true)
  }

  const handleImageSelect = (selectedIndex) => {
    if (currentImageSlot !== null) {
      const allImages = loadImages()
      const newImages = [...images]
      newImages[currentImageSlot] = allImages[selectedIndex]
      setImages(newImages)
      
      // שמירת הבחירה ב-localStorage
      const savedSelections = JSON.parse(localStorage.getItem('imageSelections') || '{}')
      savedSelections[currentImageSlot] = selectedIndex
      localStorage.setItem('imageSelections', JSON.stringify(savedSelections))
    }
    setIsLightboxOpen(false)
    setCurrentImageSlot(null)
  }

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false)
    setCurrentImageSlot(null)
  }

  return (
    <div className="app">
      <Header />
      <ImageGallery 
        images={images}
        imageTexts={imageTexts}
        onImageClick={handleImageClick}
        onTextChange={(index, text) => {
          const newTexts = { ...imageTexts, [index]: text }
          setImageTexts(newTexts)
          localStorage.setItem('imageTexts', JSON.stringify(newTexts))
        }}
      />
      {isLightboxOpen && (
        <Lightbox
          images={loadImages()}
          currentIndex={currentImageSlot !== null && images[currentImageSlot] 
            ? loadImages().findIndex(img => img === images[currentImageSlot]) 
            : 0}
          onSelect={handleImageSelect}
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  )
}

export default App

