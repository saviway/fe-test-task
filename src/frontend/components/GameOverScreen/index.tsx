import { PLAYER_KIND_PLAYER, PLAYER_KIND_AI, PlayerFigure, PlayerKind } from '../../domain/player'
import styled from 'styled-components'
import { useState } from 'react'
import { Button } from '../Button'

/**
 * Game over screen component props definition
 */
export interface IGameOverScreenProps {
  /**
   * Winner type
   */
  winner: PlayerKind | null

  /**
   * Text to show for win
   */
  wonText: string

  /**
   * Text to show when player lose game
   */
  loseText: string

  /**
   * Text when played draw
   */
  drawText: string

  /**
   * A component that presents the board after game is end.
   */
  boardComponent: JSX.Element

  /**
   * Play again click handler
   */
  onPlayAgainClick: () => void
}

/**
 * Game board screen
 * @param props {IGameOverScreenProps}
 * @constructor
 */
export function GameOverScreen(props: IGameOverScreenProps): JSX.Element {
  const { winner, wonText, drawText, loseText, onPlayAgainClick, boardComponent } = props
  const [isBoardShown, toggleBoardView] = useState<boolean>(false)

  return (
    <GameOverScreenStyled>
      <div className="game-over-screen">
        <h2>Game over</h2>

        {/* show result */}
        {winner === PLAYER_KIND_PLAYER && <div className="game-status">{wonText}</div>}

        {winner === PLAYER_KIND_AI && <div className="game-status">{loseText}</div>}

        {winner === null && <div className="game-status">{drawText}</div>}

        {/* controls */}
        <div className="play-again">
          <Button onClick={onPlayAgainClick} type="button">
            Play again
          </Button>
          <Button onClick={() => toggleBoardView(!isBoardShown)} type="button">
            Toggle Board
          </Button>
        </div>
        <div className='board'>
          {isBoardShown && boardComponent && boardComponent}
        </div>
      </div>
    </GameOverScreenStyled>
  )
}

// styles
export const GameOverScreenStyled = styled.div`
  .game-over-screen {
    h2 {
      font-size: 4rem;
    }

    .game-status {
      font-size: 2.5rem;
    }

    .play-again {
      button {
        margin: 0 2rem;
      }
    }
    
    .board {
      padding-top: 1rem;
    }
  }
`
