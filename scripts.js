let url = "http://www.json-generator.com/api/json/get/cfmbOlMLGW?indent=2";
let allPlayersArray = [];
let playerIndex = [];

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
                console.log(randomPlayerSplice[i]);

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

    document.getElementById('singlePlayerGrid').appendChild(playerHtml);
}