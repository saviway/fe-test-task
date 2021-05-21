import { Component, ErrorInfo, PropsWithChildren } from 'react'
import styled from 'styled-components'

// styles
const ErrorView = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin: 3rem 0;
`

/**
 * Describes state of DefaultErrorBoundary
 */
export type DefaultErrorBoundaryState = {
  hasError: boolean
}

/**
 * Error boundary component
 */
export class DefaultErrorBoundary extends Component<
  PropsWithChildren<unknown>,
  DefaultErrorBoundaryState
> {
  constructor(props: PropsWithChildren<never>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, _: ErrorInfo) {
    console.log(error)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorView>Something went wrong.</ErrorView>
    }

    return this.props.children
  }
}
