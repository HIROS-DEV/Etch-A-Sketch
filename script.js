//TODO: 1. create a webpage with 16 x 16 grid of square divs
// => create div using JavaScript (using createElement and add class name "container")
// => create another div using JavaScript(using createElement and add class name "grid")
// => attach the grid div inside the container div
// => using Css and create Grid in HTML file(I think flexbox or CSS Grid is suitable for job)
// => Perhaps, grid width and height should be decided in advance

//TODO: 2. create hover effect
// => I think mouse enter or mouse leave or mouse over event is useful (But, it needs google)
// => if mouse hover in grid, grid have to change color. So, background of the grid change

// TODO: 3. create Grid button
// => On page top, create button. When button click, popup shows and asking for the number of squares per side for the new grid.
// => Existing grid should reset (or removed) and create new grid
// => Grid number should be decided in advance (ex. max 100 x 100)

// TODO: Extra
// => Instead of just changing the color of a square from black to white (for example), have each pass through with the mouse change it to a completely random RGB value.

const containerDiv = document.createElement('div');
const gridDiv = document.createElement('div');
const body = document.querySelector('body');
const newGridBtn = document.querySelector('.new-grid');
const randomRGBBtn = document.querySelector('.random-color');
const defaultColorBtn = document.querySelector('.default-color');
const colorPicker = document.querySelector('.pick-color');

let backgroundColor = 'pink';
let numberOfSquares = 16;

function resetGrid() {
	for (let i = 1; i <= numberOfSquares * numberOfSquares; i++) {
		const removeItems = document.querySelector(`[data-key="${i}"]`);
		gridDiv.removeChild(removeItems);
	}
}

function setGrid() {
	resetGrid();

	numberOfSquares = prompt(
		'Please enter the number of squares per side. \nex. If you enter 16, 16 x 16 grid will create.',
		16
	);

	while (numberOfSquares > 100 || !numberOfSquares) {
		numberOfSquares = prompt(
			'Sorry, minimum number is 1 and maximum number is 100.\n Please enter the number again',
			16
		);
	}

	numberOfSquares = +numberOfSquares;

	createGrid();
}

function createDefaultGrid() {
	for (let i = 1; i <= numberOfSquares * numberOfSquares; i++) {
		const gridCell = document.createElement('div');
		gridDiv.style.cssText = `grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(16, 1fr);`;
		gridCell.classList.add(`grid-cell`);
		gridCell.dataset.key = i;
		gridDiv.appendChild(gridCell);
	}
}

function createGrid() {
	for (let i = 1; i <= numberOfSquares * numberOfSquares; i++) {
		const gridCell = document.createElement('div');
		gridDiv.style.cssText = `grid-template-columns: repeat(${numberOfSquares}, 1fr); grid-template-rows: repeat(${numberOfSquares}, 1fr);`;
		gridCell.classList.add(`grid-cell`);
		gridCell.dataset.key = i;
		gridDiv.appendChild(gridCell);
	}
}

function changeBackGroundColor(e) {
	let target = e.target;
	target.style.background = backgroundColor;
}

function setPickerColor(e) {
    backgroundColor = e.target.value;
}

function setRandomColor() {
	const randomBetween = (min, max) =>
		min + Math.floor(Math.random() * (max - min + 1));
	const r = randomBetween(0, 255);
	const g = randomBetween(0, 255);
	const b = randomBetween(0, 255);
	const rgb = `rgb(${r},${g},${b})`;
	backgroundColor = `${rgb}`;
}

function setDefaultColor() {
	backgroundColor = 'pink';
}

containerDiv.classList.add('container');
gridDiv.classList.add('grid');

body.appendChild(containerDiv);
containerDiv.appendChild(gridDiv);

newGridBtn.addEventListener('click', setGrid);
randomRGBBtn.addEventListener('click', setRandomColor);
defaultColorBtn.addEventListener('click', setDefaultColor);
colorPicker.addEventListener('input', setPickerColor);

gridDiv.addEventListener('mouseover', changeBackGroundColor);

createDefaultGrid();
