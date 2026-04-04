function checkAnswer(correctAnswer, nextPage) {
  const userAnswer = document.getElementById('answer').value.toLowerCase();
  const message = document.getElementById('message');

  if (userAnswer === correctAnswer) {
    window.location.href = nextPage;
  } else {
    message.textContent = "Wrong answer! Try again.";
  }
}

// Eye animation system
const totalFrames = 10;

function createEye() {
  const eye = document.createElement('img');
  eye.classList.add('eye');

  // random position
  eye.style.left = Math.random() * 90 + 'vw';
  eye.style.top = Math.random() * 90 + 'vh';

  document.body.appendChild(eye);

  let frame = 1;
  let direction = 1;
  let holdCounter = 0;

  const interval = setInterval(() => {
    eye.src = `EyeFrames/EyeFrame${frame}.png`;

    // Hold at frame 10
    if (frame === totalFrames && holdCounter < 5) {
      holdCounter++;
      return;
    }

    frame += direction;

    if (frame >= totalFrames) {
      frame = totalFrames;
      direction = -1;
    }

    if (frame <= 1) {
      frame = 1;
      direction = 1;
    }
  }, 80);

  // remove after animation
  setTimeout(() => {
    clearInterval(interval);
    eye.remove();
  }, 2000);
}

// spawn randomly
setInterval(() => {
  if (Math.random() < 0.5) {
    createEye();
  }
}, 1500);