import { Search } from '@mui/icons-material'
import { Container, FilterBarWrapper, SearchBar, SearchIconWrapper, StyledFormControl, StyledInputBase } from './style'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
  handleSearchChange: (event: { target: { value: SetStateAction<string> } }) => void
  handleCategoryChange: (event: { target: { value: SetStateAction<string> } }) => void
  handleSortOrderChange: (event: { target: { value: SetStateAction<string> } }) => void
  searchTerm: string
  selectedCategory: string
  sortOrder: string
}

const FilterBar = ({
  handleSearchChange,
  handleCategoryChange,
  handleSortOrderChange,
  searchTerm,
  selectedCategory,
  sortOrder,
}: Props) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('https://ecommerce-products-teste.herokuapp.com/categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        toast.error('Erro ao carregar categorias')
      }
    }
    fetchCategories()
  }, [])

  return (
    <Container>
      <FilterBarWrapper>
        <SearchBar>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Buscar produto…" value={searchTerm} onChange={handleSearchChange} />
        </SearchBar>
        <StyledFormControl size="small">
          <InputLabel id="category-label">Categoria</InputLabel>
          <Select labelId="category-label" value={selectedCategory} onChange={handleCategoryChange}>
            <MenuItem value="">
              <em>Todas</em>
            </MenuItem>
            {categories.map((category: { name: string }) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <FormControl fullWidth variant="outlined" size="small" style={{ maxWidth: '300px' }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select label="Ordenar por" value={sortOrder} onChange={handleSortOrderChange}>
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            <MenuItem value="price|asc">Preço: menor para maior</MenuItem>
            <MenuItem value="price|desc">Preço: maior para menor</MenuItem>
            <MenuItem value="name|asc">Nome: A-Z</MenuItem>
            <MenuItem value="name|desc">Nome: Z-A</MenuItem>
            <MenuItem value="category|asc">Categoria: A-Z</MenuItem>
            <MenuItem value="category|desc">Categoria: Z-A</MenuItem>
          </Select>
        </FormControl>
      </FilterBarWrapper>
    </Container>
  )
}

export default FilterBar
