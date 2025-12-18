const fs = require('fs');
const path = require('path');

// Read the rooms.json file
const roomsPath = path.join(__dirname, '..', 'data', 'rooms.json');
const rooms = JSON.parse(fs.readFileSync(roomsPath, 'utf8'));

// Function to cycle through available images (1-10 for each type)
function getImageIndex(roomIndex) {
  return (roomIndex % 10) + 1;
}

// Update each room with local images
rooms.forEach((room, index) => {
  const imageIndex = getImageIndex(index);
  
  // Create array of 4 images for each room
  room.img = [
    `/roomimages/bedroom${imageIndex}.jpg`,
    `/roomimages/bathroom${imageIndex}.jpg`,
    `/roomimages/lounge${imageIndex}.jpg`,
    `/roomimages/kitchen${imageIndex}.jpg`
  ];
});

// Write the updated data back to the file
fs.writeFileSync(roomsPath, JSON.stringify(rooms, null, 2), 'utf8');

console.log(`✅ Successfully updated ${rooms.length} rooms with local images!`);
console.log('Each room now has 4 images: bedroom, bathroom, lounge, and kitchen');
