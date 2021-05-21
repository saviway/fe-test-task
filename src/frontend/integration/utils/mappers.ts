import { Board, PLAYER_FIGURE_O, PLAYER_FIGURE_X, PlayerFigure } from '../../domain/player'
import { Either, left, right } from 'fp-ts/lib/Either'
import { flatten } from 'fp-ts/Array'

/**
 * Create Board type from server response board's data
 * @param data {Array<Array<number | PlayerFigure>>}
 * @return Either<Error, Board>
 */
export const mapArrayBoardToBoard = (data: (number | PlayerFigure)[][]): Either<Error, Board> => {
  try {
    if (data.length < 3) {
      throw new Error('Bad length')
    }
    const elements = flatten(data)

    const result: Board = {}
    const { length } = elements
    for (let i: number = 1; i <= length; i += 1) {
      const v = elements[i - 1]
      result[i.toString()] = v === PLAYER_FIGURE_O || v === PLAYER_FIGURE_X ? v : null
    }
    return right(result)
  } catch (e) {
    return left(e)
  }
}
