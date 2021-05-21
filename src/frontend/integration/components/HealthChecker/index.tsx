import { useEffect, PropsWithChildren } from 'react'
import { checkFx, $gameIsAvailable } from '../../models/game'
import { useStore } from 'effector-react'

/**
 * Checks the game is available (API)
 * Implemented as Render props pattern
 * @param children
 * @constructor
 */
export function HealthChecker({ children }: PropsWithChildren<any>) {
  const isAvailable: boolean = useStore($gameIsAvailable)
  useEffect(() => {
    ;(async () => {
      await checkFx()
    })()
  }, [])

  return children(isAvailable)
}
