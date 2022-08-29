class Tile {
  constructor(position, value) {
    this.value = value || Math.random() < 0.9 ? 2 : 4;
    this.pos = position;
  }
}
