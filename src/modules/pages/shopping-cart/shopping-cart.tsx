import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material'
import { ICartItem } from '../../../App'

interface ShoppingCartProps {
  cartItems: ICartItem[]
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>
}

const ShoppingCart = ({ cartItems, setCartItems }: ShoppingCartProps) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems: ICartItem[]) => prevItems.filter((item: { id: string }) => item.id !== id))
  }

  return (
    <Box style={{ padding: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Carrinho de Compras
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map(item => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">R$ {item.price.toFixed(2)}</TableCell>
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: item.stock } }}
                  value={item.quantity}
                  onChange={e => {
                    const newQuantity = parseInt(e.target.value, 10)
                    setCartItems(prevItems =>
                      prevItems.map(cartItem =>
                        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem,
                      ),
                    )
                  }}
                />
                <TableCell align="right">R$ {(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.id)}>
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box mt={2}>
        <Typography variant="h6">Total: R$ {getTotalPrice().toFixed(2)}</Typography>
      </Box>
    </Box>
  )
}

export default ShoppingCart
