import styled from 'styled-components'

export const CostingChoiceButton = styled.button`
  align-items: center;
  background: #000080;
  border: 1px solid #000080;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  justify-content: space-around;
  height: 100px;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
  width: 150px;

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

  i {
    font-size: 2rem;
  }
`
