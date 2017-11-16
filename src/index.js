import Game from './modules/game.js';
import config from './modules/assets.js';


window.game = new Game(config);
window.spin = game.spin.bind(game);

