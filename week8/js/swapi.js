let nextURL = "https://swapi.dev/api/people";
let previousURL = null;

// Fetch a list of people from the Star Wars API.
// The "next" parameter tells the function whether to fetch the next list of 10 people,
// or the previous list of 10 people.
function fetchPeople(url = nextURL) {
    // let url = "";
    // if (next) {
    //     url = nextURL;
    // } else {
    //     url = previousURL;
    // }
    fetch(url).then(response => response.json()).then(json => {
        // previousURL = json["previous"];
        // nextURL = json["next"];
        // numPeople = json["count"];
        createNavigation(json["count"], json["previous"], json["next"]);
        // Disable "next" & "previous" buttons if there is no use for them.
        // document.getElementById("next").disabled = nextURL ? false : true;
        // document.getElementById("previous").disabled = previousURL ? false : true;
        return displayPeople(json["results"]);
    });
}
// Displays the list of people fetched by fetchPeople.
function displayPeople(peopleList) {
    document.getElementById("descriptionDiv").innerHTML = "";
    document.getElementById("descriptionDiv").classList = 'people';
    for (let person of peopleList) {
        const personDisplayElement = document.createElement("dl");
        personDisplayElement.addEventListener('click', () => {
            // Display modal with data from person
            // Here is your code section...
            alert('Persons Name: ' + person['name'] +
                "\n" + person['name'] + "'s Height: " +
                person['height']);
        });
        personDisplayElement.classList.add('pagination');
        personDisplayElement.classList.add('person');
        elements = [
            ['Name', "name"],
            ['Height', 'height'],
            ['Mass', 'mass'],
            ['Hair', 'hair_color'],
            ['Skin', 'skin_color'],
            ['Eye', 'eye_color']
        ];
        for (element of elements) {
            const dtElement = document.createElement('dt');
            dtElement.textContent = element[0];
            const ddElement = document.createElement('dd');
            ddElement.textContent = person[element[1]];
            personDisplayElement.appendChild(dtElement);
            personDisplayElement.appendChild(ddElement);
        }
        // personDisplayElement.innerHTML = "<dt>Name</dt><dd>" + person["name"] + "</dd>"
        // personDisplayElement.innerHTML += "<dt>Height</dt><dd>" + person["height"] + "</dd>";
        // personDisplayElement.innerHTML += "<dt>Mass</dt><dd>" + person["mass"] + "</dd>";
        // personDisplayElement.innerHTML += "<dt>Hair color</dt><dd>" + person['hair_color'] + "</dd>";
        // personDisplayElement.innerHTML += "<dt>Skin color</dt><dd>" + person['skin_color'] + "</dd>";
        // personDisplayElement.innerHTML += "<dt>Eye color:</dt><dd>" + person["eye_color"] + "</dd>";
        document.getElementById("descriptionDiv").appendChild(personDisplayElement);
    }
}

function createNavigation(_numOfPeople, _prevUrl, _nextUrl) {
    buttonContainer = document.querySelector('.buttons');
    buttonContainer.innerHTML = "";
    previousButton = document.createElement('button');
    previousButton.setAttribute('id', 'previous');
    previousButton.addEventListener('click', function() { fetchPeople(_prevUrl) });
    !_prevUrl ? previousButton.setAttribute('disabled', "TRUE") : null;
    previousButton.innerHTML = "&#8249;";
    buttonContainer.appendChild(previousButton);
    numPages = _numOfPeople % 10 == 0 ? (parseInt(_numOfPeople) / 10) : (parseInt(_numOfPeople / 10) + 1);
    for (let x = 1; x <= numPages; x++) {
        pageButton = document.createElement('button');
        // newUrl = "http://swapi.dev/api/people/?page=" + x;
        pageButton.addEventListener('click', () => {
            console.log(`Value of y: ${x}`);
            return fetchPeople("http://swapi.dev/api/people/?page=" + x);
        });
        pageButton.textContent = x;
        pageButton.classList.add('pageIndex');
        buttonContainer.appendChild(pageButton);
    }
    nextButton = document.createElement('button');
    nextButton.setAttribute('id', 'next');
    nextButton.addEventListener('click', () => { fetchPeople(_nextUrl) });
    !_nextUrl ? nextButton.setAttribute('disabled', "TRUE") : null;
    nextButton.innerHTML = "&#8250;";
    buttonContainer.appendChild(nextButton);
}