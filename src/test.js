const lookup = {
  rock: 1,
  paper: 2,
  Scissors: 3,
};
function game(p1, p2) {
  let p1 = lookup[p1];
  return p1;
}
console.log(lookup.Scissors);
