import { useState, useEffect } from 'react'
import Header from './components/Header'
import ImageGallery from './components/ImageGallery'
import Lightbox from './components/Lightbox'
import { loadImages } from './utils/imageLoader'
import candleGif from './assets/candle-corner.gif'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageSlot, setCurrentImageSlot] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const loadedImages = loadImages()
    
    // Initialize sorted array of size 8 with nulls
    const sortedImages = new Array(8).fill(null)
    const extras = []
    
    // Sort images based on filename prefix numbers
    loadedImages.forEach((imageObj) => {
      try {
        // Use the filename from the object
        const decodedFilename = decodeURIComponent(imageObj.filename)
        
        // Check if filename starts with a number
        const numberMatch = decodedFilename.match(/^(\d+)/)
        
        if (numberMatch) {
          const slotNumber = parseInt(numberMatch[1], 10)
          const slotIndex = slotNumber - 1 // Convert to 0-based index
          
          // Place in sorted array if index is valid
          if (slotIndex >= 0 && slotIndex < 8) {
            sortedImages[slotIndex] = imageObj
          } else {
            extras.push(imageObj)
          }
        } else {
          // No number prefix, add to extras
          extras.push(imageObj)
        }
      } catch (e) {
        // If parsing fails, add to extras
        extras.push(imageObj)
      }
    })
    
    // Fill gaps with extras
    let extraIndex = 0
    for (let i = 0; i < sortedImages.length; i++) {
      if (sortedImages[i] === null && extraIndex < extras.length) {
        sortedImages[i] = extras[extraIndex]
        extraIndex++
      }
    }
    
    setImages(sortedImages)
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
      const isFull = !!document.fullscreenElement
      setIsFullscreen(isFull)
      
      // Toggle cursor visibility based on fullscreen state
      if (isFull) {
        document.body.classList.add('is-fullscreen')
      } else {
        document.body.classList.remove('is-fullscreen')
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    
    // Set initial state
    handleFullscreenChange()
    
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
      <footer className="app-footer">
        <small>
          פיתוח: <a href="https://www.linkedin.com/in/chagai-yechiel/" target="_blank" rel="noopener noreferrer">חגי יחיאל</a>
        </small>
      </footer>
      {/* Candles fixed to the sides */}
      <img src={candleGif} alt="" className="corner-candle candle-left" />
      <img src={candleGif} alt="" className="corner-candle candle-right" />
      {isLightboxOpen && (
        <Lightbox
          images={loadImages()}
          currentIndex={currentImageSlot !== null && images[currentImageSlot] 
            ? loadImages().findIndex(img => img.src === images[currentImageSlot]?.src) 
            : 0}
          onSelect={handleImageSelect}
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  )
}

export default App

