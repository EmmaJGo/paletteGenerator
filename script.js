
document.addEventListener('DOMContentLoaded', () => {
    const subheader = document.getElementById('subheading');
    const form = document.getElementById('inputInfo');
    const gNumberS = document.querySelectorAll('input[name="gNumber"]');
    const gResolutionS = document.querySelectorAll('input[name="gResolution"]');
    const colorS = document.querySelectorAll('input[name="color"]');
    const submit = document.getElementById('submit');
    const palette = document.getElementById('palette');
    const grid = document.getElementById('grid');

    // Basic indexed RGB values for each color for the 5x5 grid (g5)
    let basicRgbObjects = {
        black: {
            g3: {}, g10: {},
            g5: {
                    i0:  [[41,41,41]],
                    // i5:  [[54,54,54]], ORIGINAL
                    i5:  [[64,64,64]],
                    i10: [[189,189,189]],
                    // i15: [[221,221,221]], ORIGINAL
                    i15: [[214,214,214]],
                    // i20: [[238,238,238]]  ORIGINAL
                    i20: [[235,235,235]]
                }
        },
        brown: {
            g3: {}, g10 : {},
            g5: {
                i0:  [[84,50,48]], 
                i5:  [[103,66,53]],
                i10: [[124,84,56]],
                i15: [[148,103,58]],
                i20: [[169,125,57]]
            }
        },
        blue: {
            g3: {}, g10: {},
            g5: {
                i0:  [[0,85,255]],
                i5:  [[0,146,255]],
                i10: [[148,197,255]],
                i15: [[26,50,175]],
                i20: [[6,16,39]]
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
    
    /**
     * Generages initial values for g3 object for a given color
     * @param {object} colorObject 
     */
    function generatesBaseG3(colorObject) {
        colorObject.g3.i0 = colorObject.g5.i0;
        colorObject.g3.i3 = colorObject.g5.i10;
        colorObject.g3.i6 = colorObject.g5.i20;
        return (colorObject.g3);
    }
    
    /**
     * Generates initial values for g10 object for a given color
     * @param {object} colorObject 
     */
    function generatesBaseG10(colorObject) {
        colorObject.g10.i0 = colorObject.g5.i0;
        colorObject.g10.i20 = colorObject.g5.i5;
        colorObject.g10.i40 = colorObject.g5.i10;
        colorObject.g10.i60 = colorObject.g5.i15;
        colorObject.g10.i80 = colorObject.g5.i20;
        return (colorObject.g10);
    }

     /**
     * Generates new array for black by adding 1 to each in triad
     * @param {array} singleRgbArray 
     */
    function alteredBlackRgbArrayGen(singleRgbArray) {
        let newN = 0;
        let newRgbArray = [];
        let spacing = 1;
        
        for ( let i = 0; i < 3; i ++) {
            newN = singleRgbArray[i] + spacing;
            newRgbArray.push(newN);
            newN = 0;
        }
        return (newRgbArray);
    }

    // NEW WORKING ON
    function specificAlteredRgb(singleRbbArray,indexTriad,changesTriad) {

    }

    /**
     * Generates full basic rgb for 3x3, 5x5, or 10x10 black grid
     * @param {object} colorObject 
     * @param {number} gNumber 
     */
    function generatesFullBlackG (colorObject,gNumber) {
        let gArray;
        let limit_1 = gNumber;
        if ( gNumber == 3) {
            generatesBaseG3(colorObject);
            gArray = [colorObject.g3.i0, colorObject.g3.i3, colorObject.g3.i6];
        } else if ( gNumber == 10 ) {
            limit_1 = gNumber / 2;
            limit_2 = gNumber * 2;
            generatesBaseG10(colorObject);
            gArray = [colorObject.g10.i0, colorObject.g10.i20, colorObject.g10.i40, colorObject.g10.i60, colorObject.g10.i80];
        } else {
            gNumber == 5;
            gArray = [colorObject.g5.i0, colorObject.g5.i5, colorObject.g5.i10, colorObject.g5.i15, colorObject.g5.i20];
        }
        
        for (  let j = 0; j < limit_1; j ++) {
            for ( let i = 1; i < limit_2; i ++) { 
                gArray[j][i] = alteredBlackRgbArrayGen(gArray[j][i-1]);
            }
        } 

        if ( gNumber == 3) {
            return (colorObject.g3);
        } else if ( gNumber == 10 ) {
            return (colorObject.g10);
        } else {
            return (colorObject.g5);
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
        //Generates grid  
        generateGrid(gNumber);

        //Generates rgb for whole OBJECT of arrays
        // rgbTextArrayGenerator(basicRgbObjects.blue.g5)


        // BLACK READY
        // console.log(generatesFullBlackG(basicRgbObjects.black,gNumber));
        
    });
});

