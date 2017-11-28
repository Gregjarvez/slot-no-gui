import {
  dom_payout,
  dom_totalWin,
  dom_balance,
  dom_stake,
} from './dom.js'
import Text from './text.js'

export const stake    = new Text(dom_stake, 'stake: ').fillTextContent
export const balance  = new Text(dom_balance, 'Balance: ').fillTextContent
export const totalWin = new Text(dom_totalWin, 'Total Win: ').fillTextContent
export const payout   = new Text(dom_payout, 'payout: ').fillTextContent
