import styled from 'styled-components'
import { Button } from '../button'

/**
 * Describes StatBoard props
 * Fully compatibles with IScore
 * @see IScore
 */
export interface IStatBoardProps {
  playerWinsCount: number
  aiWinsCount: number
  drawsCount: number
  xCount: number
  oCount: number
  onReset: () => void
}

/**
 * Components presents statistic board
 * @param props {IStatBoardProps}
 * @constructor
 */
export function StatBoard(props: IStatBoardProps): JSX.Element {
  const {
    playerWinsCount,
    aiWinsCount,
    drawsCount,
    xCount,
    oCount,

    onReset,
  } = props
  return <StatBoardStyled>
    <div className="stat-board">
      {/* stats for player */}
      <div className="section">
        <div className="title">
          Score
        </div>
        <div className="sub-section">
          <div className="stats">
            Player: {playerWinsCount}
          </div>
          <div className="stats">
            AI: {aiWinsCount}
          </div>
          <div className="stats">
            Game draw: {drawsCount}
          </div>
        </div>
      </div>

      {/* stat by figures */}
      <div className="section">
        <div className="title">
          By figures
        </div>
        <div className="sub-section">
          <div className="stats">
            X: {xCount}
          </div>
          <div className="stats">
            O: {oCount}
          </div>
        </div>
      </div>

      {/* control block to show reset button */}
      <div className="section">
        <Button type="button" onClick={onReset}>Reset</Button>
      </div>
    </div>
  </StatBoardStyled>
}

// styles
export const StatBoardStyled = styled.div`
  .stat-board {
    box-shadow: 1px 7px 11px -5px rgba(0,0,0,0.75);
    -webkit-box-shadow: 1px 7px 11px -5px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 7px 11px -5px rgba(0,0,0,0.75);
    color: #fff;
    background: #2c3e50;
    min-height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-evenly;
    .title {
      text-align: center;
      width: 100%;
      font-size: 1rem;
    }
    .section {
      .sub-section {
        display: flex;
        font-size: 1.2rem;
        justify-content: space-between;
      }
    }
    
    .stats {
      margin: 0 1rem;
    }
  }
`