let url = "http://www.json-generator.com/api/json/get/cfmbOlMLGW?indent=2";
let allPlayersArray = [];
let playerIndex = [];
let firstFive = [];

(function() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            allPlayersArray = data.league.standard;

            //get one random player
            let randomPlayerIndex = Math.floor(allPlayersArray.length * Math.random());
            // get 10 random players from allplayers array with splice method
            let randomPlayerSplice = allPlayersArray.splice(randomPlayerIndex, 10);

            //create 10 players with createPlayer function. Argument is single array 
            for(let i = 0; i < 10; i++) {
                randomPlayerSplice[i];
                // console.log(randomPlayerSplice[i]);

                createPlayer(randomPlayerSplice[i]);
            }
        })
        .catch((error) => console.log(error));
})();

// function that creates single player
function createPlayer(singlePlayer) {
    let playerHtml = document.getElementById('singlePlayer').cloneNode(true);
    playerHtml.removeAttribute('id');

    playerHtml.classList.add('col-6');
    playerHtml.querySelector('.player-name').innerHTML = singlePlayer.firstName + ' ' + singlePlayer.lastName;

    let selectPlayerButton = document.createElement('button');
    selectPlayerButton.classList.add('btn', 'btn-danger');
    selectPlayerButton.innerHTML = 'Select player';

    playerHtml.appendChild(selectPlayerButton);

    document.getElementById('singlePlayerGrid').appendChild(playerHtml);

    // select player on every click
    playerHtml.querySelector('.btn').onclick = () => {
        if(playerHtml.classList.contains('selected')) {
            playerHtml.classList.remove('selected');

            removePlayer(singlePlayer);
        } else {
            // if there is more than 5 players stop it
            if(firstFive.length === 5) {
                return;
            }
            playerHtml.classList.add('selected');
            startingFive(singlePlayer);
        }
    }

    singlePlayer.htmlObject = playerHtml;
}

function startingFiveGrid(singlePlayer, index) {
    let startingFiveHtml = document.getElementById('singlePlayer').cloneNode(true);
    startingFiveHtml.removeAttribute('id');

    startingFiveHtml.classList.add('col-12', 'index-' + (index + 1));
    startingFiveHtml.querySelector('.player-name').innerHTML = singlePlayer.firstName + ' ' + singlePlayer.lastName;

    document.getElementById('startingFive').appendChild(startingFiveHtml);
}

// function that creates starting five
// there is global variable firstFive, and we push all the data inside
// and then through forEach we create grid
function startingFive(singlePlayer) {
    firstFive.push(singlePlayer);

    document.getElementById('startingFive').innerHTML = '';

    firstFive.forEach((element, index) => {
        startingFiveGrid(element, index);
    });
}

function removePlayer(singlePlayer) {
    firstFive.splice(firstFive.indexOf(singlePlayer), 1);

    // we need to empty the html so that old inputs dissapear
    document.getElementById('startingFive').innerHTML = '';

    // going through forEach to create another grid that is updated
    firstFive.forEach((element, index) => {
        startingFiveGrid(element, index);
    });
}