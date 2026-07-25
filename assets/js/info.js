// author: dntstck | dru delarosa
// url: https://github.com/dntstck 
// info: POST screen/terminal text animator

document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("post-output");
  const lines = Array.from(container.children);

  lines.forEach(line => line.style.visibility = "hidden");

  let i = 0;
  function showLine() {
    lines[i].style.visibility = "visible";
    i++;
    if (i < lines.length) {
      setTimeout(showLine, 600 + Math.random() * 150);
    }
  }

  showLine();
});
