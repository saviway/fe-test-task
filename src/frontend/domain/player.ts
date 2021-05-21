/**
 * Available game figures
 */
export type PlayerFigure = 'X' | 'O'

/**
 * Describes 'O' figure
 */
export const PLAYER_FIGURE_O: PlayerFigure = 'O'

/**
 * Describes 'X' figure
 */
export const PLAYER_FIGURE_X: PlayerFigure = 'X'

/**
 * Describes players list
 */
export interface IPlayersList {
  ai: PlayerFigure,
  player: PlayerFigure
}

/**
 * Player kind (type)
 */
export type PlayerKind = 'player' | 'ai'

/**
 * Constants defines player kind
 */
export const PLAYER_KIND_PLAYER: PlayerKind = 'player'
export const PLAYER_KIND_AI: PlayerKind = 'ai'

/**
 * Describes data type of game board
 */
export type Board = Record<string, PlayerFigure | null>