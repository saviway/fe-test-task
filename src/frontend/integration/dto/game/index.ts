import { PlayerFigure, PlayerKind } from '../../../domain/player'

/**
 * Describes Game's API server response (DTO)
 */
export interface IGameDTO {
  ok: boolean
  result: {
    ai: PlayerFigure
    player: PlayerFigure
    board: (number | PlayerFigure)[][]
    nextMovie: PlayerFigure
    end: boolean
    winner?: PlayerKind
    team?: PlayerFigure
  }
}
