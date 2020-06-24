// NEED TO WORK ON:
// 1.Function for xBtn generation and event listener for each

const buildIt = document.getElementById('buildIt');
const blackBtn = document.getElementById('black');
const brownBtn = document.getElementById('brown');
const blueBtn = document.getElementById('blue');
const redBtn = document.getElementById('red');
const yellowBtn = document.getElementById('yellow');
let color ='';


// Determining value for grid-number
let gridNumber = 10;


// Determining value for grid-resolution
let gridResolution = 'low';
// let gridResolution = 'medium';
// let gridResolution = 'high';


// Determining value for color by checking click of radial button

// Function to obtain color


// ??????? WHY THE NULL

// blackBtn.addEventListener('click', () => {
//     color = 'black';
//     console.log(color);
// })

// brownBtn.addEventListener('click', () => {
//     color = 'brown';
//     console.log(color);
// })
// blueBtn.addEventListener('click', () => {
//     color = 'blue';
//     console.log(color);
// })
// redBtn.addEventListener('click', () => {
//     color = 'red';
//     console.log(color);
// })
// yellowBtn.addEventListener('click', () => {
//     color = 'yellow';
//     console.log(color);
// })

// ------------------->>
// Grid Generation
// ------------------->>

const grid = document.getElementById('grid');
let count = 0;
for ( let i = 0; i < gridNumber; i ++) {
    for ( let i = 0; i < gridNumber; i ++) {
        grid.innerHTML += `<div class='dot' id='dot${count}'></div>`;
        count ++
    }
    grid.innerHTML += '<br>';
}
