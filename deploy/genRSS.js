// genRSS.js
// Dru Delarosa | @dntstck
// generates RSS

const fs = require('fs');
const RSS = require('rss');

const feed = new RSS({
  title: 'Developer Blog',
  description: 'Updates from my development blog',
  feed_url: 'https://dntstck.github.io/rss.xml',
  site_url: 'https://dntstck.github.io',
});

const posts = [
  {
    title: 'test post',
    description: 'test post',
    url: 'https://dntstck.github.io/test-post',
    date: '2025-01-01',
  },
  // more posts here
];

posts.forEach(post => {
  feed.item({
    title: post.title,
    description: post.description,
    url: post.url,
    date: post.date,
  });
});

const rssXML = feed.xml({ indent: true });
fs.writeFileSync('public/rss.xml', rssXML);
console.log('RSS feed generated.');

