// src/components/ProductDetails.tsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardHeader, CardContent, Typography, Grid, Button, TextField, CircularProgress } from '@mui/material'
import { ICartItem, iProduct } from '../../../App'
import { toast } from 'react-toastify'

const ProductDetails = ({ addToCart }: { addToCart: (product: ICartItem) => void }) => {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<iProduct>()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    async function fetchProduct() {
      try {
        const response = await fetch(`https://ecommerce-products-teste.herokuapp.com/products/${productId}`)
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        toast.error('Erro ao carregar produto')
        setLoading(false)
      }
    }
    fetchProduct()
  }, [])

  if (!product && !loading) {
    return <div>Produto não encontrado.</div>
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(value)
  }

  return (
    <>
      {product && !loading ? (
        <Grid container spacing={4} style={{ padding: '1rem' }}>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="h6" gutterBottom>
              Descrição do Produto
            </Typography>
            <Typography variant="body1">{product.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title={product.name} subheader={`Marca: ${product.brand}`} />
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Categoria: {product.category}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Preço: R$ {product.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Estoque: {product.stock}
                </Typography>
                <TextField
                  type="number"
                  label="Quantidade"
                  variant="outlined"
                  size="small"
                  value={quantity}
                  onChange={e => handleQuantityChange(parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 1, max: product.stock } }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      quantity: quantity,
                      stock: product.stock,
                    })
                  }
                >
                  Adicionar ao carrinho
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default ProductDetails
