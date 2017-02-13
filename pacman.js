// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;
var level = 1;
var fruit = Math.round(Math.random() * 240);
var fruitpoints = 0;
var fruitAppearance = 0;
var maxFruitPerLevel = 5;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};
var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};
var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};
var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};
var ghosts = [inky, blinky, pinky, clyde];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Level: ' + level + '      Score: ' + score + '     Lives:' + lives);
  console.log('\n\nPower-Pellets: ' + powerPellets);
  console.log('\n\nDots: ' + dots);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dots === fruit) {
    console.log('(f) Eat ' + showFruitName(level));
  }
  if (dots > 0) {
    console.log('(d) Eat Dot');
  }
  if (dots > 9) {
    console.log('(t) Eat 10 dots');
  }
  if (dots > 99) {
    console.log('(h) Eat 100 dots');
  }
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  console.log('(1) Eat Inky' + isEdible(inky));
  console.log('(2) Eat Blinky' + isEdible(blinky));
  console.log('(3) Eat Pinky' + isEdible(pinky));
  console.log('(4) Eat Clyde' + isEdible(clyde));
  console.log('(q) Quit');
  console.log('\n\n\n\n' + fruit);
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}
function isEdible(ghost){
  if (ghost.edible) {
    return ' (edible)';
  } else {
    return ' (inedible)';
  }
}

function levelup(){
  if (level > 255) {
    process.exit;
  }
  if (powerPellets < 1 && dots < 1) {
    level++;
    dots = 240;
    powerPellets = 4;
    ghosts.forEach(function(ghost){
      ghost.edible = false;
    });
    fruitAppearance = 0;
    fruit = Math.round(Math.random() * 240);
  }
}

function showFruitName(level){
  switch (level) {
    case 1:
      fruitpoints = 100;
      return 'Cherry';
      break;
    case 2:
      fruitpoints = 300;
      return 'Strawberry';
      break;
    case 3:
      fruitpoints = 500;
      return 'Orange';
      break;
    case 4:
      fruitpoints = 500;
      return 'Orange';
      break;
    case 5:
      fruitpoints = 700;
      return 'Apple';
      break;
    case 6:
      fruitpoints = 700;
      return 'Apple';
      break;
    case 7:
      fruitpoints = 1000;
      return 'Pineapple';
      break;
    case 8:
      fruitpoints = 1000;
      return 'Pineapple';
      break;
    case 9:
      fruitpoints = 2000;
      return 'Galaxian Spaceship';
      break;
    case 10:
      fruitpoints = 2000;
      return 'Galaxian Spaceship';
      break;
    case 11:
      fruitpoints = 3000;
      return 'Bell';
      break;
    case 12:
      fruitpoints = 3000;
      return 'Bell';
      break;

    default:
      fruitpoints = 5000;
      return 'Key';
  }
}

function eatFruit(){
  score += fruitpoints
  fruitAppearance++;

  if (fruitAppearance >= maxFruitPerLevel) {
    fruit = Math.round(Math.random() * 240);
  }else {
    fruit = Math.round(Math.random() * dots);
  }
}

// Menu Options
function eatDot(number) {
  console.log('\nChomp!');
  score += number * 10;
  dots-= number;
  levelup();
}
function eatGhost(ghost){
  if (ghost.edible) {
    var eatable = 4
    ghosts.forEach(function(ghosty){
      if (ghosty.edible) {
        eatable --;
      }
    });
    score += 200 * Math.pow(2, eatable);
    ghost.edible = false;
    console.log('\nPac-Man has eaten ' + ghost.name + ', who was ' + ghost.character + '.');
  }else {
    lives--;
    console.log('\nPac-Man has eaten a ghost!');
    lifecheck(lives);

  }
}

function eatPowerPellet(){
  score += 50;
  powerPellets -= 1;
  ghosts.forEach(function(ghost){
    ghost.edible = true;
  });
  levelup();
}

function lifecheck(lives){
  if (lives < 0) {
    setTimeout(process.exit, 100);
  }else {

  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'f':
      if (dots === fruit) {
        eatFruit();
      } else {
        console.log('\nNo bonus for you Pac-Man.');
      }
      break;
    case 'd':
      if (dots > 0) {
        eatDot(1);
      } else {
        console.log('\nNot enough dots left Pac-Man.');
      }
      break;
    case 't':
      if (dots > 9) {
        eatDot(10);
      } else {
        console.log('\nNot enough dots left Pac-Man.');
      }
      break;
    case 'h':
      if (dots > 99) {
        eatDot(100);
      } else {
        console.log('\nNot enough dots left Pac-Man.');
      }
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
      }else {
        console.log("\nYou've eaten it all up Pac-Man.");
      }
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
