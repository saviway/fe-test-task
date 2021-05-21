import {ReactNode, PropsWithChildren} from 'react'
import styled from 'styled-components'

/**
 * Game viewport props
 */
export interface IGameViewportProps {
  /**
   * A component presents ai player panel
   */
  aiPanel: ReactNode

  /**
   * A component presents human player panel
   */
  humanPanel: ReactNode
}
/**
 * The component presents viewport of the board
 * @param props {PropsWithChildren<IGameViewportProps>}
 * @constructor
 */
export function GameViewport(props: PropsWithChildren<IGameViewportProps>): JSX.Element {
  const {aiPanel, humanPanel, children} = props
  return (
    <GameViewportStyled>
      <div className="game-viewport">
        {/* player panel */}
        <div className="humanPanel player-panel">
          {humanPanel}
        </div>
        {/* expected board component as children */}
        <div className="board">
          {children}
        </div>
        {/* ai player panel */}
        <div className="aiPanel player-panel">
          {aiPanel}
        </div>
      </div>
    </GameViewportStyled>
  )
}

// styles
export const GameViewportStyled = styled.div`
  .game-viewport {
    display: flex;
    justify-content: space-between;
    height: 90vh;
  }
  
  .player-panel {
    flex: 0 0 25rem;
    background: hsl(0, 0%, 98%);
  }
  
  .board {
    padding-top: 5rem;
    text-align: center;
    flex: 1;
  }
`