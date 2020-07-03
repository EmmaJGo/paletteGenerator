
document.addEventListener('DOMContentLoaded', () => {
    const subheader = document.getElementById('subheading');
    const form = document.getElementById('inputInfo');
    const gNumberS = document.querySelectorAll('input[name="gNumber"]');
    const gResolutionS = document.querySelectorAll('input[name="gResolution"]');
    const colorS = document.querySelectorAll('input[name="color"]');
    const submit = document.getElementById('submit');
    const palette = document.getElementById('palette');
    const grid = document.getElementById('grid');

    /**
     * Displays an element on page
     * @param {DOM element} element 
     */
    function displayElement(element) {
        element.style.display = 'inline';
    }

    /**
     * Hides an element from page
     * @param {DOM element} element 
     */
    function hideElement(element) {
        element.style.display = 'none';
    }
    
    /**
     * Returns user's radio button value selection
     * @param {array} listOptions 
     */
    function getValue (listOptions) {
        let result;
        for(let x of listOptions) {
            if (x.checked) {
                result = x.value;
                return(result);
            }
        }
    }

    /**
     * Validates selection in form's fields have been made
     * Displays grid from values selected
     * @param {object} triadResult 
     */
    function validateInfo(triadResult) {
        const gNumber = triadResult.gNumber;
        const gResolution = triadResult.gResolution;
        const color = triadResult.color;
        if (gNumber == null || gResolution == null || color == null) 
        {
        alert('You have to make selections for the three fields! Try again! ');
        }
        else {
            submit.style.backgroundColor = 'lightgray';
            subheader.textContent = 'Palette';
            hideElement(form);
            displayElement(palette);
            console.log(triadResult);
        }
    };

    /**
     * Generates gNumber*gNumber grid of dots
     * @param {number} gNumber 
     */
    function generateGrid(gNumber) {
        let count = 0;
        for ( let i = 0; i < gNumber; i ++) {
            for ( let j = 0; j < gNumber; j ++) {
                grid.innerHTML+= `<div class='dot' id='dot${count}'>${count}</div>`;
                count ++;
            }
            grid.innerHTML += '<br>';
        }
    }
    // const gridElements = gridNumber * gridNumber;
    // const dots = grid.children;

    /**
     * Generates rgb text from an array with 3 values
     * @param {array} triad 
     */
    function rgbTextGenerator(triad) {
        let rgb = 'rgb(';
        for ( let i = 0; i < triad.length; i ++ ) {
            rgb += array[i] 
            if ( i !== array.length - 1 ) {
                rgb += ',';
            }
        }
        rgb += ')';
        return (rgb);
    }

    /**
     * Gets single rgb triad array from the array collection
     * @param {array of arrays} arrayOfRgbs 
     * @param {array} singleRgb 
     */
    function singlergbArray(arrayOfRgbs, singleRgb) {
        for ( let i = 0; i < arrayOfRgbs.length; i ++) {
            singleRgb.push(rgbTextGenerator(arrayOfRgbs[i]));
        }
        return (singleRgb);
    }
    // function newPage (result) {
    //     const span = document.createElement('span');
    //     span.textContent = 'Hello, there'; 
    //     grid.appendChild(span);
    //     console.log(result);
    // };

    submit.addEventListener('click', () => {
        // Initializes variables with user's info selected from form
        const triadResult = {};
        const gNumber = getValue(gNumberS);
        const gResolution = getValue(gResolutionS);
        const color = getValue(colorS);
        triadResult.gNumber = gNumber;
        triadResult.gResolution = gResolution;
        triadResult.color = color;
        
        // Validates that three fields of form are filled
        validateInfo(triadResult);   
        //Generates grid  
        generateGrid(gNumber);
        
    });
});

