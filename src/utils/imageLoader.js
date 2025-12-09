// רשימת התמונות מהתיקייה Pic
const imageFiles = [
  'IMG_7916.JPG',
  'IMG_7917.JPG',
  'IMG_7918.JPG',
  'IMG_7919.JPG',
  'IMG_7921.JPG',
  'IMG_7923.JPG',
  'IMG_7925.JPG',
  'IMG_7927.JPG'
]

export function loadImages() {
  return imageFiles.map(file => `/Pic/${file}`)
}

