import { MovementCell } from './MovementCell'
import styled from 'styled-components'
import { Board } from '../../domain/player'

/**
 * Props of GameBoard component
 */
export interface IGameBoardProps {
  /**
   * Board data fully compatibles with domain object Board
   */
  boardData: Board

  /**
   * Flag the next move is player move (human)
   * @param position {number} index
   */
  onPlayerMove: (position: number) => void

  /**
   * Busy flag. Will disable cell for cases when data is loading or other reason is not able to interact
   */
  isBusy?: boolean
}

/**
 * Tic Tac Toe board
 * @param props {IGameBoardProps}
 * @constructor
 */
export function GameBoard(props: IGameBoardProps): JSX.Element {
  const { onPlayerMove, boardData, isBusy } = props
  return (
    <GameBoardStyled>
      <div className="game-board">
        <MovementCell position={1} onClick={onPlayerMove} value={boardData[1]} disabled={isBusy} />
        <MovementCell position={2} onClick={onPlayerMove} value={boardData[2]} disabled={isBusy} />
        <MovementCell position={3} onClick={onPlayerMove} value={boardData[3]} disabled={isBusy} />

        <MovementCell position={4} onClick={onPlayerMove} value={boardData[4]} disabled={isBusy} />
        <MovementCell position={5} onClick={onPlayerMove} value={boardData[5]} disabled={isBusy} />
        <MovementCell position={6} onClick={onPlayerMove} value={boardData[6]} disabled={isBusy} />

        <MovementCell position={7} onClick={onPlayerMove} value={boardData[7]} disabled={isBusy} />
        <MovementCell position={8} onClick={onPlayerMove} value={boardData[8]} disabled={isBusy} />
        <MovementCell position={9} onClick={onPlayerMove} value={boardData[9]} disabled={isBusy} />
      </div>
    </GameBoardStyled>
  )
}

// styles (borrowed from the internet to speed up development)
export const GameBoardStyled = styled.div`
  .game-board {
    width: 600px;
    height: 600px;
    margin: 0 auto;
    background-color: #34495e;
    color: #fff;
    border: 6px solid #2c3e50;
    border-radius: 10px;

    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  }
`
