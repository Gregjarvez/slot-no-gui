class Text {
  constructor (domObject, defaultText) {
    this.defaultText = defaultText
    this.domObject   = domObject

    this.fillTextContent = this.fillTextContent.bind(this)
  }

  fillTextContent (text) {
    return this.domObject
      .textContent = `${this.defaultText}: ${text}`
  }
}

export default Text