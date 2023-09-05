const { setInterval, setTimeout } = require("timers");
const { exec } = require("child_process");

const cycles = 4; // Number of cycles
let currentCycle = 0;

function playAlarmSound(alarm) {
  exec("aplay " + alarm, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error playing alarm sound: ${error}`);
    }
  });
}

function startTimer(timer) {
  const countdown = setInterval(() => {
    const minutes = parseInt(timer / 60, 10);
    const seconds = parseInt(timer % 60, 10);

    console.log(`${minutes}:${seconds}`);

    if (--timer < 0) {
      clearInterval(countdown);

      if (currentCycle < cycles - 1) {
        console.log("Break!");
        playAlarmSound("alarm.wav");
        setTimeout(() => {
          currentCycle++;
          startTimer(cycleDuration);
        }, 1000);
      } else {
        playAlarmSound("vintage-warning-alarm.wav");
        console.log("Done!");
      }
    }
  }, 1000);
}

const cycleDuration = 25 * 60;
const breakDuration = 5 * 60;

console.log(
  `Cycle duration: ${cycleDuration}\nBreak duration: ${breakDuration}\nStarting program...`
);

startTimer(cycleDuration);
