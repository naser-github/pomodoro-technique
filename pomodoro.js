const {exec} = require("child_process");
const notifier = require("node-notifier");
const path = require("path");

const workDuration = 25 * 60;
const breakDuration = 5 * 60;
const totalPomodoros = 4; // Traditional Pomodoro Technique uses 4 pomodoros

let completedPomodoros = 0;

const messages = {
    workStart: "Work complete! Take a break.",
    breakStart: "Break time over! Back to work.",
    allCyclesComplete: "All cycles completed! Timer stopped.",
};

function playAlertSound(alert) {
    const audioPath = path.join(__dirname, alert);
    exec(`aplay "${audioPath}"`, (error) => {
        if (error) {
            console.error(`Error playing alert sound: ${error.message}`);
        }
    });
}

function sendNotification(title, message) {
    notifier.notify({
        title,
        message,
        sound: true,
        wait: false,
    });
}

function formatTime(minutes, seconds) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function logMessage(message) {
    console.clear();
    console.log(`\n🍅 Pomodoro Timer - Cycle ${completedPomodoros}/${totalPomodoros}`);
    console.log(`\n${message}\n`);

    const alertSound = totalPomodoros > completedPomodoros
        ? "audio_files/alarm.wav"
        : "audio_files/vintage-warning-alarm.wav";

    playAlertSound(alertSound);
    sendNotification("Pomodoro Timer", message);
}

function startTimer(duration, isWorking) {
    let timer = duration;
    const timerType = isWorking ? "⏰ WORK SESSION" : "☕ BREAK TIME";

    const countdown = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        // Only log when seconds are at 00 (full minutes) or at start
        if (seconds === 0 || timer === duration) {
            console.clear();
            console.log(`\n🍅 Pomodoro Timer - Cycle ${completedPomodoros + (isWorking ? 1 : 0)}/${totalPomodoros}`);
            console.log(`${timerType}`);
            console.log(`Time Remaining: ${formatTime(minutes, seconds)}\n`);
        }

        if (--timer < 0) {
            clearInterval(countdown);

            if (isWorking) {
                logMessage(messages.workStart);
                startTimer(breakDuration, false);
            } else {
                completedPomodoros++;
                if (completedPomodoros < totalPomodoros) {
                    logMessage(messages.breakStart);
                    startTimer(workDuration, true);
                } else {
                    logMessage(messages.allCyclesComplete);
                }
            }
        }
    }, 1000);
}

console.clear();
console.log("\n🍅 Pomodoro Timer Starting...\n");
console.log(`Work Duration: ${workDuration / 60} minutes`);
console.log(`Break Duration: ${breakDuration / 60} minutes`);
console.log(`Total Cycles: ${totalPomodoros}`);
console.log(`\nStarting in 2 seconds...\n`);

setTimeout(() => {
    startTimer(workDuration, true);
}, 2000);
