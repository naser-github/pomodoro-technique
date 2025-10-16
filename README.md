# 🍅 Pomodoro Timer

A command-line Pomodoro timer with desktop notifications and audio alerts. Stay focused with automated 25-minute work sessions and 5-minute breaks.

## What is Pomodoro?

The Pomodoro Technique is a time management method using timed intervals (traditionally 25 minutes) separated by short breaks. Work with focus, avoid distractions, and track your progress.

## Features

- ⏱️ Automatic work/break cycles (3 cycles by default)
- 🔔 Desktop notifications
- 🔊 Audio alerts
- ⚙️ Customizable durations

## Quick Start

```bash
npm install
./run_pomodoro.sh
```

Or run directly:

```bash
node pomodoro.js
```

## Configuration

Edit `pomodoro.js` to customize:

```javascript
const workDuration = 25 * 60;  // Work session (seconds)
const breakDuration = 5 * 60;   // Break duration (seconds)
const totalCycles = 3;          // Number of cycles
```

## Audio Files

- `alarm.wav` - Regular cycle transitions
- `vintage-warning-alarm.wav` - All cycles complete

Replace with your own WAV files if desired.

## Troubleshooting

**No sound?** Ensure `aplay` is installed (pre-installed on most Linux).

**No notifications?** Install `libnotify-bin` on Linux.

## 📄 License

