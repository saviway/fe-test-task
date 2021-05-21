import { PlayerPanel as PlayerPanelImplementation } from '../../../components/PlayerPanel'
import { PLAYER_KIND_PLAYER } from '../../../domain/player'
import { resetGameFx, $activeGame, IActiveGameState } from '../../models/game'
import { useStore } from 'effector-react'

/**
 * Player panel for human connected to store
 * @constructor
 */
export function PlayerPanel(): JSX.Element {
  const activeGame: IActiveGameState = useStore($activeGame)
  return (
    <PlayerPanelImplementation
      playerKind={PLAYER_KIND_PLAYER}
      onGameReset={resetGameFx}
      playerFigure={activeGame.playerFigure}
    />
  )
}
