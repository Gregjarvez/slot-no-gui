class SpriteSheet {
  constructor (src) {
    this.buffer  = null
    this.src     = src
    this.w       = 59
    this.h       = 59
    this.padding = {
      x: 5,
      y: 0.1,
    }
  }

  draw (context, x, y) {
    if (!this.buffer) {
      this.loadImage()
          .then(image => {
            this.drawImage(image, context, x, y)
            this.buffer = image
          })
      return null
    }
    this.drawImage(this.buffer, context, x, y);
  }

  drawImage(image, context, x, y){
    context.drawImage(
      image,
      (this.w + this.padding.x) * (x + this.padding.y),
      (this.h + this.padding.x) * (y + this.padding.y),
    )
  }

  loadImage () {
    return new Promise(resolve => {
      var image = new Image()
      image.addEventListener('load', () => {
        resolve(image)
      })
      image.src = this.src
    })
  }
}

export default SpriteSheet
