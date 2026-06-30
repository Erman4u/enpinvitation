const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'public', 'templates');
const templates = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

const newScript = `<!-- SCRIPT UNTUK LIVE PREVIEW EDITOR SAAS -->
<script>
  window.addEventListener('message', function(event) {
    const payload = event.data;
    if (!payload || payload.type !== 'update') return;
    
    payload.updates.forEach(update => {
      if (!update.selector) return;
      const elements = document.querySelectorAll(update.selector);
      elements.forEach(el => {
        if (update.type === 'text') {
          el.innerText = update.value;
        } else if (update.type === 'image') {
          if (el.tagName.toLowerCase() === 'img') {
            el.src = update.value;
          } else {
            el.style.backgroundImage = 'url(' + update.value + ')';
          }
        }
      });
    });
  });
</script>
</body>`;

templates.forEach(t => {
  const htmlPath = path.join(templatesDir, t, 'index.html');
  if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Remove the old script
    const startTag = '<!-- SCRIPT UNTUK LIVE PREVIEW EDITOR SAAS -->';
    const startIndex = html.indexOf(startTag);
    
    if (startIndex !== -1) {
      // Find the end of the script tag
      const endTag = '</script>';
      const endIndex = html.indexOf(endTag, startIndex) + endTag.length;
      
      // also replace </body> to be safe if it was after
      const bodyEndIndex = html.indexOf('</body>', endIndex);
      
      let newHtml;
      if (bodyEndIndex !== -1) {
        newHtml = html.substring(0, startIndex) + newScript + html.substring(bodyEndIndex + 7);
      } else {
        newHtml = html.substring(0, startIndex) + newScript;
      }
      
      fs.writeFileSync(htmlPath, newHtml);
      console.log('Updated script in ' + t);
    } else {
      // If not found, inject before </body>
      const bodyEndIndex = html.lastIndexOf('</body>');
      if (bodyEndIndex !== -1) {
        const newHtml = html.substring(0, bodyEndIndex) + newScript + html.substring(bodyEndIndex + 7);
        fs.writeFileSync(htmlPath, newHtml);
        console.log('Injected script in ' + t);
      }
    }
  }
});
