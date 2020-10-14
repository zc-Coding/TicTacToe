//This variable keeps track of whos turn it is
let activePlayer = "X";
//This aaray stores an array of moves. we use this to determine who wins
let selectedSquares = [];

//This function is for placing an x or o in a square
function placeXOrO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber);
        if (activePlayer === 'X') {
            //THIS MIGHT NOT BE THE CORRECT URL
            select.style.backgroundImage = 'url("images/X.png")'; 
        } else {
            select.style.backgroundImage = 'url("images/O.png")';
        }
        selectedSquares.push(squareNumber + activePlayer);
        checkWinConditions ();
        if (activePlayer === 'X'){
            activePlayer = 'O';
        } else {
            activePlayer = 'X';
        }
        Audio('./media/place.mp3');
        if(activePlayer === 'O') {
            disableClick();
            setTimeout(function () {computersTurn();}, 1000)
        }
        return true;
    }
    //This function result in a random square being selected.
    function computersTurn() {
        let success = false;
        let pickASquare;
        while(!success) {
            pickASquare = String(Math.floor(Math.random() * 9));
            if (placeXOrO(pickASquare)){
                placeXOrO(pickASquare);
                success = true;
            };
        }
    }
}

function checkWinConditions() { 
        //This is all of the win conditions for both player and
        // The functions that draw a line across your winning spaces
        if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3X','4X','5X')) { drawWinLine(50,304,558,304); }
    else if (arrayIncludes('6X','7X','8X')) { drawWinLine(50,508,558,508); }
    else if (arrayIncludes('0X','3X','6X')) { drawWinLine(100,50,100,558); }
    else if (arrayIncludes('1X','4X','7X')) { drawWinLine(304,50,304,558); }
    else if (arrayIncludes('2X','5X','8X')) { drawWinLine(508,50,508,558); }
    else if (arrayIncludes('6X','4X','2X')) { drawWinLine(100,508,510,90); }
    else if (arrayIncludes('0X','4X','8X')) { drawWinLine(100,100,520,520); }
    else if (arrayIncludes('0O','1O','2O')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3O','4O','5O')) { drawWinLine(50,304,558,304); }
    else if (arrayIncludes('6O','7O','8O')) { drawWinLine(50,508,558,508); }
    else if (arrayIncludes('0O','3O','6O')) { drawWinLine(100,50,100,558); }
    else if (arrayIncludes('1O','4O','7O')) { drawWinLine(304,50,304,558); }
    else if (arrayIncludes('2O','5O','8O')) { drawWinLine(508,50,508,558); }
    else if (arrayIncludes('6O','4O','2O')) { drawWinLine(100,508,510,90); }
    else if (arrayIncludes('0O','4O','8O')) { drawWinLine(100,100,520,520); }
    else if (selectedSquares.length >= 9) {
        //this function plays the tie game sound
        Audio('./media/tie.mp3');
        //this is a .3 second break before reset game is called
        setTimeout(function () { resetgame();}, 1000);
    }
    //this function checks if an array includes 3 strings
    //it is used to check for each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        //these variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // if the 3 variables we pass are all included in out array true is
        //returned and out else if condition executes the drawWinLine function
        if (a === true && b === true && c === true) { return true;}
    }
}