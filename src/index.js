import Game from './modules/game.js';

var slot = new Game();

function gui (){
  var spin = document.querySelector('.spin')
  var reset = document.querySelector('.reset');
  var currencyConversion = document.querySelector('.currency')

  spin.addEventListener('click', slot.spin.bind(slot))
  reset.addEventListener('click', slot.reset.bind(slot))

  currencyConversion.addEventListener('change', () => {
    slot.changeCurrency.call(slot, currencyConversion.value)
  })
}



gui();
