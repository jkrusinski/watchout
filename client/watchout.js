// start slingin' some d3 here.
const w = 700;
const h = 500;
const svg = d3.select('div.board')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

var _updateEnemies = function () {
  //Create new enemies
  var selection = svg.selectAll('image').data([1, 2, 3, 4, 5, 6], id => id)
                  .enter()
                  .append('image')
                  .attr('class', 'enemy')
                  .attr('xlink:href', 'spaceInvader.gif');

  //Edit existing enemies
};

//randomize coordinate function;

//
_updateEnemies();
