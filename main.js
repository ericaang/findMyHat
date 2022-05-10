const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '∆';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '☻';
const row = 10;
const col = 10;
let hatRow, hatCol;
let isQuit = false;
let message = "Press 'U' for Up, 'D' for Down, 'L' for Left, 'R' for Right, 'Q' to Quit";

class Field {
    field = [];

    constructor(){

        this.locationX = 0;
        this.locationY = 0;

        for (let a = 0; a < row; a++){
            this.field[a] = [];
            }

        this.generateField();
    }

    generateField(){

        for(let y = 0; y < row ; y++){
            for (let x = 0; x < col; x++){
                const isHole = Math.floor(Math.random() * 5); //this generates a random number from 0 to 4
                if (isHole == 0){
                    this.field[y][x] = hole;  // place a hole if isHole == 0                  
                }
                else {
                    this.field[y][x] = fieldCharacter;  // place field if isHole is between 1 to 4
                }
            }
        }
        //Set start location of pathCharacter to (0, 0)
        this.field[this.locationY][this.locationX] = pathCharacter;

        //getting random location of the Hat
        hatRow = Math.floor(Math.random() * row);
        hatCol = Math.floor(Math.random() * col);
        this.field[hatRow][hatCol] = hat;

     }

     print() {
        clear();
        const displayString = this.field.map( row => {
            return row.join('');

        }).join('\n');
        console.log(displayString);
        console.log(message); // to display error message when incorrect key is entered
        message = ""; // clear error message
    }

    //This function prints "Out of bounds" message and exit out of game
    outOfBounds() {
        console.log("Out of Bounds - Game End!");
        isQuit = 1;                
    }

    askQuestion() {
        const answer = prompt("Which way? > ").toUpperCase();
        switch(answer){
            case "U":
                if (this.locationY != 0) {
                    this.field[this.locationY][this.locationX] = fieldCharacter;
                    this.locationY--;
                }
                else this.outOfBounds();
                break;

            case "D":
                if (this.locationY != row - 1 ) {
                    this.field[this.locationY][this.locationX] = fieldCharacter;
                    this.locationY++;
                }
                else this.outOfBounds();
                break;

            case "L":
                if (this.locationX != 0) {
                    this.field[this.locationY][this.locationX] = fieldCharacter;
                    this.locationX--;
                }
                else this.outOfBounds();
                break;

            case "R":
                if (this.locationX != col - 1) {
                    this.field[this.locationY][this.locationX] = fieldCharacter;
                    this.locationX++;
                }
                else this.outOfBounds();
                break;

            case "Q":
                isQuit = true;  // to exit from the game
                break;

            default:
                message = "Please enter only U, D, L or R"; //sets the error message to be printed

        }

    }

    //This function checks if the new location contains a hole or a hat before moving the pathCharacter to the new location

    placePathCharacter(){

        if (this.field[this.locationY][this.locationX] == hat){
           console.log("Congrats, you found your hat!");
           isQuit = true;
        }
        else if (this.field[this.locationY][this.locationX] == hole){
            console.log("Sorry, you fell down a hole!");
            isQuit = true;
        }
        else {
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    runGame(){
        // while isQuit is false, the game will continue
        do {
            this.print();
            this.askQuestion();
            if (!isQuit){
                this.placePathCharacter();
            }
            
        } while (!isQuit);       
    }

    
}//End of Field class

const myField = new Field();
myField.runGame();
