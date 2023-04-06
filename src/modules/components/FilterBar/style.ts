import { FormControl, InputBase } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`

export const FilterBarWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

export const SearchBar = styled.div`
  position: relative;
  width: 100%;
  padding: 0 1rem !important;
`

export const SearchIconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  pointer-events: none;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const StyledInputBase = styled(InputBase)`
  padding: 8px 8px 8px 0;
  padding-left: calc(1em + 16px);
  width: 100% !important;
`

export const StyledFormControl = styled(FormControl)`
  min-width: 150px;
  max-width: 250px;
  width: 100%;
`
