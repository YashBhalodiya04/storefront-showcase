import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
  CircularProgress,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const loading = useAppSelector((state) => state.products.loading);

  const product = products.find((p) => p.id === Number(id));

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Product not found</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <IconButton onClick={() => navigate('/')} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      
      <Paper elevation={2} sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              borderRadius: 2,
              p: 3,
            }}
          >
...
          </Box>
          
          <Box>
            <Chip
              label={product.category}
              color="primary"
              sx={{ mb: 2, textTransform: 'capitalize' }}
            />
            
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {product.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                ${product.price.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body1" color="text.secondary">
                  ⭐ {product.rating.rate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({product.rating.count} reviews)
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="h6" gutterBottom fontWeight="600">
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{ mt: 3, px: 4, py: 1.5 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
