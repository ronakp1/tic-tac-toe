const gameBoard = (() => {
    array = ['', '', '', '', '', '', '', '', ''];
    const gameWinCon = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"],
    ];

    return { array, gameWinCon };
})();

const player = (mark, hasTurn, foundWinner) => {
    const hasWon = () => `${mark} has won!`;
    const outTurn = () => console.log(hasTurn);
    const tie = () => console.log("It's a tie!");
    return { mark, hasTurn, foundWinner, hasWon, outTurn, tie, };
}
const newGame = gameBoard;

const player1 = player('x', true, false);
const player2 = player('o', false, false);


const displayController = (() => {
    let currentGameBoard = newGame.array;
    let winning = newGame.gameWinCon;

    const allDivs = document.querySelectorAll('.selection');
    let arrayOfDivs = [...allDivs];

    const checkWin = (player) => {
        let counter = 0;
        winning.forEach((eachArray => {
            counter = 0;
            eachArray.forEach((eachIndex) => {
                if (currentGameBoard[eachIndex] === player.mark) {
                    counter++;
                    if (counter === 3) {
                        //player.hasWon();
                        player.foundWinner = true;
                        if (player.mark === ("o")) {
                            const p2 = document.getElementById('p2');
                            p2.innerHTML = player.hasWon();
                        } else {
                            const p1 = document.getElementById('p1');
                            p1.innerHTML = player.hasWon();
                        }
                        counter = 0;
                    }
                }
            })
        }))
    }

    const restartGame = () => {
        currentGameBoard = ['', '', '', '', '', '', '', '', ''];
        console.log(arrayOfDivs)
        arrayOfDivs.map(eachDiv => eachDiv.innerHTML = '');
        player1.hasTurn = true;
        player2.hasTurn = false;
    }

    const restartButton = document.querySelector('[data-restart]');
    restartButton.addEventListener('click', () => {
        restartGame();
    })

    const placeMarker = (player, e, index) => {
        e.target.innerHTML = player.mark;
        currentGameBoard[index] = player.mark;
    }

    const checkTie = () => {
        const lengthOfArray = currentGameBoard.length;
        const tieGame = currentGameBoard.filter(word => word.length > 0);
        if (tieGame.length === lengthOfArray) player1.tie();
    }

    const updateTurn = ({ hasTurn, mark }) => {
        const p1 = document.getElementById('p1');
        const p2 = document.getElementById('p2');
        if (mark === ("x") && hasTurn === true) {
            p1.innerHTML = "Player 1's Turn";
        }
        if (mark === ("x") && hasTurn === false) {
            p1.innerHTML = "";
        }
        if (mark === ("o") && hasTurn === true) {
            p2.innerHTML = "Player 2's Turn";
        }
        if (mark === ("o") && hasTurn === false) {
            p2.innerHTML = "";
        }
    }

    const mainFunc = () => {
        updateTurn(player1);
        arrayOfDivs.forEach((square, index) => {
            square.addEventListener('click', (e) => {
                if (player1.hasTurn === true) {
                    if (currentGameBoard[index] === '' && player2.foundWinner === false && player1.foundWinner === false) {
                        updateTurn(player1);
                        placeMarker(player1, e, index)
                        player1.hasTurn = false;
                        player2.hasTurn = true;
                        updateTurn(player1);
                        updateTurn(player2);
                        checkWin(player1);
                        checkTie();
                    }
                }
                else if (player2.hasTurn === true && player2.foundWinner === false && player1.foundWinner === false) {
                    const p2 = document.getElementById('p2');
                    p2.innerHTML = "Player 2's Turn";
                    if (currentGameBoard[index] === '')
                    updateTurn(player1); {
                        placeMarker(player2, e, index)
                        player1.hasTurn = true;
                        player2.hasTurn = false;
                        updateTurn(player2);
                        updateTurn(player1);
                        checkWin(player2);
                        checkTie();
                    }
                }
            })
        })
    }

    return { arrayOfDivs, mainFunc, restartGame };
})();

const display = displayController;
display.mainFunc();