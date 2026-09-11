// ---------- Sample Song Data ----------
const songs = [
  { id: 1, title: "Kesariya", artist: "Arijit Singh", category: "Pop", cover: "images/kumkumala.jpg", src: "musix/Kumkumala.mp3" },
  { id: 2, title: "Deva Deva", artist: "Arijit Singh", category: "Hip-Hop", cover: "images/deva.jpg", src: "musix/Deva Deva.mp3" },
  { id: 3, title: "Alaakaa Loova", artist: "Ram Miriyala", category: "Beat", cover: "images/alaaka-loova.jpg", src: "musix/Alaakaa Loova.mp3" },
  { id: 4, title: "Mallepoola Pallaki", artist: "Dappu srinu", category: "Devotion", cover: "images/mallepoolu.jpg", src: "musix/Mallepoola Pallaki.mp3" },
  { id: 5, title: "Yesha Nagula", artist: "Addula Jangireddy, Prabha", category: "Folk", cover: "images/paradise.jpg", src: "musix/Yesha Nagula.mp3" },
  { id: 6, title: "Pavazha Malli", artist: "Sai Abhayankar, Shruti Hasan", category: "Hip-Hop", cover: "images/pavazha.jpg", src: "musix/Pavazha Malli.mp3" },
  { id: 7, title: "Apna Bana Le", artist: "Arijit Singh", category: "Pop", cover: "images/apna.jpg", src: "musix/Apna Bana Le.mp3" },
  { id: 8, title: "Billa Theme", artist: "Yuvan Shankar Raja", category: "Peak Aura", cover: "images/billa1.jpg", src: "musix/Billa Theme.mp3" },
  { id: 9, title: "My Name is Billa", artist: "Mani Sharma", category: "Pop", cover: "images/billa.jpg", src: "musix/My Name is Billa.mp3" },
  { id: 10, title: "Bommali", artist: "Hemachandra and Malavika", category: "Energetic", cover: "images/bommali.jpg", src: "musix/Bommali.mp3" },
  { id: 11, title: "Eyy Bidda Idhi Naa Adda", artist: "Nakash Aziz", category: "Mass", cover: "images/bidda.jpg", src: "musix/Eyy Bidda Idhi Naa Adda.mp3" },
  { id: 12, title: "Oo Antha Oo Oo Antava", artist: "Indravathi Chauhan", category: "Romantic", cover: "images/oo.jpg", src: "musix/Oo Antava Oo Oo Antava.mp3" },
  { id: 13, title: "Buttabomma", artist: "SS Thaman", category: "Love", cover: "images/butta.jpg", src: "musix/Buttabomma.mp3" },
  { id: 14, title: "Nattu Nattu", artist: "Rahul Sipligunj, Kaala Bhairava", category: "Mass", cover: "images/naatu.jpg", src: "musix/Nattu Nattu.mp3" },
  { id: 15, title: "Aaya Sher", artist: "Addula Jangireddy, Akunoori Devaihah, Anirudh Ravichander", category: "Folk", cover: "images/aaya.jpg", src: "musix/Aaya Sher.mp3" },
  { id: 16, title: "Psycho Saiyaan", artist: " Anirudh Ravichander, Dhvani Bhanushali, Tanishk Bagchi", category: "Romantic", cover: "images/psycho.jpg", src: "musix/Psycho Saiyaan.mp3" },
  { id: 17, title: "Bad Boy", artist: "Badshah, Neeti Mohan", category: "Romantic", cover: "images/bad boy.jpg", src: "musix/Bad Boy.mp3" },
  { id: 18, title: "Bang Bang", artist: "Ghibran", category: "Rock", cover: "images/bang.jpg", src: "musix/Bang Bang.mp3" },
  { id: 19, title: "Khairiyat", artist: "Arjit Singh", category: "Love", cover: "images/khairiyat.jpg", src: "musix/Khairiyat.mp3" },
  { id: 20, title: "Vaaste", artist: "Dhvani Bhanushali and Nikhil D'Souza", category: "Love", cover: "images/vaaste.jpg", src: "musix/Vaaste.mp3" },
  { id: 21, title: "Tere Vaaste", artist: "Sachin-Jigar", category: "Love", cover: "images/tere.jpg", src: "musix/Tere Vaaste.mp3" },
  { id: 22, title: "Kaun Tujhe", artist: "Palak Muchhal", category: "Love", cover: "images/kaun tujhe.jpg", src: "musix/Kaun Tujhe.mp3" },
];

let currentSongIndex = 0;
const audio = new Audio();

// ---------- Render Songs ----------
function renderSongs(filter = "All", searchTerm = "") {
  const grid = document.getElementById("songGrid");
  if (!grid) return;

  const liked = JSON.parse(localStorage.getItem("likedSongs")) || [];

  const filtered = songs.filter(song => {
    const matchesCategory = filter === "All" || song.category === filter;
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(song => `
    <div class="song-card" onclick="playSong(${song.id})">
      <button class="like-btn ${liked.includes(song.id) ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike(${song.id})">♥</button>
      <img src="${song.cover}" alt="${song.title}">
      <div class="song-title">${song.title}</div>
      <div class="song-artist">${song.artist}</div>
    </div>
  `).join("");
}

// ---------- Category Filter ----------
function initCategoryChips() {
  const chips = document.querySelectorAll(".category-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderSongs(chip.dataset.category, document.getElementById("searchInput").value);
    });
  });
}

// ---------- Search ----------
function initSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  input.addEventListener("input", () => {
    const activeChip = document.querySelector(".category-chip.active");
    renderSongs(activeChip ? activeChip.dataset.category : "All", input.value);
  });
}

// ---------- Like / Unlike ----------
function toggleLike(id) {
  let liked = JSON.parse(localStorage.getItem("likedSongs")) || [];
  if (liked.includes(id)) {
    liked = liked.filter(sId => sId !== id);
  } else {
    liked.push(id);
  }
  localStorage.setItem("likedSongs", JSON.stringify(liked));
  const activeChip = document.querySelector(".category-chip.active");
  renderSongs(activeChip ? activeChip.dataset.category : "All", document.getElementById("searchInput").value);
}

// ---------- Player Controls ----------
function playSong(id) {
  const index = songs.findIndex(s => s.id === id);
  if (index === -1) return;
  currentSongIndex = index;
  loadCurrentSong();
  audio.play();
  updatePlayButton(true);
}

function loadCurrentSong() {
  const song = songs[currentSongIndex];
  document.getElementById("playerCover").src = song.cover;
  document.getElementById("playerTitle").textContent = song.title;
  document.getElementById("playerArtist").textContent = song.artist;
  audio.src = song.src;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    updatePlayButton(true);
  } else {
    audio.pause();
    updatePlayButton(false);
  }
}

function updatePlayButton(isPlaying) {
  const btn = document.getElementById("playPauseBtn");
  if (btn) btn.textContent = isPlaying ? "⏸" : "▶";
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadCurrentSong();
  audio.play();
  updatePlayButton(true);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadCurrentSong();
  audio.play();
  updatePlayButton(true);
}

document.addEventListener("DOMContentLoaded", () => {
  renderSongs();
  initCategoryChips();
  initSearch();

  const playPauseBtn = document.getElementById("playPauseBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlay);
  if (nextBtn) nextBtn.addEventListener("click", nextSong);
  if (prevBtn) prevBtn.addEventListener("click", prevSong);
});