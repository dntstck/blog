// author: dntstck | dru delarosa
// url: https://github.com/dntstck 
// info: theme switcher

// on load
const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  document.documentElement.classList.add('theme-dark');
}

// on toggle
function toggleTheme() {
  document.documentElement.classList.toggle('theme-dark');
  const isDark = document.documentElement.classList.contains('theme-dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// bind f6

document.addEventListener('keydown', (e) => {
  if (e.key === 'F8') {
    toggleTheme();
  }
});
