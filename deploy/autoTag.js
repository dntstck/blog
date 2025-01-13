// autoTag.js
// Dru Delarosa | @dntstck
// automatically tags and catergorizes blog posts

const fs = require(fs);

const categorizePost = (content) => {
  const tags = [];
  const keywords = {
    cm5: ['Compute Module', 'CM5', 'SOM', 'CM4', 'CM3'],
    devserver: ['Dev Server', 'Development Server', 'Home Development Network', "devserver"],
    embedded: ['Embedded', 'C', 'Assembly'],
    microcontrollers: ['RP2040', 'RP2350', 'Pico', 'Pico2'],
    misc: ['Misc'],
    osnetworking: ['Networking', 'OS', 'Linux', 'FreeBSD'],
    picosystem: ['PicoSystem', '32blitSDK', '32blit'],
    raspberrypi: ['Raspberry Pi', 'Pi', 'Pi Zero', 'Pi Zero 2', 'Zero2'],
    thoughts: ['thoughts'],
    webdevelopment: ['HTML', 'CSS', 'React', 'Node.js', 'Express']
    
    // more here
  };

  for (const [category, words] of Object.entries(keywords)) {
    words.forEach(word => {
      if (content.includes(word)) {
        tags.push(category);
      }
    });
  }

  return tags;
};

const posts = [
  { title: 'test', content: 'test' },
  // more posts here
];

posts.forEach(post => {
  post.tags = categorizePost(post.content);
});

writeFileSync('public/posts.json', JSON.stringify(posts, null, 2));
console.log('Posts tagged and categorized successfully.');

