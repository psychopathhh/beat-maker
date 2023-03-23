const FIRST_SYMBOL = 49;
const BOARD_SIZE = 9;
let TILE_SIZE = '6rem';
const COLORS = [
  'rgba(255, 117, 24,0.4)',
  'rgba(0, 255, 127,0.4)',
  'rgba(0, 191, 255,0.4)',
  'rgba(252,116,253,0.4)',
  'rgba(102,0,255,0.4)',
];
const TEXT_IN_TILES = [7, 8, 9, 4, 5, 6, 1, 2, 3];

const mediaQuery = window.matchMedia('(min-width:786px)');
if (mediaQuery.matches) {
  TILE_SIZE = '10rem';
}

const getRandomPalette = (COLORS) => {
  const indexOfColor = Math.floor(Math.random() * COLORS.length);
  const color = COLORS[indexOfColor];
  const modifiedColor = color.slice(0, -2) + '99)';
  return `${color}, ${modifiedColor}`;
};
const playTile = (dataKey, clicked = false) => {
  if (
    clicked ||
    (0 <= dataKey - FIRST_SYMBOL && dataKey - FIRST_SYMBOL < BOARD_SIZE)
  ) {
    const activeAudio = document.querySelector(`audio[data-key="${dataKey}"]`);
    if (!activeAudio.ended) {
      activeAudio.currentTime = 0;
    }
    activeAudio.play();
  }
  const activeTile = document.querySelector(`div[data-key="${dataKey}"]`);
  activeTile.classList.add('active');
  document.addEventListener('transitionend', () => {
    activeTile.classList.remove('active');
  });
};

const board = document.querySelector('.board');
board.style.gridTemplateColumns = `repeat(${Math.sqrt(
  BOARD_SIZE
)}, ${TILE_SIZE})`;

for (let i = 0; i < BOARD_SIZE; i++) {
  const tile = document.createElement('div');
  tile.classList.add('board-tile');
  tile.setAttribute('data-key', TEXT_IN_TILES[i] + FIRST_SYMBOL - 1);
  tile.style.backgroundImage = `linear-gradient(to bottom right, ${getRandomPalette(
    COLORS
  )})`;
  tile.style.width = TILE_SIZE;
  tile.style.height = TILE_SIZE;
  if (mediaQuery.matches) {
    tile.innerText = TEXT_IN_TILES[i];
  }

  const audioOfTile = document.createElement('audio');
  audioOfTile.setAttribute('data-key', TEXT_IN_TILES[i] + FIRST_SYMBOL - 1);
  audioOfTile.setAttribute('src', `./sounds/${TEXT_IN_TILES[i]}.wav`);
  board.append(tile, audioOfTile);
  tile.addEventListener('click', () => {
    playTile(tile.dataset.key, true);
  });
}

document.addEventListener('keydown', (e) => {
  playTile(e.keyCode);
});
