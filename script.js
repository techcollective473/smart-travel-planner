// DATA (APNI IMAGES DAAL)
const places = [
  {
    name: "Manali",
    img: "images/manali.jpg",
    short: "A beautiful hill station",
    long: "Manali is famous for snow, adventure sports and scenic beauty.",
    lat: 32.2432,
    lon: 77.1892
  },
  {
    name: "Goa",
    img: "images/goa.jpg",
    short: "Famous for beaches",
    long: "Goa is known for beaches, nightlife and Portuguese culture.",
    lat: 15.2993,
    lon: 74.1240
  }
];

// CREATE CARDS
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

  // WEATHER (API KEY DAALNA)
  try {
    const res = await fetch(
      https://api.openweathermap.org/data/2.5/weather?lat=${p.lat}&lon=${p.lon}&appid=YOUR_API_KEY&units=metric
    );
    const data = await res.json();

    document.getElementById("weather").innerText =
      data.main.temp + "°C, " + data.weather[0].main;
  } catch {
    document.getElementById("weather").innerText = "Weather not available";
  }

  // MAP
  document.getElementById("map").src =
    https://maps.google.com/maps?q=${p.lat},${p.lon}&z=12&output=embed;
}

// CLOSE MODAL
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// SEE MORE
function toggleDesc() {
  const long = document.getElementById("longDesc");

  long.style.display =
    long.style.display === "none" ? "block" : "none";
}
