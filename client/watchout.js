// start slingin' some d3 here.
const w = 700;
const h = 500;
const svg = d3.select('div.board')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

const cat = svg.selectAll('image')
               .data(['cat'], id => id)
               .enter()
               .append('image')
               .attr('class', 'cat')
               .attr('xlink:href', 'balloonCat.gif');

const _updateEnemies = function () {
  //Create new enemies
  const selection = svg.selectAll('image')
    .data([1, 2, 3, 4, 5, 6], id => id);

  selection
    .enter()
    .append('image')
    .attr('class', 'enemy')
    .attr('x', () => randomCoor(w - 46))
    .attr('y', () => randomCoor(h - 80))
    .attr('xlink:href', 'spaceInvader.gif');

  //Edit existing enemies
  selection
    .transition().duration(1500).ease('linear')
    .attr('x', () => randomCoor(w - 46))
    .attr('y', () => randomCoor(h - 80));



};

//function that accepts element
//randomize coordinate function;
const randomCoor = function (max) {
  return Math.floor(Math.random() * (max + 1));
};

svg.on('mousemove', function () {
  var coor = d3.mouse(this);
  cat.attr('x', coor[0])
     .attr('y', coor[1]);
});
//

const findCatCoor = function () {
  var catCoor = [];
  catCoor.push(cat.attr('x'));
  catCoor.push(cat.attr('y'));
  return catCoor;
};

const findEnemyCoor = function () {
  var enemyCoor = [];

  return enemyCoor;
};
const checkPositions = function (catRadius, enemyRadius) {
  const minDist = (catRadius + enemyRadius);

  //var actDist = Math.sqrt(Math.pow((catX - enemyX), 2) + Math.pow((catY - enemyY), 2));
  //if (actDist <= minDist) {
  //EXPLODE
  //}
};
_updateEnemies();
setInterval(_updateEnemies, 1500);
