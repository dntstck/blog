/* async function fetchNowPlaying() {
  const username = "dntstck";
  const apiKey = "17d7b04ecdaee026c8eadf2e1e02364c";
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`
  );
  const data = await response.json();
  const nowPlaying = data.recenttracks.track[0];
  const trackInfo = `${nowPlaying.artist["#text"]}%20-%20${nowPlaying.name}`;
  document.getElementById("now-playing").innerHTML = `<img alt=\"Now Playing\" src=\"https://img.shields.io/badge/-${trackInfo}-151515?&logo=vlcmediaplayer&logoColor=black\">`;
}
fetchNowPlaying();

*/

async function fetchNowPlaying() {
  const username = "dntstck";
  const apiKey = "17d7b04ecdaee026c8eadf2e1e02364c";
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`
  );
  const data = await response.json();
  
  const nowPlaying = data.recenttracks.track[0];
  const trackInfo = `${nowPlaying.artist["#text"]} - ${nowPlaying.name}`;
  const encodedTrackInfo = encodeURIComponent(trackInfo);
  const shieldUrl = `https://img.shields.io/badge/-${encodedTrackInfo}-151515?&logo=vlcmediaplayer&logoColor=black`;
  const encodedShieldUrl = encodeURI(shieldUrl);

  document.getElementById("now-playing").innerHTML = `<img alt="Now Playing" src="${encodedShieldUrl}">`;
}

fetchNowPlaying();
