// start slingin' some d3 here.
const w = 700;
const h = 500;
const svg = d3.select('div.board')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

const cat = svg.selectAll('image').data(['cat'], id => id);

cat.enter()
   .append('image')
   .attr('class', 'cat')
   .attr('xlink:href', 'balloonCat.gif');

const highScore = d3.select('p.highscore');
const currentScore = d3.select('p.current');
const collisions = d3.select('p.collisions');
let score = {
  high: 0,
  current: 0,
  collisions: 0
};

const updateScore = function (element, counter) {
  element.select('span').data([counter])
         .text(d => d);
};

const _updateEnemies = function () {

  const selection = svg.selectAll('image')
    .data([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], id => id);

  selection
    .enter()
    .append('image')
    .attr('class', 'enemy')
    .attr('x', () => randomCoor(w - 46))
    .attr('y', () => randomCoor(h - 80))
    .attr('xlink:href', 'spaceInvader.gif');

  selection
    .transition().duration(1000).ease('linear')
    .attr('x', () => randomCoor(w - 46))
    .attr('y', () => randomCoor(h - 80));
};

const randomCoor = function (max) {
  return Math.floor(Math.random() * (max + 1));
};

svg.on('mousemove', function () {
  var coor = d3.mouse(this);
  cat.attr('x', coor[0])
     .attr('y', coor[1]);
});
//

const adjCoor = function(coordinates, xOffset, yOffset) {
  return [Number(coordinates[0]) + xOffset, Number(coordinates[1]) + yOffset];
};

const findCatCoor = function () {
  var catCoor = [];
  catCoor.push(cat.attr('x'));
  catCoor.push(cat.attr('y'));
  return adjCoor(catCoor, 25, 25);
};

const findEnemyCoor = function (id) {
  var enemy = svg.selectAll('image').data([id], id => id);
  var enemyCoor = [];

  enemyCoor.push(enemy.attr('x'));
  enemyCoor.push(enemy.attr('y'));

  return adjCoor(enemyCoor, 23, 40);
};

const checkPositions = function () {
  const minDist = 60; //catRadius(25) + enemyRadius(23)
  let catCoor = findCatCoor();
  for (let i = 1; i <= 6; i++) {
    let enemyCoor = findEnemyCoor(i);
    let actDist = Math.sqrt(
      Math.pow((catCoor[0] - enemyCoor[0]), 2) +
      Math.pow((catCoor[1] - enemyCoor[1]), 2));
    if (actDist <= minDist) {
      score.current = 0;
      updateScore(currentScore, score.current);
      score.collisions++;
      updateScore(collisions, score.collisions);
      cat.attr('xlink:href', "boom.gif");
      clearInterval(checker);
      setTimeout(function() {
        cat.attr('xlink:href', "balloonCat.gif");
        checker = setInterval(checkPositions, 100);
      }, 500);
      return;
    }
  }

  score.current++;
  updateScore(currentScore, score.current);
  if (score.current > score.high) {
    score.high = score.current;
    updateScore(highScore, score.high);
  }

};
_updateEnemies();
var checker = setInterval(checkPositions, 100);
setInterval(_updateEnemies, 1000);
