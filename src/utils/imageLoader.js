// רשימת התמונות מהתיקייה Pic
const imageFiles = [
  'אבישי מנצור.JPG',
  'ישי מנצור.JPG',
  'סבא הרב שלום חממי.JPG',
  'סבתא נעמי חממי.JPG',
  'סבתא קמר מנצור.JPG',
  'סעדיה מנצור.JPG',
  'שושנה מנצור.JPG',
  'שחר מנצור.JPG'
]

export function loadImages() {
  return imageFiles.map(file => `/Pic/${encodeURIComponent(file)}`)
}

