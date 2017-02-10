// start slingin' some d3 here.
const w = 700;
const h = 500;
const svg = d3.select('div.board')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

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
  //.attr('x', randomCoor(w - 46), 'y', randomCoor(h - 80))

};

//function that accepts element
//randomize coordinate function;
const randomCoor = function (max) {
  return Math.floor(Math.random() * (max + 1));
};

//
setInterval(_updateEnemies, 1500);
