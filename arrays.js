let names = [];
let types = [];
let onetype = [];
let newOneType = [];
let ImagesOfPokemon = [];
let filteredImages = [];
let height = [];
let weight = [];
let abilities = [];
let baseStats = [];
let namesOfStats = [];
let moves = [];
let filteredMoves = [];
let filteredTypes = [];
let SearchOrder = [];
let filteredBaseStats = [];
let filteredStatNames = [];
let conv = 0;
let toggleIf = 0;

let ColorBasedOnType = {
    "Colors": {
        "psychic": "#896CBA",
        "flying": "#95A9CE",
        "grass": "#18802C",
        "dark": "#20273A",
        "fighting": "#FFAEAA",
        "fire": "#A26620",
        "water": "#1685D7",
        "bug": "#759D13",
        "dragon": "#0E2CA4",
        "electric": "#DFBF26",
        "ghost": "#5145A3",
        "ground": "#8B5332",
        "normal": "#EAEADE",
        "poison": "#611380",
        "rock": "#474026",
        "steel": "#454545",
        "fairy": "#F87EA7",
        "ice": "#DCFCF7",
    }
}


function loadrest() {
    names = [];
    types = [];
    onetype = [];
    ImagesOfPokemon = [];
    height = [];
    weight = [];
    abilities = [];
    StatNum = [];
    SearchOrder = [];
    moves = [];
    num += 15;
    loadallPokemonNames();
    loadingScreen();
}

function clearAfterEverySearch() {
    SearchOrder = [];
    newOneType = [];
    filteredTypes = [];
    filteredImages = [];
    filteredMoves = [];
    filteredBaseStats = [];
    filteredStatNames = [];
    document.getElementById('pokekontent').innerHTML = "";
}


function pushAfterSearchResult(index) {
    SearchOrder.push(names[index]);
    newOneType.push(onetype[index]);
    filteredTypes.push(types[index]);
    filteredImages.push(ImagesOfPokemon[index]);
    filteredMoves.push(moves[index]);
    filteredStatNames.push(namesOfStats[index]);
    filteredBaseStats.push(baseStats[index]);
}
