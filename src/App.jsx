import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Square } from './components/Square.jsx'
import confetti from "canvas-confetti"
import { TURNS} from './constants'
import { checkWinner } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { checkEndGame } from './logic/board.js'
import { saveGame, resetGameStorage } from './storage/storage.js'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFormStorage = window.localStorage.getItem('turn')
    return turnFormStorage ?? TURNS.X
  })
  
  //null = ho hay ganador, false = empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage
  }

  const updateBoard = (index) => {

    //con este condicional no se actualiza la posicion si ya tiene algo
    if (board[index] || winner) return

    //para actualizar el tablero
    const newBoard = [...board] /*<-- se crea una copia del array para no modificafr le original*/
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
    //guardar juego
    saveGame( {board: newBoard, turn: newTurn})

    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }


  return (
    <main className='board'>
      <h1>Tres en Linea</h1>
      <section className='game'>
        {
          board.map((_ , index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <button onClick={resetGame}>Empezar de nuevo</button>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
