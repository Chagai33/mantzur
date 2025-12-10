import { useState, useEffect } from 'react'
import Lightbox from './components/Lightbox'
import PersonBox from './components/PersonBox'
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
    
    // Initialize sorted array of size 9 with nulls
    const sortedImages = new Array(9).fill(null)
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
          const slotIndex = slotNumber // Direct mapping since files start with 0
          
          // Place in sorted array if index is valid
          if (slotIndex >= 0 && slotIndex < 9) {
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

  const getDisplayName = (filename) => {
    if (!filename) return '...'
    
    try {
      // Remove file extension
      let nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
      // Decode URI to handle Hebrew characters
      nameWithoutExt = decodeURIComponent(nameWithoutExt)
      // Remove leading number and separator (underscore/hyphen/space)
      // This ensures "1_Grandma" becomes "Grandma"
      nameWithoutExt = nameWithoutExt.replace(/^[\d\s\-_]+/, '')
      // Replace remaining underscores/hyphens with spaces
      nameWithoutExt = nameWithoutExt.replace(/[-_]/g, ' ')
      // Replace "זל" with "ז״ל"
      nameWithoutExt = nameWithoutExt.replace(/\sזל$/g, ' ז״ל').replace(/^זל\s/g, 'ז״ל ')
      
      // Handle "Shoshana" specific case - put "Hamami" in parentheses
      // Assuming name contains "שושנה" and "חממי"
      if (nameWithoutExt.includes('שושנה') && nameWithoutExt.includes('מנצור')) {
         // This assumes the structure is roughly "שושנה מנצור" or similar
         // We'll append "(חממי)" if it's not already there, or format it
         // But the user asked specifically to display "חממי" in parentheses.
         // Let's replace "חממי" with "(חממי)" if it exists
         /* 
           However, based on the file list, the file name is "5_שושנה מנצור.JPG".
           "חממי" is NOT in the file name currently.
           So we need to ADD it.
         */
         if (!nameWithoutExt.includes('חממי')) {
             nameWithoutExt = nameWithoutExt.replace('מנצור', 'מנצור (חממי)');
         }
      }

      // Trim whitespace
      return nameWithoutExt.trim() || '...'
    } catch (e) {
      return '...'
    }
  }

  return (
    <>
      <div className="mobile-warning">
        <div className="mobile-warning-content">
          <h1>בליבנו לעד!</h1>
          <p>אתר זה מותאם לתצוגה על מסך מחשב או טלוויזיה בלבד.</p>
          <p>נא לפתוח במסך רחב.</p>
        </div>
        <div className="mobile-warning-footer">
          <small>
            פיתוח: <a href="https://www.linkedin.com/in/chagai-yechiel/" target="_blank" rel="noopener noreferrer">חגי יחיאל</a>
          </small>
        </div>
      </div>

      <div className="app-container-wrapper"> 
        <button 
          className="fullscreen-toggle"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'יציאה ממסך מלא' : 'מסך מלא'}
          title={isFullscreen ? 'יציאה ממסך מלא' : 'מסך מלא'}
        >
          {isFullscreen ? '🔍' : '📺'}
        </button>
        
        <div className="container">
            {/* Left Candle GIF */}
            <div className="side-animation">
                <img src={candleGif} alt="" className="corner-candle candle-left" />
            </div>
            
            <div className="main-content">
                {/* Grandparents Generation */}
                <div className="generation grandparents">
                    <div className="couple-group">
                        <PersonBox 
                          image={images[0]} 
                          label={getDisplayName(images[0]?.filename)} 
                          onClick={() => handleImageClick(0)}
                        />
                        <PersonBox 
                          image={images[1]} 
                          label={getDisplayName(images[1]?.filename)} 
                          onClick={() => handleImageClick(1)}
                        />
                    </div>
                    
                    <div className="connector">בליבנו לעד!</div>
                    
                    <div className="couple-group">
                        <PersonBox 
                          image={images[2]} 
                          label={getDisplayName(images[2]?.filename)} 
                          onClick={() => handleImageClick(2)}
                        />
                        <PersonBox 
                          image={images[3]} 
                          label={getDisplayName(images[3]?.filename)} 
                          onClick={() => handleImageClick(3)}
                        />
                    </div>
                </div>
                
                {/* Parents Generation */}
                <div className="generation parents">
                    <div className="couple-group">
                        <PersonBox 
                          image={images[4]} 
                          label={getDisplayName(images[4]?.filename)} 
                          onClick={() => handleImageClick(4)}
                        />
                        <PersonBox 
                          image={images[5]} 
                          label={getDisplayName(images[5]?.filename)} 
                          onClick={() => handleImageClick(5)}
                        />
                    </div>
                </div>
                
                {/* Children Generation */}
                <div className="generation children">
                    <PersonBox 
                      image={images[6]} 
                      label={getDisplayName(images[6]?.filename)} 
                      onClick={() => handleImageClick(6)}
                    />
                    <PersonBox 
                      image={images[7]} 
                      label={getDisplayName(images[7]?.filename)} 
                      onClick={() => handleImageClick(7)}
                    />
                    <PersonBox 
                      image={images[8]} 
                      label={getDisplayName(images[8]?.filename)} 
                      onClick={() => handleImageClick(8)}
                    />
                </div>
            </div>
            
            {/* Right Candle GIF */}
            <div className="side-animation">
                <img src={candleGif} alt="" className="corner-candle candle-right" />
            </div>
        </div>
        
        <div className="dev-credit">
          <a href="https://www.linkedin.com/in/chagai-yechiel/" target="_blank" rel="noopener noreferrer">מפתח: חגי יחיאל</a>
        </div>

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
    </>
  )
}

export default App
