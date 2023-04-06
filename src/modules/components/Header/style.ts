import { AppBar, Toolbar, Typography } from '@mui/material'
import styled from 'styled-components'

export const StyledAppBar = styled(AppBar)`
  background-color: #3f51b5;
`

export const Title = styled(Typography)`
  flex-grow: 1;
  font-family: 'Roboto', sans-serif;
  font-weight: bold !important;
  font-size: 1.5rem !important;
`

export const HeaderToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`
