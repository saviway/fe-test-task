import { useCallback } from 'react'
import styled from 'styled-components'
import { PlayerFigure } from '../../domain/player'

/**
 * Movement call component props
 */
export type MovementCellProps = {
  /**
   * Value od movement. Null if none
   */
  value: PlayerFigure | null
  position: number
  onClick: (forPosition: number) => void
}

/**
 * Styling props
 */
export type StyledProps = {
  disabled?: boolean
}

/**
 * Single cell of game board
 * @param props {MovementCellProps & StyledProps}
 */
export function MovementCell(props: MovementCellProps & StyledProps): JSX.Element {
  const { onClick, position, value, disabled } = props

  // on click handler
  const clickHandler = useCallback(
    () => (disabled ? false : onClick(position)),
    [position, disabled]
  )

  return (
    <MovementCellStyled disabled={disabled} onClick={clickHandler}>
      {value}
    </MovementCellStyled>
  )
}

// styles
export const MovementCellStyled = styled.div<StyledProps>`
  border: 6px solid #2c3e50;
  border-radius: 2px;
  font-weight: bold;
  /*font-family: Helvetica,serif;*/
  font-size: 4em;
  cursor: ${({ disabled }: StyledProps) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
`
