var grid = {};
var losed = false;
let mines = [{x: 1, y: 1}];

for (let i = 0; i < 10; i++)
      mines.push({x: Math.floor(Math.random() * (10 - 1 || 99)) + (1 || 1), y: Math.floor(Math.random() * (10 - 1 || 99)) + (1 || 1)});

for (let i = 0; i < mines.length; i++) {
  var x = grid[mines[i].x];
  if (!x)
    grid[mines[i].x] = {};
  grid[mines[i].x][mines[i].y] = true;
}

console.log(grid);
console.log(mines);

var hasMine = function(grid, x, y) {
  return grid[x] && grid[x][y];
}

var check = function(grid, x, y) {
  var tr = document.querySelectorAll('tr')[y - 1];
  var td = tr && tr.querySelectorAll('td')[x - 1];
  if (!td || td.className !== '')
    return;
  if (hasMine(grid, x, y)) {
    td.classList.add('mine');
    losed = true;
  } 
  else {
    var count = 0;
    if (hasMine(grid, x - 1, y - 1)) count++;
    if (hasMine(grid, x, y - 1)) count++;  
    if (hasMine(grid, x + 1, y - 1)) count++;
    if (hasMine(grid, x - 1, y)) count++;
    if (hasMine(grid, x + 1, y)) count++;
    if (hasMine(grid, x - 1, y + 1)) count++;
    if (hasMine(grid, x, y + 1)) count++;
    if (hasMine(grid, x + 1, y + 1)) count++;
    td.classList.add('empty');
    if (count) {
      td.innerHTML = count;
    } 
    else {
      check(grid, x - 1, y - 1);
      check(grid, x, y - 1);
      check(grid, x + 1, y - 1);
      check(grid, x - 1, y);
      check(grid, x + 1, y);
      check(grid, x - 1, y + 1);
      check(grid, x, y + 1);
      check(grid, x + 1, y + 1);
    }
  }
}

var trs = document.querySelectorAll('.minesweeper tr');
for (let y = 1; y <= trs.length; y++) {
  var tds = trs[y - 1].querySelectorAll('.minesweeper td');
  for (let x = 1; x <= tds.length; x++) {
    let td = tds[x - 1];
    td.addEventListener('click', function() {
      if (losed)
        return;
      check(grid, x, y);
    });
  }
}

var button = document.querySelector('.minesweeper button');
button.addEventListener('click', function() {
  losed = false;
  var tds = document.querySelectorAll('.minesweeper td');
  for (let i = 0; i < tds.length; i++) {
    tds[i].className = '';
    tds[i].innerHTML = '';
  }
});