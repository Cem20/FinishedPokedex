

function init() {
    loadAllPokemonNames();
    renderPokemon();
    loadingScreen();
}

let num = 15;

function lenghtBasedOnName(lengthOfNames) {
    loadTypesOfPok(lengthOfNames);
    loadHeight(lengthOfNames);
    loadStats(lengthOfNames)
    loadMoves(lengthOfNames);
    loadingScreen();
}

async function loadAllPokemonNames() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${num}`;
    let response = await fetch(url);
    let currentPokemonName = await response.json();
    let lengthOfNames = currentPokemonName['results'].length;
    for (let i = 0; i < lengthOfNames; i++) {
        let nameByOrder = currentPokemonName['results'][i]['name'];
        names.push(nameByOrder);
    }
    lenghtBasedOnName(lengthOfNames);
}


async function loadTypesOfPok(lengthOfNames) {
    let currentType = [];
    for (let i = 0; i < lengthOfNames; i++) {
        await loadAndAddTypesBasedOnName(currentType, i);
    }

}

async function loadAndAddTypesBasedOnName(currentType, i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${names[i]}/`;
    let response = await fetch(url);
    let pokemonData = await response.json();
    ImagesOfPokemon.push(pokemonData['sprites']['front_shiny']);
    addTypesToTypesArray(currentType, i, pokemonData);
    singleType(pokemonData);
}

function addTypesToTypesArray(currentType, i, pokemonData) {
    currentType[i] = [];
    for (let j = 0; j < 1; j++) {
        let typesArray = pokemonData['types'][`${j++}`]['type']['name'];
        currentType[i].push(typesArray);
        if (pokemonData['types'].length == 2) {
            typesArray = pokemonData['types'][`${j++}`]['type']['name'];
            currentType[i].push(typesArray);
        }
        types.push(currentType[i]);
    }
    renderPokemon();
    loadingScreen();

}

function singleType(pokemonData) {
    for (let u = 0; u < 1; u++) {
        let singleType = pokemonData['types'][u]['type']['name'];
        onetype.push(singleType);
    }
    renderPokemon();
}


async function loadHeight(lengthOfNames) {
    let abilitiesArray = [];
    for (let i = 0; i < lengthOfNames; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${names[i]}/`;
        let response = await fetch(url);
        let pokemonData = await response.json();
        let pokemonHeight = pokemonData['height'];
        let pokemonWeight = pokemonData['weight'];
        height.push(pokemonHeight);
        weight.push(pokemonWeight);
        let abilitiesCount = pokemonData['abilities'].length;
        abilitiesArray[i] = [];
        for (let j = 0; j < abilitiesCount; j++) {
            let abilityName = pokemonData['abilities'][j]['ability']['name'];
            abilitiesArray[i].push(abilityName);
        }
        abilities.push(abilitiesArray[i]);
    }
}


async function loadStats(lengthOfNames) {
    let baseStatsArray = [];
    let statNamesArray = [];
    for (let i = 0; i < lengthOfNames; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${names[i]}/`;
        let statsJson = await fetch(url);
        let statsData = await statsJson.json();
        let numStats = statsData['stats'].length;
        baseStatsArray[i] = [];
        statNamesArray[i] = [];
        for (let j = 0; j < numStats; j++) {
            let baseStat = statsData['stats'][j]['base_stat'];
            baseStatsArray[i].push(baseStat);
        }
        baseStats.push(baseStatsArray[i]);
        for (let t = 0; t < numStats; t++) {
            let statName = statsData['stats'][t]['stat']['name'];
            statNamesArray[i].push(statName);
        }
        namesOfStats.push(statNamesArray[i]);
    }
}


async function loadMoves(lengthOfNames) {
    let movesArray = [];

    for (let i = 0; i < lengthOfNames; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${names[i]}/`;
        let moveJson = await fetch(url);
        let pokemonMoves = await moveJson.json();
        let lengthOfMoves = pokemonMoves['moves'].length;

        movesArray[i] = [];

        for (let j = 0; j < lengthOfMoves; j++) {
            let moveName = pokemonMoves['moves'][j]['move']['name'];
            movesArray[i].push(moveName);
        }
        moves.push(movesArray[i]);
    }
}


function renderPokemon() {
    toggleIf = 0;
    document.getElementById('pokekontent').innerHTML = "";
    for (let t = 0; t < names.length; t++) {
        let name = names[t];
        let pokemonTypes = types[t];
        let images = ImagesOfPokemon[t];
        renderTemplate(name, pokemonTypes, images, t);
    }
}


function renderFilteredPokemon() {
    document.getElementById('pokekontent').innerHTML = "";
    for (let j = 0; j < SearchOrder.length; j++) {
        let pokemonOrder = SearchOrder[j];
        let pokemonType = filteredTypes[j];
        let pokemonImage = filteredImages[j];
        renderTemplate(pokemonOrder, pokemonType, pokemonImage, j);
    }
}




// Fügen Sie einen Event Listener für keyup oder input hinzu
document.getElementById('search').addEventListener('input', filterPokemonNames);

function filterPokemonNames() {
    let searchInput = document.getElementById('search').value.trim().toLowerCase();
    if (searchInput !== '') {
        clearAfterEverySearch();
        for (let index = 0; index < names.length; index++) {
            matchedSearchResults(index, searchInput);
        }
        if (SearchOrder.length > 0) {
            hideButton();
        }
    } else {
        displayButton();
    }
}

function hideButton() {
    toggleIf = 1;
    conv = 1;
    document.getElementById(`butn`).classList.add('dn');
    renderFilteredPokemon();  // Anstatt renderPokem() hier aufrufen
}

function displayButton() {
    conv = 0;
    document.getElementById(`butn`).classList.remove('dn');
    renderPokemon();
}

function matchedSearchResults(t, searchValue) {
    let name = names[t].toLowerCase();
    if (name.includes(searchValue)) {
        if (name !== '') {
            pushAfterSearchResult(t);
        }
    }
    else if (!document.getElementById('search').value == '' && !name.includes(searchValue)) {
        document.getElementById('pokekontent').innerHTML = 'NothingFound';
    }
}

function PopUp(t) {
    let popUp = document.getElementById('PopUp');
    popUp.classList.remove('dn');
    document.body.classList.add('ovhid');
    let pokeLard = document.createElement('div');
    pokeLard.className = 'pokeLard';
    PoPUpTemplate(t);
    stats(t);
}



function stats(i) {
    let cro = document.getElementById(`ViewSec${i}`);
    cro.innerHTML = `<canvas id="myChart"></canvas>`;
    const ctx = cro.querySelector('#myChart');
    if (toggleIf == 1) {
        NoneSearchStats(ctx, i);
    }
    else {
        SearchStats(ctx, i);
    }
}


function movesOfPokemon(i) {
    document.getElementById(`ViewSec${i}`).innerHTML = `<div id="show${i}" class="FormateFont"></div>`;
    let displayCurrentMove = document.getElementById(`show${i}`);
    console.log(moves[i].length);
    if (toggleIf == 1) {
        for (let u = 0; u < filteredMoves[i].length; u++) {
            displayCurrentMove.innerHTML += `<div class="StyleMoveFonts">${filteredMoves[i][u]}</div>`;
        }
    }
    else {
        for (let t = 0; t < moves[i].length; t++) {
            displayCurrentMove.innerHTML += `<div class="StyleMoveFonts">${moves[i][t]}</div>`
        }
    }
}

function closePopUp() {
    let nn = document.getElementById('PopUp');
    document.body.classList.remove('ovhid');
    nn.classList.add('dn');
}

function popUpCloseDeactivated(event) {
    event.stopPropagation();
}


function swipeRight(i) {
    if (toggleIf == 1) {
        i = (i < SearchOrder.length - 1) ? i + 1 : 0;
    }
    else {
        i = (i < names.length - 1) ? i + 1 : 0;
    }
    PopUp(i);
}

function swipeLeft(i) {
    if (i > 0) {
        i--;
    } else {
        i == toggleIf == 1 ? SearchOrder.length - 1 : names.length - 1;
    }
    PopUp(i);
}



function loadingScreen() {
    let LoadScree = document.getElementById('foo');
    let grt = document.querySelector('.LoadingPopUp');
    if (names.length && types.length == num) {
        document.body.classList.remove('ovhid');
        grt.style.display = 'none';

    } else {
        document.body.classList.add('ovhid');
        LoadScree.classList.remove(`dn`);
        LoadScree.classList.add(`LoadingPopUp`);
        grt.style.display = 'flex';
    }
}

