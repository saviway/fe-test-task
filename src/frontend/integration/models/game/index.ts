import { createStore, createEffect, forward, createEvent, combine } from 'effector'
import { defaultApiClient } from '../../../services'
import {
  ENDPOINT_CHECK,
  ENDPOINT_GAME_CURRENT,
  ENDPOINT_GAME_MOVE,
  ENDPOINT_GAME_NEW,
  ENDPOINT_GAME_RESET,
} from '../../constants/endpoints'
import {
  Board,
  PLAYER_FIGURE_O,
  PLAYER_FIGURE_X,
  PlayerFigure,
  PlayerKind,
} from '../../../domain/player'
import { IGameDTO } from '../../dto/game'
import { mapArrayBoardToBoard } from '../../utils/mappers'
import { produce } from 'immer'
import { fold } from 'fp-ts/lib/Either'
import { refreshScoreFx } from '../score'

/**
 * Describes active game's state
 */
export interface IActiveGameState {
  /**
   * flag the game is end
   * Should to be false by default cause player does move first at app starting
   */
  isEnd: boolean

  /**
   * the figure player's playing current game
   */
  playerFigure: PlayerFigure

  /**
   * next movement
   */
  nextMovie: PlayerFigure

  /**
   * Board state
   */
  boardState: Board

  /**
   * If game is ended this field contains the type of winner. Otherwise must be null
   */
  winner: PlayerKind | null

  // Useful flag to determine who should move
  isPlayerMove: boolean
}

/**
 * Describes UI state (loading, errors etc)
 */
export interface IUIState {
  /**
   * Flag indicates UI is loading smth.
   * This app is small therefore this flag will be collected all loadings.
   */
  isLoading: boolean
}

// ### Effects

// Check is game server available
export const checkFx = createEffect(() => defaultApiClient.get(ENDPOINT_CHECK))

// Start another game
export const playAgainFx = createEffect(() => defaultApiClient.get<IGameDTO>(ENDPOINT_GAME_NEW))

// reset current game
export const resetGameFx = createEffect(() =>
  defaultApiClient.post<never, IGameDTO>(ENDPOINT_GAME_RESET, null)
)

// get current game
export const getCurrentGameFx = createEffect(() =>
  defaultApiClient.get<IGameDTO>(ENDPOINT_GAME_CURRENT)
)

// performs game movement
export const doMoveFx = createEffect((index: number) =>
  defaultApiClient.post<{ index: Number }, IGameDTO>(ENDPOINT_GAME_MOVE, { index })
)

// ### Stores

// Game is available
export const $gameIsAvailable = createStore<boolean>(true)

// active game store
export const $activeGame = createStore<IActiveGameState>({
  isEnd: false,
  playerFigure: PLAYER_FIGURE_X,
  nextMovie: PLAYER_FIGURE_O,
  boardState: {},
  winner: null,
  isPlayerMove: true,
})

// UI store
export const $uiState = combine<IUIState>({
  isLoading:
    doMoveFx.pending || getCurrentGameFx.pending || playAgainFx.pending || resetGameFx.pending,
})

// ### Subscribes
$gameIsAvailable.on(checkFx.failData, () => false)

// when game is ended - refresh statistic automatically
forward({
  from: doMoveFx.doneData,
  to: refreshScoreFx, // update statistic
})

$activeGame
  // get current game
  .on(getCurrentGameFx.doneData, (state: IActiveGameState, res: IGameDTO) =>
    produce(state, (draft) => {
      draft = mapDtoToIActiveGameState(res)
      return draft
    })
  )
  // player (human) move
  .on(doMoveFx.doneData, (state: IActiveGameState, res: IGameDTO) =>
    produce(state, (draft) => {
      draft = mapDtoToIActiveGameState(res)
      return draft
    })
  )
  // start another game
  .on(playAgainFx.doneData, (state: IActiveGameState, res: IGameDTO) =>
    produce(state, (draft) => {
      draft = mapDtoToIActiveGameState(res)
      return draft
    })
  )

  // reset current game
  .on(resetGameFx.doneData, (state: IActiveGameState, res: IGameDTO) =>
    produce(state, (draft) => {
      draft = mapDtoToIActiveGameState(res)
      return draft
    })
  )

/**
 * Map game DTO to Game state
 * @param dtoModel {IGameDTO} Server's response
 * @param override {Partial<IActiveGameState>} overrides default is {}
 * @return IActiveGameState
 */
const mapDtoToIActiveGameState = (
  dtoModel: IGameDTO,
  override: Partial<IActiveGameState> = {}
): IActiveGameState => {
  const { result } = dtoModel
  return {
    isEnd: result.end,
    boardState: fold(
      () => {},
      (b) => b
    )(mapArrayBoardToBoard(result.board)) as Board,
    isPlayerMove: result.nextMovie === result.player,
    winner: result?.winner ?? null,
    playerFigure: result.player,
    nextMovie: result.nextMovie,
    ...override,
  }
}
