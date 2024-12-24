const range = document.querySelector('#range');
const rangeValue = document.querySelector('#range-value');
const output = document.querySelector('#strength');
const levels = document.querySelectorAll('.rate > span.percentage');
const inputs = document.querySelector('.inputs');
const arrInputs = inputs.querySelectorAll('input');
const button = document.querySelector('button.btn');
const password = document.querySelector('#pass');
const copyButton = document.querySelector('#copyButton');

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

// Код що стосується range-slider
function updateRange() {
  let value = range.value;
  // розраховуємо відсотки для градієнту у range-slider
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
// END Код що стосується range-slider

// Код що стосується роботи з паролями
// Збираємо обрані користувачем inputs
function getCheckedInputs() {
  return Array.from(arrInputs)
    .filter((input) => input.checked)
    .map((input) => input.name);
}

// Робимо масив із усіма символами
function makeCharacterPool(selectedInputs) {
  return selectedInputs.reduce((characterPool, selected) => {
    return characterPool.concat(...chars[selected]);
  }, []);
}

// Генеруємо пароль
function generatePassword(characterPool, length) {
  return Array.from({ length }).reduce((pass, _) => {
    return (
      pass + characterPool[Math.floor(Math.random() * characterPool.length)]
    );
  }, '');
}

// Показуємо повідомлення "Copied"
function showCopiedMessage(params) {
  let copyMessage = document.querySelector('#copyMessage');
  copyMessage.classList.add('visible');
  setTimeout(() => {
    copyMessage.classList.remove('visible');
  }, 2000);
}

// Копіювання пароля в буфер обміну
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(showCopiedMessage())
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
}

// Обробка кліка по кнопці створення пароля
button.addEventListener('click', () => {
  let selectedInputs = getCheckedInputs();

  if (selectedInputs.length === 0) {
    alert('Choose at least one type of character!');
    return;
  }

  let characterPool = makeCharacterPool(selectedInputs);
  let passLength = parseInt(range.value, 10);
  let newPassword = generatePassword(characterPool, passLength);
  password.textContent = newPassword;
});

// Обробка кліка по кнопці копіювання
copyButton.addEventListener('click', () => {
  let currentPassword = password.textContent.trim();
  if (currentPassword) {
    copyToClipboard(currentPassword);
  } else {
    alert('Generate a password first!');
  }
});
// END Код що стосується роботи з паролями