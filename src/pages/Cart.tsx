import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  IconButton,
  TextField,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { useSnackbar } from '@/hooks/useSnackbar';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useSnackbar();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleRemove = (id: number, title: string) => {
    dispatch(removeFromCart(id));
    toast.success(`${title} removed from cart`);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Add some products to get started!
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Shopping Cart
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '8fr 4fr' },
          gap: 3,
        }}
      >
        <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Cart Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {cartItems.map((item) => (
              <Box key={item.id}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ${item.price.toFixed(2)} each
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                        }
                        inputProps={{ min: 1 }}
                        sx={{ width: 80 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(item.id, item.title)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 80, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight="600">${subtotal.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax (10%):</Typography>
              <Typography fontWeight="600">${tax.toFixed(2)}</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Total:
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                ${total.toFixed(2)}
              </Typography>
            </Box>
            
            <Button variant="contained" fullWidth size="large" sx={{ py: 1.5 }}>
              Proceed to Checkout
            </Button>
            
            <Button
              variant="outlined"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Cart;
