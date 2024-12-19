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
  
  rangeValue.textContent = value;
}

updateRange();

range.addEventListener('input', updateRange);
// end slider range code
// 
// -----------
// 
const inputs = document.querySelector('.inputs');
const arrInputs = inputs.querySelectorAll('input');
const button = document.querySelector('button.btn');
const password = document.querySelector('#pass')

const chars = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,<.>/?',
};

// Збираємо вибрані інпути
function checkInput() {
  let checkInputs = [];
  arrInputs.forEach((input) => {
    if (input.checked) {
      checkInputs.push(input.name);
    }
  });
  return checkInputs;
}

// Робимо масив із усіма символами
function createData(selectedInputs) {
  let allData = [];
  selectedInputs.forEach((name) => {
    allData.push(...chars[name]);
  });
  return allData;
}

// Генеруємо пароль
function generatePassword(data, length = 10) {
  let pass = '';
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * data.length);
    pass += data[randomIndex];
  }
  return pass;
}

// Обробка кліка по кнопці
button.addEventListener('click', () => {
  let selectedInputs = checkInput();
  if (selectedInputs.length === 0) {
    alert('Оберіть хоча б один тип символів!');
    return;
  }
  let data = createData(selectedInputs);
  let passLength = range.value
  let pass = generatePassword(data, passLength);
  password.textContent = pass
});

