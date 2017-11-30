import { dom_canvas } from './dom.js'
import SpriteSheet from './sprites.js';

export default (function () {
  var context = dom_canvas.getContext('2d')
  var cache = new Map();

  function drawCanvasBackground (x, y, w, h) {
    context.fillRect(
      x,
      y,
      w || cv.width,
      h || cv.height,
    )
  }

  drawCanvasBackground(
    0, 0,
    dom_canvas.width,
    dom_canvas.height,
  )

  function drawGrid (reelsArray) {
    var len = reelsArray.length

    for (let x = 0; x < len; x++) {
      for (let y = 0; y < len; y++) {
        let imgId = reelsArray[y][x]

        if(cache.has(imgId)){
          cache.get(imgId).draw(context, y, x )
          continue;
        }

        let sprite = new SpriteSheet(`./modules/gui/reels/${imgId}.jpeg`)
        sprite.draw(context, y, x )
        cache.set(imgId, sprite);
      }

    }

  }

  return drawGrid;
}())
