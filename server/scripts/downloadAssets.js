const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '../../client/public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { name: 'hero-villa.jpg', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&auto=format&fit=crop&q=80' },
  { name: 'about-architecture.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80' },
  { name: 'service-design.jpg', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&auto=format&fit=crop&q=80' },
  { name: 'service-construction.jpg', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=1000&auto=format&fit=crop&q=80' },
  { name: 'service-interiors.jpg', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80' },
  { name: 'project-villa.jpg', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80' },
  { name: 'project-commercial.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80' },
  { name: 'interior-living-room.jpg', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80' },
  { name: 'interior-kitchen.jpg', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80' },
  { name: 'interior-bedroom.jpg', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&auto=format&fit=crop&q=80' },
  { name: 'construction-site.jpg', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  console.log('📥 Downloading high-res architectural assets...');
  for (const asset of assets) {
    const dest = path.join(targetDir, asset.name);
    try {
      await downloadFile(asset.url, dest);
      console.log(`✅ Downloaded ${asset.name}`);
    } catch (err) {
      console.warn(`⚠️ Could not download ${asset.name}: ${err.message}`);
    }
  }
  console.log('🎉 Asset download finished!');
}

run();
