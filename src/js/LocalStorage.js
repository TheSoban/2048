class LocalStorage {
  static getBestScore() {
    return +localStorage.getItem('2048_best_score') || 0;
  }
  static saveBestScore(score) {
    if (score > LocalStorage.getBestScore()) {
      localStorage.setItem('2048_best_score', score);
    }
  }
}
