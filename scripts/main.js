const range = document.querySelector('#range');
const rangeValue = document.querySelector('#range-value');
const output = document.querySelector('#strength');
const levels = document.querySelectorAll('.rate > span.percentage');
const inputs = document.querySelector('.inputs');
const arrInputs = inputs.querySelectorAll('input');
const button = document.querySelector('button.btn');
const password = document.querySelector('#pass');

// Об'єкт для зберігання повідомлень відповідно до сили
const strengthMessages = {
  1: 'too weak!',
  2: 'weak',
  3: 'medium',
  4: 'strong',
};

// Об'єкт для зберігання символів
const chars = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,<.>/?',
};

// slider range code
function updateRange() {
  let value = range.value;
  // розраховуємо відсотки для градієнту у слайдері
  let percent = ((value - range.min) / (range.max - range.min)) * 100;

  range.style.setProperty(
    'background',
    `linear-gradient(to right, var(--neon_green) ${percent}%, var(--black) ${percent}%`
  );

  rangeValue.textContent = value;
  updateStrength(value);
}

function updateStrength(value) {
  value = parseInt(value);

  // Скидаємо стиль для всіх рівнів
  levels.forEach((item) => {
    item.style.setProperty('background-color', '');
    item.style.setProperty('border-color', '');
  });

  let color, count;

  if (value <= 8) {
    (color = 'var(--red)'), (count = 1);
    output.textContent = strengthMessages[count];
  } else if (value > 8 && value <= 10) {
    (color = 'var(--orange)'), (count = 2);
    output.textContent = strengthMessages[count];
  } else if (value > 10 && value <= 12) {
    (color = 'var(--yellow)'), (count = 3);
    output.textContent = strengthMessages[count];
  } else {
    (color = 'var(--neon_green)'), (count = 4);
    output.textContent = strengthMessages[count];
  }

  Array.from(levels)
    .slice(0, count)
    .forEach((item) => {
      item.style.setProperty('background-color', color);
      item.style.setProperty('border-color', color);
    });
}

updateRange();

range.addEventListener('input', updateRange);
// end slider range code

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
    alert('Choose at least one type of character!');
    return;
  }
  let data = createData(selectedInputs);
  let passLength = range.value;
  let pass = generatePassword(data, passLength);
  password.textContent = pass;
});
