let old = createNumberArray(5);

// Function to create an array from every single place
// The digits are always rounded to 6
// @example with number 5
// createNumberArray(5) => [0, 0, 0, 0, 0, 5]
// @example with the number 552
// createNumberArray(5) => [0, 0, 0, 5, 5, 2]
// which should become an array

function createNumberArray(number) {
    let isNegativ = false;

    // Divides the number into an array
    const numberArray = number.toString().split('');

    for (let i = 0; numberArray.length < 6; i++) {
        if (numberArray[0] === '-') {
            numberArray[0] = 0;
            isNegativ = true;
        }
        numberArray.unshift(0);
    }

    // Sets minus if it's negative
    if (isNegativ) {
        numberArray.unshift('-');
    } else {
        numberArray.unshift('+');
    }

    //return the array
    return numberArray.map(x => x === '-' || x === '+' ? x : parseInt(x));
}

// Function for generating the number and displaying as well as 
// animating the individual number place
// @param {number} - number to be displayed
// @param {HTMLelement} HTML element in which the number should be

function animateNumber(number, element) {
    // Empties the element
    element.innerHTML = '';

    // Calculates the new number array
    const numberArray = createNumberArray(number);

    // Put everything in the HTML element
    createNumberHTML(numberArray, old, element);

    // Calculate the ticks that should change
    const ticks = [...element.querySelectorAll("span[data-value]")];
    setTimeout(() => {
        
        // Animates the values 
        for (let tick of ticks) {
            let dist = parseInt(tick.getAttribute("data-value") - 1);
            tick.style.transform = `translateY(-${dist * 100}%)`;
        }
    }, 0);

    //Set the number array to the old status
    old = numberArray;
}

function createNumberHTML(numbers, old, element) {
    for (let i = 0; i < numbers.length; i++) {
        if (isNaN(numbers[i]) || isNaN(old[i])) {
            element.insertAdjacentHTML(  
                "beforeend",
                `<span data-value="${calcDeltaSight(old[i], numbers[i]).length}">${calcDeltaSight(old[i], numbers[i]).join('')}</span>`);

            } else {
                element.insertAdjacentHTML(
                "beforeend",
                `<span data-value="${calcDeltaBetweenNumbers(old[i], numbers[i]).length}">${calcDeltaBetweenNumbers(old[i], numbers[i]).join('')}</span>`);  

        }
    }
    return element;
}

function calcDeltaSight(oldSight, newSight) {
    return oldSight !== newSight ? [`<span>${oldSight}</span>`, `<span>${newSight}</span>`] : [`<span>${newSight}</span>`];
}

// Function to get the delta between each number.  
// This function creates an array of spans
// @example - Example with the numbers 2 and 5
// calcDeltaBetweenNumbers(2, 5) => 2, 3, 4, 5 => <span>2</span><span>3</span><span>4</span><span>5</span>
// @example - Example between 7 and 2
// calcDeltaBetweenNumbers(7, 2) => 7, 8, 9, 0, 1, 2 => <span>7</span><span>8</span><span>9</span><span>0</span><span>1</span><span>2</span>
// @param {number} oldNumber 
// @param {number} newNumber

function calcDeltaBetweenNumbers(oldNumber, newNumber) {
    let numberArray = [oldNumber];
    let notFound = true;
    
    if(oldNumber === newNumber) 
        return numberArray.map(x => `<span>${x}</span>`);

    while(notFound) {
        oldNumber++;
        if (oldNumber > 9) oldNumber = 0;
        numberArray.push(oldNumber);
        if (oldNumber === newNumber) notFound = false;
    }

    return numberArray.map(x => `<span>${x}</span>`);
}

// Function to generate a random value
// @param {number} min - Minimum value
// @param {number} max - Maximum value

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



setInterval(() => {
    const diff = randomNumber(-20, 20);
    document.querySelector('.diff').innerHTML = diff;
    const value = parseInt(old.join('')) + diff;
    animateNumber(value, document.querySelector('.numbers'));
}, 2500);