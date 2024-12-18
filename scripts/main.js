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
