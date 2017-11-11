class RNG {
  constructor(config) {
    this.min = config.min || 0;
    this.max = config.max || 1000;
    this.type = config.type || 'primitive';

    this.randomArray = this.randomArray.bind(this);
  }

  randomArray(len) {
    let values = [];
    let count = 0;

    while (count < len) {
      values[count] = Math.floor(Math.random() * (this.max - this.min + 1
      ) + this.min); ;
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