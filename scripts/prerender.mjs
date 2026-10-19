// Вбудовує попередньо відрендерену сторінку та її CSS у dist/index.html,
// щоб перший екран малювався без очікування JavaScript і окремого запиту стилів.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);

const file = `${root}dist/index.html`;
let html = await readFile(file, 'utf8');

const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('prerender: #root placeholder not found in dist/index.html');
html = html.replace(marker, `<div id="root">${render()}</div>`);

// Стилі (~9 KB gzip) — інлайном замість блокуючого запиту.
const cssLink = html.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/);
if (!cssLink) throw new Error('prerender: stylesheet link not found in dist/index.html');
const css = await readFile(`${root}dist${cssLink[1]}`, 'utf8');
html = html.replace(cssLink[0], `<style>${css}</style>`);

await writeFile(file, html);
await rm(`${root}dist-ssr`, { recursive: true, force: true });
console.log(`prerender: page HTML and ${Math.round(css.length / 1024)} KB of CSS inlined into dist/index.html`);
