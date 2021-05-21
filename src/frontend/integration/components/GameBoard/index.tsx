import { useEffect } from 'react'
import { GameBoard as GameBoardImplementation } from '../../../components/GameBoard/GameBoard'
import {
  getCurrentGameFx,
  $activeGame,
  doMoveFx,
  playAgainFx,
  $uiState,
  IUIState, IActiveGameState,
} from '../../models/game'
import { useStore } from 'effector-react'
import { GameOverScreen } from '../../../components/GameOverScreen'

/**
 * GameBoard connected to store
 * @constructor
 */
export function GameBoard(): JSX.Element {
  const activeGameState: IActiveGameState = useStore($activeGame)
  const { isLoading }: IUIState = useStore($uiState)
  // fetch current game
  useEffect(() => {
    // I use IIFE due to useEffect hasn't async signature
    ;(async () => {
      await getCurrentGameFx() // await for kill warning 'unhandled promise rejection'
    })()
  }, [])

  // if game is ended - render Game Over screen
  if (activeGameState.isEnd) {
    return (
      <GameOverScreen
        winner={activeGameState.winner}
        drawText="Game is draw 😁"
        wonText="You won 👏"
        loseText="You lose 😓"
        boardComponent={
          <GameBoardImplementation
            isBusy={true}
            onPlayerMove={doMoveFx}
            boardData={activeGameState.boardState}
          />
        }
        onPlayAgainClick={() => playAgainFx()}
      />
    )
  }
  return (
    <GameBoardImplementation
      isBusy={isLoading}
      onPlayerMove={doMoveFx}
      boardData={activeGameState.boardState}
    />
  )
}
