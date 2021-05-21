// init stores
import './integration/models/init'
import { GameScreen } from './components/GameScreen'
import { StatBoard } from './components/StatBoard'
import { GameViewport } from './components/GameViewport'
import { GameBoard } from './components/GameBoard'

export function App(): JSX.Element {
  return <GameScreen>
    <StatBoard playerWinsCount={0} aiWinsCount={0} drawsCount={0} xCount={0} oCount={0} onReset={() => false} />
    <GameViewport aiPanel={<div>player</div>} humanPanel={<div>AI</div>}>
      <GameBoard boardData={{}} onPlayerMove={(f) => console.log(f)} />
    </GameViewport>
  </GameScreen>
}
