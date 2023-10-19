
//funzione che cambia difficoltà di livello
function selective(level) {
    const numSquare = level === 'medium' ? 81 : level === 'difficult' ? 49 : 100;
    return numSquare;
}


//funzione randome
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }