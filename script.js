// --------------------------------------->>
// Getting 3 values from user input in form:
// GridNumber, GridResolution, Color
// --------------------------------------->>

// const submitBtn = document.getElementById('submit');

// submitBtn.onclick = () => {
//     const gridNumberOptions = document.querySelectorAll('.gridNumber');
//     let selectedGridNumber;
//     for(let x of gridNumberOptions) {
//         if (x.selected) {
//             selectedGridNumber = x.value;
//             console.log (selectedGridNumber);
//         }
//     }

//     const gridResolutionOptions = document.querySelectorAll('.gridResolution');
//     let selectedGridResolution;
//     for(let y of gridResolutionOptions) {
//         if (y.selected) {
//             selectedGridResolution = y.value;
//             console.log (selectedGridResolution);
//         }
//     }

//     const colorOptions = document.querySelectorAll('input[name="color"]');
//     let selectedColor;
//     for(let z of colorOptions) {
//         if (z.checked) {
//             selectedColor = z.value;
//             console.log (selectedColor);
//         }
//     }
    
//     // Validates that three fields of form are filled
//     if (selectedGridNumber == null || selectedGridResolution == null || selectedColor == null) 
//         {
//         alert('You have to make selections for the three fields! Try again! ');
//         }
//         else {
//             const buildItBtn = document.getElementById('buildIt');
//             buildItBtn.style.display = 'inline';
//             submitBtn.style.backgroundColor = 'lightgray';
//         }
    
// }

// ------------------->>
// Grid Generation
// ------------------->>

// IN PROGRESS

const gridNumber = 5;
const gridResolution = 'low';
const grid = document.getElementById('grid');
let count = 0;

for ( let i = 0; i < gridNumber; i ++) {
    for ( let j = 0; j < gridNumber; j ++) {
        grid.innerHTML+= `<div class='dot' id='dot${count}'>${count}</div>`;
        count ++;
    }
    grid.innerHTML += '<br>';
}

const gridElements = gridNumber * gridNumber;
const dots = grid.children;


// Converts an array of three numeric values to rgb notation for color
function rgbGenerator(array) {
    let rgb = 'rgb(';
    for ( let i = 0; i < array.length; i ++ ) {
        rgb += array[i] 
        if ( i !== array.length - 1 ) {
            rgb += ',';
        }
    }
    rgb += ')';
    return rgb;
}

// Generates array of rgb from array values for color
function rgbArray(arrayOfArrays, rgbArray) {
    for ( let i = 0; i < arrayOfArrays.length; i ++) {
        rgbArray.push(rgbGenerator(arrayOfArrays[i]));
    }
    return rgbArray;
}

// Colors each dot according to rgbArray
function colorTheDots(gridElements,dots,rgbArray) {
    for ( let i = 0; i < gridElements; i ++) {
        dots[i].style.backgroundColor = rgbArray[i];
        console.log(i);
    }
}

// https://www.color-hex.com/color-palette/93914
let black = {
    gn3: [[5,5,5], [41,41,41],[100,100,100]],
    gn5: [[41,41,41], [54,54,54], [189,189,189], [221,221,221], [238,238,238]],
    gn10: [],
    gn15: [],
    gn20: [],
    gn30: []
};

// https://www.color-hex.com/color-palette/84893
// let brown = {}

// https://www.color-hex.com/color-palette/94404
// let red = {}

// https://www.color-hex.com/color-palette/94557
// let blue = {}

// https://www.color-hex.com/color-palette/93707
// let yellow = {}

let blackrgb5 = [];
colorTheDots(gridElements,dots,rgbArray(black.gn5,blackrgb5));
console.log (blackrgb5);


