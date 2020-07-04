
document.addEventListener('DOMContentLoaded', () => {
    const subheader = document.getElementById('subheading');
    const form = document.getElementById('inputInfo');
    const gNumberS = document.querySelectorAll('input[name="gNumber"]');
    const gResolutionS = document.querySelectorAll('input[name="gResolution"]');
    const colorS = document.querySelectorAll('input[name="color"]');
    const submit = document.getElementById('submit');
    const palette = document.getElementById('palette');
    const grid = document.getElementById('grid');

    const basicRgbObjects = {
        black: {
            g5: {
                    0:  [[41,41,41]],
                    5:  [[54,54,54]],
                    10: [[189,189,189]],
                    15: [[221,221,221]],
                    20: [[238,238,238]]
                }
        },
        brown: {
            g5: {
                0:  [[84,50,48]], 
                5:  [[103,66,53]],
                10: [[124,84,56]],
                15: [[148,103,58]],
                20: [[169,125,57]]
            }
        },
        blue: {
            g5: {
                0:  [[0,85,255]],
                5:  [[0,146,255]],
                10: [[148,197,255]],
                15: [[26,50,175]],
                20: [[6,16,39]]
            }
        },
        red: {
            g5: {
                0:  [[255,17,17]],
                5:  [[255,65,65]],
                10: [[255,98,98]],
                15: [[255,128,128]],
                20: [[255,174,174]]
            }
        },
        yellow: {
            g5: {
                0:  [[255,223,87]],
                5:  [[255,244,140]],
                10: [[254,255,170]], 
                15: [[255,255,197]], 
                20: [[255,255,231]]
            }
        }
    }

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

    /**
     * Generates rgb text from an array with 3 values
     * @param {array} singleArray 
     */
    function rgbTextGenerator(singleArray) {
        let rgb = 'rgb(';
        for ( let i = 0; i < singleArray.length; i ++ ) {
            rgb += singleArray[i] 
            if ( i !== singleArray.length - 1 ) {
                rgb += ',';
            }
        }
        rgb += ')';
        return (rgb);
    }
    
    /**
     * Generates rgb text for a whole object with array of arrays (i.e. g5)
     *  of triads of values
     * @param {object of object of arrays} objectOfRgbs 
     */
    function rgbTextArrayGenerator(objectOfRgbs) {
        const rgbTextArray = [];
        for ( let key in objectOfRgbs ) {
            for ( let i = 0; i < objectOfRgbs[key].length; i ++) {
                rgbTextArray.push(rgbTextGenerator(objectOfRgbs[key][i]));
            }
        }
        return (rgbTextArray);
    }
    
    // ----> To check. To work with all 3, 5, 10, and low, medium, high
    function alterSingleRGB(spacing,singleRgbArray) {
        let newN = 0;
        let newRgbArray = [];
        for ( let i = 0; i < 3; i ++) {
            newN = singleRGBarray[i] + spacing;
            newRGBarray.push(newN);
            newN = 0;
        }
        return (newRGBarray);
    }
    
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

        //Generates rgb for whole OBJECT of arrays
        // rgbTextArrayGenerator(basicRgbObjects.blue.g5)
        
    });
});

