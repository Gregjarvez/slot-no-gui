class RNG {
  constructor(config) {
    this.min = config.min || 0;
    this.max = config.max || 10;

    this.randomArray = this.randomArray.bind(this);
  }

  randomArray(len) {
    var values = [];
    var count = 0;

    while (count < len) {
      values[count] = Math.floor(
          Math.random() * (this.max - this.min + 1) + this.min);
      count++;
    }

    return values;
  }

  shuffle(array) {
    var length = array.length,
        random, temp;

    while (length) {
      random = Math.floor(Math.random() * length--);

      temp = array[length];
      array[length] = array[random];
      array[random] = temp;
    }

    return array;
  }
}

export default RNG;
