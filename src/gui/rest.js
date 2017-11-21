var dom = {
  win: document.querySelector('.win'),
  payout: document.querySelector('.payout'),
  totalWin: document.querySelector('.totalWin'),
  balance: document.querySelector('.balance'),
  stake: document.querySelector('.stake'),
}

function text(txt, concat){
  return `${txt}: %${concat}`
}

export function totalWin (amount) {
  return dom.totalWin.textContext = text('Total Win', amount);
}

export function payout (amount) {
  return dom.payout.textContent = text('Payout', amount);
}

export function balance(amount) {
  return dom.balance.textContent = text('Cash', amount);
}

export function stake (amount){
  return dom.stake.textContent = text('Bet Amount', amount);
}