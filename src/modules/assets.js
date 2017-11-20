var config = {
  rngConfig: {
    min: 1,
    max: 5,
  },
  coinValue: 0.02,
  stake: 10,
  symbols: [
    {type: 1, value: 20},
    {type: 2, value: 40},
    {type: 3, value: 5},
    {type: 4, value: 15},
    {type: 5, value: 100},
  ],
  winLines: [
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    [0, 1, 1],
    [0, 0, 1],
    [2, 1, 0],
  ],
  gridLength: 3,
  reelLength: 5
};

export default config;
