import { dom_canvas } from './dom.js'
import SpriteSheet from './sprites.js'

export default (function () {
  var context = dom_canvas.getContext('2d')
  var cache   = new Map()

  function drawCanvasBackground (x, y, w, h) {
    context.fillRect(
      x,
      y,
      w || cv.width,
      h || cv.height,
    )
  }

  function constructSpritesGrid (gridLines, len = 3) {
    for (let x = 0; x < len; x++) {
      for (let y = 0; y < len; y++) {
        let imgId = gridLines[y][x]

        if (cache.has(imgId)) {
          cache.get(imgId).draw(context, y, x)
          continue
        }

        let sprite = new SpriteSheet(`./modules/gui/reels/${imgId}.jpeg`)
        sprite.draw(context, y, x)
        cache.set(imgId, sprite)
      }
    }
  }

  function drawWinLines(winLines){
    if(!winLines.length) return false;

    context.beginPath();
    context.strokeStyle = 'red';
    context.moveTo(0, 32);
    context.lineTo(70, 32);
    context.lineTo(70 + 56, 56 * 2);
    context.moveTo(70 + 56, 56 * 2);
    context.lineTo(70 + 56, 56 * 2);
    context.stroke();
  }

  drawCanvasBackground(
    0, 0,
    dom_canvas.width,
    dom_canvas.height,
  )

  function drawGrid ({gridLines, winLines}) {
    var len = gridLines.length

    constructSpritesGrid(gridLines, len)
    drawWinLines(winLines);
  }

  return drawGrid
}())
