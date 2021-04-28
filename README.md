# Scratch Clone project

Features

1.	Drag and drop 
2.	Child nodes (chaining components)
3.	Sprite events for 'motion', 'looks', and 'events'
4.  Sprite click events	
5.	Flag click events
6.  Key press events
7.	Rearranging components
8.	Redux based state storage


Technologies used:

1.	ReactJS
2.	TailwindCSS
3.	Redux state management 
4.  JsDocs based documentation
5.	PrettierJS (for code styling and linting)
6.	Husky (for commit hooks)


## Getting Started

### Installation

Clone the repo:

```bash
git clone https://github.com/vedant1202/scratch-clone.git
cd scratch-clone
```

Install the dependencies:

```bash
yarn install
# OR
npm install
```

### Commands

Running locally:

```bash
yarn start
# OR
npm start
# Go to the browser at -  http://localhost:3000
```

Linting:

```bash

# run prettier
yarn prettier
# OR
npm run prettier

# fix prettier errors
yarn prettier:fix
# OR
npm run prettier:fix
```

## Code Documentation

Documentation has been generated and provided in `/docs`. Open `index.html` file from `/docs` directory in browser.

Alternatively, you can generate docs by the command
```bash

yarn doc
# OR
npm run doc
```

## Project Structure

```
docs\               # code documentation
public\             # static folder
src\                # SRC for react files
 |--components\     # Components directory
 |--redux\          # Redux directory
 |--styles\         # Styles CSS files
 |--App.js          # Main App
 |--index.js        # Entry point
 |--app.js          # Express app
 |--index.js        # App entry point
```
