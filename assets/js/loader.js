// author: dntstck | dru delarosa
// url: https://github.com/dntstck 
// info: blog post loader

function loadPane(url) {
  fetch(url)
    .then(r => r.text())
    .then(html => {
      const styled = `
        <link rel="stylesheet" href="../css/bios.css">
        <div class="post-content">${html}</div>
      `;
      document.getElementById("rightpane").innerHTML = styled;
    })
    .catch(err => {
      document.getElementById("rightpane").innerHTML =
        "<pre>[ ERROR ] Failed to load content.</pre>";
    });
}
