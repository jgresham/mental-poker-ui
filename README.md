# Texas Hold'em Poker Web App

A mobile-optimized Texas Hold'em Poker web application built with Next.js, TypeScript, and shadcn/ui components.

## Features

- Support for 2-10 players
- Mobile-optimized interface
- Visual representation of the poker table, cards, and players
- Game state management for poker rounds (preflop, flop, turn, river)
- Player actions: fold, check, call, raise
- Visual indicators for dealer, small blind, big blind, and all-in status
- Player avatars and chip counts

## Technologies Used

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Hooks for state management

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/texas-holdem-poker.git
cd texas-holdem-poker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Play

1. Start by selecting the number of players (2-10) and your position at the table.
2. The game will automatically deal cards and assign dealer, small blind, and big blind positions.
3. Players take turns clockwise around the table.
4. Available actions include:
   - Fold: Give up your hand and exit the current round
   - Check: Pass the action to the next player (only if no bet is required)
   - Call: Match the current bet
   - Raise: Increase the current bet
5. The game progresses through the standard poker stages: preflop, flop, turn, river, and showdown.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and shadcn/ui components
- Designed for mobile-first experience
