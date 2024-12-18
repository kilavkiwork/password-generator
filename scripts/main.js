// slider range code
const range = document.querySelector('#range');
const rangeValue = document.querySelector('#range-value');

function updateRange() {
  let value = range.value;
  // розраховуємо відсотки для градієнту у слайдері
  let percent = ((value - range.min) / (range.max - range.min)) * 100;
  
  range.style.setProperty(
    'background',
    `linear-gradient(to right, var(--neon_green) ${percent}%, var(--black) ${percent}%`
  );
  
  rangeValue.textContent = value
}

updateRange();

range.addEventListener('input', updateRange)
// end slider range code

// check inputs
const inputs = document.querySelector('.inputs');
const arrInputs = inputs.querySelectorAll('input');
console.log(arrInputs);

const uppercase = {
  start: 65,
  length: 26,
}
const lowercase = {
  start: 97,
  length: 26,
}

const objs = [uppercase, lowercase]


function checkInput() {
  let checkInputs = []
  arrInputs.forEach((input) => {
    if(input.checked) {
      checkInputs.push(input.name) 
    }
  })
  return checkInputs
  console.log(checkInputs);
}
// checkInput()
// inputs.addEventListener('input', checkInput)

function createMainArr() {
  let a = checkInput()
  console.log(a);
  
}

function createSymbols(length, start) {
  return Array.from({ length: length }, (_, i) => {
    return String.fromCharCode(start + i);
  });
}

const button = document.querySelector('button.btn');
console.log(button);
button.addEventListener('click', () => {
  // checkInput()
  createMainArr()
})