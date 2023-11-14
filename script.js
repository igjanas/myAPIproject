
        function makeGetRequest(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("GET request successful:", data);
                })
                .catch(error => {
                    console.error("Error making GET request:", error);
                });
        }
        function createButtons() {
            var buttonContainer = document.getElementById("buttonContainer");
            var activeButton = null;

            var buttonData = [
                { label: "LRT Radijas", url: "https://lrt-api.eu-gb.mybluemix.net/live/lr", color: "blue" },
                { label: "LRT Opus", url: "https://lrt-api.eu-gb.mybluemix.net/live/opus", color: "orange" },
                { label: "LRT Klasika", url: "https://lrt-api.eu-gb.mybluemix.net/live/klasika", color: "maroon" },
                { label: "LRT Lituanica", url: "https://lrt-api.eu-gb.mybluemix.net/live/world", color: "green" }
            ];
    // Unfortunately the LRT API does not work as it is showing me a CORS error, I have tried running it through https://cors-anywhere.herokuapp.com/
    // But after some research it seems that it is available anymore, and I would have to create my own proxy to get information from the API.

            function handleButtonClick(buttonInfo, buttonElement) {
                makeGetRequest(buttonInfo.url);

                buttonContainer.querySelectorAll('.top-button').forEach(function(button) {
                    button.classList.remove('selected');
                });

                buttonElement.classList.add("selected");
                activeButton = buttonElement;
            }

            buttonData.forEach(function(buttonInfo) {
                var button = document.createElement("button");
                button.className = "top-button " + buttonInfo.color;
                button.textContent = buttonInfo.label;

                button.addEventListener("click", function() {
                    handleButtonClick(buttonInfo, button);
                });

                buttonContainer.appendChild(button);
            });
        }

        createButtons();

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
