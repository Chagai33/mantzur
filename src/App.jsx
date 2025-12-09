import { useState, useEffect } from 'react'
import Header from './components/Header'
import ImageGallery from './components/ImageGallery'
import Lightbox from './components/Lightbox'
import { loadImages } from './utils/imageLoader'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageSlot, setCurrentImageSlot] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const loadedImages = loadImages()
    setImages(loadedImages)
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
    }
    setIsLightboxOpen(false)
    setCurrentImageSlot(null)
  }

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false)
    setCurrentImageSlot(null)
  }

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className="app">
      <button 
        className="fullscreen-toggle"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? 'יציאה ממסך מלא' : 'מסך מלא'}
        title={isFullscreen ? 'יציאה ממסך מלא' : 'מסך מלא'}
      >
        {isFullscreen ? '🔍' : '📺'}
      </button>
      <Header />
      <ImageGallery 
        images={images}
        onImageClick={handleImageClick}
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

