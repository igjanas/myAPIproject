// Weather API Implementation
const key = 'd1c32f85bfc6476395f85711241701';
const apiUrl = 'http://api.weatherapi.com/v1/current.json';
var locationName;
const includeAqi = 'yes';

const requestUrl = `${apiUrl}?key=${key}&q=${locationName}&aqi=${includeAqi}`;

fetch(requestUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    displayWeather(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Create a container for buttons dynamically
var buttonContainer = document.createElement("div");
buttonContainer.id = "jsButtonContainer";
document.body.appendChild(buttonContainer);

// Create a container for weather information
var weatherContainer = document.createElement("div");
weatherContainer.id = "weatherContainer";
document.body.appendChild(weatherContainer);

// Function to change location
function changeLocation(newLocation) {
    // Change locationName to the new location
    locationName = newLocation;

    // Refresh the weather fetch with the new locationName
    const requestUrl = `${apiUrl}?key=${key}&q=${locationName}&aqi=${includeAqi}`;

    fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data here
            console.log(data);
            displayWeather(data); // Update the displayed weather information
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
}

// Array of cities
var cities = ['Enschede', 'Arnhem', 'Pribitka', 'Panevėžys'];

// Create buttons dynamically for each city
for (var i = 0; i < cities.length; i++) {
    var cityButton = document.createElement("button");
    cityButton.innerHTML = `${cities[i]}`;
    cityButton.onclick = function(city) {
        return function() {
            changeLocation(city);
        };
    }(cities[i]);

    // Append each button to the button container
    buttonContainer.appendChild(cityButton);
}

function displayWeather(data) {
  // Clear existing content in weatherContainer
  weatherContainer.innerHTML = "";

  // Create HTML elements to display the weather information
  var cityName = document.createElement("h1");
  cityName.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;

  var temperature = document.createElement("h2");
  temperature.textContent = `Temperature: ${data.current.temp_c} °C`;

  var feelsLike = document.createElement("p");
  feelsLike.textContent = `Feels Like: ${data.current.feelslike_c} °C`;

  var humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.current.humidity}%`;

  var windInfo = document.createElement("p");
  windInfo.textContent = `Wind: ${data.current.wind_kph} km/h, ${data.current.wind_degree}°`;

  var condition = document.createElement("p");
  condition.innerHTML = `Condition: ${data.current.condition.text} <img src="${data.current.condition.icon}" alt="Weather Icon">`;

  // Append the elements to the container
  weatherContainer.appendChild(cityName);
  weatherContainer.appendChild(temperature);
  weatherContainer.appendChild(feelsLike);
  weatherContainer.appendChild(humidity);
  weatherContainer.appendChild(windInfo);
  weatherContainer.appendChild(condition);
}
  


        
        //Dictionary API implementation

        function wordRequest() {
            var inputField = document.getElementById("inputField");
            var inputText = inputField.value.trim();

            var apiResultsContainer = document.getElementById("apiResultsContainer");

            if (inputText !== "") {
                var apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputText;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            var definition = data[0].meanings[0].definitions[0].definition;
                            apiResultsContainer.innerHTML = "<h1>" + inputText + "</h1>"+ "<p> definition: " + definition + "</p>";
                        } else {
                            apiResultsContainer.innerHTML = "<p>No definition found for the word " + inputText + "</p>";
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching data from the API:", error);
                    });
                inputField.value = "";
            } else {
                apiResultsContainer.innerHTML = "<p>Please enter a word in the search bar.</p>";
            }
        }

        // Add this event listener to the input field
        var inputField = document.getElementById("inputField");
        inputField.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                wordRequest(); // Call the submitForm function when Enter is pressed
            }
        });
