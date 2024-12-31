document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
    const targetDate = new Date('january 1, 2025 00:00:00').getTime();
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
  
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      daysSpan.textContent = days;
      hoursSpan.textContent = hours;
      minutesSpan.textContent = minutes;
      secondsSpan.textContent = seconds;
  
      if (distance < 0) {
        clearInterval(countdownInterval);
        daysSpan.textContent = '0';
        hoursSpan.textContent = '0';
        minutesSpan.textContent = '0';
        secondsSpan.textContent = '0';
        startConfetti();
      }
    }
  
    const countdownInterval = setInterval(updateCountdown, 1000);
  
    // Confetti Animation
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const confettiElements = [];
    const colors = ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1bd', '#f9bec7'];
  
    function createConfetti() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height - canvas.height;
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speed = Math.random() * 3 + 2;
      confettiElements.push({ x, y, size, color, speed });
    }
  
    function updateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiElements.forEach((confetti, index) => {
        confetti.y += confetti.speed;
        if (confetti.y > canvas.height) {
          confettiElements.splice(index, 1);
        }
        ctx.beginPath();
        ctx.arc(confetti.x, confetti.y, confetti.size, 0, Math.PI * 2);
        ctx.fillStyle = confetti.color;
        ctx.fill();
      });
    }
  
    function startConfetti() {
      setInterval(createConfetti, 100);
      setInterval(updateConfetti, 1000 / 60);
    }
  });
  