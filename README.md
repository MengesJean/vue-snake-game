# Vue Snake Game 🐍

A modern implementation of the classic Snake game built with Vue 3, TypeScript, and Tailwind CSS. Features a clean, responsive design with dark mode support and a persistent leaderboard.

## Features ✨

- 🎮 Classic Snake gameplay with modern controls
- 🌗 Dark/Light mode toggle
- 📊 Persistent leaderboard system
- 🎯 Multiple difficulty levels
- 📏 Adjustable board sizes
- 🎨 Modern, responsive UI with Tailwind CSS
- 💪 Built with TypeScript for type safety
- 🔄 Real-time score tracking

## Prerequisites 📋

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation 🚀

1. Clone the repository:
```bash
git clone <your-repo-url>
cd snake-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server (for leaderboard functionality):
```bash
npm run server
```

4. In a new terminal, start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## How to Play 🎮

1. Select your preferred board size and difficulty level
2. Click "Start Game" to begin
3. Use arrow keys to control the snake:
   - ⬆️ Up Arrow: Move up
   - ⬇️ Down Arrow: Move down
   - ⬅️ Left Arrow: Move left
   - ➡️ Right Arrow: Move right
4. Eat the red food to grow and score points
5. Avoid hitting the walls or the snake's own body
6. Try to achieve the highest score!

## Game Settings ⚙️

### Board Sizes:
- Small (10x10)
- Medium (20x20)
- Large (25x25)

### Difficulty Levels:
- Easy: Slower speed, normal scoring
- Medium: Moderate speed, 1.5x scoring
- Hard: Fast speed, 2x scoring
- Expert: Very fast speed, 3x scoring

## Technology Stack 🛠️

- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS
- Express.js (Backend)
- Vite (Build tool)

## Project Structure 📁

```
snake-game/
├── src/
│   ├── components/         # Vue components
│   ├── composables/        # Vue composables (game logic, dark mode)
│   ├── constants/          # Game constants
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry point
├── server.js              # Backend server for leaderboard
└── package.json           # Project dependencies
```

## Building for Production 🏗️

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.