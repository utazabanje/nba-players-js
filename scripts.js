let url = "http://www.json-generator.com/api/json/get/cfmbOlMLGW?indent=2";
let allPlayersArray = [];
let randomPlayerIndex = [];
let randomPlayerSplice = [];
let firstFive = [];
let computerFive = [];
let scorePoints = 0;
let computerScorePoints = 0;

(function () {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            allPlayersArray = data.league.standard;

            //get one random player
            randomPlayerIndex = Math.floor(allPlayersArray.length * Math.random());
            // get 10 random players from allplayers array with splice method
            randomPlayerSplice = allPlayersArray.splice(randomPlayerIndex, 10);

            //create 10 players with createPlayer function. Argument is single array 
            for (let i = 0; i < 10; i++) {
                randomPlayerSplice[i];
                // console.log(randomPlayerSplice[i]);

                createPlayer(randomPlayerSplice[i], i);
            }
        })
        .catch((error) => console.log(error));
})();

document.querySelector('.btn-warning').onclick = () => {
    let gridOfPlayers = document.querySelectorAll('.unselected');
    
    // gridOfPlayers.forEach((onePlayer) => {
    //     onePlayer.dataset.index;
    //     console.log(randomPlayerSplice[onePlayer.dataset.index]);
    //     // let name = onePlayer.innerHTML;
    //     computerFivePlayers(name);
    // });
    
    gridOfPlayers.forEach((onePlayer) => {
        let playerObject = randomPlayerSplice[onePlayer.dataset.index];

        computerFivePlayers(playerObject);
    });
};

// function that creates single player
function createPlayer(singlePlayer, playerIndex) {
    let playerHtml = document.getElementById('singlePlayer').cloneNode(true);
    playerHtml.removeAttribute('id');

    playerHtml.classList.add('col-6', 'unselected');
    playerHtml.dataset.index = playerIndex;
    playerHtml.querySelector('.player-name').innerHTML = singlePlayer.firstName + ' ' + singlePlayer.lastName;

    let selectPlayerButton = document.createElement('button');
    selectPlayerButton.classList.add('btn', 'btn-danger');
    selectPlayerButton.innerHTML = 'Select player';

    playerHtml.appendChild(selectPlayerButton);

    document.getElementById('singlePlayerGrid').appendChild(playerHtml);

    // select player on every click
    playerHtml.querySelector('.btn').onclick = () => {
        if (playerHtml.classList.contains('selected')) {
            playerHtml.classList.add('unselected');
            playerHtml.classList.remove('selected');

            removePlayer(singlePlayer);
        } else {
            // if there is more than 5 players stop it
            if (firstFive.length === 5) {
                return;
            }
            playerHtml.classList.add('selected');
            playerHtml.classList.remove('unselected');
            startingFive(singlePlayer);
        }
    }

    singlePlayer.htmlObject = playerHtml;
}

function startingFiveGrid(singlePlayer, whereToGo, index) {
    let startingFiveHtml = document.getElementById('singlePlayer').cloneNode(true);
    startingFiveHtml.removeAttribute('id');

    startingFiveHtml.classList.add('col-12', 'index-' + (index + 1));
    startingFiveHtml.querySelector('.player-name').innerHTML = singlePlayer.firstName + ' ' + singlePlayer.lastName;

    let shootButton = document.createElement('button');
    shootButton.classList.add('btn', 'btn-primary');
    shootButton.innerHTML = 'shoot';

    startingFiveHtml.appendChild(shootButton);

    startingFiveHtml.querySelector('.btn-primary').onclick = () => {
        shootBasket(singlePlayer);
    }

    document.getElementById(whereToGo).appendChild(startingFiveHtml);
}

// function that creates starting five
// there is global variable firstFive, and we push all the data inside
// and then through forEach we create grid
function startingFive(singlePlayer) {
    firstFive.push(singlePlayer);
    console.log(singlePlayer);

    document.getElementById('startingFive').innerHTML = '';

    firstFive.forEach((element, index) => {
        startingFiveGrid(element, 'startingFive', index);
    });
}

//function that selects players that are not selected for starting five
function computerFivePlayers(singlePlayer) {
    computerFive.push(singlePlayer);

    document.getElementById('computerFive').innerHTML = '';

    computerFive.forEach((element, index) => {
        startingFiveGrid(element, 'computerFive', index);
    });
    console.log(computerFive);
}

// remove player using splice method
function removePlayer(singlePlayer) {
    firstFive.splice(firstFive.indexOf(singlePlayer), 1);

    // we need to empty the html so that old inputs dissapear
    document.getElementById('startingFive').innerHTML = '';

    // going through forEach to create another grid that is updated
    firstFive.forEach((element, index) => {
        startingFiveGrid(element, index);
    });
}

// give players ability to shoot
function shootBasket(playerAbility) {
    if (playerAbility.nbaDebutYear > 2013) {
        console.log('you to young to shoot');
    }

    let shootPosibility = Math.floor(Math.random() * 3);
    if (shootPosibility === 0) {
        scorePoints = scorePoints;
        console.log('you missed', scorePoints);
    } else if (shootPosibility === 1) {
        scorePoints = scorePoints + 2;
        console.log('you scored 2 points', scorePoints);
    } else {
        scorePoints = scorePoints + 3;
        console.log('you scored 3 points', scorePoints);
    }
}