import { Card, CardHeader, CardContent, Typography, Grid, Button, TextField, CircularProgress } from '@mui/material'
import { SetStateAction, useEffect, useState } from 'react'
import { ICartItem, iProduct } from '../../../App'
import FilterBar from '../../components/FilterBar'
import { orderBy } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductList = ({ addToCart }: { addToCart: (product: ICartItem) => void }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<iProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<iProduct[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [sortOrder, setSortOrder] = useState('')

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities({ ...quantities, [productId]: value })
  }

  useEffect(() => {
    setLoading(true)
    async function fetchProducts() {
      try {
        const response = await fetch('https://ecommerce-products-teste.herokuapp.com/products')
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
        setLoading(false)
      } catch (error) {
        toast.error('Erro ao carregar produtos')
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchTerm, selectedCategory, sortOrder])

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter((product: { name: string }) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((product: iProduct) => product.category === selectedCategory)
    }

    if (sortOrder) {
      const [field, direction] = sortOrder.split('|')
      filtered = orderBy(filtered, [field], [direction as 'asc' | 'desc']) as iProduct[]
    }

    setFilteredProducts(filtered)
  }

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(event.target.value)
  }

  const handleCategoryChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelectedCategory(event.target.value)
  }

  const handleSortOrderChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSortOrder(event.target.value)
  }

  const goToProductDetail = (productId: string) => {
    navigate(`/product/${productId}`)
  }

  return (
    <>
      <FilterBar
        handleSearchChange={handleSearchChange}
        handleCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        handleSortOrderChange={handleSortOrderChange}
        sortOrder={sortOrder}
      />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card onClick={() => goToProductDetail(product._id)} style={{ cursor: 'pointer' }}>
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
                    value={quantities[product._id] || ''}
                    onClick={e => e.stopPropagation()}
                    onChange={e => handleQuantityChange(product._id, parseInt(e.target.value))}
                    InputProps={{ inputProps: { min: 0, max: product.stock } }}
                  />
                  <Button
                    style={{ zIndex: 10 }}
                    variant="contained"
                    color="primary"
                    onClick={e => {
                      e.stopPropagation()
                      addToCart({
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        quantity: quantities[product._id] || 1,
                        stock: product.stock,
                      })
                    }}
                  >
                    Adicionar ao carrinho
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default ProductList
