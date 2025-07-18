document.addEventListener('DOMContentLoaded', () => {
    // --- Mode Selector Elements ---
    const countdownModeBtn = document.getElementById('countdownModeBtn');
    const stopwatchModeBtn = document.getElementById('stopwatchModeBtn');
    const countdownPanel = document.getElementById('countdownPanel');
    const stopwatchPanel = document.getElementById('stopwatchPanel');

    // --- Countdown Timer Elements ---
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');
    const countdownDisplay = document.getElementById('countdownDisplay');
    const startCountdownBtn = document.getElementById('startCountdown');
    const pauseCountdownBtn = document.getElementById('pauseCountdown');
    const resetCountdownBtn = document.getElementById('resetCountdown');

    let countdownInterval;
    let totalSecondsRemaining = 0;
    let isCountdownRunning = false;

    // --- Stopwatch Elements ---
    const stopwatchDisplay = document.getElementById('stopwatchDisplay');
    const startStopwatchBtn = document.getElementById('startStopwatch');
    const pauseStopwatchBtn = document.getElementById('pauseStopwatch');
    const resetStopwatchBtn = document.getElementById('resetStopwatch');

    let stopwatchInterval;
    let stopwatchTime = 0;
    let isStopwatchRunning = false;

    // --- Helper Function to Format Time ---
    function formatTime(seconds) {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    // --- Mode Switching Logic ---
    function switchMode(mode) {
        if (mode === 'countdown') {
            countdownPanel.classList.add('active');
            stopwatchPanel.classList.remove('active');
            countdownModeBtn.classList.add('active');
            stopwatchModeBtn.classList.remove('active');
            // Pause any running stopwatch when switching
            if (isStopwatchRunning) {
                pauseStopwatch();
            }
        } else if (mode === 'stopwatch') {
            stopwatchPanel.classList.add('active');
            countdownPanel.classList.remove('active');
            stopwatchModeBtn.classList.add('active');
            countdownModeBtn.classList.remove('active');
            // Pause any running countdown when switching
            if (isCountdownRunning) {
                pauseCountdown();
            }
        }
    }

    countdownModeBtn.addEventListener('click', () => switchMode('countdown'));
    stopwatchModeBtn.addEventListener('click', () => switchMode('stopwatch'));

    // --- Countdown Timer Functions ---
    function updateCountdownDisplay() {
        countdownDisplay.textContent = formatTime(totalSecondsRemaining);
    }

    function startCountdown() {
        if (isCountdownRunning) return;

        // If starting for the first time or after reset, get input values
        if (totalSecondsRemaining === 0) {
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;
            totalSecondsRemaining = (hours * 3600) + (minutes * 60) + seconds;

            if (totalSecondsRemaining <= 0) {
                alert("Please enter a valid time for the countdown.");
                return;
            }
        }

        isCountdownRunning = true;
        hoursInput.disabled = true;
        minutesInput.disabled = true;
        secondsInput.disabled = true;

        countdownInterval = setInterval(() => {
            if (totalSecondsRemaining <= 0) {
                clearInterval(countdownInterval);
                isCountdownRunning = false;
                alert("Countdown Finished!");
                totalSecondsRemaining = 0; // Reset for next start
                updateCountdownDisplay();
                hoursInput.disabled = false;
                minutesInput.disabled = false;
                secondsInput.disabled = false;
                return;
            }
            totalSecondsRemaining--;
            updateCountdownDisplay();
        }, 1000);
    }

    function pauseCountdown() {
        clearInterval(countdownInterval);
        isCountdownRunning = false;
        hoursInput.disabled = false;
        minutesInput.disabled = false;
        secondsInput.disabled = false;
    }

    function resetCountdown() {
        pauseCountdown();
        totalSecondsRemaining = 0;
        hoursInput.value = '0';
        minutesInput.value = '0';
        secondsInput.value = '0';
        updateCountdownDisplay();
        hoursInput.disabled = false;
        minutesInput.disabled = false;
        secondsInput.disabled = false;
    }

    startCountdownBtn.addEventListener('click', startCountdown);
    pauseCountdownBtn.addEventListener('click', pauseCountdown);
    resetCountdownBtn.addEventListener('click', resetCountdown);

    // Initial display update for countdown
    updateCountdownDisplay();

    // --- Stopwatch Functions ---
    function updateStopwatchDisplay() {
        stopwatchDisplay.textContent = formatTime(stopwatchTime);
    }

    function startStopwatch() {
        if (isStopwatchRunning) return;
        isStopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatchDisplay();
        }, 1000);
    }

    function pauseStopwatch() {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
    }

    function resetStopwatch() {
        pauseStopwatch();
        stopwatchTime = 0;
        updateStopwatchDisplay();
    }

    startStopwatchBtn.addEventListener('click', startStopwatch);
    pauseStopwatchBtn.addEventListener('click', pauseStopwatch);
    resetStopwatchBtn.addEventListener('click', resetStopwatch);

    // Initial display update for stopwatch
    updateStopwatchDisplay();
});