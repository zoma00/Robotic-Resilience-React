import fs from 'fs/promises';
import fetch from 'node-fetch'; // or use global fetch on Node 18+
import sanitizeHtml from 'sanitize-html';

const tweets = [
  'https://twitter.com/cb_doge/status/1987761630457819435',
  // add more tweet URLs as needed
  'https://twitter.com/John_Vanture/status/1987796307378127229',
];

const outDir = './public/embeds';

await fs.mkdir(outDir, { recursive: true });

for (const url of tweets) {
  const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`;
  console.log('Fetching', oembedUrl);
  const res = await fetch(oembedUrl);
  if (!res.ok) {
    console.error('Failed to fetch', url, res.status);
    continue;
  }
  const json = await res.json();
  const clean = sanitizeHtml(json.html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe']),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
    },
  });
  const id = url.split('/').pop();
  await fs.writeFile(`${outDir}/${id}.html`, clean, 'utf8');
  console.log('Saved', `${outDir}/${id}.html`);
}
