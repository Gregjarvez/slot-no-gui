function getCanvas(canvas, {x, y, w, h}) {
  var cv = document.querySelector(canvas);
  var ctx = cv.getContext('2d');

  function draw() {
    ctx.fillRect(
        x,
        y,
        w || cv.width,
        h || cv.height,
    );
  }

  draw();

  return ctx;
}

function Sprite(src) {
  this.image = new Image();
  this.image.src = src;
  this.w = 59;
  this.h = 59;

}

Sprite.prototype = {
  draw: function(x, y, ctx) {
    ctx.drawImage(
        this.image,
        (this.w + 5) * (x + 0.1),
        (this.h + 5) * (y + 0.1),
    );
  },
};

export default (function() {
  var ctx = getCanvas('.canvas', {
    x: 0,
    y: 0
  });

  function canvas(reelsArray) {
    var len = reelsArray.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        let img = reelsArray[j][i];
        let sym = new Sprite(`./gui/reels/${img}.jpeg`);
        sym.image.onload = function() {
          sym.draw(j, i, ctx);
        };
      }

    }

  }

  return canvas;
}());
