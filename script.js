const places = [
  {
    name: "Manali",
    img: "images/manali.jpg",
    short: "A beautiful hill station",
    long: "Manali is famous for snow and adventure.",
    lat: 32.2432,
    lon: 77.1892
  },
  {
    name: "Goa",
    img: "images/goa.jpg",
    short: "Famous for beaches",
    long: "Goa is known for beaches and nightlife.",
    lat: 15.2993,
    lon: 74.1240
  }
];

// LOAD CARDS
const container = document.getElementById("cards");

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

// OPEN MODAL
async function openModal(p) {
  document.getElementById("modal").style.display = "block";

  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalTitle").innerText = p.name;
  document.getElementById("shortDesc").innerText = p.short;
  document.getElementById("longDesc").innerText = p.long;

  // WEATHER
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${p.lat}&lon=${p.lon}&appid=YOUR_API_KEY&units=metric`
  );

  const data = await res.json();

  document.getElementById("weather").innerText =
    data.main.temp + "°C";

  // MAP
  document.getElementById("map").src =
    `https://maps.google.com/maps?q=${p.lat},${p.lon}&z=12&output=embed`;
}

// CLOSE
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// SEE MORE
function toggleDesc() {
  const long = document.getElementById("longDesc");

  long.style.display =
    long.style.display === "none" ? "block" : "none";
}
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
