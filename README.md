# My First API Project
An API based university project
The APIs of my choice for this project are lrtAPI and freeDictionaryAPI both of which are open-source. Because of that there are no authorisation needed to access either of them. 
When thinking of my application I thought about what I use on a daily basis. Every morning the first thing I do is turn on LRT Radio on whatever device I am using and usualy I use Google as a dictionary whenever I am writing documents. In the application there will be four buttons used to switch between the different stations (Radijas, Klasika, Opus, Lituanica). For the input field there will be a possibility to type in a work and get an explanation of the word, aswell as the synonyms, antonyms of words, which is something that I use quite often to expand my vocabulary while writing documents. 
There will be multiple selected states, depending on the radio station, as all of them have different colors in the selector online. For example clicking „OPUS“ would make the button orange or selecting „KLASIKA“ would make it dark pink with all the others turning dark grey. In the text field you can put in a word and it would give you an explanetion of the word, synonyms, antonyms, and a use of that word.
The clickable elements will be generated using a predefined JSON array containg objects which contain:
•	The name that is displayed (e.g OPUS)
•	Original state (e.g. gray)
•	Selected state (e.g. orange)
The radio station selectors will also be able to use the value of the attribute of the clickable element in the URL of the jQuery AJAX request. (e.g: https://lrt-api.eu-gb.mybluemix.net/live/<nameofelement>), through that you will be able to launch the radio station through the AJAX request to the API.The submit button will also have its predefined conditions including and original/selected state, but it will also have the ability to clear the input field. 
Anything typed in the input field will be used to fill in the URL in the AJAX request as shown below.
When the request is done, the data will be visualised using .template jQuerry HTML objects all the previously visualized data will be removed after a new request. When the request does not return any data there will be a prompt in place of the usual output informing the user that there are no results.




Adding the lrtAPI:
For this API only a GET request is needed so creating a function with each API url and calling it whenever a specific button is clicked is the easiest way to go around this.

Adding the freeDictionaryAPI:
Basic syntax of a URL request can be used in the input-field of the jQuery AJAX request: https://api.dictionaryapi.dev/api/<--version-->/entries/en/<--word-->

