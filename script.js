// INTRO TEXT
const texts = ["नमस्ते","নমস্কার","வணக்கம்","ನಮಸ್ಕಾರ","ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ"];
let i = 0;

setInterval(() => {
  i = (i + 1) % texts.length;
  document.getElementById("text").innerText = texts[i];
}, 1200);

// INTRO HIDE
window.onload = () => {
  setTimeout(() => {
    document.getElementById("intro").style.transform = "translateY(-100%)";

    setTimeout(() => {
      document.getElementById("main").style.display = "block";
      document.body.style.overflow = "auto";
    }, 1000);
  }, 4000);
};

// FETCH DATA
let places = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    places = data;
    loadCards();
  });

// LOAD CARDS
function loadCards() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  places.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
    `;

    div.onclick = () => openModal(p);

    container.appendChild(div);
  });
}

// MODAL
async function openModal(p) {
  document.getElementById("modal").style.display = "block";

  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalTitle").innerText = p.name;
  document.getElementById("shortDesc").innerText = p.short;
  document.getElementById("longDesc").innerText = p.long;

  // WEATHER
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${p.lat}&lon=${p.lon}&appid=YOUR_API_KEY&units=metric`
    );
    const data = await res.json();
    document.getElementById("weather").innerText =
      data.main.temp + "°C";
  } catch {
    document.getElementById("weather").innerText = "Not available";
  }

  // MAP
  document.getElementById("map").src =
    `https://maps.google.com/maps?q=${p.lat},${p.lon}&z=12&output=embed`;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function toggleDesc() {
  const long = document.getElementById("longDesc");
  long.style.display = long.style.display === "none" ? "block" : "none";
}

// FILTER
function filterPlaces() {

  const interests = Array.from(
    document.querySelectorAll("#interestBox input:checked")
  ).map(el => el.value);

  const regions = Array.from(
    document.querySelectorAll("#regionBox input:checked")
  ).map(el => el.value);

  const filtered = places.filter(p => {

    const interestMatch =
      interests.length === 0 ||
      interests.some(tag => p.tags.includes(tag));

    const regionMatch =
      regions.length === 0 ||
      regions.includes(p.region);

    return interestMatch && regionMatch;
  });

  const output = document.getElementById("results");

  if (filtered.length === 0) {
    output.innerHTML = "No destinations found";
  } else {
    output.innerHTML = filtered.map(p => `
      <div class="card">
        <img src="${p.img}">
        <p>${p.name}</p>
      </div>
    `).join("");
  }
}

// SHOW FILTER BOX
window.addEventListener("scroll", () => {
  const box = document.querySelector(".filter-box");
  const pos = box.getBoundingClientRect().top;

  if (pos < window.innerHeight - 100) {
    box.classList.add("show");
  }
});
  long.style.display =
    long.style.display === "none" ? "block" : "none";
}
