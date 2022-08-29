class Dom {
  // Coordinates of touch positions used for swipe controls
  static touch = {
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
  };
  static rows = document.querySelectorAll('.row');
  static bestScore = document.querySelector('.best-score');
  static score = document.querySelector('.score');
  static message = document.querySelector('.message');

  // updates game board, changing locations, values and colors of nodes
  static updateBoard() {
    Dom.rows.forEach((row) => {
      Array(...row.children).forEach((parent) => {
        let div = parent.children[0];
        div.textContent = '';
        div.style.backgroundColor = 'rgba(0,0,0,0)';
        div.style.transition = 'transform 0s';
        div.style.transform = 'none';
        div.classList = [];
      });
    });
    game.tiles.forEach((tile) => {
      let backgroundColor, fontColor, div;
      if (tile.value == 2) backgroundColor = '#eee4da';
      else if (tile.value == 4) backgroundColor = '#ede0c8';
      else if (tile.value == 8) backgroundColor = '#f2b179';
      else if (tile.value == 16) backgroundColor = '#f59563';
      else if (tile.value == 32) backgroundColor = '#f67c5f';
      else if (tile.value == 64) backgroundColor = '#f65e09';
      else if (tile.value == 128) backgroundColor = '#edcf72';
      else if (tile.value == 256) backgroundColor = '#edcc61';
      else if (tile.value == 512) backgroundColor = '#edc850';
      else if (tile.value == 1024) backgroundColor = '#edc53f';
      else backgroundColor = '#edc22e';
      tile.value >= 8 ? (fontColor = '#f9f6f2') : (fontColor = '#776e65');
      div = Dom.rows[tile.pos.y].children[tile.pos.x].children[0];
      div.style.color = fontColor;
      div.style.backgroundColor = backgroundColor;
      div.textContent = tile.value;
    });
    Dom.updateMeta();
  }

  // update meta-data such as score and best score on top of the screen
  static updateMeta() {
    Dom.score.textContent = game.score;
    Dom.bestScore.textContent = game.bestScore;
    if (game.running) {
      Dom.message.textContent = 'Use arrows or WSAD to play!';
    } else {
      Dom.message.textContent = 'Game Over! Make a move to restart!';
    }
  }

  // updates everything on screen
  static update() {
    Dom.updateBoard();
    Dom.updateMeta();
  }

  // move node on screen
  static moveTile(fromWhere, toWhere) {
    let delta = { x: toWhere.x - fromWhere.x, y: toWhere.y - fromWhere.y };
    let div = Dom.rows[fromWhere.y].children[fromWhere.x].children[0];
    div.style.transform = `translate(calc(var(--tile-size) * ${
      delta.x || 0
    } + var(--border-width) * ${delta.x || 0}), calc(var(--tile-size) * ${
      delta.y || 0
    } + var(--border-width) * ${delta.y || 0}))`;
  }

  static applyEventListeners() {
    document.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode == 37 || keyCode == 65) game.move('left');
      if (keyCode == 38 || keyCode == 87) game.move('up');
      if (keyCode == 40 || keyCode == 83) game.move('down');
      if (keyCode == 39 || keyCode == 68) game.move('right');
    });
    document.addEventListener('touchmove', (e) => e.preventDefault());
    document.addEventListener('touchstart', (e) => {
      Dom.touch.start = {
        x: e.changedTouches[0].screenX,
        y: e.changedTouches[0].screenY,
      };
    });
    document.addEventListener('touchend', (e) => {
      Dom.touch.end = {
        x: e.changedTouches[0].screenX,
        y: e.changedTouches[0].screenY,
      };
      Dom.handleTouch();
    });
  }

  // determine direction of last swipe and move tiles accordingly
  static handleTouch() {
    let angle =
      (Math.atan2(
        Dom.touch.end.y - Dom.touch.start.y,
        Dom.touch.end.x - Dom.touch.start.x
      ) *
        180) /
      Math.PI;
    if (angle >= -45 && angle < 45) game.move('right');
    else if (angle >= 45 && angle < 135) game.move('down');
    else if (angle >= 135 || angle < -135) game.move('left');
    else if (angle >= -135 && angle < -45) game.move('up');
  }

  // add transitons to every node on board
  static addTransitions() {
    Dom.rows.forEach((row) => {
      Array(...row.children).forEach((parent) => {
        parent.children[0].style.transition = 'transform .5s';
      });
    });
  }
}
