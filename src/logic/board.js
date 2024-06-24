import { WINNER_COMBOS } from "../constants"
import { TURNS } from "../constants"

export const checkWinner = (boardToCheck) => {
    //Se revisan las combinaciones ganadoras
    //para saver quien gano ente x u o
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }