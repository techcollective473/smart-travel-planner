// 🔥 INTRO FIX (ALWAYS WORK)
window.onload = () => {
  setTimeout(() => {
    document.getElementById("intro").style.transform = "translateY(-100%)";

    setTimeout(() => {
      document.getElementById("main").style.display = "block";
      document.body.style.overflow = "auto";
    }, 1000);
  }, 3000);
};

// TEXT CHANGE
const texts = ["नमस्ते","नमस्कार","Welcome"];
let i = 0;

setInterval(() => {
  i = (i + 1) % texts.length;
  document.getElementById("text").innerText = texts[i];
}, 1200);

// DATA (backup if JSON fails)
let places = [
  {
    name: "Manali",
    region: "North",
    tags: ["Mountains"],
    img: "images/manali.jpg",
    short: "Hill station",
    long: "Manali is famous for snow.",
    lat: 32.24,
    lon: 77.18
  }
];

// FETCH JSON (SAFE)
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    places = data;
    loadCards();
  })
  .catch(() => {
    console.log("JSON failed, using backup");
    loadCards();
  });

// CREATE CARDS
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
function openModal(p) {
  document.getElementById("modal").style.display = "block";

  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalTitle").innerText = p.name;
  document.getElementById("shortDesc").innerText = p.short;
  document.getElementById("longDesc").innerText = p.long;

  document.getElementById("map").src =
    `https://maps.google.com/maps?q=${p.lat},${p.lon}&z=12&output=embed`;

  document.getElementById("weather").innerText = "Demo mode";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function toggleDesc() {
  const d = document.getElementById("longDesc");
  d.style.display = d.style.display === "none" ? "block" : "none";
}

// FILTER
function filterPlaces() {
  const interests = Array.from(
    document.querySelectorAll("#interestBox input:checked")
  ).map(el => el.value);

  const regions = Array.from(
    document.querySelectorAll("#regionBox input:checked")
  ).map(el => el.value);

  const filtered = places.filter(p =>
    (interests.length === 0 || interests.some(t => p.tags.includes(t))) &&
    (regions.length === 0 || regions.includes(p.region))
  );

  document.getElementById("results").innerHTML =
    filtered.map(p => `<p>${p.name}</p>`).join("");
    }  // MAP
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
