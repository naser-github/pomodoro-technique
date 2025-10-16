# 🍅 Pomodoro Timer

A command-line Pomodoro timer with desktop notifications and audio alerts. Stay focused with automated 25-minute work sessions and 5-minute breaks.

## Features

- ⏱️ Automatic work/break cycles (4 pomodoros by default)
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
const workDuration = 25 * 60;     // Work session (seconds)
const breakDuration = 5 * 60;     // Break duration (seconds)
const totalPomodoros = 4;         // Number of pomodoros
```

## Audio Files

Audio files are located in the `audio_files/` folder:
- `alarm.wav` - Regular cycle transitions
- `vintage-warning-alarm.wav` - All cycles complete

## Troubleshooting

**No sound?** Ensure `aplay` is installed (pre-installed on most Linux).

**No notifications?** Install `libnotify-bin` on Linux.

**Script won't run?** Make it executable: `chmod +x run_pomodoro.sh`

---

**Happy focusing! 🍅**
