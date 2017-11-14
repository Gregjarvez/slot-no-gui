var reels = `
 |--%s--|--%s--|--%s--|
 
 |--%s--|--%s--|--%s--|
 
 |--%s--|--%s--|--%s--|
`;

export function reels(context, state) {
  return console.log.apply(context, [
      reels, ...state[0],
  ]);
}
