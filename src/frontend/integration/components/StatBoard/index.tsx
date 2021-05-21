import { useEffect } from 'react'
import { StatBoard as StatBoardImplementation } from '../../../components/StatBoard'
import { $score, IScore, resetScoreFx, refreshScoreFx } from '../../models/score'
import { useStore } from 'effector-react'

/**
 * StatBoard connected to the store
 * @constructor
 */
export function StatBoard(): JSX.Element {
  useEffect(() => {
    ;(async () => refreshScoreFx())()
  }, [])
  const score: IScore = useStore($score)
  return <StatBoardImplementation {...score} onReset={resetScoreFx} />
}
