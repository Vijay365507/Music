// liked.js
// Note: include js/player.js BEFORE this file on liked.html,
// since it reuses the shared "songs" array and playSong()/toggleLike() functions.

function renderLikedSongs() {
  const grid = document.getElementById("likedGrid");
  const emptyMsg = document.getElementById("likedEmptyMsg");
  if (!grid) return;

  const likedIds = JSON.parse(localStorage.getItem("likedSongs")) || [];
  const likedSongs = songs.filter(song => likedIds.includes(song.id));

  if (likedSongs.length === 0) {
    grid.innerHTML = "";
    if (emptyMsg) emptyMsg.style.display = "block";
    return;
  }

  if (emptyMsg) emptyMsg.style.display = "none";

  grid.innerHTML = likedSongs.map(song => `
    <div class="song-card" onclick="playSong(${song.id})">
      <button class="like-btn liked" onclick="event.stopPropagation(); removeLikedSong(${song.id})">♥</button>
      <img src="${song.cover}" alt="${song.title}">
      <div class="song-title">${song.title}</div>
      <div class="song-artist">${song.artist}</div>
    </div>
  `).join("");
}

// Remove a song from liked list (and refresh this page's grid)
function removeLikedSong(id) {
  let liked = JSON.parse(localStorage.getItem("likedSongs")) || [];
  liked = liked.filter(sId => sId !== id);
  localStorage.setItem("likedSongs", JSON.stringify(liked));
  renderLikedSongs();
}

document.addEventListener("DOMContentLoaded", renderLikedSongs);