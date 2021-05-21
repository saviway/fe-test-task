/*
  I dedicate this app to a girl I met last night in a bar.
  I hope sex with this code will be better than with her.
  Also it seems I no need wine to code this app.
 */

// init stores
import './integration/models/init'
import { GameScreen } from './components/GameScreen'
import { GameViewport } from './components/GameViewport'
import { HealthChecker } from './integration/components/HealthChecker'
import { PlayerPanel } from './components/PlayerPanel'
import { StatBoard } from './integration/components/StatBoard'
import { GameBoard } from './integration/components/GameBoard'
import { PlayerPanel as PlayerPanelHuman } from './integration/components/PlayerPanel'
import { PLAYER_KIND_AI } from './domain/player'
import { NoServers } from './components/NoServers'
import { DefaultErrorBoundary } from './components/ErrorBoundaries'

export function App(): JSX.Element {
  return <GameScreen>
    <HealthChecker>
      {(isAvailable: boolean) => isAvailable ? (
        <>
          <DefaultErrorBoundary>
            <StatBoard />
            <GameViewport aiPanel={<PlayerPanel playerKind={PLAYER_KIND_AI}/>} humanPanel={<PlayerPanelHuman />}>
              <GameBoard/>
            </GameViewport>
          </DefaultErrorBoundary>
        </>
      ) : <NoServers>No available servers. Please try again later.</NoServers>}
    </HealthChecker>
  </GameScreen>
}
