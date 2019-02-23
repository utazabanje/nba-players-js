let playersRow = document.querySelector('.players-row');
let playersCol = document.querySelector('.players-col');
let url = "http://www.json-generator.com/api/json/get/cfmbOlMLGW?indent=2";
let allPlayersArray = [];
let singlePlayerArray = '';
let randomPlayer = null;

(function() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            allPlayersArray = data.league.standard;

            allPlayersArray.forEach(element => {
                singlePlayerArray = element.firstName + ' ' + element.lastName;
            });
        })
        .catch((error) => console.log(error));
})();

// function for calling tenRandomPlayers because data from json is not loading instantly
// for loop is for 10 players because tenRandomPlayers function is producing only one player
setTimeout(function() {
    for(let i = 0; i < 10; i++) {
        createPlayerGrid(tenRandomPlayers());
    }
}, 1000);

// making random player from allPlayers array using math floor 
// variable randomPlayer contains all info about player (randomPlayer.firstName) would give players first name
function tenRandomPlayers() {
    randomPlayer = allPlayersArray[Math.floor(allPlayersArray.length * Math.random())];
    console.log(randomPlayer.firstName)
}

// creating grid for loaded players
function createPlayerGrid(playerGrid) {
    let playersCol = document.createElement('div');
    playersCol.classList = "col-6 players-col";
    playersCol.innerHTML = randomPlayer.firstName + ' ' + randomPlayer.lastName;

    playersRow.appendChild(playersCol);
}