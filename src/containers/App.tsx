import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Home, Config, CrateCosting } from '../pages'

import { createBaseFolder } from '../utils/files'

const NavBar = styled.div`
  background: #ccc;
  border: 0;
  display: flex;
  left: 0;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
`

interface StyledLinkProps {
  active: boolean
}

const StyledLink = styled(Link)<StyledLinkProps>`
  background: ${props => (props.active ? '#008080' : '#ccc')};
  color: ${props => (props.active ? '#fff' : '#333')};
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color 0.15s ease;
  text-decoration: none;

  &:hover {
    background: #008080;
    color: #fff;
  }
`

function App (): JSX.Element {
  const [prices, setPrices] = useState({})

  useEffect(() => {
    async function getData () {
      const fileData = await createBaseFolder()
      setPrices(fileData)
    }

    getData().catch(e => console.error(e))
  }, [])

  const { pathname } = useLocation()

  function isCurrentRoute (path: string): boolean {
    return pathname === path
  }

  return (
    <div className='container'>
      <NavBar>
        <StyledLink active={isCurrentRoute('/')} to='/'>
          Home
        </StyledLink>
        <StyledLink active={isCurrentRoute('/config')} to='/config'>
          Config
        </StyledLink>
        <StyledLink
          active={isCurrentRoute('/crate-costing')}
          to='/crate-costing'
        >
          Crate Costing
        </StyledLink>
      </NavBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/config' element={<Config />} />
        <Route path='/crate-costing' element={<CrateCosting />} />
      </Routes>
    </div>
  )
}

export default App
