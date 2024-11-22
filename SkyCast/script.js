// Ensure the script targets only the rate-us page
document.addEventListener("DOMContentLoaded", function () {
  const rateUsPage = document.querySelector("#rate-us-page");
  if (!rateUsPage) return;

  const stars = document.querySelectorAll(".star");
  const feedbackInput = document.getElementById("feedback");
  const submitButton = document.getElementById("submit-rating");
  const successMessage = document.getElementById("success-message");
  let selectedRating = 0;

  // Handle star hover and selection
  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      highlightStars(this.dataset.value);
    });

    star.addEventListener("click", function () {
      selectedRating = this.dataset.value;
      setSelectedStars(selectedRating);
    });

    star.addEventListener("mouseout", function () {
      setSelectedStars(selectedRating);
    });
  });

  // Highlight stars on hover
  function highlightStars(rating) {
    stars.forEach((star) => {
      if (star.dataset.value <= rating) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }

  // Set selected stars based on click
  function setSelectedStars(rating) {
    stars.forEach((star) => {
      if (star.dataset.value <= rating) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }

  // Handle form submission
  submitButton.addEventListener("click", function () {
    const feedback = feedbackInput.value.trim();
    if (selectedRating > 0 && feedback.length > 0) {
      successMessage.classList.remove("hidden");
      feedbackInput.value = "";
      setSelectedStars(0);
      selectedRating = 0;
    } else {
      alert("Please select a rating and provide feedback.");
    }
  });
});

// Check if the current page is index.html
if (
  window.location.pathname === "/locate.html" ||
  window.location.pathname === "/skycast/locate.html"
) {
  // Initialize the map
  const map = L.map("map").setView([6.3249, 8.1137], 13); // Default to Abakaliki, Ebonyi State, Nigeria

  // Add OpenStreetMap tiles (default view)
  const streetView = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  // Satellite view layer
  const satelliteView = L.tileLayer(
    "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "&copy; Google Maps",
    }
  );

  // Add a red marker for the default location with always-visible popup
  const defaultMarker = L.marker([6.3249, 8.1137], {
    icon: L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-red.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
  })
    .addTo(map)
    .bindPopup("Abakaliki, Ebonyi State, Nigeria")
    .openPopup();

  // Add Geocoder (Search Box)
  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
  })
    .on("markgeocode", function (e) {
      const { center } = e.geocode;

      // Remove any existing blue markers
      if (searchedMarker) map.removeLayer(searchedMarker);

      // Add a blue marker at the searched location
      searchedMarker = L.marker(center, {
        icon: L.icon({
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      })
        .addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();

      // Center the map on the searched location
      map.setView(center, 16);
    })
    .addTo(map);

  // Variable to store the searched location marker
  let searchedMarker;

  // Add Routing Machine (Directions)
  let routingControl;
  const directionsButton = document.getElementById("directions-btn");
  directionsButton.addEventListener("click", () => {
    if (!searchedMarker) {
      alert("Please search for a location first.");
      return;
    }

    if (!routingControl) {
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(6.3249, 8.1137), // Default location
          searchedMarker.getLatLng(), // Searched location
        ],
        routeWhileDragging: true,
      }).addTo(map);
    } else {
      map.removeControl(routingControl);
      routingControl = null;
    }
  });

  // Reset Map View Button
  const resetMapButton = document.getElementById("reset-map-btn");
  resetMapButton.addEventListener("click", () => {
    // Reset map to the default view and zoom level
    map.setView([6.3249, 8.1137], 13);

    // Remove searched marker if it exists
    if (searchedMarker) {
      map.removeLayer(searchedMarker);
      searchedMarker = null;
    }

    // Remove routing control if it exists
    if (routingControl) {
      map.removeControl(routingControl);
      routingControl = null;
    }
  });

  // Street View Button
  const streetViewButton = document.getElementById("street-view-btn");
  streetViewButton.addEventListener("click", () => {
    // Switch to Street View
    map.addLayer(streetView);
    map.removeLayer(satelliteView);
  });

  // Satellite View Button
  const satelliteViewButton = document.getElementById("satellite-view-btn");
  satelliteViewButton.addEventListener("click", () => {
    // Switch to Satellite View
    map.addLayer(satelliteView);
    map.removeLayer(streetView);
  });

  // Hamburger Menu
  const menuToggle = document.getElementById("menu-toggle");
  const menuContent = document.getElementById("menu-content");
  menuToggle.addEventListener("click", () => {
    menuContent.style.display =
      menuContent.style.display === "block" ? "none" : "block";
  });
}
