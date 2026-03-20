const fs = require('fs');
const path = require('path');

// Create placeholder images for all missing review images
const reviewFiles = fs.readdirSync(path.join(__dirname, '../content/reviews'))
  .filter(file => file.endsWith('.mdx'));

// Create the public/images/reviews directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images/reviews');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// For each review file, check if it references an image and create a placeholder
reviewFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '../content/reviews', file), 'utf8');
  const imageMatch = content.match(/image:\s*["']([^"']+)["']/);
  
  if (imageMatch) {
    const imagePath = imageMatch[1];
    const imageName = path.basename(imagePath);
    const fullImagePath = path.join(__dirname, '../public', imagePath);
    
    // Only create if image doesn't exist
    if (!fs.existsSync(fullImagePath)) {
      // Create a simple SVG placeholder
      const svgContent = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f3f4f6"/>
  <rect x="50" y="50" width="1100" height="530" fill="white" rx="10"/>
  <text x="600" y="280" font-family="Arial" font-size="32" text-anchor="middle" fill="#6b7280">משתלם</text>
  <text x="600" y="330" font-family="Arial" font-size="24" text-anchor="middle" fill="#9ca3af">${file.replace('.mdx', '').replace(/-/g, ' ')}</text>
  <text x="600" y="380" font-family="Arial" font-size="18" text-anchor="middle" fill="#d1d5db">סקירת מוצרים מאליאקספרס</text>
</svg>`;
      
      // Save as SVG (lighter than generating actual images)
      const svgPath = fullImagePath.replace('.jpg', '.svg').replace('.png', '.svg');
      fs.writeFileSync(svgPath, svgContent);
      console.log(`Created placeholder: ${svgPath}`);
    }
  }
});

console.log('Placeholder images generated successfully!');