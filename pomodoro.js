const { exec } = require("child_process");
const notifier = require("node-notifier");

const workDuration = 5;
const breakDuration = 5 * 60;
const totalCycles = 3; // Number of cycles to complete

let completedCycles = 0;

const messages = {
  workStart: "Work complete! Take a break.",
  breakStart: "Break time over! Back to work.",
  allCyclesComplete: "All cycles completed! Timer stopped.",
};

function playAlertSound(alert) {
  exec(`aplay ${alert}`, (error, stdout, stderr) => {
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
  console.log(completedCycles,message);

  playAlertSound(
    totalCycles > completedCycles ? "alarm.wav" : "vintage-warning-alarm.wav"
  );

  sendNotification("Timer Notification", message);
}

function startTimer(duration, isWorking) {
  let timer = duration;
  const countdown = setInterval(() => {
    const minutes = parseInt(timer / 60, 10);
    const seconds = parseInt(timer % 60, 10);

    console.log(`${minutes}:${seconds}`);

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

console.log(
  `Cycle duration: ${workDuration / 60} minutes\nBreak duration: ${
    breakDuration / 60
  } minutes\nStarting program...`
);

startTimer(workDuration, true); // Start with a work period
