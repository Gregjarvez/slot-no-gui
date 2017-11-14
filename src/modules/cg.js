var reelStructure = `
 |--%s--|--%s--|--%s--|
 
 |--%s--|--%s--|--%s--|
 
 |--%s--|--%s--|--%s--|
`;

var win = `you win %s`;

export function reels(reelsArray) {
  var each = 0;
  var display = [reelStructure];
  for (var i = 0; i < 9; i++) {
    var j = i % reelsArray.length;
    if (j === 3) each++;
    display.push(reelsArray[j][each]);
  }
  return console.log.apply(null, display);
}


export function winMessage(message) {
    return console.log(win, message);
}
