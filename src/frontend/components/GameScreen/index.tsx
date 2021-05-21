import { PropsWithChildren } from 'react'
/**
 * Game screen
 * @constructor
 */
export function GameScreen(props: PropsWithChildren<unknown>): JSX.Element {
  return (
    <div className="game-screen" style={{ height: '100%' }}>
      {props.children}
    </div>
  )
}
