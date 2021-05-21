import { PlayerFigure, PlayerKind } from '../../../domain/player'

/**
 * Describes score DTO
 */
export interface IScoreDTO {
  ok: boolean
  result: {
    ai: number
    player: number
    X: number
    O: number
    list: Array<{
      winner?: PlayerKind
      team?: PlayerFigure
      ts: number
    }>
  }
}
