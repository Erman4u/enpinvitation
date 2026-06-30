const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Extract and replace <style>
const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
if (styleMatch) {
    fs.writeFileSync('style.css', styleMatch[1].trim());
    html = html.replace(styleMatch[0], '<link rel="stylesheet" href="style.css">');
    console.log('Saved style.css');
}

// 2. Extract and replace <script> 
const scriptMatch = html.match(/<script[^>]*>([\s\S]*?CORE INVITATION SCRIPTS[\s\S]*?)<\/script>/i);
if (scriptMatch) {
    let scriptContent = scriptMatch[1].trim();
    fs.writeFileSync('script.js', scriptContent);
    html = html.replace(scriptMatch[0], '<script src="script.js"></script>');
    console.log('Saved script.js');
}

// 3. Remove garbage floating buttons
const garbageRegex = /<ul class="right-sidebar">[\s\S]*?<\/ul>\s*<!--calendar-->[\s\S]*?<\/div>\s*<ul class="left-sidebar">[\s\S]*?<\/ul>\s*<\/div>\s*<\/div>/gi;
html = html.replace(garbageRegex, ' ');

// Fallback removal if the exact block structure was altered:
html = html.replace(/<ul class="right-sidebar">[\s\S]*?<\/ul>/gi, '')
    .replace(/<!--calendar-->\s*<div onclick="scrollToElement\('fh5co-event'\)" class="option-btn open"><\/div>/gi, '')
    .replace(/<ul class="left-sidebar">[\s\S]*?<\/ul>/gi, '');

fs.writeFileSync('index.html', html);
console.log('Processed index.html successfully!');
