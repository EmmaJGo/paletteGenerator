
document.addEventListener('DOMContentLoaded', () => {
    const subheader = document.getElementById('subheading');
    const form = document.getElementById('inputInfo');
    const gNumberS = document.querySelectorAll('input[name="gNumber"]');
    const gResolutionS = document.querySelectorAll('input[name="gResolution"]');
    const colorS = document.querySelectorAll('input[name="color"]');
    const submit = document.getElementById('submit');
    const palette = document.getElementById('palette');
    const grid = document.getElementById('grid');
    const dots = document.getElementsByClassName('dot');

    // Basic indexed RGB values for each color for the 5x5 grid (g5)
    let basicRgbObjects = {
        black: {
            g3: {}, g10: {},
            g5: {
                    i0: [[21,21,21]],
                    i5: [[100,100,100]],
                    i10: [[155,155,155]],
                    i15: [[189,189,189]],
                    i20: [[214,214,214]]
                }
        },
        brown: {
            g3: {}, g10 : {},
            g5: {
                // i0:  [[82,50,48]], 
                // i5:  [[103,66,53]],
                // i10: [[124,84,56]],
                // i15: [[148,103,58]],
                // i20: [[169,125,57]]

                i0:  [[82,50,48]], 
                i5:  [[113,66,53]],
                i10: [[144,84,56]],
                i15: [[175,103,58]],
                i20: [[206,125,57]]
            }
        },
        blue: {
            g3: {}, g10: {},
            g5: {
                i0: [[6,16,39]],
                i5: [[26,50,175]],
                i10:  [[0,85,255]],
                i15:  [[0,146,255]],
                i20: [[148,197,255]]
            }
        },
        red: {
            g3: {}, g10:{}, 
            g5: {
                i0:  [[255,17,17]],
                i5:  [[255,65,65]],
                i10: [[255,98,98]],
                i15: [[255,128,128]],
                i20: [[255,174,174]]
            }
        },
        yellow: {
            g3: {}, g10: {},
            g5: {
                i0:  [[255,223,87]],
                i5:  [[255,244,140]],
                i10: [[254,255,170]], 
                i15: [[255,255,197]], 
                i20: [[255,255,231]]
            }
        }
    }

    //Triad indexed value to change each rgb 
    const indexedChanges = {
        black: [1,1,1],
        brown: [1,0,0], 
        blue: [0,1,0],
        red: [0,1,1],
        yellow: [0,0,1]
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
            gNumber = gResolution = color = null;
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
        for ( let i = 0; i < gNumber; i ++) {
            for ( let j = 0; j < gNumber; j ++) {
                grid.innerHTML+= `<div class='dot'></div>`;
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
    
    //NOT SURE IF NEEDED FOR OBJECTOFRGBS
    // /**
    //  * Generates rgb text for a whole object with array of arrays (i.e. g5)
    //  *  of triads of values
    //  * @param {object of object of arrays} objectOfRgbs 
    //  */
    // function rgbTextArrayGenerator(objectOfRgbs) {
    //     const rgbTextArray = [];
    //     for ( let key in objectOfRgbs ) {
    //         for ( let i = 0; i < objectOfRgbs[key].length; i ++) {
    //             rgbTextArray.push(rgbTextGenerator(objectOfRgbs[key][i]));
    //         }
    //     }
    //     return (rgbTextArray);
    // }

    
    /**
     * Generages initial values for g3 object for a given color
     * @param {object} colorObject 
     */
    function generatesBaseG3(color) {
        basicRgbObjects[color].g3.i0 = basicRgbObjects[color].g5.i0;
        basicRgbObjects[color].g3.i3 = basicRgbObjects[color].g5.i10;
        basicRgbObjects[color].g3.i6 = basicRgbObjects[color].g5.i20;
        return (basicRgbObjects[color].g3);
    }
    
    /**
     * Generates initial values for g10 object for a given color
     * @param {object} colorObject 
     */
    function generatesBaseG10(color) {
        basicRgbObjects[color].g10.i0 = basicRgbObjects[color].g5.i0;
        basicRgbObjects[color].g10.i20 = basicRgbObjects[color].g5.i5;
        basicRgbObjects[color].g10.i40 = basicRgbObjects[color].g5.i10;
        basicRgbObjects[color].g10.i60 = basicRgbObjects[color].g5.i15;
        basicRgbObjects[color].g10.i80 = basicRgbObjects[color].g5.i20;
        return (basicRgbObjects[color].g10);
    }

    // WORKING ON IT --- > GRESOLUTION
    /**
     * Determines spacing based on grid resolution
     * @param {number} gResolution 
     */
    function determineSpacing(gResolution) {
        let spacing = 3;
        if ( gResolution == 'low') {
            spacing = 1;
        } else if ( gResolution == 'medium') {
            spacing = 2;
        }
        return (spacing);
    }

    // WORKING ON IT --- > GRESOLUTION
    /**
     * Specifically alters individuals rgb triads according to color
     * @param {array} singleRgbArray 
     * @param {array} indexedChanges 
     */
    function specificAlteredRgb(singleRgbArray,color) {
        let newN = 0;
        let newRgbArray = [];
        for ( let i = 0; i < 3; i ++) {
            newN = singleRgbArray[i] + indexedChanges[color][i];
            newRgbArray.push(newN);
            newN = 0;
        }
        return (newRgbArray);
    }

    /**
     * Generates full basic values for 3x3, 5x5, or 10x10 grid
     * @param {string} color 
     * @param {number} gNumber 
     */
    function generatesFullColorG(color,gNumber) {
        let gArray;
        let limit_1 = gNumber;
        let limit_2 = gNumber;
        if ( gNumber == 3) {
            generatesBaseG3(color);
            gArray = [basicRgbObjects[color].g3.i0, basicRgbObjects[color].g3.i3, basicRgbObjects[color].g3.i6];
        } else if ( gNumber == 10 ) {
            limit_1 = gNumber / 2;
            limit_2 = gNumber * 2;
            generatesBaseG10(color);
            gArray = [basicRgbObjects[color].g10.i0, basicRgbObjects[color].g10.i20, basicRgbObjects[color].g10.i40, basicRgbObjects[color].g10.i60, basicRgbObjects[color].g10.i80];
        } else {
            gNumber == 5;
            gArray = [basicRgbObjects[color].g5.i0, basicRgbObjects[color].g5.i5, basicRgbObjects[color].g5.i10, basicRgbObjects[color].g5.i15, basicRgbObjects[color].g5.i20];
        }
        
        for (  let j = 0; j < limit_1; j ++) {
            for ( let i = 1; i < limit_2; i ++) { 
                gArray[j][i] = specificAlteredRgb(gArray[j][i-1],color);
            }
        } 
        return(gArray);
        // if ( gNumber == 3) {
        //     return(gArray);
        //     // return (basicRgbObjects[color].g3);
        // } else if ( gNumber == 10 ) {
        //     return (basicRgbObjects[color].g10);
        // } else {
        //     return (basicRgbObjects[color].g5);
        // }
    }

    /**
     * Gives rgb value to each circle in grid from values in array
     * @param {number} gNumber 
     * @param {array} colorArray 
     */
    function colorTheDots(gNumber,colorArray) {
        if ( gNumber == 10 ) {
            limit1 = gNumber / 2;
            limit2 = gNumber * 2;
        } else {
            limit1 = gNumber;
            limit2 = gNumber;
        }
        let count = 0;
        for ( let i = 0; i < limit1; i ++) {
            for (let j = 0; j < limit2; j ++) {
                let color = rgbTextGenerator(colorArray[i][j]);
                dots[count].style.backgroundColor = color;
                dots[count].textContent = color;
                count ++;
            }   
        }
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
        //Generates grid of circles
        generateGrid(gNumber);
        //Generates color values for given grid
        const colorArray = generatesFullColorG(color,gNumber);
        console.log(colorArray);
        //Colors the circles in grid
        colorTheDots(gNumber,colorArray);
        
    });
});

