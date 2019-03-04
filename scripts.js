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

                createPlayer(randomPlayerSplice[i], i);
            }
        })
        .catch((error) => console.log(error));
})();


// get event listener on button for selecting computer five
// catch unselected players from 10 grid players
// through forEach find all unselected and their index, put it in variable and pass to computerFivePlayers as argument
document.querySelector('.btn-warning').onclick = () => {
    let gridOfPlayers = document.querySelectorAll('.unselected');
    
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

// function startingFiveGrid takes three arguments. singlePlayer object
// whereToGo is where to put five players. in starting five grid or computer five
function startingFiveGrid(singlePlayer, whereToGo, index) {
    let startingFiveHtml = document.getElementById('singlePlayer').cloneNode(true);
    startingFiveHtml.removeAttribute('id');

    startingFiveHtml.classList.add('col-12', 'index-' + (index + 1));

    if(whereToGo === 'startingFive') {
        startingFiveHtml.classList.add('starting-five');
    } else if (whereToGo === 'computerFive') {
        startingFiveHtml.classList.add('computer-five');
    }
    startingFiveHtml.querySelector('.player-name').innerHTML = singlePlayer.firstName + ' ' + singlePlayer.lastName;

    let shootButton = document.createElement('button');
    shootButton.classList.add('btn', 'btn-primary');
    shootButton.innerHTML = 'shoot';

    startingFiveHtml.appendChild(shootButton);

    startingFiveHtml.querySelector('.btn-primary').onclick = () => {
        if(whereToGo === 'startingFive') {
            shootBasket('player');
            
        } else if (whereToGo === 'computerFive') {
            shootBasket('comp');
        }
    }

    document.getElementById(whereToGo).appendChild(startingFiveHtml);

    
}

// function that creates starting five
// there is global variable firstFive, and we push all the data inside
// and then through forEach we create grid
function startingFive(singlePlayer) {
    firstFive.push(singlePlayer);

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
function shootBasket(whoIsShooting) {

    let shootPosibility = Math.floor(Math.random() * 3);

    if (whoIsShooting === 'player') {
        if (shootPosibility === 0) {
            scorePoints = scorePoints;
            updateScore('player');
        } else if (shootPosibility === 1) {
            scorePoints = scorePoints + 2;
            updateScore('player');
        } else {
            scorePoints = scorePoints + 3;
            updateScore('player');
        } 
    } else if (whoIsShooting === 'comp') {
        if (shootPosibility === 0) {
            computerScorePoints = computerScorePoints;
            updateScore('comp');
        } else if (shootPosibility === 1) {
            computerScorePoints = computerScorePoints + 2;
            updateScore('comp');
        } else {
            computerScorePoints = computerScorePoints + 3;
            updateScore('comp');
        }
    } else {
        return;
    }
    
}

// update scoreboard for player and comp
function updateScore(playerVsComp) {
    if (playerVsComp === 'player') {
        document.querySelector('.starting-score').innerHTML = scorePoints;
    } else if (playerVsComp === 'comp') {
        document.querySelector('.computer-score').innerHTML = computerScorePoints;
    } else {
        return;
    }
    
}