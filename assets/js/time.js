// author: dntstck | dru delarosa
// url: https://github.com/dntstck 
// info: display current date time in yyyy/mm/dd hh/mm/ss

  function updateDateTime() {
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');

    const hh = String(now.getHours()).padStart(2, '0');
    const mi = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    document.getElementById("datetime").textContent =
      `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();
