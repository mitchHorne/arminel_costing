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

  h4 {
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

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export const StatsRowHeader = styled.div`
  background-color: #eee;
  border: 1px solid #777;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  padding: 0 25px;

  h4 {
    margin: 0;
    padding: 10px 0;
  }
`

interface IArrow {
  open: boolean
}

export const Arrow = styled.div<IArrow>`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  margin-right: 10px;
  padding: 3px;
  transform: ${props => (props.open ? 'rotate(45deg)' : 'rotate(-45deg)')};
  -webkit-transform: ${props =>
    props.open ? 'rotate(45deg)' : 'rotate(-45deg)'};

  transition: all 0.3s;
`

interface IStatsContent {
  height: number
  open: boolean
}

export const StatsContentContainer = styled.div<IStatsContent>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: ${props => (props.open ? `${props.height}px` : '0px')};
  overflow: hidden;
  transition: max-height 0.3s ease-in;

  h4,
  p {
    border-bottom: 1px solid #777;
    border-left: 1px solid #777;
    margin: 0;
    padding: 5px 5px;
    text-align: left;
  }

  p {
    border-right: 1px solid #777;
  }
`
