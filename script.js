
// INTRO TEXT
const texts = ["नमस्ते","নমস্কার","வணக்கம்","ನಮಸ್ಕಾರ","ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ"];
let i = 0;

setInterval(() => {
  i = (i + 1) % texts.length;
  document.getElementById("text").innerText = texts[i];
}, 1200);

// INTRO HIDE
setTimeout(() => {
  document.getElementById("intro").style.transform = "translateY(-100%)";
  document.getElementById("intro").style.transition = "1s";

  setTimeout(() => {
    document.getElementById("main").style.display = "block";
    document.body.style.overflow = "auto";
  }, 1000);
}, 5000);

// DATA
const places = [
  {
    name: "Goa",
    region: "South",
    tags: ["Beaches"],
    img: "https://source.unsplash.com/400x300/?goa,beach"
  },
  {
    name: "Manali",
    region: "North",
    tags: ["Mountains"],
    img: "https://source.unsplash.com/400x300/?manali,snow"
  },
  {
    name: "Varanasi",
    region: "North",
    tags: ["Spiritual"],
    img: "https://source.unsplash.com/400x300/?varanasi,ghats"
  }
];

// LOAD ATTRACTIONS
function loadAttractions() {
  const container = document.getElementById("attractions");

  places.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
    `;

    container.appendChild(div);
  });
}

loadAttractions();

// FILTER
function filterPlaces() {
  const interest = document.getElementById("interest").value;
  const region = document.getElementById("region").value;

  const filtered = places.filter(p =>
    p.tags.includes(interest) && p.region === region
  );

  const output = document.getElementById("results");

  if (filtered.length === 0) {
    output.innerHTML = "No destinations found";
  } else {
    output.innerHTML = filtered.map(p => `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
      </div>
    `).join("");
  }
}
