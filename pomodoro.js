const {exec} = require("child_process");
const notifier = require("node-notifier");

const workDuration = 25 * 60;
const breakDuration = 5 * 60;
const totalCycles = 3; // Number of cycles to complete

let completedCycles = 0;

const messages = {
    workStart: "Work complete! Take a break.",
    breakStart: "Break time over! Back to work.",
    allCyclesComplete: "All cycles completed! Timer stopped.",
};

function playAlertSound(alert) {
    exec(`aplay ${alert}`, (error) => {
        if (error) {
            console.error(`Error playing alert sound: ${error}`);
        }
    });
}

function sendNotification(title, message) {
    notifier.notify({
        title: title,
        message: message,
    });
}

function logMessage(message) {
    console.clear();
    console.log(completedCycles, message);

    playAlertSound(
        totalCycles > completedCycles ? "audio_files/alarm.wav" : "audio_files/vintage-warning-alarm.wav"
    );

    sendNotification("Timer Notification", message);
}

function startTimer(duration, isWorking) {
    let timer = duration;

    const countdown = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        // Only log when seconds are at 00 (full minutes) or at start
        if (seconds === 0 || timer === duration) {
            console.log(`Time Remaining - ${minutes}:${seconds.toString().padStart(2, '0')}\n`);
        }

        if (--timer < 0) {
            clearInterval(countdown);

            if (isWorking) {
                logMessage(messages.workStart);
                startTimer(breakDuration, false);
            } else {
                if (completedCycles < totalCycles) {
                    logMessage(messages.breakStart);
                    completedCycles++;
                    startTimer(workDuration, true);
                } else {
                    logMessage(messages.allCyclesComplete);
                }
            }
        }
    }, 1000);
}

console.log(`
Cycle duration: ${workDuration / 60} minutes\n
Break duration: ${breakDuration / 60} minutes\n
Program has been initiated...
`);

startTimer(workDuration, true); // Start with a work period
