class Game {
  constructor() {
    this.restart();
  }
  // restart the game
  restart() {
    this.moveAvailable = true;
    this.running = true;
    this.tiles = [];
    this.score = 0;
    this.bestScore = LocalStorage.getBestScore();
    this.addTile();
    this.addTile();
    setTimeout(() => {
      Dom.update();
      Dom.addTransitions();
    }, 0);
  }
  // end the game
  end() {
    this.running = false;
    Dom.update();
  }
  // checks if game is lost
  isLost() {
    // game is lost if there's no horizontal nor vertical move avaliable
    if (this.tiles.length == 16) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          // if there's any vertical combination move
          if (
            this.findTile({ x: i, y: j }).value ==
            this.findTile({ x: i, y: j + 1 }).value
          )
            return false;
          // if there's any horizontal combination move
          if (
            this.findTile({ x: j, y: i }).value ==
            this.findTile({ x: j + 1, y: i }).value
          )
            return false;
        }
      }
      return true;
    }
    return false;
  }
  // move all tiles to left side of a board
  moveLeft() {
    let anymoveAvailable = false;
    for (let i = 0; i < 4; i++) {
      let tiles = [],
        tasks = [];
      for (let j = 0; j < 4; j++) {
        tiles.push(this.findTile({ x: j, y: i }));
      }
      tiles = tiles.filter((tile) => tile); // remove empty spaces
      tiles.forEach((tile) => {
        tasks.push({
          tile: tile,
          merge:
            (tasks.length ? tasks[tasks.length - 1].tile.value : null) ==
              tile.value &&
            !(tasks.length ? tasks[tasks.length - 1].merge : null),
          // position is based on number of previously moved non merging tiles, however if tile is merging it should be moved by one more tile
          newPosition: {
            x:
              tasks.filter((task) => !task.merge).length -
              Number(
                (tasks.length ? tasks[tasks.length - 1].tile.value : null) ==
                  tile.value &&
                  !(tasks.length ? tasks[tasks.length - 1].merge : null)
              ),
            y: i,
          },
        });
      });
      tasks
        .filter((task) => task.merge)
        .forEach((task) => {
          task.tile.value *= 2;
          this.score += task.tile.value;
        });
      if (
        tasks.filter(
          (task) => !this.comparePositions(task.tile.pos, task.newPosition)
        ).length
      )
        anymoveAvailable = true;
      tasks.forEach((task) => {
        Dom.moveTile(task.tile.pos, task.newPosition);
        task.tile.pos = task.newPosition;
      });
    }
    if (anymoveAvailable) this.animationTimeout();
  }
  // move all tiles to upper part of a board
  moveUp() {
    let anymoveAvailable = false;
    for (let i = 0; i < 4; i++) {
      let tiles = [],
        tasks = [];
      for (let j = 0; j < 4; j++) {
        tiles.push(this.findTile({ y: j, x: i }));
      }
      tiles = tiles.filter((tile) => tile); // remove empty spaces
      tiles.forEach((tile) => {
        tasks.push({
          tile: tile,
          merge:
            (tasks.length ? tasks[tasks.length - 1].tile.value : null) ==
              tile.value &&
            !(tasks.length ? tasks[tasks.length - 1].merge : null),
          // position is based on number of previously moved non merging tiles, however if tile is merging it should be moved by one more tile
          newPosition: {
            y:
              tasks.filter((task) => !task.merge).length -
              Number(
                (tasks.length ? tasks[tasks.length - 1].tile.value : null) ==
                  tile.value &&
                  !(tasks.length ? tasks[tasks.length - 1].merge : null)
              ),
            x: i,
          },
        });
      });
      tasks
        .filter((task) => task.merge)
        .forEach((task) => {
          task.tile.value *= 2;
          this.score += task.tile.value;
        });
      if (
        tasks.filter(
          (task) => !this.comparePositions(task.tile.pos, task.newPosition)
        ).length
      )
        anymoveAvailable = true;
      tasks.forEach((task) => {
        Dom.moveTile(task.tile.pos, task.newPosition);
        task.tile.pos = task.newPosition;
      });
    }
    if (anymoveAvailable) this.animationTimeout();
  }
  // move all tiles to right side of a board
  moveRight() {
    let anymoveAvailable = false;
    for (let i = 0; i < 4; i++) {
      let tiles = [],
        tasks = [];
      for (let j = 3; j >= 0; j--) {
        tiles.push(this.findTile({ x: j, y: i }));
      }
      tiles = tiles.filter((tile) => tile); // remove empty spaces
      tiles.forEach((tile) => {
        tasks.push({
          tile: tile,
          merge:
            (tasks.length ? tasks[tasks.length - 1].tile.value : null) ==
              tile.value &&
            !(tasks.length ? tasks[tasks.length - 1].merge : null),
          // position is based on number of previously moved non merging tiles, however if tile is merging it should be moved by one more tile
          newPosition: {
            x:
              3 -
              (tasks.filter((task) => !task.merge).length -
                Number(
                  (tasks.length ? tasks[tasks.length - 1].tile.value : null) ==
                    tile.value &&
                    !(tasks.length ? tasks[tasks.length - 1].merge : null)
                )),
            y: i,
          },
        });
      });
      tasks
        .filter((task) => task.merge)
        .forEach((task) => {
          task.tile.value *= 2;
          this.score += task.tile.value;
        });
      if (
        tasks.filter(
          (task) => !this.comparePositions(task.tile.pos, task.newPosition)
        ).length
      )
        anymoveAvailable = true;
      tasks.forEach((task) => {
        Dom.moveTile(task.tile.pos, task.newPosition);
        task.tile.pos = task.newPosition;
      });
    }
    if (anymoveAvailable) this.animationTimeout();
  }
  // move all tiles to bottom part of a board
  moveDown() {
    let anymoveAvailable = false;
    for (let i = 0; i < 4; i++) {
      let tiles = [],
        tasks = [];
      for (let j = 3; j >= 0; j--) {
        tiles.push(this.findTile({ y: j, x: i }));
      }
      tiles = tiles.filter((tile) => tile); // remove empty spaces
      tiles.forEach((tile) => {
        tasks.push({
          tile: tile,
          merge:
            (tasks.length ? tasks[tasks.length - 1].tile.value : null) ==
              tile.value &&
            !(tasks.length ? tasks[tasks.length - 1].merge : null),
          // position is based on number of previously moved non merging tiles, however if tile is merging it should be moved by one more tile
          newPosition: {
            y:
              3 -
              (tasks.filter((task) => !task.merge).length -
                Number(
                  (tasks.length ? tasks[tasks.length - 1].tile.value : null) ==
                    tile.value &&
                    !(tasks.length ? tasks[tasks.length - 1].merge : null)
                )),
            x: i,
          },
        });
      });
      tasks
        .filter((task) => task.merge)
        .forEach((task) => {
          task.tile.value *= 2;
          this.score += task.tile.value;
        });
      if (
        tasks.filter(
          (task) => !this.comparePositions(task.tile.pos, task.newPosition)
        ).length
      )
        anymoveAvailable = true;
      tasks.forEach((task) => {
        Dom.moveTile(task.tile.pos, task.newPosition);
        task.tile.pos = task.newPosition;
      });
    }
    if (anymoveAvailable) this.animationTimeout();
  }
  // return node located at given position
  findTile(pos, amount = 1) {
    if (amount == 1) {
      return (
        this.tiles.filter(
          (tile) => tile.pos.x == pos.x && tile.pos.y == pos.y
        )[0] || null
      );
    } else {
      return (
        this.tiles.filter(
          (tile) => tile.pos.x == pos.x && tile.pos.y == pos.y
        ) || null
      );
    }
  }
  // checks if both positions are the same
  comparePositions(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y;
  }
  // check if position is not outside of a board
  inBounds(position) {
    return (
      position.x >= 0 && position.y >= 0 && position.x < 4 && position.y < 4
    );
  }
  // handle move depending on direction
  move(direction) {
    if (this.moveAvailable && this.running) {
      if (direction == 'left') this.moveLeft();
      if (direction == 'right') this.moveRight();
      if (direction == 'up') this.moveUp();
      if (direction == 'down') this.moveDown();
    } else if (!this.running) this.restart();
    LocalStorage.saveBestScore(this.score);
    this.bestScore = LocalStorage.getBestScore();
  }
  // remove duplicate tiles after merge
  removeDuplicates() {
    this.tiles.forEach((tile) => {
      let found = this.findTile(tile.pos, 2);
      if (found.length > 1) {
        // if theres 2 tiles in the same spot remove the lower score one
        let smaller = found.sort((a, b) => a.value - b.value)[0];
        this.tiles = this.tiles.filter((tile) => tile != smaller);
      }
    });
  }
  // finds empty positions mainly to add new node and returns one of them
  findEmptyPosition() {
    let freeSpaces = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!this.findTile({ x: j, y: i })) freeSpaces.push({ x: j, y: i });
      }
    }
    return freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
  }
  // add new tile to memory
  addTile() {
    this.tiles.push(new Tile(this.findEmptyPosition()));
  }
  // animation timeout is invoked after moving nodes to desired position and
  // its function is to remove transitions to give nodes time to move back
  // to default position and after that to add transition again
  animationTimeout() {
    this.moveAvailable = false;
    setTimeout(() => {
      this.removeDuplicates();
      this.addTile();
      Dom.update();
      setTimeout(() => {
        Dom.addTransitions();
        this.moveAvailable = true;
        if (this.isLost()) this.end();
      }, 100);
    }, 400);
  }
}
