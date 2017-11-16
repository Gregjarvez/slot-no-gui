export default (function() {
  var reelStructure = `
 |---%s--- | ---%s--- | ---%s--- |
 
 |---%s--- | ---%s--- | ---%s--- |
 
 |---%s--- | ---%s--- | ---%s--- |
`;

  var symbols = ['bll', 'che', 'org', 'app', 'sev'];

  function reels(reelsArray) {
    var each = 0;
    var display = [reelStructure];

    for (var i = 0; i < 9; i++) {
      var j = i % reelsArray.length;
      display.push(symbols[reelsArray[j][each] - 1]);
      if (j === 2) each++;
    }
    return console.log.apply(null, display);
  }

  function winMessage(amount) {
    return console.log(`win: $%s`, amount);
  }

  function spinReelMessage() {
    return console.log('type spin to spin the reel');
  }

  function accumulatedWin(amount) {
    return console.log('Total Win: $%s', amount);
  }

  function stake(stake) {
    return console.log('Bet Amount: $%s', stake);
  }

  function cash(amount) {
    return console.log('Cash: $%s', amount);
  }


  return {
    spinReelMessage: spinReelMessage,
    winMessage: winMessage,
    accumulatedWin: accumulatedWin,
    reels: reels,
    stake: stake,
    cash: cash,
  };
}());

