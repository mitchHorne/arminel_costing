import styled from 'styled-components'
import Dropdown from 'react-dropdown'

export const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const InputRow = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  justify-content: space-between;
  padding: 0.5rem;
  width: 60%;

  h3 {
    margin: 0;
    padding: 0;
    padding-right: 0.5em;
  }

  p {
    margin: 0;
    padding: 0;
  }
`

export const StyledInput = styled.input`
  border: 1px solid #333;
  border-radius: 10px;
  margin: 0;
  padding: 0.5rem 0.5rem;
  transition: all 0.3s;
  width: 100%;

  &:focus {
    border: 1px solid #000060;
    box-shadow: 0 0 3px 1px #000060;
    outline: none;
  }

  &:hover {
    border: 1px solid #000060;
    box-shadow: 0 0 3px 1px #000060;
    cursor: pointer;
  }
`

export const StyledDropdown = styled(Dropdown)`
  div.Dropdown-control {
    border: 1px solid #333;
    border-radius: 10px;
    margin: 0;
    padding: 0.5rem 0.5rem;
    transition: all 0.3s;
    width: 100%;

    &:hover {
      border: 1px solid #000060;
      box-shadow: 0 0 3px 1px #000060;
      cursor: pointer;
      outline: none;
    }
  }

  div.Dropdown-menu {
    border: 1px solid #55f;
    border-radius: 15px;
  }
`

interface IDisplayContainer {
  columns?: boolean
}

export const DisplayContainer = styled.div<IDisplayContainer>`
  align-items: stretch;
  display: grid;
  gap: 2rem;
  grid-template-columns: ${props =>
    props.columns ? '1fr 1fr 1fr 1fr' : '1fr 1fr'};
  overflow: hidden;
  margin-bottom: 1rem;
  margin-left: ${props => (props.columns ? '5vw' : '25vw')};
  width: ${props => (props.columns ? '90vw' : '50vw')};

  h4,
  p {
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
  }

  h4:before,
  h4:after,
  p:before,
  p:after {
    content: '';
    background-color: #333;
    position: absolute;
  }

  h4:after,
  p:after {
    height: 1px;
    left: 0;
    top: -1rem;
    width: 100vw;
  }

  h4:before,
  p:before {
    bottom: 0;
    height: 100vh;
    left: -1rem;
    width: 1px;
  }
`
