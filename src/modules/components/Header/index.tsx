import { IconButton } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { HeaderToolbar, StyledAppBar, Title } from './style'
import { Link } from 'react-router-dom'

const Header = ({ cartItems }: { cartItems: number }) => {
  return (
    <StyledAppBar position="relative">
      <HeaderToolbar>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Title>Listagem de Produtos - Ecommerce</Title>
        </Link>
        <IconButton edge="end" color="inherit" aria-label="shopping cart">
          <Link to="/carrinho" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Badge badgeContent={cartItems} color="error">
              <ShoppingCart />
            </Badge>
          </Link>
        </IconButton>
      </HeaderToolbar>
    </StyledAppBar>
  )
}

export default Header
