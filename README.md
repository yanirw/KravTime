# KravTime - Professional Training Timer

A professional Krav Maga training timer app built with React. Features customizable rounds, work/rest intervals, audio cues, and mobile-optimized design.

## Features

- 🥊 Customizable training rounds (1-20)
- ⏱️ Adjustable work duration (30 seconds - 10 minutes)
- 😤 Configurable rest periods (30 seconds - 5 minutes)
- 🔔 Audio bell sounds for round transitions
- 📱 Mobile-first responsive design
- 🌙 Screen wake lock to prevent sleep during workouts
- 📳 Vibration feedback on mobile devices
- 🎯 Professional UFC/boxing-style interface

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

The app will automatically reload when you make changes to the code.

### Building for Production

To create a production build:

```bash
npm run build
```

This will create a `build` folder with optimized files ready for deployment.

## Usage

1. **Configure Your Workout:**
   - Set the number of rounds (1-20)
   - Adjust work duration (30 seconds to 10 minutes)
   - Set rest duration (30 seconds to 5 minutes)

2. **Start Training:**
   - Press the START button
   - Get ready during the 3-second countdown
   - Follow the audio and visual cues

3. **During Workout:**
   - Green screen = Work time (FIGHT!)
   - Orange screen = Rest time
   - Red screen = Paused
   - Audio bell signals round transitions
   - Triple claps warn of 10 seconds remaining

4. **Controls:**
   - Pause/Resume with the center button
   - Reset workout with the reset button
   - Return home with the back button

## Mobile Installation

This app works as a Progressive Web App (PWA):

1. Open the app in your mobile browser
2. Add to home screen when prompted
3. Launch from your home screen for a native app experience

## Technologies Used

- React 18
- Tailwind CSS
- Radix UI components
- Lucide React icons
- Web Audio API for sound generation
- Screen Wake Lock API for preventing sleep

## License

This project is open source and available under the MIT License. 