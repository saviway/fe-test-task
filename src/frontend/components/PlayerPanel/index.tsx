import { PlayerKind, PLAYER_KIND_AI, PLAYER_KIND_PLAYER, PlayerFigure } from '../../domain/player'
import styled from 'styled-components'
import { Button } from '../Button'

/**
 * Describes PlayerPanel props
 */
export interface IPlayerPanelProps {
  /**
   * Type of the player
   */
  playerKind: PlayerKind
  /**
   * The figure player's playing current game
   */
  playerFigure?: PlayerFigure

  /**
   * Handler of reset Button
   */
  onGameReset?: () => void
}

/**
 * Player panel (both of Human and AI)
 * @param props {IPlayerPanelProps}
 * @constructor
 */
export function PlayerPanel(props: IPlayerPanelProps): JSX.Element {
  const { playerKind, onGameReset, playerFigure } = props
  if (playerKind === PLAYER_KIND_PLAYER && onGameReset === undefined) {
    throw new Error('onGameReset is required')
  }
  return (
    <PlayerPanelStyled>
      <div className="player-panel">
        {/* section of human panel */}
        {playerKind === PLAYER_KIND_PLAYER && (
          <>
            <HumanAvatar />
            <div className="name">
              It's you
              <br />
              {playerFigure && <span>You are playing for {playerFigure.toString()}</span>}
            </div>
            <Button type="button" onClick={onGameReset}>
              Reset current game
            </Button>
          </>
        )}

        {/* section of AI panel */}
        {playerKind === PLAYER_KIND_AI && (
          <>
            <AiAvatar />
            {/* Hello South park xD. Stop killing Kenny */}
            <div className="name">AWESOM-O robot</div>
          </>
        )}
      </div>
    </PlayerPanelStyled>
  )
}

/**
 * Non exportable component of human player avatar
 * @constructor
 */
function HumanAvatar(): JSX.Element {
  return <div className="avatar">‍👨</div>
}

/**
 * Non exportable component of AI Avatar
 * @constructor
 */
function AiAvatar(): JSX.Element {
  return <div className="avatar">‍🤖</div>
}

// styles
export const PlayerPanelStyled = styled.div`
  .player-panel {
    text-align: center;
    .name {
      margin: 2rem;
      font-weight: 500;
    }
    .avatar {
      font-size: 10rem;
    }
  }
`
