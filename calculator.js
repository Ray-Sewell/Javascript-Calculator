const calcScreen = document.querySelector("#calcScreen p");
var clickSound = new Audio("click.wav");
var tingSound = new Audio("ting.wav");
var parseString = "";

function evaluateString(parse) {
    let temp = parseString.split(" ");
    let ans = parseFloat(temp[0]);
    for (i = 1; i < temp.length - 1; i += 2) {
        switch (temp[i]) {
            case "+":
                ans = (ans + parseFloat(temp[i + 1]));
                break;
            case "-":
                ans = (ans - parseFloat(temp[i + 1]));
                break;
            case "*":
                ans = (ans * parseFloat(temp[i + 1]));
                break;
            case "/":
                ans = (ans / parseFloat(temp[i + 1]));
                break;
            case "^":
                let tempAns = ans;
                for (x = 1; x < Math.abs(parseFloat(temp[i + 1])); x++) {
                    ans *= tempAns;
                }
                break;
            default:
        }
    }
    parseString = parseFloat(ans.toPrecision(14)).toString();
    calcScreen.textContent = parseString;
}

let operand = false;
let decimal = true;
var button = document.querySelectorAll(".button");
button.forEach(element => {
    input(element);
});
function input(button) {
    let value = button.querySelector("p").innerHTML;
    button.onclick = addToParse;
    function addToParse() {
        if (value === "=") {
            tingSound.fastSeek(0);
            tingSound.play();
        } else {
            clickSound.fastSeek(0);
            clickSound.play();
        }
        switch (value) {
            case "CA": 
                operand = false;
                decimal = true;
                parseString = "";
                break;
            case "+":
            case "-":
            case "*":
            case "/":
            case "^":
                if (!operand) {
                    break;
                } else {
                    parseString += (" " + value + " ");
                    operand = false;
                    decimal = true;
                    break;
                }
            case "=":
                if (!operand) {
                    parseString = "OPERAND ERROR";
                    operand = false;
                } else {
                    evaluateString(parseString);
                }
                break;
            case ".":
                if (!decimal) {
                    break;
                } else {
                    decimal = false;
                }
            default:
                if (parseString === "OPERAND ERROR") {
                    operand = true;
                    parseString = "";
                    parseString += value;
                    break;
                }
                if (parseString.length < 16) {
                    parseString += value;
                    operand = true;
                }
        }
        calcScreen.textContent = parseString;
    }
}