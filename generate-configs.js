const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'public', 'templates');
const templates = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

templates.forEach(t => {
  const htmlPath = path.join(templatesDir, t, 'index.html');
  if (fs.existsSync(htmlPath)) {
    const config = { fields: [] };
    
    const textSelectors = [
      { key: 'groom_name', label: 'Nama Mempelai Pria' },
      { key: 'bride_name', label: 'Nama Mempelai Wanita' },
      { key: 'event_date', label: 'Tanggal Acara' }
    ];

    config.fields = textSelectors.map(ts => ({
      key: ts.key,
      label: ts.label,
      type: 'text',
      selector: '#' + ts.key.replace('_', '-'),
      default: ''
    }));

    config.fields.push({
      key: 'hero_photo',
      label: 'Foto Utama',
      type: 'image',
      selector: '#hero-photo',
      default: ''
    });

    fs.writeFileSync(path.join(templatesDir, t, 'config.json'), JSON.stringify(config, null, 2));
    console.log('Created config for ' + t);
  }
});
