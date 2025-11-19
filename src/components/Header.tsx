import { AppBar, Toolbar, Typography, Badge, IconButton, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="sticky" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar sx={{ gap: 2 }}>
          <StorefrontIcon sx={{ fontSize: 32 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            ShopHub
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            aria-label="shopping cart"
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
