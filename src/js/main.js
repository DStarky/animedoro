// ================== ПЕРЕМЕННЫЕ ==================

let timerInterval;
const secondsPerMinutes = 60;
const goalMinutes = 40; // По умолчанию таймер на 40 минут, но закладываю возможность изменения в будущем
let goalSeconds;

const goalExtra = 20;
let extraSeconds;

let currentValuePercent = 0;
let progressBarProgress;

let minutes = 39;
let seconds = 53;
let allSeconds;

const redColor = '#ee796e';
const greenColor = '#4d945b';


// ================== НОДЫ ==================

const timerFull = document.querySelector('.timer__full') // white circle
const timerProgress = document.querySelector('.timer__progress') // red circle
const timerExtra = document.querySelector('.timer__extra') // green circle
const playButton = document.querySelector('.btn__play'); // play
const minutesNode = document.querySelector('.time__minutes'); // minutes on screen
const secondsNode = document.querySelector('.time__seconds'); // seconds on screen
const time = document.querySelector('.time');

const fullProgressValue = parseInt(timerFull.getAttribute('stroke-dasharray')); // 100% fir ProgressBar

// ================== ТАЙМЕР ==================

playButton.addEventListener('click', startTimer); // Запускаем таймер нажатием на кнопку Play

function startTimer() {
  playButton.style.display = 'none';
  time.style.display = 'block';

  goalSeconds = goalMinutes * secondsPerMinutes;

  updateTimerDisplay();
  updateProgressBar();


  function updateTimer() {
    if (seconds < 59) {
      seconds += 1;
    } else {
      seconds = 0;
      minutes += 1;
    }
    if (minutes === 40) {
      startExtraTimer();
    }
    updateProgressBar();
    updateTimerDisplay()
  }
  timerInterval = setInterval(updateTimer, 1000);

}

// ================== ОБНОВЛЯЕМ ВРЕМЯ НА СТРАНИЦЕ ==================

function updateTimerDisplay() {
  minutesNode.innerHTML = String(minutes).padStart(2, '0');
  secondsNode.innerHTML = String(seconds).padStart(2, '0');
  document.title = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
}

function updateProgressBar() {
  allSeconds = (minutes * 60) + seconds;
  currentValuePercent = ((allSeconds / goalSeconds) * 100).toFixed();
  progressBarProgress = (fullProgressValue - (fullProgressValue * (currentValuePercent / 100))).toFixed();
  timerProgress.setAttribute('stroke-dashoffset', progressBarProgress + 'px');
}

function updateProgressExtra() {
  extraSeconds = ((minutes * 60) + seconds) - (goalMinutes * secondsPerMinutes);
  goalSeconds = goalExtra * secondsPerMinutes;
  currentValuePercent = ((extraSeconds / goalSeconds) * 100).toFixed();
  progressBarProgress = (fullProgressValue - (fullProgressValue * (currentValuePercent / 100))).toFixed();
  timerExtra.setAttribute('stroke-dashoffset', progressBarProgress + 'px');
}

// ================== ДОПОЛНИТЕЛЬНОЕ ВРЕМЯ ==================

function startExtraTimer() {
  clearInterval(timerInterval);
  timerExtra.style.display = 'block';

  goalSeconds = goalExtra * secondsPerMinutes;

  function updateTimerExtra() {
    if (seconds < 59) {
      seconds += 1;
    } else {
      seconds = 0;
      minutes += 1;
    }
    if (minutes === 41) {
      stopTimer();
    }

    updateProgressExtra()
    updateTimerDisplay();
  }
  timerInterval = setInterval(updateTimerExtra, 1000);
}

// ================== ОСТАНОВИТЬ ВРЕМЯ ==================

function stopTimer() {
  playButton.style.display = 'block';
  time.style.display = 'none';
  seconds = 0;
  minutes = 0;
  clearInterval(timerInterval);
}