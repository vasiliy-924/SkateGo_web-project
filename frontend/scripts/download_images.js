const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'boosted-mini-x.jpg',
    url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030'
  },
  {
    name: 'evolve-gtr.jpg',
    url: 'https://images.unsplash.com/photo-1604324741402-76774721e9ab'
  },
  {
    name: 'meepo-v3.jpg',
    url: 'https://images.unsplash.com/photo-1604324864812-3e46f2a3e372'
  },
  {
    name: 'backfire-g3.jpg',
    url: 'https://images.unsplash.com/photo-1604324866106-3f2caae50ff5'
  },
  {
    name: 'wowgo-3x.jpg',
    url: 'https://images.unsplash.com/photo-1604324741264-26e4fe3c9bea'
  },
  {
    name: 'exway-flex.jpg',
    url: 'https://images.unsplash.com/photo-1604324741264-26e4fe3c9bea'
  },
  {
    name: 'ownboard-w2.jpg',
    url: 'https://images.unsplash.com/photo-1604324741264-26e4fe3c9bea'
  },
  {
    name: 'teamgee-h20t.jpg',
    url: 'https://images.unsplash.com/photo-1604324741264-26e4fe3c9bea'
  },
  {
    name: 'onewheel-pint.jpg',
    url: 'https://images.unsplash.com/photo-1580177332879-58ee3788fab2'
  },
  {
    name: 'onewheel-xr.jpg',
    url: 'https://images.unsplash.com/photo-1580177332879-58ee3788fab2'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '../public/images/skateboards', filename);
    
    // Add quality and size parameters to Unsplash URLs
    const finalUrl = `${url}?q=80&w=1024&fit=crop`;
    
    https.get(finalUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  try {
    // Create directory if it doesn't exist
    const dir = path.join(__dirname, '../public/images/skateboards');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Download all images
    await Promise.all(images.map(img => downloadImage(img.url, img.name)));
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadAllImages(); 