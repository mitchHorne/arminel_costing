import styled from 'styled-components'

interface Props {
  minWidth?: string
  onClick: Function
}

export const Button = styled.button<Props>`
  background: #000080;
  border: 1px solid #000080;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s;

  &:hover {
    border-color: #000060;
    box-shadow: 0 3px #000060;
    transform: translate3d(0, -2px, 0);
  }

  &:active {
    border-color: #000080;
    box-shadow: 0 0 #000060;
    transform: translate3d(0, 2px, 0);
  }

  ${props => props.minWidth && `min-width: ${props.minWidth};`}
`
