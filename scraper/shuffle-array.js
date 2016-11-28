var shuffleArray = function(array) {
  var curr = array.length, tempVal, randI;
  while (0 !== curr) {
    randI = Math.floor(Math.random() * curr);
    curr -= 1;

    tempVal = array[curr];
    array[curr] = array[randI];
    array[randI] = tempVal;
  }
  return array;
};

module.exports = shuffleArray;