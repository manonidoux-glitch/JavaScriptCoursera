
let travelData = null;

// Load data from JSON file
fetch("travel_recommendation_api.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error loading JSON file");
        }
        return response.json();
    })
    .then(data => {
        travelData = data;
        console.log("Travel data loaded:", travelData);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

// Get HTML elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const results = document.getElementById("results");

// Search recommendations
function searchRecommendations() {
    const keyword = searchInput.value.trim().toLowerCase();

    // Clear previous results
    results.innerHTML = "";

    if (!keyword) {
        results.textContent = "Please enter a keyword.";
        return;
    }

    if (!travelData) {
        results.textContent = "Travel data is not loaded yet.";
        return;
    }

    let recommendations = [];

    // Search for beaches
    if (keyword === "beach" || keyword === "beaches") {
        recommendations = travelData.beaches;
    }

    // Search for temples
    else if (keyword === "temple" || keyword === "temples") {
        recommendations = travelData.temples;
    }

    // Search for countries
    else if (keyword === "country" || keyword === "countries") {
        travelData.countries.forEach(country => {
            recommendations.push(...country.cities);
        });
    }

    // Search by country, city or destination name
    else {
        travelData.countries.forEach(country => {
            if (country.name.toLowerCase().includes(keyword)) {
                recommendations.push(...country.cities);
            } else {
                country.cities.forEach(city => {
                    if (
                        city.name.toLowerCase().includes(keyword) ||
                        city.description.toLowerCase().includes(keyword)
                    ) {
                        recommendations.push(city);
                    }
                });
            }
        });

        // Search temples by name or description
        travelData.temples.forEach(temple => {
            if (
                temple.name.toLowerCase().includes(keyword) ||
                temple.description.toLowerCase().includes(keyword)
            ) {
                recommendations.push(temple);
            }
        });

        // Search beaches by name or description
        travelData.beaches.forEach(beach => {
            if (
                beach.name.toLowerCase().includes(keyword) ||
                beach.description.toLowerCase().includes(keyword)
            ) {
                recommendations.push(beach);
            }
        });
    }

    // Display results
    if (recommendations.length === 0) {
        results.textContent = "No recommendations found.";
        return;
    }

    recommendations.forEach(place => {
        const card = document.createElement("div");
        card.className = "recommendation-card";

        const image = document.createElement("img");
        image.src = "images/" + place.imageUrl;
        image.alt = place.name;
     
        const title = document.createElement("h3");
        title.textContent = place.name;

        const description = document.createElement("p");
        description.textContent = place.description;

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        results.appendChild(card);
    });
}

// Search button
searchBtn.addEventListener("click", searchRecommendations);

// Reset button
resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    results.innerHTML = "";
});

// Search when pressing Enter
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchRecommendations();
    }
});


function clearResults() {
    // Clear the search input
    searchInput.value = "";

    // Remove all recommendations
    results.innerHTML = "";

    console.log("Search results cleared!");
}

// Clear button event
resetBtn.addEventListener("click", clearResults);



function getCountryTime(country) {
    const timezones = {
        "Australia": "Australia/Sydney",
        "Japan": "Asia/Tokyo",
        "Brazil": "America/Sao_Paulo",
        "Cambodia": "Asia/Phnom_Penh",
        "India": "Asia/Kolkata",
        "French Polynesia": "Pacific/Tahiti"
    };

    const timezone = timezones[country];

    if (!timezone) {
        return "Time unavailable";
    }

    const options = {
        timeZone: timezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    return new Date().toLocaleString("en-US", options);
}

// Example
console.log("Current time in Japan:", getCountryTime("Japan"));
