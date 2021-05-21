import {createStore, createEffect, forward, createEvent, combine} from 'effector'
import {defaultApiClient} from '../../../services'
import {ENDPOINT_SCORE, ENDPOINT_SCORE_RESET} from '../../constants/endpoints'
import {IScoreDTO} from '../../dto/score'
import produce from 'immer'
import {IGameDTO} from '../../dto/game'

/**
 * Describes Score state
 */
export interface IScore {
  /**
   * Count of wins for player (human)
   */
  playerWinsCount: number

  /**
   * Count of wins for AI
   */
  aiWinsCount: number

  /**
   * Draws game count
   */
  drawsCount: number

  /**
   * wins of X
   */
  xCount: number

  /**
   * Wins of O
   */
  oCount: number
}

/**
 * Default state
 */
const DEFAULT_STATE: IScore = {
  playerWinsCount: 0,
  aiWinsCount: 0,
  drawsCount: 0,
  xCount: 0,
  oCount: 0,
}

/**
 * Score store
 */
export const $score = createStore<IScore>({...DEFAULT_STATE})

// ### Effects

/**
 * Refresh the score
 * Receives Game DTO to determine game is end. Need for call from game store.
 */
export const refreshScoreFx = createEffect((gameDto: IGameDTO | undefined = undefined) => {
  if (gameDto) {
    if (gameDto.result.end) {
      return defaultApiClient.get<IScoreDTO>(ENDPOINT_SCORE)
    }
    return Promise.reject()
  }
  return defaultApiClient.get<IScoreDTO>(ENDPOINT_SCORE)
})

/**
 * Reset the score
 */
export const resetScoreFx = createEffect(() => defaultApiClient.post<never, IScoreDTO>(ENDPOINT_SCORE_RESET, null))

// ### Subscribes

// on refresh
$score.on(refreshScoreFx.doneData, (state: IScore, res: IScoreDTO) => produce(state, (draft) => {
  draft = mapScoreDTOToState(res)
  return draft
}))

// on reset
$score.on(resetScoreFx.doneData, (state) => ({...DEFAULT_STATE}))

/**
 * Creates IScore from score's DTO
 * @param dtoModel {IScoreDTO} score DTO
 * @param override {Partial<IScore>} overrides
 */
export const mapScoreDTOToState = (dtoModel: IScoreDTO, override: Partial<IScore> = {}): IScore => {
  const { result } = dtoModel
  return {
    playerWinsCount: result.player,
    aiWinsCount: result.ai,
    drawsCount: result.list.filter((i) => typeof i.winner === 'undefined').length,
    xCount: result.X,
    oCount: result.O,
    ...override
  }
}