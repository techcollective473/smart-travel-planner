// TEXT CHANGE
const texts = ["नमस्ते","নমস্কার","வணக்கம்","ನಮಸ್ಕಾರ","ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ"];
let i = 0;

function changeText() {
  const text = document.getElementById("text");

  text.style.transform = "translateY(-20px)";
  text.style.opacity = "0";

  setTimeout(() => {
    i = (i + 1) % texts.length;
    text.innerText = texts[i];
    text.style.transform = "translateY(0)";
    text.style.opacity = "1";
  }, 300);
}

setInterval(changeText, 1200);

// INTRO HIDE (MAIN FIX)
window.onload = function () {
  setTimeout(() => {
    document.getElementById("intro").style.transform = "translateY(-100%)";

    setTimeout(() => {
      document.getElementById("main").style.display = "block";
      document.body.style.overflow = "auto";
    }, 1000);
  }, 4000);
};

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

// LOAD CARDS
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
