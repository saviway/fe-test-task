import styled from 'styled-components'

/**
 * Styled button
 */
export const Button = styled.button`
  background-color: hsl(122, 39%, 49%);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  transition-duration: 0.4s;
  &:hover {
    background-color: hsla(122, 39%, 49%, 80%);
    color: white;
  }
`