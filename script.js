
document.addEventListener('DOMContentLoaded', () => {
    const subheader = document.getElementById('subheading');
    const form = document.getElementById('inputInfo');
    const gNumberS = document.querySelectorAll('input[name="gNumber"]');
    const gResolutionS = document.querySelectorAll('input[name="gResolution"]');
    const colorS = document.querySelectorAll('input[name="color"]');
    const submit = document.getElementById('submit');
    const tryAgainB = document.getElementById('tryAgain');
    const showRgbB = document.getElementById('showRgb');
    const hideRgbB = document.getElementById('hideRgb');
    const show2B = document.getElementById('show2');
    const hide2B = document.getElementById('hide2');
    const show3B = document.getElementById('show3');
    const hide3B = document.getElementById('hide3');
    const palette = document.getElementById('palette');
    const grid = document.getElementById('grid');
    const grid2 = document.getElementById('grid2');
    const grid3 = document.getElementById('grid3');
    const rgbSection = document.getElementById('rgbSection');
    const rgbValues = document.getElementById('rgbValues');
    const rgbValues2 = document.getElementById('rgbValues2');
    const rgbValues3 = document.getElementById('rgbValues3');

    // Basic indexed RGB values for each color for the 5x5 grid (g5)
    let basicRgbObjects = {
        black: {
            g3: {}, g10: {},
            g5: {
                    i0: [[0,0,0]],
                    i5: [[50,50,50]],
                    i10: [[100,100,100]],
                    i15: [[150,150,150]],
                    i20: [[200,200,200]]
                }
        },
        brown: {
            g3: {}, g10 : {},
            g5: {
                i0: [[90,20,48]],
                i5:  [[113,66,53]],
                i10: [[160,84,56]],
                i15: [[140,54,56]],
                i20:  [[180,50,48]]
            }
        },
        blue: {
            g3: {}, g10: {},
            g5: {
                i0: [[26,0,175]],
                i5: [[16,0,175]],
                i10: [[6,0,175]],
                i15:[[0,0,190]],
                i20: [[0,100,190 ]]
            }
        },
        red: {
            g3: {}, g10:{}, 
            g5: {
                i0:  [[200,95,95]],
                i5: [[230,95,95]],
                i10: [[255,95,95]],
                i15: [[255,185,185]],
                i20:  [[230,185,185]]
            }
        },
        yellow: {
            g3: {}, g10: {},
            g5: {
                i0:  [[255,223,0]],
                i5: [[255,223,100]],
                i10:  [[255,244,40]],
                i15: [[254,250,40]], 
                i20: [[255,250,140]]
            }
        }
    }

    //Triad indexed value to change each rgb 
    const indexedChanges = {
        black: [1,1,1],
        brown: [1,0,0], 
        blue: [0,1,0],
        red: [0,-1,-1],
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
            displayElement(tryAgainB);
            displayElement(showRgbB);
            displayElement(show2B);
            displayElement(show3B);
        }
    };

    /**
     * Returns array with gResolution values not selected by user
     * @param {number} gResolution 
     */
    function otherResolutions(gResolution) {
        const allResolutions = ['low', 'medium', 'high'];
        for ( let i = 0; i < allResolutions.length; i ++) {
            if (allResolutions[i] == gResolution ) {
                allResolutions.splice(i,1);
            }
        }
        return(allResolutions);
    }

    /**
     * Generates gNumber*gNumber grid of dots
     * @param {number} gNumber 
     */
    function generateGrid(gNumber,grid) {
        for ( let i = 0; i < gNumber; i ++) {
            for ( let j = 0; j < gNumber; j ++) {
                grid.innerHTML+= `<div class='dot'></div>`;
            }
            // grid.innerHTML += '<br>';
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

    /**
     * Determines spacing based on grid resolution
     * @param {number} gResolution 
     */
    function determineSpacing(gResolution) {
        let spacing = 5;
        if ( gResolution == 'low') {
            spacing = 1;
        } else if ( gResolution == 'medium') {
            spacing = 3;
        }
        return (spacing);
    }

    /**
     * Determines triad resolution for resolution and color values
     * @param {number} gResolution 
     * @param {string} color 
     */
    function indexedResolution(gResolution,color) {
        let indexed = indexedChanges[color];
        let spacing = determineSpacing(gResolution);
        let spacedIndexed = [];
        for ( let i = 0; i < indexed.length; i ++) {
            spacedIndexed[i] = indexed[i] * spacing;
        }
        return (spacedIndexed);
    }

    /**
     * Specifically alters individuals rgb triads according to color and resolution
     * @param {array} singleRgbArray 
     * @param {array} indexedChanges 
     * @param {number} gResolution
     */
    function specificAlteredRgb(singleRgbArray,color,gResolution) {
        let newN = 0;
        let newRgbArray = [];
        let spacedIndexed = indexedResolution(gResolution,color)
        for ( let i = 0; i < 3; i ++) {
            newN = singleRgbArray[i] + spacedIndexed[i];
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
    function generatesFullColorG(color,gNumber,gResolution) {
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
                gArray[j][i] = specificAlteredRgb(gArray[j][i-1],color,gResolution);
            }
        } 
        return(gArray);
    }

    /**
     * Gives rgb value to each circle in grid from values in array
     * @param {number} gNumber 
     * @param {array} colorArray 
     * @param {DOM element} grid
     */
    function colorTheDots(gNumber,colorArray,grid) {
        if ( gNumber == 10 ) {
            limit1 = gNumber / 2;
            limit2 = gNumber * 2;
        } else {
            limit1 = gNumber;
            limit2 = gNumber;
        }
        let count = 0;
        let rgbValues = [];
        const gridElement = grid.querySelectorAll('div');
        for ( let i = 0; i < limit1; i ++) {
            for (let j = 0; j < limit2; j ++) {
                let color = rgbTextGenerator(colorArray[i][j]);
                gridElement[count].style.backgroundColor = color;
                // gridElement[count].textContent = color+","+count;
                rgbValues.push(color);
                count ++;
            }   
        }
        return(rgbValues);
    }

    /**
     * Displays rgbValues on DOM
     * @param {array} rgbValues 
     */
    function showRgbValues(rgbValues,rgbSection) {
        for ( let i = 0; i < rgbValues.length; i ++) {
            rgbSection.innerHTML+= `<div class='rgbValue'>${rgbValues[i]}</div>  `;
            }
    }

    /**
     * Upon click of button changes text of button and shows/displays content
     * @param {DOM element} sectionToHide 
     * @param {DOM element} buttonToHide 
     * @param {DOM element} sectionToShow 
     * @param {DOM element} buttonToShow 
     */
    function buttonChange(sectionToHide, buttonToHide, sectionToShow, buttonToShow) {
        buttonToHide.addEventListener('click', () => {
            if (sectionToHide == undefined) {
                displayElement(sectionToShow);
                hideElement(buttonToHide);
                displayElement(buttonToShow);  
            } else if (sectionToShow == undefined) {
                hideElement(sectionToHide);  
                hideElement(buttonToHide);
                displayElement(buttonToShow);  
            } else {
                hideElement(sectionToHide);  
                displayElement(sectionToShow);
                hideElement(buttonToHide);
                displayElement(buttonToShow);
            }           
        })
    };

    submit.addEventListener('click', () => {
        // Initializes variables with user's info selected from form
        const triadResult = {};
        const gNumber = getValue(gNumberS);
        const gResolution = getValue(gResolutionS);
        const color = getValue(colorS);
        triadResult.gNumber = gNumber;
        triadResult.gResolution = gResolution;
        triadResult.color = color;
    
        // Validates that all three fields of the form are filled
        validateInfo(triadResult);   
        
        //Generates grids for chosen resolution and the other two
        generateGrid(gNumber,grid);
        generateGrid(gNumber,grid2);
        generateGrid(gNumber,grid3);
        
        // Colors the dots in main and extra grid. Displays main grid.
        const colorArray = generatesFullColorG(color,gNumber,gResolution);
        const rgbVal = colorTheDots(gNumber,colorArray,grid);
        displayElement(grid);
        const otherRes = otherResolutions(gResolution);
        const colorArray2 = generatesFullColorG(color,gNumber,otherRes[0]);
        const rgbVal2 = colorTheDots(gNumber,colorArray2,grid2);
        
        // Generates first set of button text according to user grid resolution's choice
        show2B.textContent = `Show ${otherRes[0]} Resolution`;
        hide2B.textContent = `Hide ${otherRes[0]} Resolution`;
        
        // Colors last grid
        const colorArray3 = generatesFullColorG(color,gNumber,otherRes[1]);
        const rgbVal3 = colorTheDots(gNumber,colorArray3,grid3);

        // Generates last set of button text according to user's choice
        show3B.textContent = `Show ${otherRes[1]} Resolution`;
        hide3B.textContent = `Hide ${otherRes[1]} Resolution`;

        //Generates rgbValues for display
        showRgbValues(rgbVal,rgbValues);
        showRgbValues(rgbVal2,rgbValues2);
        showRgbValues(rgbVal3,rgbValues3);
        
        //Displays/hides buttons and sections according to user's selection
        buttonChange(undefined,showRgbB,rgbSection,hideRgbB);
        buttonChange(rgbSection,hideRgbB,undefined,showRgbB);
        buttonChange(undefined,show2B,grid2,hide2B);
        buttonChange(grid2,hide2B,undefined,show2B);
        buttonChange(undefined,show3B,grid3,hide3B);
        buttonChange(grid3,hide3B,undefined,show3B);

    });
});
