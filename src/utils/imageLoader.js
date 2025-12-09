// Dynamically load all images from src/assets using Vite's import.meta.glob
export function loadImages() {
  // Use import.meta.glob to load all image files
  // Note: Vite handles images in src/assets automatically
  const imageModules = import.meta.glob('../assets/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { 
    eager: true
  })
  
  // Debug: log what we're getting
  console.log('Image modules:', imageModules)
  console.log('Number of modules:', Object.keys(imageModules).length)
  
  // Map the modules to objects with src and filename
  const result = Object.entries(imageModules).map(([path, module]) => {
    // Extract filename from path (e.g., "../assets/image.jpg" -> "image.jpg")
    const filename = path.split('/').pop()
    
    // Vite automatically processes images and provides the URL as default export
    // The module is an object with a default property containing the URL
    const src = module.default
    
    console.log('Path:', path, 'Filename:', filename, 'Src:', src, 'Module type:', typeof module, 'Module:', module)
    
    if (!src) {
      console.warn('No src found for:', filename, 'Module:', module)
    }
    
    return {
      src: src,      // The resolved URL from Vite
      filename: filename    // Original filename for sorting/display
    }
  }).filter(img => img.src) // Filter out any images that failed to load
  
  console.log('Loaded images result:', result)
  return result
}

