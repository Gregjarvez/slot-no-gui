var config = {
  rngConfiguration: {
    min: 1,
    max: 5,
  },
  coinValue: 0.50,
  defaultStake: 10,
  symbols: [
    {
      type: {number: 1, symbol: 'bell'},
      value: 20,
    },
    {
      type: {number: 2, symbol: 'cherry'},
      value: 40,
    },
    {
      type: {number: 3, symbol: 'orange'},
      value: 5,
    },
    {
      type: {number: 4, symbol: 'prune'},
      value: 15,
    },
    {
      type: {number: 5, symbol: 'seven'},
      value: 100,
    },
  ],
  winLines: [
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    [0, 1, 1],
    [0, 0, 1],
    [2, 1, 0],
  ],
};

export default config;
